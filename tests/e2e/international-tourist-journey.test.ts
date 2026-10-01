import { db } from "../../src/lib/db";
import { demoPaymentProvider } from "../../src/lib/payment/DemoPaymentProvider";
import { processBookingAndPass } from "../../src/lib/booking";
import { validatePassForRedemption, redeemPass } from "../../src/lib/redemption";

describe("Required End-to-End Scenario: International Tourist Journey (Section 22)", () => {
  beforeEach(() => {
    db.resetDatabase();
  });

  test("Automates full 22-step foreign tourist journey from discovery through duplicate redemption blocking & admin metrics", async () => {
    // 1. Open TN smart tourism & inspect initial state
    expect(db.getAttractions().length).toBeGreaterThan(0);

    // 2. Select Chennai–Mahabalipuram pilot corridor
    const corridorAttractions = db.getAttractions().filter(
      (a) => a.location.includes("Mahabalipuram") || a.location.includes("Chennai")
    );
    expect(corridorAttractions.length).toBeGreaterThan(0);

    // 3. Select Coastal discovery pass
    const coastalPass = db.getPassPackageById("pass-coastal-discovery");
    expect(coastalPass).not.toBeNull();
    expect(coastalPass?.demo_price).toBe(1499);

    // 4. Continue checkout (Traveler data)
    const traveler = {
      name: "Alice Smith",
      email: "alice.smith@example.org",
      quantity: 1,
      visitor_type: "INTERNATIONAL" as const,
    };

    // 5. Select International visitor
    expect(traveler.visitor_type).toBe("INTERNATIONAL");

    // 6. Start UPI One World simulation
    const onboarding = await demoPaymentProvider.initializeOnboarding({
      visitor_type: traveler.visitor_type,
    });
    expect(onboarding.payment_session_id).toBeDefined();

    // 7. Complete visitor verification
    const vRes = await demoPaymentProvider.verifyVisitor({
      payment_session_id: onboarding.payment_session_id,
      country: "United States",
      mobile: "+1 555-019-9999",
      email: traveler.email,
    });
    expect(vRes.success).toBe(true);

    // 8. Complete identity verification
    const idRes = await demoPaymentProvider.verifyIdentity({
      payment_session_id: onboarding.payment_session_id,
      simulated_selfie: true,
    });
    expect(idRes.success).toBe(true);

    // 9. Create demo wallet
    const wallet = await demoPaymentProvider.createWallet({
      payment_session_id: onboarding.payment_session_id,
    });
    expect(wallet.demo_upi_id).toMatch(/^demo-[A-Z0-9]+@upi$/);
    expect(wallet.demo_balance).toBe(0);

    // 10. Fund wallet with ₹5,000 using simulated international card
    const fundRes = await demoPaymentProvider.loadWallet({
      wallet_session_id: wallet.wallet_session_id,
      amount: 5000,
    });
    expect(fundRes.success).toBe(true);
    expect(fundRes.new_balance).toBe(5000);

    // 11. Return to checkout / Payment Authorisation setup
    const walletBalance = (await demoPaymentProvider.getWalletBalance(wallet.wallet_session_id)).demo_balance;
    expect(walletBalance).toBe(5000);

    // 12. Pay for pass (₹1,499)
    const payRes = await demoPaymentProvider.authorizePayment({
      payment_session_id: onboarding.payment_session_id,
      wallet_session_id: wallet.wallet_session_id,
      amount: coastalPass!.demo_price,
      pass_id: coastalPass!.id,
      pass_name: coastalPass!.name,
    });

    // 13. Confirm payment success
    expect(payRes.status).toBe("SUCCESS");
    expect(payRes.remaining_balance).toBe(3501);

    // 14. Generate booking
    const bookingRes = processBookingAndPass({
      traveler_name: traveler.name,
      traveler_email: traveler.email,
      visitor_type: traveler.visitor_type,
      pass_id: coastalPass!.id,
      quantity: traveler.quantity,
      payment_reference: payRes.provider_reference,
      payment_status: "PAID",
    });

    expect(bookingRes.booking).not.toBeNull();
    expect(bookingRes.booking?.booking_reference).toMatch(/^BK-\d{4}-[A-Z0-9]+$/);

    // 15. Generate digital pass
    expect(bookingRes.digitalPass).not.toBeNull();
    const digitalPass = bookingRes.digitalPass!;
    expect(digitalPass.pass_reference).toMatch(/^PASS-[A-Z0-9]+$/);
    expect(digitalPass.qr_token).toMatch(/^TN-DEMO-PASS-[A-Z0-9]+$/);

    // 16. Open My passes
    const userPasses = db.getDigitalPasses();
    expect(userPasses.some((p) => p.id === digitalPass.id)).toBe(true);

    // 17. Open QR pass & verify payload contains NO PII
    expect(digitalPass.qr_token).not.toContain(traveler.email);
    expect(digitalPass.qr_token).not.toContain("passport");
    expect(digitalPass.qr_token).not.toContain("card");

    // 18. Validate pass in operator interface
    const valBefore = validatePassForRedemption(digitalPass.pass_reference);
    expect(valBefore.resultCode).toBe("VALID");

    // 19. Redeem pass
    const redeemRes1 = redeemPass(digitalPass.pass_reference);
    expect(redeemRes1.success).toBe(true);
    expect(redeemRes1.resultCode).toBe("VALID");

    // 20. Attempt second redemption
    const redeemRes2 = redeemPass(digitalPass.pass_reference);

    // 21. Verify second redemption is rejected
    expect(redeemRes2.success).toBe(false);
    expect(redeemRes2.resultCode).toBe("ALREADY_REDEEMED");

    // 22. Verify admin/demo metrics update
    const bookings = db.getBookings();
    const passes = db.getDigitalPasses();
    const txs = db.getPaymentTransactions();

    expect(bookings.length).toBe(1);
    expect(bookings[0].visitor_type).toBe("INTERNATIONAL");
    expect(passes.filter((p) => p.status === "REDEEMED").length).toBe(1);
    expect(txs.filter((t) => t.status === "SUCCESS").length).toBe(2); // 1 fund tx + 1 pay tx
  });
});

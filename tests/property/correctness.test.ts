import { db } from "../../src/lib/db";
import { demoPaymentProvider } from "../../src/lib/payment/DemoPaymentProvider";
import { processBookingAndPass } from "../../src/lib/booking";
import { validatePassForRedemption, redeemPass } from "../../src/lib/redemption";

describe("TN smart tourism — 12 Correctness Properties", () => {
  beforeEach(() => {
    db.resetDatabase();
  });

  // Property 1: Booking references are unique.
  test("Property 1: Booking references are unique", async () => {
    const refs = new Set<string>();
    for (let i = 0; i < 20; i++) {
      const res = processBookingAndPass({
        traveler_name: `Tourist ${i}`,
        traveler_email: `tourist${i}@example.com`,
        visitor_type: "INTERNATIONAL",
        pass_id: "pass-coastal-discovery",
        quantity: 1,
        payment_reference: `PAY-${i}`,
        payment_status: "PAID",
      });
      expect(res.booking).not.toBeNull();
      if (res.booking) {
        expect(refs.has(res.booking.booking_reference)).toBe(false);
        refs.add(res.booking.booking_reference);
      }
    }
  });

  // Property 2: Pass references are unique.
  test("Property 2: Pass references are unique", async () => {
    const refs = new Set<string>();
    for (let i = 0; i < 20; i++) {
      const res = processBookingAndPass({
        traveler_name: `Tourist ${i}`,
        traveler_email: `tourist${i}@example.com`,
        visitor_type: "INTERNATIONAL",
        pass_id: "pass-coastal-discovery",
        quantity: 1,
        payment_reference: `PAY-${i}`,
        payment_status: "PAID",
      });
      expect(res.digitalPass).not.toBeNull();
      if (res.digitalPass) {
        expect(refs.has(res.digitalPass.pass_reference)).toBe(false);
        refs.add(res.digitalPass.pass_reference);
      }
    }
  });

  // Property 3: Successful payment creates exactly one booking.
  test("Property 3: Successful payment creates exactly one booking", async () => {
    const initialBookingsCount = db.getBookings().length;
    const res = processBookingAndPass({
      traveler_name: "Jane Smith",
      traveler_email: "jane@example.com",
      visitor_type: "INTERNATIONAL",
      pass_id: "pass-heritage-explorer",
      quantity: 1,
      payment_reference: "PAY-SUCCESS-001",
      payment_status: "PAID",
    });

    expect(res.booking).not.toBeNull();
    expect(db.getBookings().length).toBe(initialBookingsCount + 1);
  });

  // Property 4: Failed payment creates no confirmed booking.
  test("Property 4: Failed payment creates no confirmed booking", async () => {
    const initialBookingsCount = db.getBookings().length;
    const res = processBookingAndPass({
      traveler_name: "Failed Tourist",
      traveler_email: "fail@example.com",
      visitor_type: "INTERNATIONAL",
      pass_id: "pass-heritage-explorer",
      quantity: 1,
      payment_reference: "PAY-FAIL-001",
      payment_status: "FAILED",
    });

    expect(res.booking).toBeNull();
    expect(db.getBookings().length).toBe(initialBookingsCount);
  });

  // Property 5: Successful booking creates exactly one digital pass.
  test("Property 5: Successful booking creates exactly one digital pass", async () => {
    const initialPassCount = db.getDigitalPasses().length;
    const res = processBookingAndPass({
      traveler_name: "John Doe",
      traveler_email: "john@example.com",
      visitor_type: "INTERNATIONAL",
      pass_id: "pass-coastal-discovery",
      quantity: 1,
      payment_reference: "PAY-002",
      payment_status: "PAID",
    });

    expect(res.digitalPass).not.toBeNull();
    expect(db.getDigitalPasses().length).toBe(initialPassCount + 1);
    expect(res.digitalPass?.booking_id).toBe(res.booking?.id);
  });

  // Property 6: Wallet funding increases balance correctly.
  test("Property 6: Wallet funding increases balance correctly", async () => {
    const onboarding = await demoPaymentProvider.initializeOnboarding({ visitor_type: "INTERNATIONAL" });
    const wallet = await demoPaymentProvider.createWallet({ payment_session_id: onboarding.payment_session_id });
    expect(wallet.demo_balance).toBe(0);

    const loaded = await demoPaymentProvider.loadWallet({
      wallet_session_id: wallet.wallet_session_id,
      amount: 5000,
    });

    expect(loaded.success).toBe(true);
    expect(loaded.new_balance).toBe(5000);

    const check = await demoPaymentProvider.getWalletBalance(wallet.wallet_session_id);
    expect(check.demo_balance).toBe(5000);
  });

  // Property 7: Successful payment reduces balance correctly.
  test("Property 7: Successful payment reduces balance correctly", async () => {
    const onboarding = await demoPaymentProvider.initializeOnboarding({ visitor_type: "INTERNATIONAL" });
    const wallet = await demoPaymentProvider.createWallet({ payment_session_id: onboarding.payment_session_id });
    await demoPaymentProvider.loadWallet({ wallet_session_id: wallet.wallet_session_id, amount: 5000 });

    const payRes = await demoPaymentProvider.authorizePayment({
      payment_session_id: onboarding.payment_session_id,
      wallet_session_id: wallet.wallet_session_id,
      amount: 1499,
      pass_id: "pass-coastal-discovery",
      pass_name: "Coastal Discovery",
    });

    expect(payRes.status).toBe("SUCCESS");
    expect(payRes.amount_deducted).toBe(1499);
    expect(payRes.remaining_balance).toBe(3501);

    const check = await demoPaymentProvider.getWalletBalance(wallet.wallet_session_id);
    expect(check.demo_balance).toBe(3501);
  });

  // Property 8: Insufficient balance blocks payment.
  test("Property 8: Insufficient balance blocks payment", async () => {
    const onboarding = await demoPaymentProvider.initializeOnboarding({ visitor_type: "INTERNATIONAL" });
    const wallet = await demoPaymentProvider.createWallet({ payment_session_id: onboarding.payment_session_id });
    await demoPaymentProvider.loadWallet({ wallet_session_id: wallet.wallet_session_id, amount: 1000 });

    const payRes = await demoPaymentProvider.authorizePayment({
      payment_session_id: onboarding.payment_session_id,
      wallet_session_id: wallet.wallet_session_id,
      amount: 1999,
      pass_id: "pass-heritage-explorer",
      pass_name: "Heritage Explorer",
    });

    expect(payRes.status).toBe("FAILED");
    expect(payRes.remaining_balance).toBe(1000);
    expect(payRes.failure_reason).toContain("Insufficient wallet balance");
  });

  // Property 9: Valid passes can be redeemed.
  test("Property 9: Valid passes can be redeemed", async () => {
    const res = processBookingAndPass({
      traveler_name: "Tourist",
      traveler_email: "tourist@example.com",
      visitor_type: "INTERNATIONAL",
      pass_id: "pass-coastal-discovery",
      quantity: 1,
      payment_reference: "PAY-RED-001",
      payment_status: "PAID",
    });

    const passRef = res.digitalPass!.pass_reference;
    const valRes = validatePassForRedemption(passRef);
    expect(valRes.resultCode).toBe("VALID");

    const redRes = redeemPass(passRef);
    expect(redRes.success).toBe(true);
    expect(redRes.resultCode).toBe("VALID");

    const checkPass = db.getDigitalPassByRef(passRef);
    expect(checkPass?.status).toBe("REDEEMED");
  });

  // Property 10: Redeemed passes cannot be redeemed again.
  test("Property 10: Redeemed passes cannot be redeemed again", async () => {
    const res = processBookingAndPass({
      traveler_name: "Tourist",
      traveler_email: "tourist@example.com",
      visitor_type: "INTERNATIONAL",
      pass_id: "pass-coastal-discovery",
      quantity: 1,
      payment_reference: "PAY-DUP-001",
      payment_status: "PAID",
    });

    const passRef = res.digitalPass!.pass_reference;
    redeemPass(passRef); // First redemption

    // Second redemption attempt
    const secondVal = validatePassForRedemption(passRef);
    expect(secondVal.resultCode).toBe("ALREADY_REDEEMED");

    const secondRedeem = redeemPass(passRef);
    expect(secondRedeem.success).toBe(false);
    expect(secondRedeem.resultCode).toBe("ALREADY_REDEEMED");
  });

  // Property 11: Expired passes cannot be redeemed.
  test("Property 11: Expired passes cannot be redeemed", async () => {
    const res = processBookingAndPass({
      traveler_name: "Expired Tourist",
      traveler_email: "exp@example.com",
      visitor_type: "INTERNATIONAL",
      pass_id: "pass-coastal-discovery",
      quantity: 1,
      payment_reference: "PAY-EXP-001",
      payment_status: "PAID",
    });

    const pass = res.digitalPass!;
    db.updateDigitalPassStatus(pass.id, "EXPIRED");

    const valRes = validatePassForRedemption(pass.pass_reference);
    expect(valRes.resultCode).toBe("EXPIRED");

    const redRes = redeemPass(pass.pass_reference);
    expect(redRes.success).toBe(false);
    expect(redRes.resultCode).toBe("EXPIRED");
  });

  // Property 12: Soft-deleted attractions do not appear in discovery.
  test("Property 12: Soft-deleted attractions do not appear in discovery", async () => {
    const allInitial = db.getAttractions();
    expect(allInitial.length).toBeGreaterThan(0);

    const targetId = allInitial[0].id;
    db.softDeleteAttraction(targetId);

    const afterDelete = db.getAttractions();
    expect(afterDelete.find((a) => a.id === targetId)).toBeUndefined();
    expect(db.getAttractionById(targetId)).toBeNull();
  });
});

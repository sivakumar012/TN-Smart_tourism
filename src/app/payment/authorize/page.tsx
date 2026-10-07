"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2, AlertCircle, Lock, ShieldCheck, Ticket, Wallet, ArrowRight } from "lucide-react";
import { db } from "@/lib/db";
import { demoPaymentProvider } from "@/lib/payment/DemoPaymentProvider";
import { processBookingAndPass } from "@/lib/booking";
import { VisitorType } from "@/types";
import {
  trackPurchase,
  trackBookingFailed,
  trackPaymentResult,
} from "@/lib/analytics";

function AuthorizePaymentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const passId = searchParams.get("passId") || "pass-coastal-discovery";
  const travelerName = searchParams.get("name") || "John Doe";
  const travelerEmail = searchParams.get("email") || "john.doe@example.com";
  const quantity = Number(searchParams.get("quantity")) || 1;
  const visitorType = (searchParams.get("visitorType") as VisitorType) || "INTERNATIONAL";
  const walletId = searchParams.get("walletId") || "";
  const upiId = searchParams.get("upiId") || "demo-tourist@upi";

  const pkg = db.getPassPackageById(passId) || db.getPassPackages()[0];
  const totalAmount = pkg.demo_price * quantity;

  // Retrieve current wallet balance
  const walletSession = walletId ? db.getWalletSession(walletId) : null;
  const walletBalance = walletSession ? walletSession.demo_balance : Number(searchParams.get("newBalance") || 5000);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePay = async () => {
    setLoading(true);
    setError(null);

    try {
      // Create or locate payment session
      const onboarding = await demoPaymentProvider.initializeOnboarding({
        visitor_type: visitorType,
      });

      // If wallet is not created in DB yet, create it
      let activeWalletId = walletId;
      if (!activeWalletId) {
        const w = await demoPaymentProvider.createWallet({
          payment_session_id: onboarding.payment_session_id,
        });
        activeWalletId = w.wallet_session_id;
        // Seed initial balance if provided in params
        await demoPaymentProvider.loadWallet({
          wallet_session_id: activeWalletId,
          amount: walletBalance,
        });
      }

      // Execute Payment Authorization
      const paymentResult = await demoPaymentProvider.authorizePayment({
        payment_session_id: onboarding.payment_session_id,
        wallet_session_id: activeWalletId,
        amount: totalAmount,
        pass_id: pkg.id,
        pass_name: pkg.name,
      });

      if (paymentResult.status === "SUCCESS") {
        // Create Booking & Digital Pass (Property 3 & Property 5)
        const bookingResult = processBookingAndPass({
          traveler_name: travelerName,
          traveler_email: travelerEmail,
          visitor_type: visitorType,
          pass_id: pkg.id,
          quantity: quantity,
          payment_reference: paymentResult.provider_reference,
          payment_status: "PAID",
        });

        if (bookingResult.booking && bookingResult.digitalPass) {
          // Track successful purchase — deduplicated by payment reference
          trackPurchase({
            transaction_id: paymentResult.provider_reference,
            currency: "INR",
            value: totalAmount,
            pass_id: pkg.id,
            pass_name: pkg.name,
            quantity,
            payment_method: walletId ? "upi_one_world" : "indian_payment",
            visitor_type: visitorType === "INTERNATIONAL" ? "international" : "domestic",
            destination: "Chennai-Mahabalipuram",
            items: [{
              item_id: pkg.id,
              item_name: pkg.name,
              item_category: "Tourism Pass",
              price: pkg.demo_price,
              quantity,
              currency: "INR",
            }],
          });
          trackPaymentResult({
            currency: "INR",
            value: totalAmount,
            payment_method: walletId ? "upi_one_world" : "indian_payment",
            payment_status: "success",
            pass_id: pkg.id,
            pass_name: pkg.name,
            visitor_type: visitorType === "INTERNATIONAL" ? "international" : "domestic",
            destination: "Chennai-Mahabalipuram",
          });

          const params = new URLSearchParams({
            status: "SUCCESS",
            bookingRef: bookingResult.booking.booking_reference,
            passRef: bookingResult.digitalPass.pass_reference,
            amount: totalAmount.toString(),
            payRef: paymentResult.provider_reference,
          });
          router.push(`/payment/result?${params.toString()}`);
        } else {
          // Booking creation failed after payment
          trackBookingFailed({
            pass_id: pkg.id,
            pass_name: pkg.name,
            currency: "INR",
            value: totalAmount,
            payment_method: walletId ? "upi_one_world" : "indian_payment",
            failure_reason: "booking_creation_failed",
            booking_status: "failed",
            visitor_type: visitorType === "INTERNATIONAL" ? "international" : "domestic",
            destination: "Chennai-Mahabalipuram",
          });
          setError("Booking creation failed.");
        }
      } else {
        // Payment failed — never generate purchase event
        trackBookingFailed({
          pass_id: pkg.id,
          pass_name: pkg.name,
          currency: "INR",
          value: totalAmount,
          payment_method: walletId ? "upi_one_world" : "indian_payment",
          failure_reason: "insufficient_balance",
          booking_status: "failed",
          visitor_type: visitorType === "INTERNATIONAL" ? "international" : "domestic",
          destination: "Chennai-Mahabalipuram",
        });
        trackPaymentResult({
          currency: "INR",
          value: totalAmount,
          payment_method: walletId ? "upi_one_world" : "indian_payment",
          payment_status: "failed",
          pass_id: pkg.id,
          pass_name: pkg.name,
          failure_reason: "insufficient_balance",
          visitor_type: visitorType === "INTERNATIONAL" ? "international" : "domestic",
          destination: "Chennai-Mahabalipuram",
        });
        // Payment failed (Property 4: Failed payment creates no confirmed booking)
        const params = new URLSearchParams({
          status: "FAILED",
          reason: paymentResult.failure_reason || "Insufficient wallet balance",
          amount: totalAmount.toString(),
          balance: paymentResult.remaining_balance.toString(),
          passId: pkg.id,
        });
        router.push(`/payment/result?${params.toString()}`);
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred during payment.");
    } finally {
      setLoading(false);
    }
  };

  const isBalanceSufficient = walletBalance >= totalAmount;

  return (
    <div className="p-6 sm:p-8 rounded-2xl glass-panel space-y-6">
      <div className="space-y-1">
        <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">Step 5 of 5</span>
        <h1 className="text-2xl font-bold text-white">Payment Authorisation</h1>
        <p className="text-xs text-slate-300">
          Confirm payment for your tourism pass using your funded demo UPI wallet.
        </p>
      </div>

      {/* Pass & Payment Summary */}
      <div className="p-6 rounded-2xl bg-navy-900 border border-teal-500/30 space-y-4">
        <div className="flex items-center justify-between border-b border-teal-500/15 pb-4">
          <div>
            <span className="text-xs text-sand-400 font-bold uppercase tracking-wider">Selected Pass</span>
            <h2 className="text-xl font-bold text-white">{pkg.name}</h2>
            <span className="text-xs text-slate-400">{quantity} × pass ({pkg.validity_days} days validity)</span>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400 block">Total Payable</span>
            <span className="text-2xl font-black text-teal-400">₹{totalAmount.toLocaleString("en-IN")}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-slate-400 block">Paying From Demo Wallet</span>
            <span className="font-mono font-bold text-white">{upiId}</span>
          </div>
          <div>
            <span className="text-slate-400 block">Available Balance</span>
            <span className={`font-bold text-sm ${isBalanceSufficient ? "text-teal-400" : "text-red-400"}`}>
              ₹{walletBalance.toLocaleString("en-IN")}
            </span>
          </div>
        </div>

        {!isBalanceSufficient && (
          <div className="p-3.5 rounded-xl bg-red-500/15 border border-red-500/30 text-xs text-red-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>Insufficient balance! Your wallet has ₹{walletBalance}, but required amount is ₹{totalAmount}.</span>
          </div>
        )}
      </div>

      {/* Disclaimer */}
      <div className="p-3.5 rounded-xl bg-sand-500/10 border border-sand-500/30 text-xs text-sand-400 flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 shrink-0" />
        <span>Demo simulation — no real payment is processed. Funds are deducted from your demo wallet balance.</span>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-red-500/20 text-red-300 text-xs font-semibold">
          {error}
        </div>
      )}

      <button
        onClick={handlePay}
        disabled={loading}
        className="w-full py-4 rounded-xl bg-gradient-to-r from-teal-500 to-teal-400 text-navy-950 font-black text-base hover:from-teal-400 hover:to-teal-300 transition-all shadow-xl shadow-teal-500/25 flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {loading ? (
          <div className="w-6 h-6 rounded-full border-2 border-navy-950 border-t-transparent animate-spin" />
        ) : (
          <>
            <Lock className="w-4 h-4" />
            <span>Pay & get pass</span>
          </>
        )}
      </button>
    </div>
  );
}

export default function AuthorizePaymentPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Progress Bar */}
      <div className="p-4 rounded-xl glass-panel flex items-center justify-between text-xs font-semibold text-slate-400">
        <div className="flex items-center gap-2 text-teal-400">
          <CheckCircle2 className="w-4 h-4" />
          <span className="hidden sm:inline">Visitor Info</span>
        </div>
        <div className="h-px w-8 bg-teal-500" />
        <div className="flex items-center gap-2 text-teal-400">
          <CheckCircle2 className="w-4 h-4" />
          <span className="hidden sm:inline">Identity</span>
        </div>
        <div className="h-px w-8 bg-teal-500" />
        <div className="flex items-center gap-2 text-teal-400">
          <CheckCircle2 className="w-4 h-4" />
          <span className="hidden sm:inline">Wallet</span>
        </div>
        <div className="h-px w-8 bg-teal-500" />
        <div className="flex items-center gap-2 text-teal-400">
          <CheckCircle2 className="w-4 h-4" />
          <span className="hidden sm:inline">Add Funds</span>
        </div>
        <div className="h-px w-8 bg-teal-500" />
        <div className="flex items-center gap-2 text-teal-400">
          <span className="w-6 h-6 rounded-full bg-teal-500 text-navy-950 font-bold flex items-center justify-center text-xs">5</span>
          <span>Pay</span>
        </div>
      </div>

      <Suspense fallback={<div className="p-8 text-center text-slate-400">Loading payment authorisation...</div>}>
        <AuthorizePaymentContent />
      </Suspense>
    </div>
  );
}

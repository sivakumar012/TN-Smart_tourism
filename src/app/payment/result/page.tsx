"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, AlertCircle, ArrowRight, Ticket, RefreshCw, PlusCircle } from "lucide-react";

function PaymentResultContent() {
  const searchParams = useSearchParams();

  const status = searchParams.get("status") || "SUCCESS";
  const bookingRef = searchParams.get("bookingRef") || "";
  const passRef = searchParams.get("passRef") || "";
  const amount = searchParams.get("amount") || "1499";
  const payRef = searchParams.get("payRef") || "PAY-DEMO-XXXX";
  const reason = searchParams.get("reason") || "Payment processing failed";
  const balance = searchParams.get("balance") || "0";
  const passId = searchParams.get("passId") || "pass-coastal-discovery";

  if (status === "SUCCESS") {
    return (
      <div className="p-8 rounded-2xl glass-panel space-y-6 border-teal-500/40 shadow-2xl">
        <div className="w-20 h-20 rounded-full bg-teal-500/20 text-teal-400 border border-teal-400 mx-auto flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">Transaction Complete</span>
          <h1 className="text-3xl font-extrabold text-white">Payment Successful!</h1>
          <p className="text-sm text-slate-300">
            Your pass has been created and your digital QR code is ready for use.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-navy-900 border border-teal-500/30 text-left space-y-3 text-xs">
          <div className="flex justify-between text-slate-300">
            <span>Amount Paid</span>
            <span className="font-extrabold text-teal-400 text-sm">₹{Number(amount).toLocaleString("en-IN")}</span>
          </div>
          <div className="flex justify-between text-slate-300">
            <span>Payment Reference</span>
            <span className="font-mono text-white">{payRef}</span>
          </div>
          <div className="flex justify-between text-slate-300">
            <span>Booking Reference</span>
            <span className="font-mono text-white">{bookingRef}</span>
          </div>
          <div className="flex justify-between text-slate-300">
            <span>Pass Reference</span>
            <span className="font-mono text-teal-400 font-bold">{passRef}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-2">
          <Link
            href={`/pass/${passRef}`}
            className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-teal-500 to-teal-400 text-navy-950 font-black text-sm hover:from-teal-400 hover:to-teal-300 transition-all shadow-lg shadow-teal-500/25 flex items-center justify-center gap-2"
          >
            <Ticket className="w-4 h-4" />
            <span>View Digital QR Pass</span>
          </Link>

          <Link
            href={`/booking/${bookingRef}`}
            className="flex-1 py-3.5 rounded-xl bg-navy-800 text-white font-bold text-sm border border-teal-500/30 hover:bg-navy-700 transition-colors flex items-center justify-center gap-2"
          >
            <span>View Booking Details</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 rounded-2xl glass-panel space-y-6 border-red-500/30 shadow-2xl">
      <div className="w-20 h-20 rounded-full bg-red-500/20 text-red-400 border border-red-400 mx-auto flex items-center justify-center">
        <AlertCircle className="w-10 h-10" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-bold text-red-400 uppercase tracking-wider">Transaction Failed</span>
        <h1 className="text-3xl font-extrabold text-white">Payment Unsuccessful</h1>
        <p className="text-sm text-red-300">{reason}</p>
      </div>

      <div className="p-6 rounded-xl bg-navy-900 border border-red-500/20 text-left space-y-3 text-xs">
        <div className="flex justify-between text-slate-300">
          <span>Required Pass Amount</span>
          <span className="font-extrabold text-white">₹{Number(amount).toLocaleString("en-IN")}</span>
        </div>
        <div className="flex justify-between text-slate-300">
          <span>Current Wallet Balance</span>
          <span className="font-bold text-red-400">₹{Number(balance).toLocaleString("en-IN")}</span>
        </div>
        <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-800">
          No confirmed booking was created. Add funds to your demo wallet and retry.
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 pt-2">
        <Link
          href={`/payment/wallet-funding?passId=${passId}`}
          className="flex-1 py-3.5 rounded-xl bg-teal-500 text-navy-950 font-black text-sm hover:bg-teal-400 transition-all shadow-lg shadow-teal-500/25 flex items-center justify-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add More Wallet Funds</span>
        </Link>

        <Link
          href="/checkout"
          className="flex-1 py-3.5 rounded-xl bg-navy-800 text-white font-bold text-sm border border-teal-500/30 hover:bg-navy-700 transition-colors flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Return to Checkout</span>
        </Link>
      </div>
    </div>
  );
}

export default function PaymentResultPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-center">
      <Suspense fallback={<div className="p-8 text-center text-slate-400">Loading payment result...</div>}>
        <PaymentResultContent />
      </Suspense>
    </div>
  );
}

"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, ArrowRight, Wallet, Sparkles } from "lucide-react";

function WalletConfirmContent() {
  const searchParams = useSearchParams();

  const fundedAmount = searchParams.get("fundedAmount") || "5000";
  const newBalance = searchParams.get("newBalance") || "5000";
  const upiId = searchParams.get("upiId") || "demo-tourist@upi";

  return (
    <div className="p-8 rounded-2xl glass-panel space-y-6 border-teal-500/40 shadow-2xl">
      <div className="w-20 h-20 rounded-full bg-teal-500/20 text-teal-400 border border-teal-400 mx-auto flex items-center justify-center">
        <CheckCircle2 className="w-10 h-10" />
      </div>

      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-teal-500/10 text-teal-400 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" /> Wallet Funding Successful
        </div>
        <h1 className="text-3xl font-extrabold text-white">
          ₹{Number(fundedAmount).toLocaleString("en-IN")} Added to Wallet!
        </h1>
        <p className="text-xs text-slate-300">
          Your simulated international card load has been completed.
        </p>
      </div>

      {/* Wallet Details Box */}
      <div className="p-6 rounded-xl bg-navy-900 border border-teal-500/30 space-y-4 text-left max-w-md mx-auto">
        <div className="flex items-center gap-3 border-b border-teal-500/15 pb-4">
          <Wallet className="w-6 h-6 text-teal-400 shrink-0" />
          <div>
            <span className="text-[11px] text-slate-400 block font-medium">Demo UPI ID</span>
            <span className="text-base font-mono font-bold text-teal-400">{upiId}</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400">Current Balance</span>
          <span className="text-2xl font-black text-white">₹{Number(newBalance).toLocaleString("en-IN")}</span>
        </div>

        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400">Wallet Status</span>
          <span className="px-2.5 py-0.5 rounded bg-teal-500/10 text-teal-400 font-bold border border-teal-500/20">
            FUNDED
          </span>
        </div>
      </div>

      <Link
        href={`/payment/authorize?${searchParams.toString()}`}
        className="w-full py-4 rounded-xl bg-gradient-to-r from-teal-500 to-teal-400 text-navy-950 font-black text-sm hover:from-teal-400 hover:to-teal-300 transition-all shadow-lg shadow-teal-500/25 flex items-center justify-center gap-2"
      >
        <span>Continue to Payment Authorisation</span>
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}

export default function WalletConfirmPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-center">
      <Suspense fallback={<div className="p-8 text-center text-slate-400">Loading confirmation...</div>}>
        <WalletConfirmContent />
      </Suspense>
    </div>
  );
}

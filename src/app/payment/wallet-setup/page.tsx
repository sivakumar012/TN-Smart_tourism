"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2, ArrowRight, ShieldCheck, Wallet, Lock } from "lucide-react";
import { demoPaymentProvider } from "@/lib/payment/DemoPaymentProvider";
import { WalletResult } from "@/lib/payment/PaymentProvider";

function WalletSetupContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [wallet, setWallet] = useState<WalletResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function initWallet() {
      try {
        const onboarding = await demoPaymentProvider.initializeOnboarding({
          visitor_type: "INTERNATIONAL",
        });

        const createdWallet = await demoPaymentProvider.createWallet({
          payment_session_id: onboarding.payment_session_id,
        });

        setWallet(createdWallet);
      } catch (err) {
        console.error("Wallet setup error:", err);
      } finally {
        setLoading(false);
      }
    }

    initWallet();
  }, []);

  const handleProceed = () => {
    if (!wallet) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("walletId", wallet.wallet_session_id);
    params.set("upiId", wallet.demo_upi_id);
    router.push(`/payment/wallet-funding?${params.toString()}`);
  };

  return (
    <div className="p-6 sm:p-8 rounded-2xl glass-panel space-y-6">
      <div className="space-y-1">
        <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">Step 3 of 5</span>
        <h1 className="text-2xl font-bold text-white">Demo Wallet Creation</h1>
        <p className="text-xs text-slate-300">
          A temporary demo UPI One World wallet has been created for your session.
        </p>
      </div>

      {loading ? (
        <div className="p-8 text-center text-slate-400 space-y-2">
          <div className="w-8 h-8 rounded-full border-2 border-teal-400 border-t-transparent animate-spin mx-auto" />
          <p className="text-xs">Initializing demo UPI ID...</p>
        </div>
      ) : wallet ? (
        <div className="p-6 rounded-2xl bg-navy-900 border border-teal-500/30 space-y-4">
          <div className="flex items-center gap-3 border-b border-teal-500/15 pb-4">
            <div className="w-12 h-12 rounded-xl bg-teal-500/15 text-teal-400 flex items-center justify-center shrink-0">
              <Wallet className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-400 block font-medium">Assigned Demo UPI ID</span>
              <span className="text-lg font-mono font-bold text-teal-400">{wallet.demo_upi_id}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-slate-400 block">Initial Wallet Balance</span>
              <span className="text-xl font-extrabold text-white">₹{wallet.demo_balance}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Status</span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-teal-500/10 text-teal-400 font-bold mt-1 border border-teal-500/20">
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" /> Ready to fund
              </span>
            </div>
          </div>
        </div>
      ) : null}

      <div className="p-3.5 rounded-xl bg-navy-950 border border-teal-500/20 space-y-2 text-xs text-slate-300">
        <div className="flex items-center gap-2 text-teal-400 font-bold">
          <Lock className="w-4 h-4" /> Security & Trust Rules
        </div>
        <ul className="list-disc list-inside space-y-1 text-slate-400">
          <li>Never collects real UPI PIN.</li>
          <li>Does not connect to real bank infrastructure.</li>
          <li>Valid for pass payments within TN smart tourism demo session.</li>
        </ul>
      </div>

      <button
        onClick={handleProceed}
        disabled={loading || !wallet}
        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-teal-500 to-teal-400 text-navy-950 font-black text-sm hover:from-teal-400 hover:to-teal-300 transition-all shadow-lg shadow-teal-500/25 flex items-center justify-center gap-2 disabled:opacity-50"
      >
        <span>Continue to Add Wallet Funds</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}

export default function WalletSetupPage() {
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
          <span className="w-6 h-6 rounded-full bg-teal-500 text-navy-950 font-bold flex items-center justify-center text-xs">3</span>
          <span>Wallet Setup</span>
        </div>
        <div className="h-px w-8 bg-teal-500/50" />
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-navy-800 text-slate-400 font-bold flex items-center justify-center text-xs border border-teal-500/20">4</span>
          <span className="hidden sm:inline">Add Funds</span>
        </div>
        <div className="h-px w-8 bg-slate-700" />
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-navy-800 text-slate-400 font-bold flex items-center justify-center text-xs border border-teal-500/20">5</span>
          <span className="hidden sm:inline">Pay</span>
        </div>
      </div>

      <Suspense fallback={<div className="p-8 text-center text-slate-400">Loading wallet setup...</div>}>
        <WalletSetupContent />
      </Suspense>
    </div>
  );
}

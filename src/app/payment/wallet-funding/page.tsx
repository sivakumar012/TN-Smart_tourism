"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2, ArrowRight, CreditCard, Lock, ShieldCheck, DollarSign } from "lucide-react";
import { demoPaymentProvider } from "@/lib/payment/DemoPaymentProvider";
import { trackWalletFundingCompleted } from "@/lib/analytics";

function WalletFundingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const walletId = searchParams.get("walletId") || "";
  const upiId = searchParams.get("upiId") || "demo-tourist@upi";

  const [selectedAmount, setSelectedAmount] = useState<number>(5000);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [isCustom, setIsCustom] = useState(false);
  const [loading, setLoading] = useState(false);

  // Demo card input state (placeholders only)
  const [cardNumber] = useState("•••• •••• •••• 4242");
  const [cardHolder] = useState("JOHN DOE");
  const [expiry] = useState("12/28");

  const amountToFund = isCustom ? Number(customAmount) || 1000 : selectedAmount;

  const handleFund = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!walletId) return;

    setLoading(true);

    try {
      const result = await demoPaymentProvider.loadWallet({
        wallet_session_id: walletId,
        amount: amountToFund,
      });

      if (result.success) {
        // Track wallet funding completion
        trackWalletFundingCompleted({
          flow_step: "wallet_funding",
          currency: "INR",
          value: amountToFund,
          visitor_type: "international",
          destination: "Chennai-Mahabalipuram",
        });
        const params = new URLSearchParams(searchParams.toString());
        params.set("fundedAmount", amountToFund.toString());
        params.set("newBalance", result.new_balance.toString());
        router.push(`/payment/wallet-confirm?${params.toString()}`);
      }
    } catch (err) {
      console.error("Wallet funding error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleFund} className="p-6 sm:p-8 rounded-2xl glass-panel space-y-6">
      <div className="space-y-1">
        <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">Step 4 of 5</span>
        <h1 className="text-2xl font-bold text-white">Add Wallet Funds</h1>
        <p className="text-xs text-slate-300">
          Fund your demo UPI wallet ({upiId}) using your international card.
        </p>
      </div>

      {/* Amount Chips */}
      <div className="space-y-3">
        <label className="text-xs font-semibold text-slate-300 block">Select Top-Up Amount (₹)</label>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[1000, 2500, 5000].map((amt) => (
            <button
              type="button"
              key={amt}
              onClick={() => {
                setSelectedAmount(amt);
                setIsCustom(false);
              }}
              className={`py-3 px-4 rounded-xl font-bold text-sm border transition-all ${
                !isCustom && selectedAmount === amt
                  ? "bg-teal-500 text-navy-950 border-teal-400 shadow-md shadow-teal-500/20"
                  : "bg-navy-900 border-teal-500/20 text-slate-300 hover:border-teal-500/40"
              }`}
            >
              ₹{amt.toLocaleString("en-IN")}
            </button>
          ))}

          <button
            type="button"
            onClick={() => setIsCustom(true)}
            className={`py-3 px-4 rounded-xl font-bold text-sm border transition-all ${
              isCustom
                ? "bg-teal-500 text-navy-950 border-teal-400 shadow-md shadow-teal-500/20"
                : "bg-navy-900 border-teal-500/20 text-slate-300 hover:border-teal-500/40"
            }`}
          >
            Custom
          </button>
        </div>

        {isCustom && (
          <div className="pt-2">
            <input
              type="number"
              min="100"
              placeholder="Enter custom amount in ₹"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-navy-900 border border-teal-500/30 text-white text-sm focus:outline-none focus:border-teal-400"
            />
          </div>
        )}
      </div>

      {/* Simulated International Card Input Display */}
      <div className="p-4 rounded-xl bg-navy-900 border border-teal-500/30 space-y-4">
        <div className="flex items-center justify-between border-b border-teal-500/15 pb-3">
          <span className="text-xs font-bold text-white flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-teal-400" /> International Card (Simulated)
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded bg-sand-500/15 text-sand-400 font-bold border border-sand-500/30">
            DEMO SIMULATION
          </span>
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <span className="text-slate-400 block mb-1">Cardholder Name</span>
            <input
              type="text"
              readOnly
              value={cardHolder}
              className="w-full px-3 py-2 rounded-lg bg-navy-950 border border-teal-500/20 text-slate-300 font-mono"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <span className="text-slate-400 block mb-1">Card Number</span>
              <input
                type="text"
                readOnly
                value={cardNumber}
                className="w-full px-3 py-2 rounded-lg bg-navy-950 border border-teal-500/20 text-slate-300 font-mono"
              />
            </div>
            <div>
              <span className="text-slate-400 block mb-1">Expires</span>
              <input
                type="text"
                readOnly
                value={expiry}
                className="w-full px-3 py-2 rounded-lg bg-navy-950 border border-teal-500/20 text-slate-300 font-mono"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="p-3.5 rounded-xl bg-sand-500/10 border border-sand-500/30 text-xs text-sand-400 flex items-center gap-2">
        <Lock className="w-4 h-4 shrink-0" />
        <span>Card details are not collected or stored. This simulation increases your demo UPI balance.</span>
      </div>

      <button
        type="submit"
        disabled={loading || amountToFund <= 0}
        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-teal-500 to-teal-400 text-navy-950 font-black text-sm hover:from-teal-400 hover:to-teal-300 transition-all shadow-lg shadow-teal-500/25 flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {loading ? (
          <div className="w-5 h-5 rounded-full border-2 border-navy-950 border-t-transparent animate-spin" />
        ) : (
          <>
            <span>Load ₹{amountToFund.toLocaleString("en-IN")} into Wallet</span>
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
}

export default function WalletFundingPage() {
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
          <span className="w-6 h-6 rounded-full bg-teal-500 text-navy-950 font-bold flex items-center justify-center text-xs">4</span>
          <span>Add Funds</span>
        </div>
        <div className="h-px w-8 bg-teal-500/50" />
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-navy-800 text-slate-400 font-bold flex items-center justify-center text-xs border border-teal-500/20">5</span>
          <span className="hidden sm:inline">Pay</span>
        </div>
      </div>

      <Suspense fallback={<div className="p-8 text-center text-slate-400">Loading wallet funding...</div>}>
        <WalletFundingContent />
      </Suspense>
    </div>
  );
}

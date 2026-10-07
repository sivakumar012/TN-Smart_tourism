"use client";

import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Camera, CheckCircle2, AlertCircle, ArrowRight, RefreshCw, ShieldCheck } from "lucide-react";
import { VerificationState } from "@/types";
import {
  trackPaymentOnboardingStarted,
  trackVisitorVerificationCompleted,
} from "@/lib/analytics";

function VerifyIdentityContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [verificationState, setVerificationState] = useState<VerificationState>("NOT_STARTED");

  // Track identity verification step started
  useEffect(() => {
    trackPaymentOnboardingStarted({
      flow_step: "identity_verification",
      visitor_type: "international",
      destination: "Chennai-Mahabalipuram",
    });
  }, []);

  const startSimulatedVerification = () => {
    setVerificationState("VERIFYING");
    setTimeout(() => {
      setVerificationState("VERIFIED");
      // Track identity verification completed
      trackVisitorVerificationCompleted({
        flow_step: "identity_verification",
        payment_status: "success",
        visitor_type: "international",
        destination: "Chennai-Mahabalipuram",
      });
    }, 1500);
  };

  const handleNext = () => {
    router.push(`/payment/wallet-setup?${searchParams.toString()}`);
  };

  return (
    <div className="p-6 sm:p-8 rounded-2xl glass-panel space-y-6 text-center">
      <div className="space-y-1">
        <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">Step 2 of 5</span>
        <h1 className="text-2xl font-bold text-white">Identity Verification (Simulated)</h1>
        <p className="text-xs text-slate-300">
          Authorised payment providers verify foreign visitor identity via a simulated face match.
        </p>
      </div>

      {/* Verification Display Area */}
      <div className="p-8 rounded-2xl bg-navy-900 border border-teal-500/30 max-w-sm mx-auto space-y-4">
        {verificationState === "NOT_STARTED" && (
          <div className="space-y-4">
            <div className="w-24 h-24 rounded-full bg-navy-800 border-2 border-dashed border-teal-500/40 mx-auto flex items-center justify-center text-teal-400">
              <Camera className="w-10 h-10" />
            </div>
            <div className="space-y-1">
              <span className="text-sm font-bold text-white block">Ready for Simulation</span>
              <span className="text-xs text-slate-400 block">Tap below to run simulated selfie check.</span>
            </div>
            <button
              onClick={startSimulatedVerification}
              className="px-6 py-2.5 rounded-xl bg-teal-500 text-navy-950 font-bold text-xs hover:bg-teal-400 transition-colors"
            >
              Start Verification Simulation
            </button>
          </div>
        )}

        {verificationState === "VERIFYING" && (
          <div className="space-y-4 py-4">
            <RefreshCw className="w-12 h-12 text-teal-400 animate-spin mx-auto" />
            <div className="space-y-1">
              <span className="text-sm font-bold text-teal-400 block">Verifying Visitor Photo...</span>
              <span className="text-xs text-slate-400 block">Comparing with passport document data...</span>
            </div>
          </div>
        )}

        {verificationState === "VERIFIED" && (
          <div className="space-y-4">
            <div className="w-20 h-20 rounded-full bg-teal-500/20 text-teal-400 border border-teal-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div className="space-y-1">
              <span className="text-base font-extrabold text-white block">Identity Verified!</span>
              <span className="text-xs text-teal-400 font-semibold block">Simulated match confirmed (100%)</span>
            </div>
          </div>
        )}

        {verificationState === "FAILED" && (
          <div className="space-y-4">
            <div className="w-20 h-20 rounded-full bg-red-500/20 text-red-400 border border-red-400 mx-auto flex items-center justify-center">
              <AlertCircle className="w-10 h-10" />
            </div>
            <div className="space-y-1">
              <span className="text-base font-extrabold text-white block">Verification Failed</span>
              <span className="text-xs text-red-400 block">Please retry verification.</span>
            </div>
            <button
              onClick={startSimulatedVerification}
              className="px-4 py-2 rounded-lg bg-navy-800 text-white text-xs font-bold border border-teal-500/30"
            >
              Retry
            </button>
          </div>
        )}
      </div>

      {/* Disclaimer */}
      <div className="p-3.5 rounded-xl bg-sand-500/10 border border-sand-500/30 text-xs text-sand-400 flex items-center justify-center gap-2 max-w-md mx-auto">
        <ShieldCheck className="w-4 h-4 shrink-0" />
        <span>Never collects actual biometric data. This is a simulated identity check.</span>
      </div>

      {/* Action button */}
      {verificationState === "VERIFIED" && (
        <button
          onClick={handleNext}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-teal-500 to-teal-400 text-navy-950 font-black text-sm hover:from-teal-400 hover:to-teal-300 transition-all shadow-lg shadow-teal-500/25 flex items-center justify-center gap-2"
        >
          <span>Proceed to Demo Wallet Setup</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

export default function VerifyIdentityPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Progress Bar */}
      <div className="p-4 rounded-xl glass-panel flex items-center justify-between text-xs font-semibold text-slate-400">
        <div className="flex items-center gap-2 text-teal-400">
          <CheckCircle2 className="w-4 h-4 text-teal-400" />
          <span className="hidden sm:inline">Visitor Info</span>
        </div>
        <div className="h-px w-8 bg-teal-500" />
        <div className="flex items-center gap-2 text-teal-400">
          <span className="w-6 h-6 rounded-full bg-teal-500 text-navy-950 font-bold flex items-center justify-center text-xs">2</span>
          <span>Identity</span>
        </div>
        <div className="h-px w-8 bg-teal-500/50" />
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-navy-800 text-slate-400 font-bold flex items-center justify-center text-xs border border-teal-500/20">3</span>
          <span className="hidden sm:inline">Wallet Setup</span>
        </div>
        <div className="h-px w-8 bg-slate-700" />
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

      <Suspense fallback={<div className="p-8 text-center text-slate-400">Loading identity check...</div>}>
        <VerifyIdentityContent />
      </Suspense>
    </div>
  );
}

"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Globe, ArrowRight, ShieldCheck, CheckCircle2, Lock, Info } from "lucide-react";

function UpiOneWorldContent() {
  const searchParams = useSearchParams();

  return (
    <div className="p-6 sm:p-8 rounded-2xl glass-panel space-y-6 border-teal-500/30">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-semibold">
          <Globe className="w-3.5 h-3.5" /> Authorised PPI Service Boundary
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          UPI One World for International Visitors
        </h1>
        <p className="text-slate-300 text-sm leading-relaxed">
          Welcome! As an international visitor without an Indian bank account, you can establish digital payment access using <strong className="text-teal-400">UPI One World</strong> provided by an authorised prepaid payment instrument (PPI) issuer.
        </p>
      </div>

      {/* 5 Guided Steps Breakdown */}
      <div className="space-y-3 pt-2">
        <h2 className="text-xs font-bold text-teal-400 uppercase tracking-wider">
          Your 5-Step Guided Onboarding:
        </h2>

        <div className="space-y-2 text-sm text-slate-200">
          <div className="p-3 rounded-xl bg-navy-900/80 border border-teal-500/15 flex items-center gap-3">
            <span className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-400 text-xs font-bold flex items-center justify-center shrink-0">1</span>
            <div>
              <span className="font-bold text-white block text-xs">Visitor Verification</span>
              <span className="text-[11px] text-slate-400">Provide basic contact info & travel details (simulated).</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-navy-900/80 border border-teal-500/15 flex items-center gap-3">
            <span className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-400 text-xs font-bold flex items-center justify-center shrink-0">2</span>
            <div>
              <span className="font-bold text-white block text-xs">Identity Verification</span>
              <span className="text-[11px] text-slate-400">Simulated selfie check (no biometrics stored).</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-navy-900/80 border border-teal-500/15 flex items-center gap-3">
            <span className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-400 text-xs font-bold flex items-center justify-center shrink-0">3</span>
            <div>
              <span className="font-bold text-white block text-xs">Demo Wallet Setup</span>
              <span className="text-[11px] text-slate-400">Creation of a temporary demo UPI ID (e.g. demo@upi).</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-navy-900/80 border border-teal-500/15 flex items-center gap-3">
            <span className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-400 text-xs font-bold flex items-center justify-center shrink-0">4</span>
            <div>
              <span className="font-bold text-white block text-xs">Add Wallet Funds</span>
              <span className="text-[11px] text-slate-400">Load funds using your international credit/debit card (simulated).</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-navy-900/80 border border-teal-500/15 flex items-center gap-3">
            <span className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-400 text-xs font-bold flex items-center justify-center shrink-0">5</span>
            <div>
              <span className="font-bold text-white block text-xs">Pay & Receive QR Pass</span>
              <span className="text-[11px] text-slate-400">Authorise pass payment & receive your instant digital QR pass.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimers & Trust Statements */}
      <div className="p-4 rounded-xl bg-navy-950 border border-teal-500/20 space-y-2 text-xs text-slate-300">
        <div className="flex items-center gap-2 text-teal-400 font-bold">
          <ShieldCheck className="w-4 h-4" /> Provider Boundary Statement
        </div>
        <p>
          TN smart tourism does NOT issue a PPI, operate its own wallet, hold customer funds, or store card credentials. Onboarding is conducted via an authorised payment provider abstraction.
        </p>
      </div>

      {/* Action button */}
      <Link
        href={`/payment/verify-visitor?${searchParams.toString()}`}
        className="w-full py-4 rounded-xl bg-gradient-to-r from-teal-500 to-teal-400 text-navy-950 font-black text-sm hover:from-teal-400 hover:to-teal-300 transition-all shadow-lg shadow-teal-500/25 flex items-center justify-center gap-2"
      >
        <span>Start Visitor Onboarding</span>
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}

export default function UpiOneWorldIntroPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Step Progress Bar */}
      <div className="p-4 rounded-xl glass-panel flex items-center justify-between text-xs font-semibold text-slate-400">
        <div className="flex items-center gap-2 text-teal-400">
          <span className="w-6 h-6 rounded-full bg-teal-500 text-navy-950 font-bold flex items-center justify-center text-xs">1</span>
          <span className="hidden sm:inline">Visitor Info</span>
        </div>
        <div className="h-px w-8 bg-slate-700" />
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-navy-800 text-slate-400 font-bold flex items-center justify-center text-xs border border-teal-500/20">2</span>
          <span className="hidden sm:inline">Identity</span>
        </div>
        <div className="h-px w-8 bg-slate-700" />
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

      <Suspense fallback={<div className="p-8 text-center text-slate-400">Loading onboarding...</div>}>
        <UpiOneWorldContent />
      </Suspense>
    </div>
  );
}

"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Globe, ArrowRight, ShieldCheck, FileText, CheckCircle2 } from "lucide-react";

function VerifyVisitorForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [country, setCountry] = useState("United States");
  const [mobile, setMobile] = useState("+1 555-019-2834");
  const [email, setEmail] = useState(searchParams.get("email") || "tourist@example.com");

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    const current = new URLSearchParams(searchParams.toString());
    current.set("country", country);
    current.set("mobile", mobile);
    current.set("email", email);
    router.push(`/payment/verify-identity?${current.toString()}`);
  };

  return (
    <form onSubmit={handleNext} className="p-6 sm:p-8 rounded-2xl glass-panel space-y-6">
      <div className="space-y-1">
        <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">Step 1 of 5</span>
        <h1 className="text-2xl font-bold text-white">Visitor Verification</h1>
        <p className="text-xs text-slate-300">
          Provide visitor details to initialize foreign tourist wallet onboarding.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1">Country of Origin</label>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-navy-900 border border-teal-500/30 text-white text-sm focus:outline-none focus:border-teal-400"
          >
            <option value="United States">United States</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Germany">Germany</option>
            <option value="France">France</option>
            <option value="Japan">Japan</option>
            <option value="Australia">Australia</option>
            <option value="Singapore">Singapore</option>
            <option value="Canada">Canada</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1">Mobile Number (International Format)</label>
          <input
            type="text"
            required
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-navy-900 border border-teal-500/30 text-white text-sm focus:outline-none focus:border-teal-400"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1">Email Address</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-navy-900 border border-teal-500/30 text-white text-sm focus:outline-none focus:border-teal-400"
          />
        </div>

        {/* Document Placeholders */}
        <div className="space-y-3 pt-2">
          <label className="text-xs font-semibold text-slate-300 block">Travel Document Verification (Simulated)</label>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-navy-900 border border-teal-500/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-teal-400" />
                <span className="text-xs font-bold text-white">Passport copy</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-teal-500/20 text-teal-400 font-bold">SIMULATED</span>
            </div>

            <div className="p-3.5 rounded-xl bg-navy-900 border border-teal-500/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-teal-400" />
                <span className="text-xs font-bold text-white">Tourist Visa</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-teal-500/20 text-teal-400 font-bold">SIMULATED</span>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="p-3.5 rounded-xl bg-sand-500/10 border border-sand-500/30 text-xs text-sand-400 flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 shrink-0" />
        <span>Document upload is simulated. TN smart tourism does not collect or store actual passport or visa documents.</span>
      </div>

      <button
        type="submit"
        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-teal-500 to-teal-400 text-navy-950 font-black text-sm hover:from-teal-400 hover:to-teal-300 transition-all shadow-lg shadow-teal-500/25 flex items-center justify-center gap-2"
      >
        <span>Continue to Identity Verification</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </form>
  );
}

export default function VerifyVisitorPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Progress Bar */}
      <div className="p-4 rounded-xl glass-panel flex items-center justify-between text-xs font-semibold text-slate-400">
        <div className="flex items-center gap-2 text-teal-400">
          <span className="w-6 h-6 rounded-full bg-teal-500 text-navy-950 font-bold flex items-center justify-center text-xs">1</span>
          <span>Visitor Info</span>
        </div>
        <div className="h-px w-8 bg-teal-500/50" />
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

      <Suspense fallback={<div className="p-8 text-center text-slate-400">Loading form...</div>}>
        <VerifyVisitorForm />
      </Suspense>
    </div>
  );
}

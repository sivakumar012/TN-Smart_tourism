"use client";

import { useState } from "react";
import { ShieldCheck, Search, CheckCircle2, AlertTriangle, XCircle, Clock, QrCode, RefreshCw } from "lucide-react";
import { validatePassForRedemption, redeemPass, RedemptionValidationResult } from "@/lib/redemption";

export default function OperatorRedeemPage() {
  const [passInput, setPassInput] = useState("");
  const [validation, setValidation] = useState<RedemptionValidationResult | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [redeemed, setRedeemed] = useState(false);

  const handleValidate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setMessage(null);
    setRedeemed(false);

    if (!passInput.trim()) {
      setValidation(null);
      return;
    }

    const res = validatePassForRedemption(passInput);
    setValidation(res);
  };

  const handleRedeem = () => {
    if (!passInput) return;
    const res = redeemPass(passInput);
    if (res.success) {
      setRedeemed(true);
      setMessage("Pass redeemed successfully!");
      // Re-query validation status to instantly reflect REDEEMED status
      setValidation(validatePassForRedemption(passInput));
    } else {
      setMessage(res.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Operator Header */}
      <div className="p-6 rounded-2xl glass-panel space-y-2 border-sand-500/30">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-sand-500/15 text-sand-400 text-xs font-bold">
          <ShieldCheck className="w-4 h-4" /> Operator Gate Portal
        </div>
        <h1 className="text-2xl font-extrabold text-white">Attraction Pass Redemption</h1>
        <p className="text-xs text-slate-300">
          Attraction gate staff interface for validating & redeeming visitor QR passes.
        </p>
      </div>

      {/* Input Box */}
      <form onSubmit={handleValidate} className="p-6 rounded-2xl glass-panel space-y-4">
        <label className="text-xs font-bold text-teal-400 uppercase tracking-wider block">
          Enter Pass Reference or Scan QR Payload:
        </label>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="e.g. PASS-XXXXXXXX or TN-DEMO-PASS-XXXXXXXX"
            value={passInput}
            onChange={(e) => {
              setPassInput(e.target.value);
              setValidation(null);
              setMessage(null);
              setRedeemed(false);
            }}
            className="flex-grow px-4 py-3 rounded-xl bg-navy-900 border border-teal-500/30 text-white font-mono text-sm placeholder-slate-500 focus:outline-none focus:border-teal-400"
          />

          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-teal-500 text-navy-950 font-bold text-xs hover:bg-teal-400 transition-colors shadow-md shadow-teal-500/20 shrink-0"
          >
            Validate
          </button>
        </div>

        {/* Quick Demo Pre-fill Buttons */}
        <div className="flex items-center gap-2 text-xs text-slate-400 pt-2">
          <span>Quick Demo fill:</span>
          <button
            type="button"
            onClick={() => setPassInput("TN-DEMO-PASS-DEMO0001")}
            className="px-2.5 py-1 rounded bg-navy-900 border border-teal-500/20 text-teal-400 hover:bg-navy-800 text-[11px] font-mono"
          >
            Demo Pass
          </button>
        </div>
      </form>

      {/* Validation Result Box */}
      {validation && (
        <div className="p-6 sm:p-8 rounded-2xl glass-panel space-y-6 border-teal-500/40 shadow-xl">
          {/* Result Header Banner */}
          {validation.resultCode === "VALID" && (
            <div className="p-4 rounded-xl bg-teal-500/20 border border-teal-400 text-teal-300 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-8 h-8 text-teal-400 shrink-0" />
                <div>
                  <span className="text-lg font-black text-white block">PASS IS VALID</span>
                  <span className="text-xs text-teal-300">Ready for entry redemption.</span>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-teal-500 text-navy-950 font-black text-xs">
                VALID
              </span>
            </div>
          )}

          {validation.resultCode === "ALREADY_REDEEMED" && (
            <div className="p-4 rounded-xl bg-sand-500/20 border border-sand-500/40 text-sand-300 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-8 h-8 text-sand-400 shrink-0" />
                <div>
                  <span className="text-lg font-black text-white block">ALREADY REDEEMED</span>
                  <span className="text-xs text-sand-300">Duplicate redemption attempt blocked.</span>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-sand-500 text-navy-950 font-black text-xs">
                REDEEMED
              </span>
            </div>
          )}

          {validation.resultCode === "EXPIRED" && (
            <div className="p-4 rounded-xl bg-sand-500/20 border border-sand-500/40 text-sand-300 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Clock className="w-8 h-8 text-sand-400 shrink-0" />
                <div>
                  <span className="text-lg font-black text-white block">PASS EXPIRED</span>
                  <span className="text-xs text-sand-300">Validity period has ended.</span>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-sand-500 text-navy-950 font-black text-xs">
                EXPIRED
              </span>
            </div>
          )}

          {validation.resultCode === "INVALID" && (
            <div className="p-4 rounded-xl bg-red-500/20 border border-red-500/40 text-red-300 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <XCircle className="w-8 h-8 text-red-400 shrink-0" />
                <div>
                  <span className="text-lg font-black text-white block">INVALID PASS</span>
                  <span className="text-xs text-red-300">Pass reference not found in system.</span>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-red-500 text-white font-black text-xs">
                INVALID
              </span>
            </div>
          )}

          {/* Pass Details Breakdown */}
          {validation.digitalPass && (
            <div className="p-4 rounded-xl bg-navy-900 border border-teal-500/20 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-slate-400 block">Pass Package</span>
                  <span className="font-bold text-white text-sm">{validation.passPackageName || "Tourism Pass"}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Traveler</span>
                  <span className="font-bold text-white text-sm">{validation.travelerName || "Guest"}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Pass Ref</span>
                  <span className="font-mono text-teal-400">{validation.digitalPass.pass_reference}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Validity</span>
                  <span className="text-slate-200">
                    {new Date(validation.digitalPass.valid_from).toLocaleDateString("en-IN")} –{" "}
                    {new Date(validation.digitalPass.valid_until).toLocaleDateString("en-IN")}
                  </span>
                </div>
              </div>
            </div>
          )}

          {message && (
            <div className="p-3 rounded-lg bg-teal-500/20 text-teal-300 text-xs font-bold text-center">
              {message}
            </div>
          )}

          {/* Redeem Action Button (Only for VALID passes) */}
          {validation.resultCode === "VALID" && !redeemed && (
            <button
              onClick={handleRedeem}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-teal-500 to-teal-400 text-navy-950 font-black text-base hover:from-teal-400 hover:to-teal-300 transition-all shadow-xl shadow-teal-500/25"
            >
              Redeem Pass Now
            </button>
          )}
        </div>
      )}
    </div>
  );
}

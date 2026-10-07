"use client";

/**
 * ConsentBanner — lightweight analytics consent UI.
 *
 * Shown on first visit when consent state is "pending".
 * Respects GA4 Consent Mode: updates analytics_storage grant/deny
 * without requiring a page reload.
 *
 * Privacy note: This banner is a demonstration implementation for the
 * Tamil Nadu pilot. A production deployment should consult a legal
 * team about jurisdiction-specific consent requirements (e.g. DPDPA,
 * GDPR for international visitors) and use a certified CMP if required.
 */

import { useState, useEffect } from "react";
import { getConsentState, setConsentState, ConsentState } from "@/lib/analytics";
import { BarChart3, X } from "lucide-react";

export function ConsentBanner() {
  const [consent, setConsent] = useState<ConsentState>("pending");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const state = getConsentState();
    setConsent(state);
    setVisible(state === "pending");
  }, []);

  if (!visible) return null;

  const handleGrant = () => {
    setConsentState("granted");
    setConsent("granted");
    setVisible(false);
  };

  const handleDeny = () => {
    setConsentState("denied");
    setConsent("denied");
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-label="Analytics consent"
      aria-live="polite"
      className="fixed bottom-4 left-4 right-4 z-50 max-w-xl mx-auto"
    >
      <div className="p-4 rounded-2xl bg-navy-900/95 backdrop-blur-md border border-teal-500/30 shadow-2xl shadow-navy-950/60 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <BarChart3 className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
          <div className="space-y-0.5 min-w-0">
            <p className="text-xs font-semibold text-white leading-relaxed">
              We use analytics to improve your tourism experience.
            </p>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              No personal details, payment data, or sensitive information are
              ever shared. You can withdraw consent at any time.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
          <button
            onClick={handleDeny}
            className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-navy-800 border border-teal-500/20 hover:border-teal-500/40 hover:text-white transition-colors"
            aria-label="Decline analytics"
          >
            Decline
          </button>
          <button
            onClick={handleGrant}
            className="flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold text-navy-950 bg-teal-500 hover:bg-teal-400 transition-colors shadow-md shadow-teal-500/20"
            aria-label="Accept analytics"
          >
            Accept
          </button>
          <button
            onClick={handleDeny}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-navy-800 transition-colors"
            aria-label="Close consent banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

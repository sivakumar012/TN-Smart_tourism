import Link from "next/link";
import { HelpCircle, Globe, ShieldCheck, ArrowRight, CheckCircle2, Lock } from "lucide-react";

export default function PaymentHelpPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-teal-500/10 text-teal-400 text-xs font-semibold">
          <Globe className="w-3.5 h-3.5" /> International Visitor Guide
        </div>
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
          <HelpCircle className="w-8 h-8 text-teal-400" /> International Tourist Payment FAQ
        </h1>
        <p className="text-slate-300 text-sm">
          Everything foreign tourists need to know about using UPI One World for tourism passes in Tamil Nadu.
        </p>
      </div>

      <div className="space-y-6">
        {/* Q1 */}
        <div className="p-6 rounded-2xl glass-panel space-y-2">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-teal-400" /> What is UPI One World?
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            UPI One World is a payment initiative designed for inbound foreign travelers and NRIs visiting India. It enables visitors to make instant digital UPI payments at merchant locations and tourism sites without requiring an Indian bank account.
          </p>
        </div>

        {/* Q2 */}
        <div className="p-6 rounded-2xl glass-panel space-y-2">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-teal-400" /> How do I fund my wallet?
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            You can load funds into your UPI One World wallet using your international debit or credit card (Visa, Mastercard, etc.) issued in your home country via an authorised PPI payment provider.
          </p>
        </div>

        {/* Q3 */}
        <div className="p-6 rounded-2xl glass-panel space-y-2">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-teal-400" /> Does TN smart tourism hold my money?
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            No. TN smart tourism does NOT operate a wallet, issue PPI instruments, or hold customer funds. All wallet creation, identity verification, and currency loading are handled by authorised payment providers as an external service boundary.
          </p>
        </div>

        {/* Q4 */}
        <div className="p-6 rounded-2xl glass-panel space-y-2">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-teal-400" /> Are my credit card details stored?
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            No card credentials, UPI PINs, or biometric data are stored by TN smart tourism. All interactions in this MVP are simulated by DemoPaymentProvider.
          </p>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-navy-900 to-navy-850 border border-teal-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-base font-bold text-white">Ready to explore?</h3>
          <p className="text-xs text-slate-400">Select a tourism pass to test foreign tourist payment onboarding.</p>
        </div>

        <Link
          href="/passes"
          className="px-6 py-3 rounded-xl bg-teal-500 text-navy-950 font-bold text-xs hover:bg-teal-400 transition-colors shadow-md shadow-teal-500/20"
        >
          Explore Passes Now
        </Link>
      </div>
    </div>
  );
}

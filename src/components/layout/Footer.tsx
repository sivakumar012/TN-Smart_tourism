import Link from "next/link";
import { Shield, Lock, Info, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-navy-950 border-t border-teal-500/20 py-12 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Trust Badges Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-xl bg-navy-900/60 border border-teal-500/15">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-teal-400 shrink-0" />
            <span className="text-xs text-slate-300">
              Payment handled by an authorised payment provider.
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Lock className="w-5 h-5 text-teal-400 shrink-0" />
            <span className="text-xs text-slate-300">
              TN smart tourism does not store your card details or UPI PINs.
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Info className="w-5 h-5 text-sand-400 shrink-0" />
            <span className="text-xs text-sand-400 font-medium">
              Demo simulation — no real payment is processed.
            </span>
          </div>
        </div>

        {/* Footer Navigation & Brand Info */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-4">
          <div className="space-y-1 text-center md:text-left">
            <div className="text-white font-bold text-base flex items-center gap-2 justify-center md:justify-start">
              <span>TN smart tourism</span>
              <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20">
                <MapPin className="w-3 h-3" /> Chennai–Mahabalipuram Pilot
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Explore smarter. Experience more. Digital tourism platform.
            </p>
          </div>

          <div className="flex items-center gap-6 text-xs text-slate-300">
            <Link href="/explore" className="hover:text-teal-400 transition-colors">
              Attractions
            </Link>
            <Link href="/passes" className="hover:text-teal-400 transition-colors">
              Pass Packages
            </Link>
            <Link href="/payment-help" className="hover:text-teal-400 transition-colors">
              International Tourist Help
            </Link>
            <Link href="/redeem" className="hover:text-sand-400 transition-colors">
              Operator Portal
            </Link>
            <Link href="/admin" className="hover:text-teal-400 transition-colors">
              Admin Metrics
            </Link>
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div className="border-t border-slate-800 pt-6 text-center text-xs text-slate-500 space-y-1">
          <p>
            © {new Date().getFullYear()} TN smart tourism — Built for pilot validation.
          </p>
          <p className="text-[11px] text-slate-600">
            Does not claim RBI approval, NPCI partnership, or official ticket inventory. Future production integration requires validation with an authorised UPI One World / PPI provider.
          </p>
        </div>
      </div>
    </footer>
  );
}

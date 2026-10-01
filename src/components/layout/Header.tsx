"use client";

import Link from "next/link";
import { Compass, Ticket, QrCode, ShieldCheck, LayoutDashboard, MapPin } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-navy-900/90 backdrop-blur-md border-b border-teal-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand & Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-teal-400 p-0.5 shadow-lg shadow-teal-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-navy-900 rounded-[10px] flex items-center justify-center">
                <Compass className="w-6 h-6 text-teal-400" />
              </div>
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white block">
                TN smart tourism
              </span>
              <span className="text-xs text-teal-400/80 font-medium tracking-wide hidden sm:block">
                Explore smarter. Experience more.
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <Link
              href="/explore"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-slate-200 hover:text-teal-400 hover:bg-navy-800/60 transition-colors"
            >
              <Compass className="w-4 h-4 text-teal-400" />
              <span className="hidden md:inline">Explore</span>
            </Link>

            <Link
              href="/passes"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-slate-200 hover:text-teal-400 hover:bg-navy-800/60 transition-colors"
            >
              <Ticket className="w-4 h-4 text-teal-400" />
              <span>Passes</span>
            </Link>

            <Link
              href="/my-passes"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-slate-200 hover:text-teal-400 hover:bg-navy-800/60 transition-colors"
            >
              <QrCode className="w-4 h-4 text-teal-400" />
              <span className="hidden sm:inline">My Passes</span>
            </Link>

            <div className="h-6 w-px bg-teal-500/20 mx-1 hidden sm:block" />

            <Link
              href="/redeem"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-sand-500/10 text-sand-400 border border-sand-500/30 hover:bg-sand-500/20 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Operator</span>
            </Link>

            <Link
              href="/admin"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-navy-800 text-teal-400 border border-teal-500/30 hover:bg-navy-700 transition-colors hidden sm:flex"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Admin</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

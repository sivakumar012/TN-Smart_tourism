"use client";

import Link from "next/link";
import { useState } from "react";
import { Compass, Ticket, QrCode, ShieldCheck, LayoutDashboard, Globe, Sparkles } from "lucide-react";

export function Header() {
  const [lang, setLang] = useState<"en" | "ta">("en");

  return (
    <header className="sticky top-0 z-50 bg-navy-900/90 backdrop-blur-md border-b border-teal-500/20 shadow-lg shadow-navy-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand & Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center gap-3">
              <img
                src="/images/logo.png"
                alt="SMART TN TOURISM"
                className="h-9 sm:h-11 w-auto object-contain drop-shadow-lg group-hover:scale-105 transition-all duration-300 rounded-lg"
              />
              <div className="hidden md:flex flex-col">
                <span className="hidden lg:inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-500/15 text-teal-300 border border-teal-500/30 w-max">
                  <Sparkles className="w-2.5 h-2.5" /> PROTOTYPE
                </span>
                <span className="text-[11px] text-slate-400 font-medium tracking-wide">
                  {lang === "en" ? "Explore smarter. Experience more." : "எளிதாகப் பயணம் செய்யுங்கள்"}
                </span>
              </div>
            </div>
          </Link>

          {/* Navigation Links & UX Controls */}
          <nav className="flex items-center gap-1.5 sm:gap-3">
            {/* Language Toggle Button (Inspired by Stitch Prototype) */}
            <button
              onClick={() => setLang(lang === "en" ? "ta" : "en")}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-navy-800/80 text-teal-300 border border-teal-500/30 hover:bg-navy-700 hover:border-teal-500/50 transition-all cursor-pointer"
              title="Toggle Language / மொழியை மாற்று"
            >
              <Globe className="w-3.5 h-3.5 text-teal-400" />
              <span className="font-bold">{lang === "en" ? "தமிழ்" : "English"}</span>
            </button>

            <div className="h-5 w-px bg-teal-500/20" />

            <Link
              href="/explore"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-slate-200 hover:text-teal-400 hover:bg-navy-800/60 transition-colors"
            >
              <Compass className="w-4 h-4 text-teal-400" />
              <span className="hidden md:inline">{lang === "en" ? "Explore" : "சுற்றுலா"}</span>
            </Link>

            <Link
              href="/passes"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-slate-200 hover:text-teal-400 hover:bg-navy-800/60 transition-colors"
            >
              <Ticket className="w-4 h-4 text-teal-400" />
              <span>{lang === "en" ? "Passes" : "பாஸ்கள்"}</span>
            </Link>

            <Link
              href="/my-passes"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-slate-200 hover:text-teal-400 hover:bg-navy-800/60 transition-colors"
            >
              <QrCode className="w-4 h-4 text-teal-400" />
              <span className="hidden sm:inline">{lang === "en" ? "My Passes" : "எனது பாஸ்"}</span>
            </Link>

            <div className="h-5 w-px bg-teal-500/20 hidden sm:block" />

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

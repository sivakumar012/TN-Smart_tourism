import Link from "next/link";
import { Compass, Sparkles, MapPin, ArrowRight, ShieldCheck, Ticket, Landmark, Palmtree, Waves, Camera, Clock } from "lucide-react";
import { SEED_ATTRACTIONS, SEED_PASS_PACKAGES } from "@/data/seed";

export default function HomePage() {
  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-navy-900 via-navy-800 to-navy-950 pt-12 pb-20 border-b border-teal-500/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-teal-500/10 via-transparent to-transparent opacity-70" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5" /> TN smart tourism — Pilot Destinations
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Discover Tamil Nadu <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-300">your way.</span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed font-normal">
              Explore heritage monuments, coastal sights, and wellness circuits across Tamil Nadu's pilot corridors with instant digital QR pass access.
            </p>

            {/* Destination Corridor Selector List */}
            <div className="space-y-3 max-w-xl">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">Select Tourism Corridor</span>
              
              {/* Active Corridor Card */}
              <div className="p-4 rounded-xl bg-navy-900/90 border border-teal-500/40 flex items-center justify-between gap-4 shadow-xl hover:border-teal-500/60 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-teal-500/15 flex items-center justify-center text-teal-400 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-medium block">Pilot Destination 01</span>
                    <span className="text-sm font-bold text-white">Chennai → Mahabalipuram Corridor</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-semibold text-teal-400 bg-teal-500/10 px-3 py-1.5 rounded-md border border-teal-500/30 shrink-0">
                  <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                  <span>Active Corridor</span>
                </div>
              </div>

              {/* Upcoming Corridor Card: Coimbatore */}
              <div className="p-4 rounded-xl bg-navy-900/50 border border-amber-500/30 flex items-center justify-between gap-4 shadow-md opacity-90 hover:opacity-100 transition-opacity">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/15 flex items-center justify-center text-amber-400 shrink-0">
                    <Landmark className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-amber-400/80 font-medium block">Pilot Destination 02</span>
                    <span className="text-sm font-bold text-slate-200">Coimbatore - Heritage Corridor</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-300 bg-amber-500/10 px-3 py-1.5 rounded-md border border-amber-500/30 shrink-0">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Yet to go Live</span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-3">
              <Link
                href="/passes"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-base bg-gradient-to-r from-teal-500 to-teal-400 text-navy-950 hover:from-teal-400 hover:to-teal-300 transition-all shadow-lg shadow-teal-500/25 group"
              >
                <span>Explore passes</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/explore"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-base bg-navy-800 text-white border border-teal-500/30 hover:bg-navy-700 hover:border-teal-500/50 transition-all"
              >
                <Compass className="w-5 h-5 text-teal-400" />
                <span>Plan my visit</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Foreign Tourist Payment Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-navy-900 via-navy-800 to-navy-900 border border-teal-500/30 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="grid md:grid-cols-3 gap-6 items-center relative z-10">
            <div className="md:col-span-2 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-sand-500/15 border border-sand-500/30 text-sand-400 text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" /> Core International Tourist Solution
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Visiting from abroad without an Indian bank account?
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                TN smart tourism supports foreign tourists with <strong className="text-teal-400">UPI One World</strong> integration. Use your international credit/debit card to fund a temporary wallet and pay for tourism passes smoothly.
              </p>
            </div>
            <div className="flex flex-col gap-3 justify-center items-stretch md:items-end">
              <Link
                href="/passes"
                className="px-5 py-3 rounded-xl bg-teal-500 text-navy-950 font-bold text-sm text-center hover:bg-teal-400 transition-colors shadow-lg shadow-teal-500/20"
              >
                Get Started with UPI One World
              </Link>
              <Link
                href="/payment-help"
                className="text-xs text-teal-400 hover:underline text-center md:text-right font-medium"
              >
                How international onboarding works →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Prototype Passes */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Featured Tourism Passes</h2>
            <p className="text-slate-400 text-sm">Select a bundled pass package for the Chennai–Mahabalipuram corridor.</p>
          </div>
          <Link href="/passes" className="text-sm font-semibold text-teal-400 hover:text-teal-300 flex items-center gap-1">
            View all pass packages <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {SEED_PASS_PACKAGES.map((pkg) => (
            <div key={pkg.id} className="p-6 rounded-2xl glass-panel glass-panel-hover flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-sand-500/15 border border-sand-500/30 text-sand-400 text-xs font-semibold">
                    Prototype package
                  </span>
                  <span className="text-xs text-slate-400 font-medium">{pkg.validity_days} days validity</span>
                </div>
                <h3 className="text-xl font-bold text-white">{pkg.name}</h3>
                <p className="text-sm text-slate-300">{pkg.description}</p>
                <div className="space-y-1.5 pt-2">
                  <span className="text-xs font-semibold text-teal-400 uppercase tracking-wider block">Key Benefits:</span>
                  <ul className="text-xs text-slate-300 space-y-1">
                    {pkg.benefits.map((b, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-400 shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-teal-500/15 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block">Demo Price</span>
                  <span className="text-2xl font-extrabold text-teal-400">₹{pkg.demo_price.toLocaleString("en-IN")}</span>
                </div>
                <Link
                  href={`/passes/${pkg.id}`}
                  className="px-5 py-2.5 rounded-xl bg-teal-500 text-navy-950 font-bold text-sm hover:bg-teal-400 transition-colors shadow-md shadow-teal-500/20"
                >
                  View Pass Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Attractions Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Attractions in the Pilot Corridor</h2>
            <p className="text-slate-400 text-sm">Discover participating heritage, cultural, and coastal destinations.</p>
          </div>
          <Link href="/explore" className="text-sm font-semibold text-teal-400 hover:text-teal-300 flex items-center gap-1">
            Explore all attractions <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SEED_ATTRACTIONS.slice(0, 6).map((attr) => (
            <Link
              key={attr.id}
              href={`/attraction/${attr.id}`}
              className="group rounded-xl overflow-hidden glass-panel glass-panel-hover flex flex-col justify-between"
            >
              <div className="relative h-48 w-full overflow-hidden bg-navy-800">
                <img
                  src={attr.image}
                  alt={attr.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-navy-950/80 backdrop-blur-md text-xs font-semibold text-teal-400 border border-teal-500/30">
                  {attr.category}
                </div>
              </div>

              <div className="p-4 space-y-2 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-teal-400 transition-colors">
                    {attr.name}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-slate-400 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                    <span>{attr.location}</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-2 line-clamp-2">
                    {attr.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-teal-500/15 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Demo value</span>
                  <span className="font-bold text-teal-400">₹{attr.demo_price}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

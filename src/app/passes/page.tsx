import Link from "next/link";
import { Ticket, ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import { db } from "@/lib/db";

export default function PassesPage() {
  const passes = db.getPassPackages();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sand-500/15 border border-sand-500/30 text-sand-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" /> Curated Tourism Packages
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white flex items-center gap-3">
          <Ticket className="w-8 h-8 text-teal-400" /> Select Your Tourism Pass
        </h1>
        <p className="text-slate-300 text-base">
          Choose a bundled tourism pass for the Chennai–Mahabalipuram & Coimbatore pilot corridors. Includes multiple attraction entry and instant QR activation.
        </p>
      </div>

      {/* Pass Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {passes.map((pkg) => {
          const inclusions = db.getPassInclusions(pkg.id);
          return (
            <div
              key={pkg.id}
              className="rounded-2xl glass-panel glass-panel-hover p-6 sm:p-8 flex flex-col justify-between space-y-6 relative overflow-hidden"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-md bg-sand-500/15 border border-sand-500/30 text-sand-400 text-xs font-bold uppercase tracking-wider">
                    Pass package
                  </span>
                  <span className="text-xs font-semibold text-teal-400 bg-teal-500/10 px-2.5 py-1 rounded-md border border-teal-500/20">
                    {pkg.validity_days} Days Validity
                  </span>
                </div>

                <div className="space-y-1">
                  <h2 className="text-2xl font-extrabold text-white">{pkg.name}</h2>
                  <p className="text-sm text-slate-300">{pkg.description}</p>
                </div>

                {/* Included Attractions List */}
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-bold text-teal-400 uppercase tracking-wider block">
                    Included Attractions ({inclusions.length}):
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {inclusions.map((attr) => (
                      <div
                        key={attr.id}
                        className="flex items-center gap-2 p-2 rounded-lg bg-navy-900/80 border border-teal-500/15 text-xs text-slate-200"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                        <span className="truncate">{attr.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Benefits */}
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-bold text-teal-400 uppercase tracking-wider block">
                    Pass Benefits:
                  </span>
                  <ul className="text-xs text-slate-300 space-y-1.5">
                    {pkg.benefits.map((b, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-400 shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Price & Action */}
              <div className="pt-6 border-t border-teal-500/15 flex items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-slate-400 block">Demo Price</span>
                  <span className="text-3xl font-black text-teal-400">
                    ₹{pkg.demo_price.toLocaleString("en-IN")}
                  </span>
                </div>

                <Link
                  href={`/passes/${pkg.id}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-teal-400 text-navy-950 font-bold text-sm hover:from-teal-400 hover:to-teal-300 transition-all shadow-lg shadow-teal-500/20"
                >
                  <span>View Pass Details</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Trust Notice */}
      <div className="p-4 rounded-xl bg-navy-900/60 border border-teal-500/15 flex items-center gap-3 text-xs text-slate-300">
        <ShieldCheck className="w-5 h-5 text-teal-400 shrink-0" />
        <span>
          TN smart tourism bundled passes provide multi-attraction access. Select any pass to experience checkout and foreign tourist UPI One World payment onboarding.
        </span>
      </div>
    </div>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import { Ticket, ArrowLeft, CheckCircle2, ShieldCheck, Clock, MapPin, Sparkles } from "lucide-react";
import { db } from "@/lib/db";

interface PageProps {
  params: {
    id: string;
  };
}

export default function PassDetailPage({ params }: PageProps) {
  const pkg = db.getPassPackageById(params.id);

  if (!pkg) {
    notFound();
  }

  const inclusions = db.getPassInclusions(pkg.id);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back Button */}
      <Link
        href="/passes"
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-teal-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to pass selection
      </Link>

      {/* Main Pass Container */}
      <div className="rounded-2xl glass-panel p-6 sm:p-10 space-y-8 border-teal-500/30 shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="space-y-4 border-b border-teal-500/15 pb-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="px-3.5 py-1 rounded-md bg-sand-500/15 border border-sand-500/30 text-sand-400 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Pass package
            </span>
            <span className="text-xs font-semibold text-teal-400 bg-teal-500/10 px-3 py-1 rounded-md border border-teal-500/20 inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> {pkg.validity_days} Days Validity from activation
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-white">{pkg.name}</h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">{pkg.description}</p>
        </div>

        {/* Included Attractions Grid */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-teal-400 uppercase tracking-wider flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> Included Attractions ({inclusions.length})
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            {inclusions.map((attr) => (
              <div
                key={attr.id}
                className="p-4 rounded-xl bg-navy-900/90 border border-teal-500/20 flex gap-3 items-start"
              >
                <img
                  src={attr.image}
                  alt={attr.name}
                  className="w-16 h-16 rounded-lg object-cover shrink-0 bg-navy-800"
                />
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-white">{attr.name}</h3>
                  <div className="flex items-center gap-1 text-[11px] text-slate-400">
                    <MapPin className="w-3 h-3 text-teal-400 shrink-0" />
                    <span>{attr.location}</span>
                  </div>
                  <span className="text-[10px] text-teal-400 font-medium block">
                    Category: {attr.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Package Benefits */}
        <div className="space-y-3 pt-2">
          <h2 className="text-sm font-bold text-teal-400 uppercase tracking-wider">
            Stated Package Benefits
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {pkg.benefits.map((b, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-sm text-slate-200">
                <span className="w-2 h-2 rounded-full bg-teal-400 shrink-0" />
                <span>{b}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action & Checkout Box */}
        <div className="p-6 rounded-xl bg-gradient-to-r from-navy-900 to-navy-850 border border-teal-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-xs text-slate-400 block">Total Demo Price</span>
            <div className="text-3xl font-black text-teal-400">
              ₹{pkg.demo_price.toLocaleString("en-IN")}
            </div>
            <span className="text-[11px] text-slate-500 block">
              Inclusive of all attractions & instant QR generation
            </span>
          </div>

          <Link
            href={`/checkout?passId=${pkg.id}`}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-teal-500 to-teal-400 text-navy-950 font-black text-base hover:from-teal-400 hover:to-teal-300 transition-all shadow-xl shadow-teal-500/25 text-center"
          >
            Select this pass
          </Link>
        </div>
      </div>
    </div>
  );
}

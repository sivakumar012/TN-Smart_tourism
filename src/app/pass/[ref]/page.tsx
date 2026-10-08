import Link from "next/link";
import { notFound } from "next/navigation";
import QRCode from "react-qr-code";
import { Ticket, MapPin, Clock, ShieldCheck, ArrowLeft, CheckCircle2, AlertTriangle } from "lucide-react";
import { db } from "@/lib/db";
import { DigitalPassAnalytics } from "@/components/analytics/DigitalPassAnalytics";

export const runtime = "edge";

interface PageProps {
  params: {
    ref: string;
  };
}

export default function DigitalPassPage({ params }: PageProps) {
  const pass = db.getDigitalPassByRef(params.ref);

  if (!pass) {
    notFound();
  }

  const booking = db.getBookingByRef(
    db.getBookings().find((b) => b.id === pass.booking_id)?.booking_reference || ""
  ) || db.getBookings().find((b) => b.id === pass.booking_id);

  const passPackage = booking ? db.getPassPackageById(booking.pass_id) : null;
  const inclusions = booking ? db.getPassInclusions(booking.pass_id) : [];

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Analytics: view_digital_pass event */}
      <DigitalPassAnalytics passId={booking?.pass_id} passName={passPackage?.name} />
      {/* Back Button */}
      <Link
        href="/my-passes"
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-teal-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to My Passes
      </Link>

      {/* Main Ticket Container */}
      <div className="rounded-3xl glass-panel p-6 sm:p-8 space-y-6 border-teal-500/40 shadow-2xl relative overflow-hidden">
        {/* Ticket Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-teal-500/20 pb-4">
          <div>
            <span className="text-[11px] font-mono text-teal-400 font-bold uppercase tracking-wider block">
              Pass Reference
            </span>
            <span className="text-xl font-mono font-extrabold text-white">{pass.pass_reference}</span>
          </div>

          <div>
            {pass.status === "VALID" && (
              <span className="px-3 py-1 rounded-full bg-teal-500/15 text-teal-400 text-xs font-bold border border-teal-500/30 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" /> VALID PASS
              </span>
            )}
            {pass.status === "REDEEMED" && (
              <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-400 text-xs font-bold border border-slate-700 flex items-center gap-1.5">
                REDEEMED
              </span>
            )}
            {pass.status === "EXPIRED" && (
              <span className="px-3 py-1 rounded-full bg-sand-500/15 text-sand-400 text-xs font-bold border border-sand-500/30 flex items-center gap-1.5">
                EXPIRED
              </span>
            )}
          </div>
        </div>

        {/* Pass Package Title & Validity */}
        <div className="space-y-1 text-center">
          <h1 className="text-2xl sm:text-3xl font-black text-white">{passPackage?.name || "Tourism Pass"}</h1>
          <p className="text-xs text-slate-300 flex items-center justify-center gap-2">
            <Clock className="w-3.5 h-3.5 text-teal-400" />
            <span>
              Valid from {new Date(pass.valid_from).toLocaleDateString("en-IN")} until{" "}
              {new Date(pass.valid_until).toLocaleDateString("en-IN")}
            </span>
          </p>
        </div>

        {/* QR Code Inset Box */}
        <div className="p-6 rounded-2xl bg-white text-navy-950 flex flex-col items-center justify-center space-y-4 max-w-xs mx-auto shadow-2xl">
          <div className="p-2 bg-white rounded-xl">
            <QRCode
              value={pass.qr_token}
              size={200}
            />
          </div>

          <div className="text-center space-y-0.5">
            <span className="text-[11px] font-mono font-bold text-navy-900 block">
              {pass.qr_token}
            </span>
            <span className="text-[10px] text-slate-500 block">
              Scan at monument gate for entry
            </span>
          </div>
        </div>

        {/* Inclusions List */}
        <div className="space-y-3 pt-2">
          <span className="text-xs font-bold text-teal-400 uppercase tracking-wider block">
            Included Monuments & Attractions:
          </span>

          <div className="grid sm:grid-cols-2 gap-2">
            {inclusions.map((attr) => (
              <div
                key={attr.id}
                className="p-2.5 rounded-xl bg-navy-900 border border-teal-500/15 flex items-center gap-2 text-xs text-slate-200"
              >
                <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span className="truncate">{attr.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Prototype Pass Disclaimer */}
        <div className="p-3.5 rounded-xl bg-sand-500/10 border border-sand-500/30 text-xs text-sand-400 flex items-center justify-center gap-2 text-center">
          <AlertTriangle className="w-4 h-4 shrink-0 text-sand-400" />
          <span className="font-semibold">Digital tourism pass — pilot admission credential.</span>
        </div>
      </div>
    </div>
  );
}

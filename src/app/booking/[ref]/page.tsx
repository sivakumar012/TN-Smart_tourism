import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, Ticket, MapPin, ArrowRight, User, Mail, ShieldCheck } from "lucide-react";
import { db } from "@/lib/db";

export const runtime = "edge";

interface PageProps {
  params: {
    ref: string;
  };
}

export default function BookingDetailPage({ params }: PageProps) {
  const booking = db.getBookingByRef(params.ref);

  if (!booking) {
    notFound();
  }

  const passPackage = db.getPassPackageById(booking.pass_id);
  const digitalPass = db.getDigitalPassByBookingId(booking.id);
  const inclusions = db.getPassInclusions(booking.pass_id);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Success Badge */}
      <div className="p-6 sm:p-8 rounded-2xl glass-panel text-center space-y-4 border-teal-500/40">
        <div className="w-16 h-16 rounded-full bg-teal-500/20 text-teal-400 border border-teal-400 mx-auto flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="space-y-1">
          <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">Booking Status: {booking.booking_status}</span>
          <h1 className="text-3xl font-extrabold text-white">Booking Confirmed!</h1>
          <p className="text-xs text-slate-300">
            Booking Reference: <span className="font-mono text-teal-400 font-bold">{booking.booking_reference}</span>
          </p>
        </div>
      </div>

      {/* Booking Details Grid */}
      <div className="p-6 sm:p-8 rounded-2xl glass-panel space-y-6">
        <h2 className="text-lg font-bold text-white border-b border-teal-500/15 pb-3">
          Booking Overview
        </h2>

        <div className="grid sm:grid-cols-2 gap-6 text-xs">
          <div className="space-y-3">
            <div>
              <span className="text-slate-400 block">Traveler Name</span>
              <span className="font-bold text-white text-sm">{booking.traveler_name}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Traveler Email</span>
              <span className="font-bold text-white">{booking.traveler_email}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Visitor Category</span>
              <span className="px-2 py-0.5 rounded bg-teal-500/10 text-teal-400 font-bold border border-teal-500/20">
                {booking.visitor_type}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <span className="text-slate-400 block">Pass Package</span>
              <span className="font-bold text-white text-sm">{passPackage?.name || "Tourism Pass"}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Quantity & Amount</span>
              <span className="font-bold text-white">{booking.quantity} Pass(es) · ₹{booking.total_amount.toLocaleString("en-IN")}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Payment Reference</span>
              <span className="font-mono text-teal-400">{booking.payment_reference}</span>
            </div>
          </div>
        </div>

        {/* Included Attractions */}
        <div className="space-y-3 pt-4 border-t border-teal-500/15">
          <span className="text-xs font-bold text-teal-400 uppercase tracking-wider block">
            Included Monuments & Sites ({inclusions.length}):
          </span>
          <div className="grid sm:grid-cols-2 gap-2">
            {inclusions.map((attr) => (
              <div key={attr.id} className="p-2.5 rounded-xl bg-navy-900 border border-teal-500/15 flex items-center gap-2 text-xs text-slate-200">
                <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span className="truncate">{attr.name} ({attr.location})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Link to Digital Pass */}
        {digitalPass && (
          <div className="pt-4">
            <Link
              href={`/pass/${digitalPass.pass_reference}`}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-teal-500 to-teal-400 text-navy-950 font-black text-sm hover:from-teal-400 hover:to-teal-300 transition-all shadow-lg shadow-teal-500/25 flex items-center justify-center gap-2"
            >
              <Ticket className="w-5 h-5" />
              <span>Open Digital QR Pass ({digitalPass.pass_reference})</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

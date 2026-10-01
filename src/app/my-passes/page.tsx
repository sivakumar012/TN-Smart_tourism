"use client";

import Link from "next/link";
import { QrCode, Ticket, ArrowRight, CheckCircle2, Clock, ShieldAlert } from "lucide-react";
import { db } from "@/lib/db";

export default function MyPassesPage() {
  const passes = db.getDigitalPasses();
  const bookings = db.getBookings();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
          <QrCode className="w-8 h-8 text-teal-400" /> My Digital Passes
        </h1>
        <p className="text-slate-300 text-sm">
          Access your digital QR passes for monument & attraction entry in the pilot corridor.
        </p>
      </div>

      {passes.length === 0 ? (
        <div className="p-12 text-center rounded-2xl glass-panel space-y-4">
          <Ticket className="w-12 h-12 text-slate-500 mx-auto" />
          <h2 className="text-lg font-bold text-white">No passes found</h2>
          <p className="text-sm text-slate-400">
            You have not purchased any tourism passes in this session yet.
          </p>
          <Link
            href="/passes"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-500 text-navy-950 font-bold text-xs hover:bg-teal-400 transition-colors shadow-md shadow-teal-500/20"
          >
            <span>Explore Tourism Passes</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {passes.map((pass) => {
            const booking = bookings.find((b) => b.id === pass.booking_id);
            const passPackage = booking ? db.getPassPackageById(booking.pass_id) : null;

            return (
              <div
                key={pass.id}
                className="p-6 rounded-2xl glass-panel glass-panel-hover flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-teal-500/30"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {pass.status === "VALID" && (
                      <span className="px-2.5 py-0.5 rounded-full bg-teal-500/15 text-teal-400 text-xs font-bold border border-teal-500/30 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" /> VALID
                      </span>
                    )}
                    {pass.status === "REDEEMED" && (
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 text-xs font-bold border border-slate-700">
                        REDEEMED
                      </span>
                    )}
                    {pass.status === "EXPIRED" && (
                      <span className="px-2.5 py-0.5 rounded-full bg-sand-500/15 text-sand-400 text-xs font-bold border border-sand-500/30">
                        EXPIRED
                      </span>
                    )}

                    <span className="text-xs font-mono text-slate-400">{pass.pass_reference}</span>
                  </div>

                  <h2 className="text-xl font-bold text-white">{passPackage?.name || "Tourism Pass"}</h2>

                  <div className="flex items-center gap-3 text-xs text-slate-300">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-teal-400" />
                      Valid until {new Date(pass.valid_until).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                    {booking && (
                      <span className="text-slate-400">Ref: {booking.booking_reference}</span>
                    )}
                  </div>
                </div>

                <Link
                  href={`/pass/${pass.pass_reference}`}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-teal-400 text-navy-950 font-bold text-xs hover:from-teal-400 hover:to-teal-300 transition-all text-center flex items-center justify-center gap-2"
                >
                  <QrCode className="w-4 h-4" />
                  <span>Open QR Pass</span>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

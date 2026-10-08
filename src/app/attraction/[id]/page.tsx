"use client";

export const runtime = "edge";

/**
 * AttractionDetailPage — instruments view_item on mount.
 * Converting from a Server Component to a Client Component solely for analytics.
 * No UI changes.
 */

import { useEffect } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Ticket, ArrowLeft, Info, CheckCircle2 } from "lucide-react";
import { db } from "@/lib/db";
import { trackViewItem } from "@/lib/analytics";
import { useParams } from "next/navigation";

export default function AttractionDetailPage() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : "";
  const attraction = db.getAttractionById(id);

  useEffect(() => {
    if (!attraction) return;
    trackViewItem({
      attraction_id: attraction.id,
      destination: "Chennai-Mahabalipuram",
      item: {
        item_id: attraction.id,
        item_name: attraction.name,
        item_category: attraction.category,
        price: attraction.demo_price,
        currency: "INR",
      },
    });
  }, [attraction]);

  if (!attraction) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back Button */}
      <Link
        href="/explore"
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-teal-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to attractions
      </Link>

      {/* Hero Banner */}
      <div className="rounded-2xl overflow-hidden glass-panel space-y-6">
        <div className="relative h-72 sm:h-96 w-full bg-navy-800">
          <img
            src={attraction.image}
            alt={attraction.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 px-3 py-1 rounded-lg bg-navy-950/80 backdrop-blur-md text-xs font-bold text-teal-400 border border-teal-500/30">
            {attraction.category}
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
              {attraction.name}
            </h1>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <MapPin className="w-4 h-4 text-teal-400 shrink-0" />
              <span>{attraction.location}</span>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-sm font-semibold text-teal-400 uppercase tracking-wider">
              About this destination
            </h2>
            <p className="text-slate-200 text-base leading-relaxed">
              {attraction.description}
            </p>
          </div>

          {/* Pricing & Prototype notice */}
          <div className="p-4 rounded-xl bg-navy-900 border border-teal-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs text-slate-400 block">Single Admission Demo Value</span>
              <span className="text-2xl font-extrabold text-teal-400">₹{attraction.demo_price}</span>
              <span className="text-[11px] text-slate-500 block mt-0.5">
                Bundled access available via tourism passes
              </span>
            </div>

            <Link
              href="/passes"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-teal-400 text-navy-950 font-bold text-sm hover:from-teal-400 hover:to-teal-300 transition-all shadow-md shadow-teal-500/20"
            >
              <Ticket className="w-4 h-4" />
              <span>View Bundled Passes</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

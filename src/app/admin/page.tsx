"use client";

import { useEffect, useState } from "react";
import { LayoutDashboard, Users, Ticket, CheckCircle2, XCircle, DollarSign, Globe, ShieldCheck, RefreshCw } from "lucide-react";
import { db } from "@/lib/db";

export default function AdminDashboardPage() {
  const [metrics, setMetrics] = useState({
    totalBookings: 0,
    intlBookings: 0,
    domesticBookings: 0,
    paymentSuccess: 0,
    paymentFailures: 0,
    activePasses: 0,
    redeemedPasses: 0,
    demoGmv: 0,
  });

  const loadMetrics = () => {
    const bookings = db.getBookings();
    const passes = db.getDigitalPasses();
    const txs = db.getPaymentTransactions();

    const totalBookings = bookings.length;
    const intlBookings = bookings.filter((b) => b.visitor_type === "INTERNATIONAL").length;
    const domesticBookings = bookings.filter((b) => b.visitor_type === "DOMESTIC").length;

    const paymentSuccess = txs.filter((t) => t.status === "SUCCESS").length;
    const paymentFailures = txs.filter((t) => t.status === "FAILED").length;

    const activePasses = passes.filter((p) => p.status === "VALID").length;
    const redeemedPasses = passes.filter((p) => p.status === "REDEEMED").length;

    const demoGmv = txs
      .filter((t) => t.status === "SUCCESS")
      .reduce((sum, t) => sum + t.amount, 0);

    setMetrics({
      totalBookings,
      intlBookings,
      domesticBookings,
      paymentSuccess,
      paymentFailures,
      activePasses,
      redeemedPasses,
      demoGmv,
    });
  };

  useEffect(() => {
    loadMetrics();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-navy-800 text-teal-400 text-xs font-semibold border border-teal-500/30">
            <LayoutDashboard className="w-3.5 h-3.5" /> Demo Metrics Dashboard
          </div>
          <h1 className="text-3xl font-extrabold text-white">TN smart tourism Admin</h1>
          <p className="text-xs text-sand-400 font-medium">
            Demo metrics — no real financial data.
          </p>
        </div>

        <button
          onClick={loadMetrics}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-navy-800 text-teal-400 text-xs font-bold border border-teal-500/30 hover:bg-navy-700 transition-colors shrink-0"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Refresh Metrics
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Bookings */}
        <div className="p-6 rounded-2xl glass-panel space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Bookings</span>
            <Users className="w-5 h-5 text-teal-400" />
          </div>
          <span className="text-3xl font-black text-white block">{metrics.totalBookings}</span>
          <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
            <span className="text-teal-400 font-semibold">{metrics.intlBookings} Intl</span> · <span>{metrics.domesticBookings} Domestic</span>
          </div>
        </div>

        {/* Intl Bookings */}
        <div className="p-6 rounded-2xl glass-panel space-y-2 border-teal-500/40">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">International Bookings</span>
            <Globe className="w-5 h-5 text-teal-400" />
          </div>
          <span className="text-3xl font-black text-teal-400 block">{metrics.intlBookings}</span>
          <span className="text-xs text-slate-400">Via UPI One World simulation</span>
        </div>

        {/* Domestic Bookings */}
        <div className="p-6 rounded-2xl glass-panel space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Domestic Bookings</span>
            <Users className="w-5 h-5 text-slate-400" />
          </div>
          <span className="text-3xl font-black text-white block">{metrics.domesticBookings}</span>
          <span className="text-xs text-slate-400">Standard Indian payment</span>
        </div>

        {/* Demo GMV */}
        <div className="p-6 rounded-2xl glass-panel space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Demo GMV</span>
            <DollarSign className="w-5 h-5 text-teal-400" />
          </div>
          <span className="text-3xl font-black text-teal-400 block">₹{metrics.demoGmv.toLocaleString("en-IN")}</span>
          <span className="text-xs text-slate-400">Simulated volume</span>
        </div>

        {/* Payment Successes */}
        <div className="p-6 rounded-2xl glass-panel space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Payment Successes</span>
            <CheckCircle2 className="w-5 h-5 text-teal-400" />
          </div>
          <span className="text-3xl font-black text-teal-400 block">{metrics.paymentSuccess}</span>
          <span className="text-xs text-slate-400">Completed authorizations</span>
        </div>

        {/* Payment Failures */}
        <div className="p-6 rounded-2xl glass-panel space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Payment Failures</span>
            <XCircle className="w-5 h-5 text-red-400" />
          </div>
          <span className="text-3xl font-black text-red-400 block">{metrics.paymentFailures}</span>
          <span className="text-xs text-slate-400">Blocked / Insufficient balance</span>
        </div>

        {/* Active Passes */}
        <div className="p-6 rounded-2xl glass-panel space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Passes</span>
            <Ticket className="w-5 h-5 text-teal-400" />
          </div>
          <span className="text-3xl font-black text-white block">{metrics.activePasses}</span>
          <span className="text-xs text-slate-400">Ready for attraction entry</span>
        </div>

        {/* Redeemed Passes */}
        <div className="p-6 rounded-2xl glass-panel space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Redeemed Passes</span>
            <ShieldCheck className="w-5 h-5 text-sand-400" />
          </div>
          <span className="text-3xl font-black text-sand-400 block">{metrics.redeemedPasses}</span>
          <span className="text-xs text-slate-400">Validated at attraction gate</span>
        </div>
      </div>
    </div>
  );
}

"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Ticket, ShieldCheck, Lock, Globe, CreditCard, ArrowRight, User, Mail, Minus, Plus } from "lucide-react";
import { db } from "@/lib/db";
import { VisitorType } from "@/types";

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const passId = searchParams.get("passId") || "pass-coastal-discovery";

  const pkg = db.getPassPackageById(passId) || db.getPassPackages()[0];
  const inclusions = db.getPassInclusions(pkg.id);

  const [travelerName, setTravelerName] = useState("John Doe");
  const [travelerEmail, setTravelerEmail] = useState("john.doe@example.com");
  const [quantity, setQuantity] = useState(1);
  const [visitorType, setVisitorType] = useState<VisitorType>("INTERNATIONAL");
  const [paymentOption, setPaymentOption] = useState<"UPI_ONE_WORLD" | "INTERNATIONAL_CARD" | "INDIAN_PAYMENT">("UPI_ONE_WORLD");

  const totalAmount = pkg.demo_price * quantity;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams({
      passId: pkg.id,
      name: travelerName,
      email: travelerEmail,
      quantity: quantity.toString(),
      visitorType: visitorType,
    });

    if (paymentOption === "UPI_ONE_WORLD" || visitorType === "INTERNATIONAL") {
      router.push(`/payment/upi-one-world?${params.toString()}`);
    } else {
      router.push(`/payment/authorize?${params.toString()}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid md:grid-cols-5 gap-8">
      {/* Left Column: Details & Payment Options (3 cols) */}
      <div className="md:col-span-3 space-y-6">
        {/* Traveler Details Card */}
        <div className="p-6 rounded-2xl glass-panel space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <User className="w-5 h-5 text-teal-400" /> Traveler Information
          </h2>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={travelerName}
                onChange={(e) => setTravelerName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-navy-900 border border-teal-500/30 text-white text-sm focus:outline-none focus:border-teal-400"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Email Address (Pass delivery)
              </label>
              <input
                type="email"
                required
                value={travelerEmail}
                onChange={(e) => setTravelerEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-navy-900 border border-teal-500/30 text-white text-sm focus:outline-none focus:border-teal-400"
              />
            </div>

            {/* Quantity */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-semibold text-slate-300">Quantity</span>
              <div className="flex items-center gap-3 bg-navy-900 border border-teal-500/30 px-3 py-1.5 rounded-xl">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-teal-400 hover:text-white p-1"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-sm font-bold text-white w-6 text-center">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-teal-400 hover:text-white p-1"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Visitor Type Selector */}
        <div className="p-6 rounded-2xl glass-panel space-y-3">
          <h2 className="text-sm font-bold text-teal-400 uppercase tracking-wider">
            Select Visitor Category
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => {
                setVisitorType("INTERNATIONAL");
                setPaymentOption("UPI_ONE_WORLD");
              }}
              className={`p-3.5 rounded-xl border text-left flex flex-col justify-between gap-2 transition-all ${
                visitorType === "INTERNATIONAL"
                  ? "bg-teal-500/15 border-teal-400 text-white shadow-md shadow-teal-500/20"
                  : "bg-navy-900/60 border-teal-500/20 text-slate-400 hover:border-teal-500/40"
              }`}
            >
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-teal-400" />
                <span className="text-xs font-bold text-white">International Tourist</span>
              </div>
              <span className="text-[11px] text-slate-400">Requires non-Indian card onboarding</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setVisitorType("DOMESTIC");
                setPaymentOption("INDIAN_PAYMENT");
              }}
              className={`p-3.5 rounded-xl border text-left flex flex-col justify-between gap-2 transition-all ${
                visitorType === "DOMESTIC"
                  ? "bg-teal-500/15 border-teal-400 text-white shadow-md shadow-teal-500/20"
                  : "bg-navy-900/60 border-teal-500/20 text-slate-400 hover:border-teal-500/40"
              }`}
            >
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-teal-400" />
                <span className="text-xs font-bold text-white">Domestic Tourist</span>
              </div>
              <span className="text-[11px] text-slate-400">Uses Indian UPI / Card / NetBanking</span>
            </button>
          </div>
        </div>

        {/* Payment Selection Box */}
        <div className="p-6 rounded-2xl glass-panel space-y-4">
          <h2 className="text-base font-bold text-white">How would you like to pay?</h2>

          <div className="space-y-3">
            <label
              onClick={() => setPaymentOption("UPI_ONE_WORLD")}
              className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                paymentOption === "UPI_ONE_WORLD"
                  ? "bg-teal-500/15 border-teal-400 text-white"
                  : "bg-navy-900/60 border-teal-500/20 text-slate-300"
              }`}
            >
              <input
                type="radio"
                name="payment"
                checked={paymentOption === "UPI_ONE_WORLD"}
                onChange={() => setPaymentOption("UPI_ONE_WORLD")}
                className="mt-1 accent-teal-400"
              />
              <div>
                <span className="text-sm font-bold block text-white">UPI One World (International Visitors)</span>
                <span className="text-xs text-slate-300 block mt-0.5">
                  Fund demo wallet using international debit/credit card. No Indian bank account required.
                </span>
              </div>
            </label>

            <label
              onClick={() => setPaymentOption("INTERNATIONAL_CARD")}
              className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                paymentOption === "INTERNATIONAL_CARD"
                  ? "bg-teal-500/15 border-teal-400 text-white"
                  : "bg-navy-900/60 border-teal-500/20 text-slate-300"
              }`}
            >
              <input
                type="radio"
                name="payment"
                checked={paymentOption === "INTERNATIONAL_CARD"}
                onChange={() => setPaymentOption("INTERNATIONAL_CARD")}
                className="mt-1 accent-teal-400"
              />
              <div>
                <span className="text-sm font-bold block text-white">International Card via Authorised PPI</span>
                <span className="text-xs text-slate-300 block mt-0.5">
                  Direct onboarding for overseas credit/debit card holders.
                </span>
              </div>
            </label>

            <label
              onClick={() => setPaymentOption("INDIAN_PAYMENT")}
              className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                paymentOption === "INDIAN_PAYMENT"
                  ? "bg-teal-500/15 border-teal-400 text-white"
                  : "bg-navy-900/60 border-teal-500/20 text-slate-300"
              }`}
            >
              <input
                type="radio"
                name="payment"
                checked={paymentOption === "INDIAN_PAYMENT"}
                onChange={() => setPaymentOption("INDIAN_PAYMENT")}
                className="mt-1 accent-teal-400"
              />
              <div>
                <span className="text-sm font-bold block text-white">Indian Payment Options</span>
                <span className="text-xs text-slate-300 block mt-0.5">
                  Standard Indian UPI, Debit/Credit Card, Net Banking.
                </span>
              </div>
            </label>
          </div>

          {/* Foreign Tourist Callout */}
          {visitorType === "INTERNATIONAL" && (
            <div className="p-4 rounded-xl bg-navy-900 border border-teal-500/30 space-y-2">
              <span className="text-xs font-bold text-sand-400 block">Don't have an Indian bank account?</span>
              <p className="text-xs text-slate-300">
                Eligible international visitors can use UPI One World through an authorised payment provider.
              </p>
            </div>
          )}

          {/* Trust statement */}
          <div className="flex items-center gap-2 text-xs text-slate-400 pt-2">
            <Lock className="w-4 h-4 text-teal-400 shrink-0" />
            <span>TN smart tourism does not hold your payment funds.</span>
          </div>
        </div>
      </div>

      {/* Right Column: Order Summary (2 cols) */}
      <div className="md:col-span-2 space-y-6">
        <div className="p-6 rounded-2xl glass-panel space-y-6 sticky top-24">
          <h2 className="text-lg font-bold text-white border-b border-teal-500/15 pb-4">Order Summary</h2>

          <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-xs text-sand-400 font-bold uppercase tracking-wider">Pass package</span>
              <h3 className="text-xl font-bold text-white">{pkg.name}</h3>
              <p className="text-xs text-slate-400">{pkg.validity_days} Days validity</p>
            </div>

            {/* Inclusions summary */}
            <div className="space-y-1 pt-2 border-t border-teal-500/15">
              <span className="text-xs font-semibold text-slate-400 block">Included Attractions ({inclusions.length}):</span>
              <ul className="text-xs text-slate-300 space-y-1">
                {inclusions.map((attr) => (
                  <li key={attr.id} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                    <span className="truncate">{attr.name}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price Calculation */}
            <div className="space-y-2 pt-4 border-t border-teal-500/15 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Pass Price</span>
                <span>₹{pkg.demo_price}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Quantity</span>
                <span>× {quantity}</span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-teal-400 pt-2 border-t border-teal-500/20">
                <span>Total Amount</span>
                <span>₹{totalAmount.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-teal-500 to-teal-400 text-navy-950 font-black text-sm hover:from-teal-400 hover:to-teal-300 transition-all shadow-lg shadow-teal-500/25 flex items-center justify-center gap-2"
          >
            <span>
              {visitorType === "INTERNATIONAL"
                ? "Continue with UPI One World"
                : "Proceed to Payment"}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </form>
  );
}

export default function CheckoutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
          <Ticket className="w-8 h-8 text-teal-400" /> Checkout
        </h1>
        <p className="text-slate-300 text-sm">
          Review your selected tourism pass and choose your payment method.
        </p>
      </div>

      <Suspense fallback={<div className="p-8 text-center text-slate-400">Loading checkout...</div>}>
        <CheckoutContent />
      </Suspense>
    </div>
  );
}

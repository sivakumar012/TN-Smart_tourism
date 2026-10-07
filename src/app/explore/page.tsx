"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Compass, Search, Filter, MapPin, ArrowRight } from "lucide-react";
import { db } from "@/lib/db";
import { Attraction } from "@/types";
import {
  trackViewAttractionList,
  trackSelectItem,
} from "@/lib/analytics";

const CATEGORIES = ["All", "Heritage", "Culture", "Experience", "Coastal"];

export default function ExplorePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const attractions: Attraction[] = db.getAttractions(
    selectedCategory === "All" ? undefined : selectedCategory,
    searchQuery
  );

  // Track attraction list view when list updates
  useEffect(() => {
    if (attractions.length === 0) return;
    trackViewAttractionList({
      item_list_id: "explore_attractions",
      item_list_name: "Explore Attractions",
      destination: "Chennai-Mahabalipuram",
      items: attractions.map((a) => ({
        item_id: a.id,
        item_name: a.name,
        item_category: a.category,
        price: a.demo_price,
        currency: "INR",
      })),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white flex items-center gap-3">
          <Compass className="w-8 h-8 text-teal-400" /> Explore Attractions
        </h1>
        <p className="text-slate-300 text-sm sm:text-base">
          Discover participating heritage sites, coastal points, and cultural experiences in the Chennai–Mahabalipuram corridor.
        </p>
      </div>

      {/* Search & Filters */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative max-w-xl">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search attractions by name or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-navy-900 border border-teal-500/30 text-white placeholder-slate-400 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 text-sm transition-all"
          />
        </div>

        {/* Category Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs font-semibold text-slate-400 flex items-center gap-1 shrink-0 pr-2">
            <Filter className="w-3.5 h-3.5" /> Categories:
          </span>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                selectedCategory === cat
                  ? "bg-teal-500 text-navy-950 shadow-md shadow-teal-500/20"
                  : "bg-navy-900 text-slate-300 border border-teal-500/20 hover:border-teal-500/40 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Attraction Grid */}
      {attractions.length === 0 ? (
        <div className="p-12 text-center rounded-2xl glass-panel space-y-3">
          <Compass className="w-12 h-12 text-slate-500 mx-auto" />
          <h3 className="text-lg font-bold text-white">No attractions found</h3>
          <p className="text-sm text-slate-400">
            Try adjusting your search terms or selecting a different category filter.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
            }}
            className="px-4 py-2 rounded-lg bg-teal-500/10 text-teal-400 border border-teal-500/30 text-xs font-bold hover:bg-teal-500/20 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {attractions.map((attr) => (
            <div
              key={attr.id}
              className="group rounded-2xl overflow-hidden glass-panel glass-panel-hover flex flex-col justify-between"
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

              <div className="p-5 space-y-3 flex-grow flex flex-col justify-between">
                <div>
                  <h2 className="text-lg font-bold text-white group-hover:text-teal-400 transition-colors">
                    {attr.name}
                  </h2>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                    <span>{attr.location}</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-2 line-clamp-3">
                    {attr.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-teal-500/15 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-400 block">Demo Price</span>
                    <span className="text-lg font-extrabold text-teal-400">
                      ₹{attr.demo_price}
                    </span>
                  </div>
                  <Link
                    href={`/attraction/${attr.id}`}
                    onClick={() =>
                      trackSelectItem({
                        item_list_id: "explore_attractions",
                        item_list_name: "Explore Attractions",
                        destination: "Chennai-Mahabalipuram",
                        item: {
                          item_id: attr.id,
                          item_name: attr.name,
                          item_category: attr.category,
                          price: attr.demo_price,
                          currency: "INR",
                        },
                      })
                    }
                    className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/30 text-xs font-bold hover:bg-teal-500/20 transition-colors"
                  >
                    <span>Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

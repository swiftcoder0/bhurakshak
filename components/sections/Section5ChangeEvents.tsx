"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CHANGE_EVENTS, ChangeEvent } from "@/data/changeEvents";
import { ArrowRight, Activity, MapPin, ShieldCheck, ArrowUpRight, Filter } from "lucide-react";

export const Section5ChangeEvents: React.FC = () => {
  const [filterCategory, setFilterCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Detected Events" },
    { id: "Urban Expansion", label: "Urban Expansion" },
    { id: "Vegetation Loss", label: "Vegetation Loss" },
    { id: "Water-body Change", label: "Water-body Change" },
    { id: "Infrastructure Corridor", label: "Infrastructure Corridor" },
  ];

  const filteredEvents =
    filterCategory === "all"
      ? CHANGE_EVENTS
      : CHANGE_EVENTS.filter((e) => e.category === filterCategory);

  return (
    <section className="relative w-full border-t border-canvas-border bg-canvas py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end mb-10">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2">
              <span className="h-px w-6 bg-charcoal-muted/60" />
              <span className="text-[11px] font-semibold tracking-wider text-charcoal-muted uppercase font-mono">
                Engine 02 · Detect / Event Ledger
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-charcoal leading-tight">
              <span>Where change is </span>
              <span className="font-serif italic text-walnut font-normal">
                happening.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed">
              Every detected land transformation is catalogued as a verified Change Event with spatial coordinates, multi-temporal persistence verification, and calibrated confidence ratings.
            </p>
          </div>

          <Link
            href="/events"
            className="inline-flex items-center gap-1.5 rounded-full border border-canvas-border bg-canvas-surface px-4 py-2 text-xs font-medium text-charcoal hover:border-walnut transition-colors shrink-0"
          >
            <span>View Full Ledger ({CHANGE_EVENTS.length})</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Filter Tabs */}
        <div className="mb-8 flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilterCategory(cat.id)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                filterCategory === cat.id
                  ? "bg-walnut text-white shadow-xs"
                  : "border border-canvas-border bg-canvas-surface text-charcoal-muted hover:text-charcoal"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event) => (
            <Link
              key={event.id}
              href={`/events/${event.id}`}
              className="group flex flex-col justify-between rounded-xl border border-canvas-border bg-canvas-surface p-6 transition-all hover:border-walnut hover:shadow-md"
            >
              <div>
                {/* Card Top: Code & Confidence */}
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs font-bold text-walnut bg-canvas px-2 py-0.5 rounded border border-canvas-border">
                    #{event.code}
                  </span>

                  <span className="inline-flex items-center gap-1 rounded-full bg-olive-subtle px-2 py-0.5 text-[10px] font-mono font-medium text-olive">
                    <ShieldCheck className="h-3 w-3" />
                    <span>{event.confidence} ({(event.confidenceScore * 100).toFixed(0)}%)</span>
                  </span>
                </div>

                {/* Title & Transition */}
                <h3 className="text-base font-bold text-charcoal group-hover:text-walnut transition-colors line-clamp-1">
                  {event.title}
                </h3>

                <div className="mt-1 font-mono text-xs text-charcoal-muted font-medium">
                  {event.transition}
                </div>

                <div className="mt-2 text-xs text-charcoal-muted line-clamp-2 leading-relaxed">
                  Driver: {event.likelyDriver}
                </div>
              </div>

              {/* Metrics & Footer */}
              <div className="mt-6 border-t border-canvas-border/80 pt-4 space-y-2">
                <div className="flex items-baseline justify-between font-mono text-xs">
                  <span className="text-charcoal-muted">Affected Footprint</span>
                  <span className="text-base font-bold text-charcoal">
                    {event.areaHa} ha
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-charcoal-muted pt-1">
                  <span className="flex items-center gap-1 truncate max-w-[200px]">
                    <MapPin className="h-3 w-3 text-olive shrink-0" />
                    <span>{event.location.microRegion}</span>
                  </span>

                  <span className="inline-flex items-center gap-1 font-medium text-walnut group-hover:translate-x-0.5 transition-transform">
                    <span>Inspect</span>
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

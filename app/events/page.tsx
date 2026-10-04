"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ReportObservationModal } from "@/components/ReportObservationModal";
import { CHANGE_EVENTS, ChangeEvent } from "@/data/changeEvents";
import { Search, Filter, ShieldCheck, MapPin, ArrowRight, ArrowUpRight, Activity } from "lucide-react";

export default function EventsLedgerPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isReportOpen, setIsReportOpen] = useState(false);

  const filtered = CHANGE_EVENTS.filter((e) => {
    const matchesSearch =
      e.code.toLowerCase().includes(search.toLowerCase()) ||
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.location.microRegion.toLowerCase().includes(search.toLowerCase());
    const matchesCat =
      selectedCategory === "all" || e.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const totalHa = CHANGE_EVENTS.reduce((acc, curr) => acc + curr.areaHa, 0);

  return (
    <div className="min-h-screen bg-canvas text-charcoal flex flex-col justify-between">
      <Navigation onOpenReport={() => setIsReportOpen(true)} />

      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Breadcrumb Header */}
        <div className="mb-8 border-b border-canvas-border pb-6">
          <div className="flex items-center gap-2 font-mono text-xs text-charcoal-muted">
            <Link href="/" className="hover:text-walnut">HOME</Link>
            <span>/</span>
            <span className="text-charcoal font-bold">CHANGE EVENTS LEDGER</span>
          </div>

          <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-charcoal">
                Change Event Discovery Ledger
              </h1>
              <p className="mt-1 text-sm text-charcoal-muted max-w-2xl leading-relaxed">
                Systematic catalog of verified land-use and land-cover transitions detected across the Lucknow pilot district through multi-temporal Sentinel-2 surface reflectance differencing.
              </p>
            </div>

            <button
              onClick={() => setIsReportOpen(true)}
              className="inline-flex items-center gap-2 rounded-full bg-walnut px-5 py-2.5 text-xs font-medium text-white hover:bg-walnut-hover transition-colors shadow-xs shrink-0"
            >
              <span>Submit Ground Observation</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Quick Metrics Strip */}
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4 rounded-xl border border-canvas-border bg-canvas-surface p-4 text-xs font-mono">
            <div>
              <div className="text-charcoal-muted">VERIFIED EVENTS</div>
              <div className="font-bold text-lg text-charcoal mt-0.5">{CHANGE_EVENTS.length} Events</div>
            </div>
            <div>
              <div className="text-charcoal-muted">TOTAL AREA AFFECTED</div>
              <div className="font-bold text-lg text-walnut mt-0.5">{totalHa.toFixed(1)} ha</div>
            </div>
            <div>
              <div className="text-charcoal-muted">CONFIDENCE CONSENSUS</div>
              <div className="font-bold text-lg text-olive mt-0.5">88.4% Mean Score</div>
            </div>
            <div>
              <div className="text-charcoal-muted">ACTIVE PILOT DISTRICT</div>
              <div className="font-bold text-lg text-charcoal mt-0.5">Lucknow, UP</div>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-charcoal-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter by event code (e.g. LK-2047), landmark, or keyword..."
              className="w-full rounded-full border border-canvas-border bg-canvas-surface pl-10 pr-4 py-2 text-xs text-charcoal placeholder:text-charcoal-faint focus:border-walnut focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { id: "all", label: "All Categories" },
              { id: "Urban Expansion", label: "Urban Expansion" },
              { id: "Vegetation Loss", label: "Vegetation Loss" },
              { id: "Water-body Change", label: "Water-body Change" },
              { id: "Infrastructure Corridor", label: "Infrastructure Corridor" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                  selectedCategory === cat.id
                    ? "bg-walnut text-white shadow-xs"
                    : "border border-canvas-border bg-canvas-surface text-charcoal-muted hover:text-charcoal"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((event) => (
            <Link
              key={event.id}
              href={`/events/${event.id}`}
              className="group flex flex-col justify-between rounded-xl border border-canvas-border bg-canvas-surface p-6 transition-all hover:border-walnut hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs font-bold text-walnut bg-canvas px-2 py-0.5 rounded border border-canvas-border">
                    #{event.code}
                  </span>

                  <span className="inline-flex items-center gap-1 rounded-full bg-olive-subtle px-2 py-0.5 text-[10px] font-mono font-medium text-olive">
                    <ShieldCheck className="h-3 w-3" />
                    <span>{event.confidence} ({(event.confidenceScore * 100).toFixed(0)}%)</span>
                  </span>
                </div>

                <h3 className="text-base font-bold text-charcoal group-hover:text-walnut transition-colors">
                  {event.title}
                </h3>

                <div className="mt-1 font-mono text-xs text-charcoal-muted">
                  {event.transition}
                </div>

                <p className="mt-2 text-xs text-charcoal-muted line-clamp-2 leading-relaxed">
                  Driver: {event.likelyDriver}
                </p>
              </div>

              <div className="mt-6 border-t border-canvas-border/80 pt-4 space-y-2 text-xs">
                <div className="flex justify-between font-mono">
                  <span className="text-charcoal-muted">Affected Footprint</span>
                  <span className="font-bold text-charcoal">{event.areaHa} ha</span>
                </div>

                <div className="flex justify-between text-[11px] text-charcoal-muted pt-1">
                  <span className="flex items-center gap-1 truncate max-w-[200px]">
                    <MapPin className="h-3 w-3 text-olive shrink-0" />
                    <span>{event.location.microRegion}</span>
                  </span>

                  <span className="inline-flex items-center gap-1 font-medium text-walnut group-hover:translate-x-0.5 transition-transform">
                    <span>Dossier</span>
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <ReportObservationModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
      />

      <Footer />
    </div>
  );
}

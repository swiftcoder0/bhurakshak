"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ReportObservationModal } from "@/components/ReportObservationModal";
import { CHANGE_EVENTS, ChangeEvent } from "@/data/changeEvents";
import { RISK_ZONES } from "@/data/riskData";
import { LUCKNOW_PILOT } from "@/data/pilotData";
import {
  MapPin,
  Layers,
  Calendar,
  ShieldCheck,
  Activity,
  AlertTriangle,
  ArrowRight,
  Filter,
  Eye,
  Sliders,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

export default function ExplorePage() {
  const [selectedEvent, setSelectedEvent] = useState<ChangeEvent>(CHANGE_EVENTS[0]);
  const [activeLayer, setActiveLayer] = useState<string>("change");
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const [isReportOpen, setIsReportOpen] = useState<boolean>(false);

  const layers = [
    { id: "baseline", label: "Baseline Satellite", code: "S2_L2A" },
    { id: "change", label: "Change Events (Detected)", code: "DIFF_NDVI" },
    { id: "risk", label: "2030 Spatial Risk", code: "PRED_2030" },
    { id: "vegetation", label: "Vegetation Index (NDVI)", code: "NDVI_10M" },
    { id: "builtup", label: "Built-up Impervious (NDBI)", code: "NDBI_10M" },
  ];

  return (
    <div className="min-h-screen bg-canvas text-charcoal flex flex-col justify-between">
      <Navigation onOpenReport={() => setIsReportOpen(true)} />

      {/* Main Workspace Canvas */}
      <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Workspace Breadcrumbs & Top Bar */}
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-canvas-border pb-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-charcoal-muted">
              <Link href="/" className="hover:text-walnut">HOME</Link>
              <span>/</span>
              <span className="text-charcoal font-bold">GEOSPATIAL EXPLORATION WORKSPACE</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-charcoal mt-1">
              National Land Observation Grid
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/explore/lucknow"
              className="inline-flex items-center gap-2 rounded-full bg-walnut px-4 py-2 text-xs font-medium text-white hover:bg-walnut-hover transition-colors shadow-xs"
            >
              <MapPin className="h-3.5 w-3.5" />
              <span>Switch to Lucknow Pilot Focus</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Central Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Map Viewer (Dominates Left 8 Columns) */}
          <div className="lg:col-span-8 space-y-4">
            {/* Map Container */}
            <div className="relative aspect-[16/11] w-full overflow-hidden rounded-2xl border border-canvas-border bg-[#0E1724] shadow-md flex flex-col justify-between p-6 text-white">
              {/* Raster Simulation Texture */}
              <div
                className="absolute inset-0 opacity-80 transition-all duration-700"
                style={{
                  background:
                    activeLayer === "risk"
                      ? "radial-gradient(circle at 55% 42%, rgba(184, 58, 38, 0.45) 0%, rgba(15, 23, 36, 0.95) 75%)"
                      : activeLayer === "vegetation"
                      ? "radial-gradient(circle at 55% 42%, rgba(74, 103, 65, 0.6) 0%, rgba(15, 23, 36, 0.95) 75%)"
                      : activeLayer === "builtup"
                      ? "radial-gradient(circle at 55% 42%, rgba(194, 120, 3, 0.5) 0%, rgba(15, 23, 36, 0.95) 75%)"
                      : "radial-gradient(circle at 55% 42%, rgba(30, 80, 50, 0.5) 0%, rgba(15, 23, 36, 0.95) 75%)",
                }}
              />

              {/* Grid Lines simulating GIS raster */}
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:36px_36px]" />

              {/* Map Floating Header Overlay */}
              <div className="relative z-10 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3 py-1 font-mono text-xs backdrop-blur-md">
                  <span className="h-2 w-2 rounded-full bg-olive animate-pulse" />
                  <span className="font-bold">GRID VIEW: REGION NORTH INDIA</span>
                  <span className="text-white/60">· {selectedYear}</span>
                </div>

                <div className="rounded-full border border-white/20 bg-black/40 px-3 py-1 font-mono text-[11px] text-white/80 backdrop-blur-md">
                  Active Layer: {layers.find((l) => l.id === activeLayer)?.label}
                </div>
              </div>

              {/* Interactive Hotspot Markers on Map */}
              <div className="relative z-10 my-auto">
                {CHANGE_EVENTS.map((event, idx) => {
                  const isSelected = selectedEvent.id === event.id;
                  // Distribute markers on the map canvas
                  const positions = [
                    { left: "52%", top: "42%" },
                    { left: "48%", top: "48%" },
                    { left: "56%", top: "38%" },
                    { left: "62%", top: "44%" },
                    { left: "45%", top: "40%" },
                  ];
                  const pos = positions[idx % positions.length];

                  return (
                    <div
                      key={event.id}
                      style={{ left: pos.left, top: pos.top }}
                      className="absolute -translate-x-1/2 -translate-y-1/2"
                    >
                      <button
                        onClick={() => setSelectedEvent(event)}
                        className={`group relative flex items-center justify-center transition-transform ${
                          isSelected ? "scale-125" : "hover:scale-110"
                        }`}
                        title={event.title}
                      >
                        {isSelected && (
                          <span className="absolute h-8 w-8 rounded-full border border-white/60 bg-white/20 animate-ping" />
                        )}
                        <span
                          className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-mono font-bold shadow-lg ring-2 ${
                            isSelected
                              ? "bg-walnut ring-white text-white"
                              : "bg-risk-amber ring-black/60 text-black"
                          }`}
                        >
                          {event.code.replace("LK-", "")}
                        </span>

                        <span className="absolute bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black/90 px-2 py-0.5 font-mono text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity">
                          {event.title} ({event.areaHa} ha)
                        </span>
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Map Floating Bottom Bar */}
              <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-black/50 p-3 backdrop-blur-md text-xs font-mono">
                <div className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-olive-light" />
                  <span>Focused Target: {selectedEvent.location.microRegion}</span>
                </div>
                <div className="text-white/70">
                  Coordinates: {selectedEvent.location.coordinates}
                </div>
              </div>
            </div>

            {/* Bottom Timeline Controls */}
            <div className="rounded-xl border border-canvas-border bg-canvas-surface p-4 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-charcoal-muted">
                <span className="flex items-center gap-1.5 font-semibold text-charcoal">
                  <Calendar className="h-3.5 w-3.5 text-walnut" />
                  <span>TEMPORAL TIMELINE SCRUBBER</span>
                </span>
                <span>Active Year: {selectedYear}</span>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {[2018, 2020, 2022, 2024, 2026].map((yr) => (
                  <button
                    key={yr}
                    onClick={() => setSelectedYear(yr)}
                    className={`rounded-lg py-2 text-center text-xs font-mono font-bold transition-all border ${
                      selectedYear === yr
                        ? "border-walnut bg-walnut text-white shadow-xs"
                        : "border-canvas-border bg-canvas text-charcoal hover:border-canvas-border/80"
                    }`}
                  >
                    {yr}
                  </button>
                ))}
              </div>
            </div>

            {/* Layer Filter Toolbar */}
            <div className="rounded-xl border border-canvas-border bg-canvas-surface p-4">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-charcoal-muted font-mono mb-2.5">
                Active Satellite & Analytical Layers
              </div>
              <div className="flex flex-wrap gap-2">
                {layers.map((layer) => (
                  <button
                    key={layer.id}
                    onClick={() => setActiveLayer(layer.id)}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                      activeLayer === layer.id
                        ? "bg-walnut text-white shadow-xs"
                        : "border border-canvas-border bg-canvas text-charcoal hover:border-canvas-border"
                    }`}
                  >
                    <Layers className="h-3 w-3" />
                    <span>{layer.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Side Intelligence Panel (Right 4 Columns) */}
          <div className="lg:col-span-4 space-y-4">
            {/* Selected Change Event Summary Card */}
            <div className="rounded-2xl border border-canvas-border bg-canvas-surface p-6 shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-canvas-border/80 pb-3">
                <span className="font-mono text-xs font-bold text-walnut bg-canvas px-2 py-0.5 rounded border border-canvas-border">
                  #{selectedEvent.code}
                </span>

                <span className="inline-flex items-center gap-1 rounded-full bg-olive-subtle px-2 py-0.5 text-[10px] font-mono font-medium text-olive">
                  <ShieldCheck className="h-3 w-3" />
                  <span>{selectedEvent.confidence} ({(selectedEvent.confidenceScore * 100).toFixed(0)}%)</span>
                </span>
              </div>

              <div>
                <h2 className="text-base font-bold text-charcoal leading-snug">
                  {selectedEvent.title}
                </h2>
                <div className="font-mono text-xs text-charcoal-muted mt-1">
                  {selectedEvent.transition}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 rounded-xl border border-canvas-border bg-canvas p-3 font-mono text-xs">
                <div>
                  <div className="text-[10px] text-charcoal-muted">Footprint</div>
                  <div className="font-bold text-charcoal mt-0.5">{selectedEvent.areaHa} ha</div>
                </div>
                <div>
                  <div className="text-[10px] text-charcoal-muted">First Detected</div>
                  <div className="font-bold text-charcoal mt-0.5">{selectedEvent.firstDetected}</div>
                </div>
              </div>

              {/* Evidence Snippet */}
              <div className="space-y-2">
                <div className="text-xs font-semibold uppercase tracking-wider text-charcoal font-mono">
                  Primary Spatial Evidence
                </div>
                <div className="space-y-1.5">
                  {selectedEvent.evidenceItems.slice(0, 2).map((item, i) => (
                    <div key={i} className="rounded-lg border border-canvas-border bg-canvas p-2.5 text-xs">
                      <div className="flex justify-between font-mono text-[11px] text-walnut font-bold">
                        <span>{item.title}</span>
                        <span>{item.metric}</span>
                      </div>
                      <p className="mt-1 text-[11px] text-charcoal-muted leading-relaxed">
                        {item.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Likely Driver */}
              <div className="rounded-xl border border-canvas-border bg-canvas p-3 text-xs">
                <span className="font-mono text-[10px] uppercase text-charcoal-muted block">
                  Attributed Likely Driver
                </span>
                <span className="font-bold text-charcoal mt-0.5 block">
                  {selectedEvent.likelyDriver}
                </span>
              </div>

              {/* Recommended Next Step */}
              <div className="rounded-xl border border-walnut/30 bg-walnut/5 p-3.5 text-xs space-y-1">
                <span className="font-mono text-[10px] uppercase text-walnut font-bold block">
                  Decision Support Action
                </span>
                <p className="text-charcoal leading-relaxed font-medium">
                  {selectedEvent.recommendedAction}
                </p>
              </div>

              {/* Link to Full Dossier */}
              <Link
                href={`/events/${selectedEvent.id}`}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-walnut py-2.5 text-xs font-medium text-white hover:bg-walnut-hover transition-colors shadow-xs"
              >
                <span>Inspect Full Event Dossier</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
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

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
  Droplets,
  Building2,
  TreePine,
  Download,
  Info,
} from "lucide-react";

export default function LucknowPilotPage() {
  const [selectedEvent, setSelectedEvent] = useState<ChangeEvent>(CHANGE_EVENTS[0]);
  const [activeLayer, setActiveLayer] = useState<string>("change");
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const [isReportOpen, setIsReportOpen] = useState<boolean>(false);

  const pilotLayers = [
    { id: "baseline", label: "Baseline Optical", desc: "Sentinel-2 True Color" },
    { id: "change", label: "Detected Changes", desc: "Multi-season Transitions" },
    { id: "risk", label: "2030 Spatial Risk", desc: "Decay Kernel Projections" },
    { id: "vegetation", label: "Canopy & Greenery", desc: "EVI / NDVI Multi-band" },
    { id: "builtup", label: "Impervious Built-up", desc: "NDBI Concrete Signature" },
    { id: "water", label: "Gomti Riparian Water", desc: "MNDWI Aquatic Basin" },
    { id: "infra", label: "Kisan Path Highway", desc: "Transport Network Adjacency" },
  ];

  return (
    <div className="min-h-screen bg-canvas text-charcoal flex flex-col justify-between">
      <Navigation onOpenReport={() => setIsReportOpen(true)} />

      <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* District Pilot Header */}
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-canvas-border pb-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-charcoal-muted">
              <Link href="/" className="hover:text-walnut">HOME</Link>
              <span>/</span>
              <Link href="/explore" className="hover:text-walnut">EXPLORE</Link>
              <span>/</span>
              <span className="text-walnut font-bold">PILOT: LUCKNOW, UP</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-charcoal mt-1 flex items-center gap-2">
              <span>Lucknow Pilot Investigation Workspace</span>
              <span className="rounded-full bg-olive-subtle px-2.5 py-0.5 text-xs font-mono font-medium text-olive">
                2,528 sq km Scope
              </span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/reports"
              className="inline-flex items-center gap-1.5 rounded-full border border-canvas-border bg-canvas-surface px-4 py-2 text-xs font-medium text-charcoal hover:border-walnut transition-colors"
            >
              <Download className="h-3.5 w-3.5 text-walnut" />
              <span>Pilot Change Dossier</span>
            </Link>

            <button
              onClick={() => setIsReportOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-full bg-walnut px-4 py-2 text-xs font-medium text-white hover:bg-walnut-hover transition-colors shadow-xs"
            >
              <span>Report Ground Observation</span>
            </button>
          </div>
        </div>

        {/* Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Pilot Map (8 Columns) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="relative aspect-[16/11] w-full overflow-hidden rounded-2xl border border-canvas-border bg-[#0B1420] shadow-md flex flex-col justify-between p-6 text-white">
              {/* Specialized Lucknow Map Basin Simulation */}
              <div
                className="absolute inset-0 opacity-85 transition-all duration-700"
                style={{
                  background:
                    activeLayer === "risk"
                      ? "radial-gradient(circle at 62% 48%, rgba(184, 58, 38, 0.5) 0%, rgba(11, 20, 32, 0.95) 70%)"
                      : activeLayer === "water"
                      ? "radial-gradient(circle at 45% 55%, rgba(14, 116, 144, 0.6) 0%, rgba(11, 20, 32, 0.95) 70%)"
                      : activeLayer === "builtup"
                      ? "radial-gradient(circle at 58% 46%, rgba(180, 110, 20, 0.5) 0%, rgba(11, 20, 32, 0.95) 70%)"
                      : "radial-gradient(circle at 55% 45%, rgba(35, 90, 50, 0.55) 0%, rgba(11, 20, 32, 0.95) 70%)",
                }}
              />

              {/* Gomti River Vector Path Simulation */}
              <svg className="absolute inset-0 h-full w-full opacity-40 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M 50,100 Q 200,180 350,220 T 650,310 T 950,420"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="3"
                  strokeDasharray="6 4"
                />
                <text x="360" y="210" fill="#38bdf8" fontSize="10" fontFamily="monospace">
                  Gomti River Basin
                </text>
              </svg>

              {/* Grid Lines */}
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px]" />

              {/* Floating Header */}
              <div className="relative z-10 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3 py-1 font-mono text-xs backdrop-blur-md">
                  <span className="h-2 w-2 rounded-full bg-olive animate-pulse" />
                  <span className="font-bold">LUCKNOW HIGH-RESOLUTION TILE T44RLP</span>
                  <span className="text-white/60">· {selectedYear}</span>
                </div>

                <div className="rounded-full border border-white/20 bg-black/40 px-3 py-1 font-mono text-[11px] text-white/80 backdrop-blur-md">
                  Layer: {pilotLayers.find((l) => l.id === activeLayer)?.label}
                </div>
              </div>

              {/* Interactive Lucknow Events Hotspots */}
              <div className="relative z-10 my-auto">
                {CHANGE_EVENTS.map((event, idx) => {
                  const isSelected = selectedEvent.id === event.id;
                  const coords = [
                    { left: "58%", top: "45%" },
                    { left: "54%", top: "58%" },
                    { left: "46%", top: "34%" },
                    { left: "68%", top: "42%" },
                    { left: "38%", top: "44%" },
                  ];
                  const pos = coords[idx % coords.length];

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
                      >
                        {isSelected && (
                          <span className="absolute h-9 w-9 rounded-full border border-white/80 bg-white/25 animate-ping" />
                        )}
                        <span
                          className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-mono font-bold shadow-lg ring-2 ${
                            isSelected
                              ? "bg-walnut ring-white text-white"
                              : "bg-risk-amber ring-black/70 text-black"
                          }`}
                        >
                          {event.code.replace("LK-", "")}
                        </span>

                        <span className="absolute bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black/95 px-2 py-0.5 font-mono text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity">
                          {event.title}
                        </span>
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Metadata */}
              <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-black/50 p-3 backdrop-blur-md text-xs font-mono">
                <div className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-olive-light" />
                  <span>Lucknow Pilot: {selectedEvent.location.microRegion}</span>
                </div>
                <div className="text-white/70">
                  Cadastre Target: {selectedEvent.location.coordinates}
                </div>
              </div>
            </div>

            {/* Timeline Scrubber */}
            <div className="rounded-xl border border-canvas-border bg-canvas-surface p-4 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-charcoal-muted">
                <span className="font-semibold text-charcoal flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-walnut" />
                  <span>PILOT TEMPORAL BASELINE (2018–2026)</span>
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

            {/* Pilot Layer Switcher Toolbar */}
            <div className="rounded-xl border border-canvas-border bg-canvas-surface p-4">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-charcoal-muted font-mono mb-2.5">
                Lucknow Remote Sensing Layers
              </div>
              <div className="flex flex-wrap gap-2">
                {pilotLayers.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => setActiveLayer(l.id)}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                      activeLayer === l.id
                        ? "bg-walnut text-white shadow-xs"
                        : "border border-canvas-border bg-canvas text-charcoal hover:border-canvas-border"
                    }`}
                  >
                    <Layers className="h-3 w-3" />
                    <span>{l.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Side Intelligence Panel (4 Columns) */}
          <div className="lg:col-span-4 space-y-4">
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
                  <div className="text-[10px] text-charcoal-muted">Affected Area</div>
                  <div className="font-bold text-charcoal mt-0.5">{selectedEvent.areaHa} ha</div>
                </div>
                <div>
                  <div className="text-[10px] text-charcoal-muted">Risk Projection</div>
                  <div className="font-bold text-risk-coral mt-0.5">{selectedEvent.risk2030} Risk</div>
                </div>
              </div>

              {/* Evidence Stack */}
              <div className="space-y-2">
                <div className="text-xs font-semibold uppercase tracking-wider text-charcoal font-mono">
                  Synthesized Evidence Stack
                </div>
                <div className="space-y-1.5">
                  {selectedEvent.evidenceItems.map((item, i) => (
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

              {/* Action Plan */}
              <div className="rounded-xl border border-walnut/30 bg-walnut/5 p-3.5 text-xs space-y-1">
                <span className="font-mono text-[10px] uppercase text-walnut font-bold block">
                  Ground Truth Next Step
                </span>
                <p className="text-charcoal leading-relaxed font-medium">
                  {selectedEvent.recommendedAction}
                </p>
              </div>

              <Link
                href={`/events/${selectedEvent.id}`}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-walnut py-2.5 text-xs font-medium text-white hover:bg-walnut-hover transition-colors shadow-xs"
              >
                <span>Inspect Event Dossier & Temporal Trace</span>
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

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { LUCKNOW_PILOT_REPORT } from "@/data/reports";
import {
  FileText,
  Download,
  Printer,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  MapPin,
  TrendingUp,
  AlertCircle,
  FileSpreadsheet,
  Globe,
} from "lucide-react";

export default function ReportsPage() {
  const [downloadToast, setDownloadToast] = useState<string | null>(null);

  const handleExport = (format: string) => {
    setDownloadToast(`Exporting ${format} Dossier (Simulation)...`);
    setTimeout(() => {
      setDownloadToast(null);
    }, 3500);
  };

  const report = LUCKNOW_PILOT_REPORT;

  return (
    <div className="min-h-screen bg-canvas text-charcoal flex flex-col justify-between">
      <Navigation />

      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        {/* Breadcrumb Header */}
        <div className="mb-8 border-b border-canvas-border pb-6">
          <div className="flex items-center gap-2 font-mono text-xs text-charcoal-muted">
            <Link href="/" className="hover:text-walnut">HOME</Link>
            <span>/</span>
            <span className="text-charcoal font-bold">REPORTS & DOSSIERS</span>
          </div>

          <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-walnut bg-canvas-border/40 px-2 py-0.5 rounded">
                  {report.reportNumber}
                </span>
                <span className="text-xs font-mono text-olive font-semibold">
                  Official Pilot Dossier
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-charcoal mt-2">
                {report.title}
              </h1>

              <div className="mt-1 font-mono text-xs text-charcoal-muted">
                {report.district}, {report.state} · Baseline: {report.period}
              </div>
            </div>

            {/* Export Actions Bar */}
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                onClick={() => handleExport("PDF")}
                className="inline-flex items-center gap-1.5 rounded-full bg-walnut px-4 py-2 text-xs font-medium text-white hover:bg-walnut-hover transition-colors shadow-xs"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Export PDF</span>
              </button>

              <button
                onClick={() => handleExport("CSV")}
                className="inline-flex items-center gap-1.5 rounded-full border border-canvas-border bg-canvas-surface px-3.5 py-2 text-xs font-medium text-charcoal hover:border-walnut transition-colors"
              >
                <FileSpreadsheet className="h-3.5 w-3.5 text-olive" />
                <span>CSV Table</span>
              </button>

              <button
                onClick={() => handleExport("GeoJSON")}
                className="inline-flex items-center gap-1.5 rounded-full border border-canvas-border bg-canvas-surface px-3.5 py-2 text-xs font-medium text-charcoal hover:border-walnut transition-colors"
              >
                <Globe className="h-3.5 w-3.5 text-walnut" />
                <span>GeoJSON Polygons</span>
              </button>
            </div>
          </div>
        </div>

        {/* Download Simulation Toast */}
        {downloadToast && (
          <div className="mb-6 rounded-xl border border-olive/30 bg-olive-subtle/70 p-3 text-xs font-mono text-olive flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>{downloadToast}</span>
          </div>
        )}

        {/* Formal Report Layout */}
        <div className="space-y-8 rounded-3xl border border-canvas-border bg-canvas-surface p-6 sm:p-10 shadow-sm mb-16">
          {/* Executive Summary */}
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-charcoal font-mono">
              01 · Executive Summary
            </div>
            <p className="text-sm text-charcoal/90 leading-relaxed font-sans">
              {report.executiveSummary}
            </p>
          </div>

          {/* District Metrics Strip */}
          <div className="border-y border-canvas-border py-6">
            <div className="text-xs font-semibold uppercase tracking-wider text-charcoal font-mono mb-4">
              02 · Measured Quantifications (2018–2026)
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
              <div className="rounded-xl border border-canvas-border bg-canvas p-4">
                <span className="text-[10px] text-charcoal-muted uppercase block">
                  CONVERTED ARABLE SOIL
                </span>
                <span className="text-2xl font-bold text-walnut mt-1 block">
                  {report.metrics.totalChangedHa} ha
                </span>
                <span className="text-[10px] text-charcoal-muted">
                  Double-cropped alluvial parcels
                </span>
              </div>

              <div className="rounded-xl border border-canvas-border bg-canvas p-4">
                <span className="text-[10px] text-charcoal-muted uppercase block">
                  BUILT-UP IMPERVIOUS
                </span>
                <span className="text-2xl font-bold text-charcoal mt-1 block">
                  +{report.metrics.builtUpIncreasePercent}%
                </span>
                <span className="text-[10px] text-charcoal-muted">
                  Concentrated in highway spokes
                </span>
              </div>

              <div className="rounded-xl border border-canvas-border bg-canvas p-4">
                <span className="text-[10px] text-charcoal-muted uppercase block">
                  CANOPY LOSS
                </span>
                <span className="text-2xl font-bold text-risk-coral mt-1 block">
                  -{report.metrics.vegetationCanopyLostHa} ha
                </span>
                <span className="text-[10px] text-charcoal-muted">
                  Agro-forestry mango groves
                </span>
              </div>

              <div className="rounded-xl border border-canvas-border bg-canvas p-4">
                <span className="text-[10px] text-charcoal-muted uppercase block">
                  WETLAND DETENTION
                </span>
                <span className="text-2xl font-bold text-olive mt-1 block">
                  {report.metrics.waterBodyVarianceHa} ha
                </span>
                <span className="text-[10px] text-charcoal-muted">
                  Seasonal drainage variance
                </span>
              </div>
            </div>
          </div>

          {/* Key Findings */}
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-charcoal font-mono">
              03 · Synthesized Spatial Findings
            </div>
            <ul className="space-y-2 text-xs text-charcoal-muted leading-relaxed">
              {report.keyFindings.map((finding, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-olive mt-1.5 shrink-0" />
                  <span>{finding}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Evidence Highlights */}
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-charcoal font-mono">
              04 · Major Change Event Highlights
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {report.evidenceHighlights.map((hl, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-canvas-border bg-canvas p-3.5 space-y-1"
                >
                  <div className="flex justify-between items-center font-mono text-xs">
                    <span className="font-bold text-walnut">#{hl.eventCode}</span>
                    <span className="font-bold text-charcoal">{hl.area}</span>
                  </div>
                  <div className="text-xs font-semibold text-charcoal">
                    {hl.description}
                  </div>
                  <div className="text-[11px] text-charcoal-muted">
                    Likely driver: {hl.driver}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Action Plan */}
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-charcoal font-mono">
              05 · Recommended Action & Ground Verification Plan
            </div>
            <div className="space-y-2.5">
              {report.recommendedActionPlan.map((act, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-canvas-border bg-canvas p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs"
                >
                  <div>
                    <span className="font-mono text-[10px] font-bold uppercase text-walnut">
                      {act.priority}
                    </span>
                    <div className="font-medium text-charcoal mt-0.5">
                      {act.action}
                    </div>
                  </div>
                  <div className="font-mono text-[11px] text-charcoal-muted shrink-0">
                    Target: {act.targetAgency}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Report Footer */}
          <div className="border-t border-canvas-border pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between text-[11px] font-mono text-charcoal-muted gap-2">
            <div>
              Generated via Bhurakshak Multi-Temporal Synthesizer · EPSG:32644
            </div>
            <div>
              Telemetry: Copernicus Sentinel-2 Level-2A / Dynamic World V1
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

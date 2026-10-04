"use client";

import React, { useState } from "react";
import { BarChart3, TrendingUp, PieChart, Info, Scale } from "lucide-react";

export const Section8QuantifyImpact: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState<"area" | "rate" | "carbon">("area");

  return (
    <section className="relative w-full border-t border-canvas-border bg-canvas-surface py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 mb-12">
          <div className="flex items-center gap-2">
            <span className="h-px w-6 bg-charcoal-muted/60" />
            <span className="text-[11px] font-semibold tracking-wider text-charcoal-muted uppercase font-mono">
              Engine 05 · Quantify
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-charcoal leading-tight">
            <span>Measure </span>
            <span className="font-serif italic text-walnut font-normal">
              what it means.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed max-w-2xl">
            Visual inspection is insufficient without rigorous spatial accounting. Quantify converts detected pixel boundaries into exact cadastral metrics, land-cover transition ratios, and environmental asset variance.
          </p>
        </div>

        {/* Large Editorial Headline Metrics */}
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 border-b border-canvas-border/80 pb-12 mb-12">
          <div>
            <div className="text-4xl sm:text-5xl font-bold font-sans tracking-tight text-charcoal">
              1,420<span className="text-xl sm:text-2xl font-normal text-charcoal-muted"> ha</span>
            </div>
            <div className="mt-1 text-xs font-bold text-charcoal">
              Total Converted Farmland
            </div>
            <div className="mt-0.5 text-[11px] text-charcoal-muted font-mono">
              2018–2026 Lucknow District
            </div>
          </div>

          <div>
            <div className="text-4xl sm:text-5xl font-bold font-sans tracking-tight text-walnut">
              +31.4<span className="text-xl sm:text-2xl font-normal text-charcoal-muted">%</span>
            </div>
            <div className="mt-1 text-xs font-bold text-charcoal">
              Built-up Surface Growth
            </div>
            <div className="mt-0.5 text-[11px] text-charcoal-muted font-mono">
              Radial Arterial Corridors
            </div>
          </div>

          <div>
            <div className="text-4xl sm:text-5xl font-bold font-sans tracking-tight text-risk-coral">
              890<span className="text-xl sm:text-2xl font-normal text-charcoal-muted"> ha</span>
            </div>
            <div className="mt-1 text-xs font-bold text-charcoal">
              Tree Canopy Net Loss
            </div>
            <div className="mt-0.5 text-[11px] text-charcoal-muted font-mono">
              Agro-forestry & Scrub Groves
            </div>
          </div>

          <div>
            <div className="text-4xl sm:text-5xl font-bold font-sans tracking-tight text-olive">
              -48.6<span className="text-xl sm:text-2xl font-normal text-charcoal-muted"> ha</span>
            </div>
            <div className="mt-1 text-xs font-bold text-charcoal">
              Wetland Margin Variance
            </div>
            <div className="mt-0.5 text-[11px] text-charcoal-muted font-mono">
              Gomti Flood Retention Rim
            </div>
          </div>
        </div>

        {/* Analytical Charts Breakdown */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left: Annual Conversion Rate Graph (CSS Vector representation) */}
          <div className="lg:col-span-7 rounded-2xl border border-canvas-border bg-canvas p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-canvas-border/80 pb-3">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-charcoal-muted">
                  Empirical Time-Series
                </span>
                <h3 className="text-base font-bold text-charcoal">
                  Annual Farmland Conversion Rate (Hectares / Year)
                </h3>
              </div>
              <span className="font-mono text-xs text-walnut font-bold">
                EPSG:32644 Polygon Sum
              </span>
            </div>

            {/* Custom SVG / CSS Bar Chart */}
            <div className="space-y-4 pt-4">
              {[
                { year: "2019", ha: 92, pct: "18%" },
                { year: "2020", ha: 145, pct: "28%" },
                { year: "2021", ha: 210, pct: "42%" },
                { year: "2022", ha: 340, pct: "68%" },
                { year: "2023", ha: 420, pct: "84%" },
                { year: "2024", ha: 480, pct: "96%" },
                { year: "2025", ha: 512, pct: "100%" },
              ].map((row) => (
                <div key={row.year} className="flex items-center gap-3 text-xs">
                  <span className="w-12 font-mono font-bold text-charcoal">
                    {row.year}
                  </span>
                  <div className="flex-1 h-6 rounded bg-canvas-surface border border-canvas-border/80 overflow-hidden flex items-center p-0.5">
                    <div
                      style={{ width: row.pct }}
                      className="h-full rounded bg-walnut/90 transition-all duration-700 flex items-center justify-end pr-2 text-[10px] font-mono text-white"
                    >
                      {row.ha} ha
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-lg border border-canvas-border bg-canvas-surface p-3 text-xs text-charcoal-muted font-mono">
              Note: Conversion velocity doubled following the announcement and paving of the Outer Ring Road (Kisan Path) connecting NH-27 to NH-30.
            </div>
          </div>

          {/* Right: Land Cover Transition Matrix */}
          <div className="lg:col-span-5 rounded-2xl border border-canvas-border bg-canvas p-6 sm:p-8 space-y-6">
            <div className="border-b border-canvas-border/80 pb-3">
              <span className="font-mono text-xs uppercase tracking-wider text-charcoal-muted">
                Categorical Sankey Summary
              </span>
              <h3 className="text-base font-bold text-charcoal">
                2018 Baseline → 2026 Destination Classes
              </h3>
            </div>

            <div className="space-y-3">
              {[
                {
                  from: "Arable Double-Crop Soil",
                  to: "Logistics & Commercial Built",
                  area: "940 ha",
                  share: "66.2%",
                },
                {
                  from: "Open Scrub & Agro-forestry",
                  to: "Plotted Residential Layouts",
                  area: "310 ha",
                  share: "21.8%",
                },
                {
                  from: "Seasonal Wetland Margins",
                  to: "Compacted Earthen Fill",
                  area: "122 ha",
                  share: "8.6%",
                },
                {
                  from: "Rural Village Commons",
                  to: "Asphalt Road Infrastructure",
                  area: "48.4 ha",
                  share: "3.4%",
                },
              ].map((row, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-canvas-border bg-canvas-surface p-3.5 space-y-1.5"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-charcoal">
                      {row.from}
                    </span>
                    <span className="font-mono text-xs font-bold text-walnut">
                      {row.area}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-charcoal-muted">
                    <span>→ {row.to}</span>
                    <span className="font-mono">{row.share}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-lg border border-canvas-border bg-canvas-surface p-3 text-[11px] text-charcoal-muted">
              Spatial computations calibrated against Copernicus Sentinel-2 10m pixels (0.01 ha per cell) with estimated ±4.2% border boundary variance.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

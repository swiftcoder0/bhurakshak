"use client";

import React, { useState } from "react";
import { TIMELINE_SNAPSHOTS, TimelineSnapshot } from "@/data/timelineData";
import { Calendar, Play, Pause, Layers, Sliders, ArrowRight } from "lucide-react";

export const Section4TemporalChange: React.FC = () => {
  const [selectedYearIndex, setSelectedYearIndex] = useState<number>(0);
  const [compareBaseline, setCompareBaseline] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const currentSnapshot = TIMELINE_SNAPSHOTS[selectedYearIndex];
  const baselineSnapshot = TIMELINE_SNAPSHOTS[0];

  // Auto-play timer
  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setSelectedYearIndex((prev) => (prev + 1) % TIMELINE_SNAPSHOTS.length);
      }, 2400);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  return (
    <section className="relative w-full border-t border-canvas-border bg-canvas-surface py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end mb-12">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2">
              <span className="h-px w-6 bg-charcoal-muted/60" />
              <span className="text-[11px] font-semibold tracking-wider text-charcoal-muted uppercase font-mono">
                Engine 02 · Detect
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-charcoal leading-tight">
              <span>See change </span>
              <span className="font-serif italic text-walnut font-normal">
                over time.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed">
              Land does not convert overnight. By analyzing multi-temporal Sentinel-2 surface reflectance across multi-year cycles, Bhurakshak captures the gradual transition from arable farmland to impervious built infrastructure.
            </p>
          </div>

          {/* Play / Compare Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="inline-flex items-center gap-2 rounded-full border border-canvas-border bg-canvas px-4 py-2 text-xs font-medium text-charcoal hover:border-walnut transition-colors"
            >
              {isPlaying ? (
                <>
                  <Pause className="h-3.5 w-3.5 fill-charcoal" />
                  <span>Pause Time-Series</span>
                </>
              ) : (
                <>
                  <Play className="h-3.5 w-3.5 fill-charcoal" />
                  <span>Animate 2018–2026</span>
                </>
              )}
            </button>

            <button
              onClick={() => setCompareBaseline(!compareBaseline)}
              className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-medium transition-colors ${
                compareBaseline
                  ? "bg-walnut text-white"
                  : "border border-canvas-border bg-canvas text-charcoal"
              }`}
            >
              <Sliders className="h-3.5 w-3.5" />
              <span>Compare 2018 Baseline</span>
            </button>
          </div>
        </div>

        {/* Timeline Slider Navigation */}
        <div className="mb-8 rounded-xl border border-canvas-border bg-canvas p-4">
          <div className="flex items-center justify-between text-xs text-charcoal-muted font-mono mb-2">
            <span>TEMPORAL BASELINE ACQUISITION</span>
            <span>LUCKNOW PERI-URBAN CORRIDOR</span>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {TIMELINE_SNAPSHOTS.map((snap, idx) => {
              const isSelected = selectedYearIndex === idx;
              return (
                <button
                  key={snap.year}
                  onClick={() => {
                    setIsPlaying(false);
                    setSelectedYearIndex(idx);
                  }}
                  className={`flex flex-col items-center justify-center rounded-lg py-2.5 px-2 transition-all border ${
                    isSelected
                      ? "border-walnut bg-walnut text-white shadow-sm"
                      : "border-canvas-border bg-canvas-surface text-charcoal hover:border-canvas-border/80"
                  }`}
                >
                  <span className="font-mono text-sm font-bold">
                    {snap.year}
                  </span>
                  <span className={`text-[10px] truncate max-w-full ${isSelected ? "text-white/80" : "text-charcoal-muted"}`}>
                    {snap.season.split(" ")[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Comparison Stage */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Visual Simulation Canvas */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-canvas-border bg-neutral-900 p-6 flex flex-col justify-between text-white shadow-lg">
              {/* Dynamic Atmospheric Overlay representing land cover change */}
              <div
                className="absolute inset-0 transition-all duration-700 opacity-90"
                style={{
                  background:
                    selectedYearIndex === 0
                      ? "radial-gradient(circle at 60% 40%, rgba(34, 110, 50, 0.7) 0%, rgba(15, 30, 20, 0.95) 100%)"
                      : selectedYearIndex === 1
                      ? "radial-gradient(circle at 60% 40%, rgba(90, 110, 40, 0.7) 0%, rgba(25, 30, 20, 0.95) 100%)"
                      : selectedYearIndex === 2
                      ? "radial-gradient(circle at 60% 40%, rgba(140, 100, 40, 0.7) 0%, rgba(30, 25, 20, 0.95) 100%)"
                      : selectedYearIndex === 3
                      ? "radial-gradient(circle at 60% 40%, rgba(130, 60, 30, 0.7) 0%, rgba(30, 20, 20, 0.95) 100%)"
                      : "radial-gradient(circle at 60% 40%, rgba(100, 40, 20, 0.8) 0%, rgba(20, 15, 15, 0.98) 100%)",
                }}
              />

              {/* Grid Lines simulating GIS raster pixels */}
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px]" />

              {/* Top Meta Header */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3 py-1 backdrop-blur-md">
                  <Calendar className="h-3.5 w-3.5 text-olive-light" />
                  <span className="font-mono text-xs font-bold">
                    {currentSnapshot.year} Acquisition
                  </span>
                </div>

                <div className="rounded-full border border-white/20 bg-black/40 px-3 py-1 font-mono text-xs text-white/80 backdrop-blur-md">
                  {currentSnapshot.spectralMetric}
                </div>
              </div>

              {/* Center Annotation */}
              <div className="relative z-10 space-y-2">
                <span className="inline-block rounded bg-walnut px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider text-white">
                  {currentSnapshot.landCoverClass}
                </span>

                <h3 className="text-2xl font-bold tracking-tight text-white drop-shadow">
                  {currentSnapshot.headline}
                </h3>

                <p className="text-xs text-white/80 max-w-lg leading-relaxed">
                  {currentSnapshot.description}
                </p>
              </div>

              {/* Bottom Multi-spectral Land-cover Proportion Bar */}
              <div className="relative z-10 rounded-xl border border-white/10 bg-black/50 p-3 backdrop-blur-md space-y-1.5">
                <div className="flex justify-between text-[10px] font-mono text-white/80">
                  <span>Built: {currentSnapshot.builtUpPercent}%</span>
                  <span>Agri: {currentSnapshot.agriculturePercent}%</span>
                  <span>Vegetation: {currentSnapshot.vegetationPercent}%</span>
                  <span>Water: {currentSnapshot.waterPercent}%</span>
                </div>
                <div className="flex h-2 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    style={{ width: `${currentSnapshot.builtUpPercent}%` }}
                    className="bg-risk-coral transition-all duration-500"
                    title="Built-up"
                  />
                  <div
                    style={{ width: `${currentSnapshot.agriculturePercent}%` }}
                    className="bg-emerald-500 transition-all duration-500"
                    title="Agriculture"
                  />
                  <div
                    style={{ width: `${currentSnapshot.vegetationPercent}%` }}
                    className="bg-olive transition-all duration-500"
                    title="Vegetation"
                  />
                  <div
                    style={{ width: `${currentSnapshot.waterPercent}%` }}
                    className="bg-sky-500 transition-all duration-500"
                    title="Water"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Comparison & Metrics Details */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="rounded-xl border border-canvas-border bg-canvas p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-canvas-border/80 pb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-charcoal font-mono">
                  Conversion Dynamics
                </span>
                <span className="font-mono text-xs text-walnut font-bold">
                  2018 → {currentSnapshot.year}
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="text-xs text-charcoal-muted">Built-up Surface Change</div>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-2xl font-bold font-sans text-charcoal">
                      +{currentSnapshot.builtUpPercent - baselineSnapshot.builtUpPercent}%
                    </span>
                    <span className="text-xs text-charcoal-muted">
                      ({baselineSnapshot.builtUpPercent}% in 2018 → {currentSnapshot.builtUpPercent}% in {currentSnapshot.year})
                    </span>
                  </div>
                </div>

                <div>
                  <div className="text-xs text-charcoal-muted">Agricultural Soil Displacement</div>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-2xl font-bold font-sans text-risk-coral">
                      {currentSnapshot.agriculturePercent - baselineSnapshot.agriculturePercent}%
                    </span>
                    <span className="text-xs text-charcoal-muted">
                      ({baselineSnapshot.agriculturePercent}% in 2018 → {currentSnapshot.agriculturePercent}% in {currentSnapshot.year})
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-canvas-border bg-canvas-surface p-3 text-xs text-charcoal-muted leading-relaxed">
                <span className="font-semibold text-charcoal block mb-0.5 font-mono text-[11px]">
                  TEMPORAL PERSISTENCE CHECK:
                </span>
                Conversion verified across multi-season acquisitions (Kharif, Rabi, Zaid) ensuring that rotational harvest fallow is not misclassified as permanent impervious construction.
              </div>
            </div>

            <div className="rounded-xl border border-canvas-border bg-canvas-surface p-5">
              <div className="text-xs font-semibold text-charcoal font-mono uppercase mb-2">
                Spectral Index Formula
              </div>
              <div className="font-mono text-[11px] text-walnut bg-canvas p-2.5 rounded border border-canvas-border">
                NDBI = (SWIR1 - NIR) / (SWIR1 + NIR)
              </div>
              <div className="text-[11px] text-charcoal-muted mt-2">
                Positive values denote man-made materials: concrete, bitumen, and sheet roofs.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

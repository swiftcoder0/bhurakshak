"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, Eye, Calendar, Sparkles } from "lucide-react";

interface RealSatelliteEvidenceProps {
  onExplorePilot?: () => void;
}

export const RealSatelliteEvidence: React.FC<RealSatelliteEvidenceProps> = ({
  onExplorePilot,
}) => {
  const [sliderPos, setSliderPos] = useState(50);
  const [isComparing, setIsComparing] = useState(false);

  return (
    <section
      id="changes"
      className="relative w-full overflow-hidden px-4 py-20 sm:px-6 lg:px-8 border-t border-canvas-border/70 scroll-mt-16"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Editorial Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2">
              <span className="h-px w-6 bg-charcoal-muted/60" />
              <span className="text-xs font-mono uppercase tracking-widest text-charcoal-muted font-semibold">
                REAL SATELLITE EVIDENCE
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-[52px] font-bold text-charcoal leading-[1.12] tracking-tight font-sans">
              <span>From Farmland to</span>
              <br />
              <span className="text-walnut">Development</span>
            </h2>

            <p className="text-base sm:text-lg text-charcoal/80 leading-relaxed font-normal max-w-md">
              See before and after satellite images of detected changes and
              understand how much land has been affected.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setIsComparing((prev) => !prev)}
                className="inline-flex items-center gap-2 rounded-full border border-canvas-border/80 bg-[#FDFCF9] px-5 py-2.5 text-xs font-medium text-charcoal transition-all hover:bg-white hover:text-walnut shadow-2xs active:scale-[0.99]"
              >
                <Sparkles className="h-3.5 w-3.5 text-olive" />
                <span>{isComparing ? "Side-by-Side View" : "Interactive Split Swipe"}</span>
              </button>

              {onExplorePilot && (
                <button
                  onClick={onExplorePilot}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-walnut hover:underline"
                >
                  <span>Inspect in Lucknow Pilot</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            <div className="pt-6 border-t border-canvas-border/60">
              <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                <div className="rounded-xl border border-canvas-border/70 bg-[#FDFCF9] p-3">
                  <span className="text-charcoal-muted text-[10px] block">Location</span>
                  <span className="font-semibold text-charcoal">Malihabad / Mohanlalganj</span>
                </div>
                <div className="rounded-xl border border-canvas-border/70 bg-[#FDFCF9] p-3">
                  <span className="text-charcoal-muted text-[10px] block">Detected Area</span>
                  <span className="font-semibold text-walnut">12.4 ha Converted</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Side-by-Side Satellite Cards (Exact Match to Mockup) */}
          <div className="lg:col-span-7 w-full">
            {!isComparing ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 2022 Farmland Card */}
                <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-canvas-border/80 shadow-sm bg-[#1a2818]">
                  <Image
                    src="/images/satellite-before-2022.jpg"
                    alt="Satellite imagery 2022 - Before (Agriculture)"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 transition-opacity group-hover:opacity-0" />

                  {/* Year Badge (Top-Right) */}
                  <div className="absolute top-3 right-3 rounded-md bg-black/70 px-2.5 py-1 text-xs font-mono font-medium text-white shadow-xs backdrop-blur-md">
                    2022
                  </div>

                  {/* Land-use Pill (Bottom-Left) */}
                  <div className="absolute bottom-3 left-3 rounded-full border border-white/60 bg-white/95 px-3 py-1 text-xs font-medium text-charcoal shadow-sm backdrop-blur-md">
                    Before (Agriculture)
                  </div>
                </div>

                {/* 2026 Developed / Plotting Card */}
                <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-canvas-border/80 shadow-sm bg-[#2c2017]">
                  <Image
                    src="/images/satellite-after-2026.jpg"
                    alt="Satellite imagery 2026 - After (Built-up / Plotting)"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 transition-opacity group-hover:opacity-0" />

                  {/* Year Badge (Top-Right) */}
                  <div className="absolute top-3 right-3 rounded-md bg-black/70 px-2.5 py-1 text-xs font-mono font-medium text-white shadow-xs backdrop-blur-md">
                    2026
                  </div>

                  {/* Land-use Pill (Bottom-Left) */}
                  <div className="absolute bottom-3 left-3 rounded-full border border-white/60 bg-white/95 px-3 py-1 text-xs font-medium text-charcoal shadow-sm backdrop-blur-md">
                    After (Built-up / Plotting)
                  </div>
                </div>
              </div>
            ) : (
              /* Interactive Before/After Split Slider */
              <div
                className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-canvas-border/80 shadow-md select-none bg-[#1a2818]"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
                  setSliderPos((x / rect.width) * 100);
                }}
                onTouchMove={(e) => {
                  if (e.touches[0]) {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
                    setSliderPos((x / rect.width) * 100);
                  }
                }}
              >
                {/* 2026 Image (Underneath) */}
                <Image
                  src="/images/satellite-after-2026.jpg"
                  alt="Satellite 2026 after"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 right-3 rounded-md bg-black/70 px-2.5 py-1 text-xs font-mono font-medium text-white backdrop-blur-md z-10">
                  2026 (Built-up / Plotting)
                </div>

                {/* 2022 Image (Clipped Overlay) */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${sliderPos}%` }}
                >
                  <div className="relative h-full w-[100cqi] sm:w-[600px] lg:w-[720px] max-w-none">
                    <Image
                      src="/images/satellite-before-2022.jpg"
                      alt="Satellite 2022 before"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute top-3 left-3 rounded-md bg-black/70 px-2.5 py-1 text-xs font-mono font-medium text-white backdrop-blur-md z-10">
                    2022 (Agriculture)
                  </div>
                </div>

                {/* Slider divider line */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] z-20 pointer-events-none"
                  style={{ left: `${sliderPos}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-charcoal shadow-md font-mono text-[10px] font-bold">
                    ↔
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RealSatelliteEvidence;

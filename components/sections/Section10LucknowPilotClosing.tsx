"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, MapPin, Compass, ShieldCheck, Activity, Database } from "lucide-react";
import { LUCKNOW_PILOT } from "@/data/pilotData";

export const Section10LucknowPilotClosing: React.FC = () => {
  return (
    <section className="relative w-full border-t border-canvas-border bg-canvas-surface py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-3xl border border-canvas-border bg-canvas p-8 sm:p-12 lg:p-16 shadow-lg">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-center">
            {/* Left 7 Columns: Story & Mission */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2">
                <span className="h-px w-6 bg-charcoal-muted/60" />
                <span className="text-[11px] font-semibold tracking-wider text-charcoal-muted uppercase font-mono">
                  Initial District Pilot · Uttar Pradesh
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-charcoal leading-tight">
                <span>Start local. </span>
                <span className="font-serif italic text-walnut font-normal block sm:inline">
                  Understand the pattern.
                </span>
                <span className="block mt-1">Scale the method.</span>
              </h2>

              <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed max-w-xl">
                Bhurakshak starts with Lucknow not because it is unique, but because its rapid peri-urban conversion mirrors thousands of agricultural districts across India. By validating the evidence pipeline on the ground in Lucknow, we build the foundation for responsible nationwide monitoring.
              </p>

              {/* Geographic Hierarchy Breadcrumbs */}
              <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-charcoal-muted border-y border-canvas-border py-4">
                <span className="font-bold text-charcoal">INDIA</span>
                <span>→</span>
                <span className="font-bold text-charcoal">UTTAR PRADESH</span>
                <span>→</span>
                <span className="font-bold text-walnut bg-walnut/10 px-2 py-0.5 rounded">
                  LUCKNOW PILOT ({LUCKNOW_PILOT.coordinates.formatted})
                </span>
              </div>

              {/* Pilot Specifications Matrix */}
              <div className="grid grid-cols-3 gap-4 text-xs font-mono">
                <div>
                  <div className="text-charcoal-faint">DISTRICT AREA</div>
                  <div className="font-bold text-charcoal mt-0.5">2,528 sq km</div>
                </div>
                <div>
                  <div className="text-charcoal-faint">TEMPORAL WINDOW</div>
                  <div className="font-bold text-charcoal mt-0.5">2018–2026</div>
                </div>
                <div>
                  <div className="text-charcoal-faint">STATUS</div>
                  <div className="font-bold text-olive mt-0.5">Validation Candidate</div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link
                  href="/explore/lucknow"
                  className="inline-flex items-center gap-2 rounded-full bg-walnut px-7 py-3.5 text-sm font-medium text-white shadow-md hover:bg-walnut-hover transition-all"
                >
                  <span>Explore Lucknow Pilot Workspace</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/reports"
                  className="inline-flex items-center gap-2 rounded-full border border-canvas-border bg-canvas-surface px-5 py-3.5 text-sm font-medium text-charcoal hover:border-walnut transition-colors"
                >
                  <span>View Lucknow Change Report</span>
                </Link>
              </div>
            </div>

            {/* Right 5 Columns: Visual Pilot Miniature Card */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-canvas-border bg-canvas-surface p-6 shadow-sm space-y-5">
                <div className="flex items-center justify-between border-b border-canvas-border pb-3">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-olive opacity-75"></span>
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-olive"></span>
                    </span>
                    <span className="font-bold text-charcoal text-xs">
                      Lucknow Pilot Scope
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-charcoal-muted">
                    Sentinel-2 Tile T44RLP
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-center py-2 border-b border-canvas-border/70">
                    <span className="text-charcoal-muted">Primary Focus Basin</span>
                    <span className="font-semibold text-charcoal">Gomti River Valley</span>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b border-canvas-border/70">
                    <span className="text-charcoal-muted">High-Velocity Corridor</span>
                    <span className="font-semibold text-charcoal">Outer Ring Road (Kisan Path)</span>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b border-canvas-border/70">
                    <span className="text-charcoal-muted">Logged Change Events</span>
                    <span className="font-mono font-bold text-walnut">5 Verified Hotspots</span>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b border-canvas-border/70">
                    <span className="text-charcoal-muted">2030 Spatial Risk Zones</span>
                    <span className="font-mono font-bold text-risk-coral">3 Modelled Corridors</span>
                  </div>
                </div>

                <div className="rounded-lg bg-canvas p-3 font-mono text-[11px] text-charcoal-muted leading-relaxed">
                  Notice: All detections in Lucknow remain open for human ground-truth validation before statutory integration.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

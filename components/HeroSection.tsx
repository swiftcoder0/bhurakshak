"use client";

import React, { useState } from "react";
import { ArrowRight, Play, Sparkles, Layers } from "lucide-react";
import { IndiaVisualization } from "./IndiaVisualization";
import { SpecsStrip } from "./SpecsStrip";
import { EnginesModal } from "./EnginesModal";

interface HeroSectionProps {
  onExplorePilot: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExplorePilot }) => {
  const [isEnginesOpen, setIsEnginesOpen] = useState(false);

  return (
    <section className="relative w-full overflow-hidden px-4 pt-6 pb-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Editorial Eyebrow & Hero Header */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end mb-8">
          {/* Left Column: Editorial Headline & Copy */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2">
              <span className="h-px w-6 bg-charcoal-muted/60" />
              <span className="text-[11px] font-semibold tracking-wider text-charcoal-muted uppercase">
                A Data-Driven View of a Changing India
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-medium leading-[1.08] tracking-tight text-charcoal">
              <span>India’s land </span>
              <span className="block sm:inline">is </span>
              <span className="font-serif italic font-normal text-walnut">
                changing.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-charcoal-muted max-w-xl font-normal leading-relaxed">
              See where. Understand why. Measure what it means.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExplorePilot}
                className="inline-flex items-center gap-2 rounded-full bg-walnut px-6 py-3 text-sm font-medium text-white shadow-sm transition-all hover:bg-walnut-hover hover:gap-2.5 active:scale-[0.99]"
              >
                <span>Explore Lucknow Pilot</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                id="six-engines-trigger"
                onClick={() => setIsEnginesOpen(true)}
                className="inline-flex items-center gap-2.5 rounded-full border border-canvas-border bg-canvas-surface/80 px-4 py-3 text-sm font-medium text-charcoal transition-all hover:bg-canvas-border/40 hover:text-walnut"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-canvas-border/60 text-walnut">
                  <Play className="h-3 w-3 fill-walnut" />
                </span>
                <span>How it works (6 Engines)</span>
              </button>
            </div>
          </div>

          {/* Right Column Context Note */}
          <div className="hidden lg:block lg:col-span-5 lg:pb-3">
            <div className="rounded-xl border border-canvas-border/80 bg-canvas-surface/60 p-4 text-xs leading-relaxed text-charcoal-muted">
              <div className="font-semibold text-charcoal flex items-center gap-1.5 mb-1">
                <span className="h-1.5 w-1.5 rounded-full bg-olive" />
                Evidence-Led Earth Observation
              </div>
              Bhurakshak turns multi-temporal Sentinel-2 imagery and Dynamic World data into an understandable evidence chain across Uttar Pradesh, prioritizing honest uncertainty over exaggerated AI claims.
            </div>
          </div>
        </div>

        {/* Centerpiece: 3D Orbital India Visualization */}
        <div className="w-full mb-10">
          <IndiaVisualization onExplorePilot={onExplorePilot} />
        </div>

        {/* Honest Specifications Strip */}
        <div className="w-full">
          <SpecsStrip />
        </div>
      </div>

      {/* 6 Engines Interactive Walkthrough Modal */}
      <EnginesModal
        isOpen={isEnginesOpen}
        onClose={() => setIsEnginesOpen(false)}
      />
    </section>
  );
};

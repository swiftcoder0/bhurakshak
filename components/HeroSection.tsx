"use client";

import React, { useState } from "react";
import { ArrowRight, Satellite, Grid, MapPin, Activity } from "lucide-react";
import { IndiaVisualization } from "./IndiaVisualization";
import { EnginesModal } from "./EnginesModal";

interface HeroSectionProps {
  onExplorePilot: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExplorePilot }) => {
  const [isEnginesOpen, setIsEnginesOpen] = useState(false);

  const scrollToExplore = () => {
    const el = document.getElementById("explore-3d-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      onExplorePilot();
    }
  };

  const scrollToExplanation = () => {
    const el = document.getElementById("what-is-bhurakshak");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      setIsEnginesOpen(true);
    }
  };

  return (
    <section className="relative w-full overflow-hidden px-4 pt-4 pb-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Two-Column Hero: Headline (Left) & 3D Earth (Right) */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-6 space-y-6">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[76px] font-medium leading-[1.05] tracking-tight text-charcoal font-sans">
              <span>India’s</span>
              <br />
              <span>land is </span>
              <span className="font-serif italic font-normal text-walnut">
                changing.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-charcoal/80 max-w-xl font-normal leading-relaxed">
              Bhurakshak monitors agricultural land across India, detects
              meaningful land-use change, measures the area affected and helps
              explain what happened.
            </p>

            {/* Hero Action Buttons (Exact Match to Mockup) */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={scrollToExplore}
                className="inline-flex items-center gap-2 rounded-full bg-walnut px-7 py-3 text-sm font-medium text-white shadow-xs transition-all hover:bg-walnut-hover hover:gap-2.5 active:scale-[0.99]"
              >
                <span>Explore India</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={scrollToExplanation}
                className="inline-flex items-center gap-2 rounded-full border border-canvas-border bg-[#FDFCF9] px-6 py-3 text-sm font-medium text-charcoal transition-all hover:bg-white hover:text-walnut shadow-2xs active:scale-[0.99]"
              >
                <span>See How It Works</span>
              </button>
            </div>

            {/* 4 Capability Badges (Exact Match to Mockup) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-canvas-border/70">
              {/* 1. Satellite Observation */}
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-walnut">
                  <Satellite className="h-4 w-4 text-walnut shrink-0" />
                  <span className="text-xs font-semibold font-sans text-charcoal leading-tight">
                    Satellite Observation
                  </span>
                </div>
                <p className="text-[11px] font-mono text-charcoal-muted leading-tight">
                  Sentinel-2 & Sentinel-1
                </p>
              </div>

              {/* 2. 10m Land-cover Data */}
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-walnut">
                  <Grid className="h-4 w-4 text-walnut shrink-0" />
                  <span className="text-xs font-semibold font-sans text-charcoal leading-tight">
                    10 m Land-cover Data
                  </span>
                </div>
                <p className="text-[11px] font-mono text-charcoal-muted leading-tight">
                  Dynamic World
                </p>
              </div>

              {/* 3. India-wide Monitoring */}
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-walnut">
                  <MapPin className="h-4 w-4 text-walnut shrink-0" />
                  <span className="text-xs font-semibold font-sans text-charcoal leading-tight">
                    India-wide Monitoring
                  </span>
                </div>
                <p className="text-[11px] font-mono text-charcoal-muted leading-tight">
                  States & Districts
                </p>
              </div>

              {/* 4. Real Change Detection */}
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-walnut">
                  <Activity className="h-4 w-4 text-walnut shrink-0" />
                  <span className="text-xs font-semibold font-sans text-charcoal leading-tight">
                    Real Change Detection
                  </span>
                </div>
                <p className="text-[11px] font-mono text-charcoal-muted leading-tight">
                  Agriculture → Built-up
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Cesium Earth Visual */}
          <div className="lg:col-span-6 w-full">
            <div className="relative w-full">
              <IndiaVisualization
                onExplorePilot={onExplorePilot}
                variant="hero"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Engines Modal Walkthrough */}
      <EnginesModal
        isOpen={isEnginesOpen}
        onClose={() => setIsEnginesOpen(false)}
      />
    </section>
  );
};

export default HeroSection;

"use client";

import React from "react";
import { ArrowRight, Compass } from "lucide-react";
import { IndiaVisualization } from "../IndiaVisualization";

interface ExploreIn3DProps {
  onExplorePilot: () => void;
}

export const ExploreIn3D: React.FC<ExploreIn3DProps> = ({ onExplorePilot }) => {
  return (
    <section
      id="explore"
      className="relative w-full overflow-hidden px-4 py-20 sm:px-6 lg:px-8 border-t border-canvas-border/70 scroll-mt-16"
    >
      <span id="explore-3d-section" className="absolute -top-16 opacity-0 pointer-events-none" />
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Editorial Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2">
              <span className="h-px w-6 bg-charcoal-muted/60" />
              <span className="text-xs font-mono uppercase tracking-widest text-charcoal-muted font-semibold">
                EXPLORE IN 3D
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-[52px] font-bold text-charcoal leading-[1.12] tracking-tight font-sans">
              <span>See the Changes</span>
              <br />
              <span className="text-walnut">Across India</span>
            </h2>

            <p className="text-base sm:text-lg text-charcoal/80 leading-relaxed font-normal max-w-md">
              Explore a 3D Earth map to view land-use change hotspots, zoom into
              states and districts, and see real satellite evidence.
            </p>

            <div className="pt-2">
              <button
                onClick={onExplorePilot}
                className="inline-flex items-center gap-2 rounded-full bg-walnut px-7 py-3 text-sm font-medium text-white shadow-xs transition-all hover:bg-walnut-hover hover:gap-2.5 active:scale-[0.99]"
              >
                <span>Explore the 3D Map</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <div className="pt-6 border-t border-canvas-border/60">
              <div className="flex items-center gap-3 text-xs text-charcoal-muted">
                <Compass className="h-4 w-4 text-olive shrink-0" />
                <span>
                  Interactive multi-scale view · Search any of 700+ Indian districts · ISRIC SoilGrids WRB classification
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Embedded Cesium 3D Globe Explorer */}
          <div className="lg:col-span-7 w-full">
            <IndiaVisualization
              onExplorePilot={onExplorePilot}
              variant="explorer"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreIn3D;

"use client";

import React, { useState } from "react";
import { LUCKNOW_PILOT } from "@/data/pilotData";
import { MapPin, ExternalLink } from "lucide-react";

interface LucknowMarkerProps {
  onExplore: () => void;
}

export const LucknowMarker: React.FC<LucknowMarkerProps> = ({ onExplore }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{ left: "54.6%", top: "38.8%" }}
      className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Calm, elegant radar pulse circle */}
      <div className="absolute -inset-3 rounded-full border border-olive/50 bg-olive/15 animate-radar pointer-events-none" />

      {/* Center Geographic Anchor Point */}
      <button
        onClick={onExplore}
        className="relative flex h-3.5 w-3.5 items-center justify-center rounded-full bg-walnut text-white shadow-md ring-2 ring-white/90 transition-transform hover:scale-125 focus:outline-none"
        title="Lucknow Pilot: 26.8467° N, 80.9462° E"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-olive-light" />
      </button>

      {/* Restrained Editorial Callout */}
      <div
        className={`absolute left-5 top-1/2 -translate-y-1/2 transition-all duration-300 pointer-events-auto ${
          isHovered ? "opacity-100 scale-100" : "opacity-95"
        }`}
      >
        <div className="w-56 rounded-md border border-canvas-border/90 bg-canvas-surface/95 p-2.5 shadow-md backdrop-blur-md">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-olive">
              <span className="h-1.5 w-1.5 rounded-full bg-olive"></span>
              Pilot Candidate
            </span>
            <span className="font-mono text-[10px] text-charcoal-muted">
              UP-LKO
            </span>
          </div>

          <div className="mt-1 text-xs font-semibold text-charcoal">
            {LUCKNOW_PILOT.district}, Uttar Pradesh
          </div>

          <div className="mt-0.5 font-mono text-[10px] text-charcoal-muted">
            {LUCKNOW_PILOT.coordinates.formatted}
          </div>

          <div className="mt-1.5 flex items-center justify-between border-t border-canvas-border/60 pt-1.5 text-[10px] text-charcoal-muted">
            <span>{LUCKNOW_PILOT.focusCorridor}</span>
            <button
              onClick={onExplore}
              className="inline-flex items-center gap-0.5 font-medium text-walnut hover:text-walnut-hover transition-colors"
            >
              <span>Inspect</span>
              <ExternalLink className="h-2.5 w-2.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

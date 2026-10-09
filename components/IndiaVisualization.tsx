"use client";

import React from "react";
import dynamic from "next/dynamic";

const CesiumGlobe = dynamic(
  async () => {
    try {
      return await import("./CesiumGlobe");
    } catch (err) {
      console.warn("[Bhurakshak] Initial CesiumGlobe chunk load interrupted, retrying...", err);
      await new Promise((r) => setTimeout(r, 1200));
      return await import("./CesiumGlobe");
    }
  },
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full min-h-[460px] flex-col items-center justify-center bg-[#F7F4EE] text-charcoal">
        <div className="flex items-center gap-2 font-mono text-xs text-charcoal">
          <span className="h-2 w-2 rounded-full bg-olive animate-ping" />
          <span>Initializing India 3D Earth...</span>
        </div>
        <span className="font-mono text-[10px] text-charcoal-muted mt-1">
          Loading Earth-Observation & Land Change Layers
        </span>
      </div>
    ),
  }
);

interface IndiaVisualizationProps {
  onExplorePilot?: () => void;
  variant?: "hero" | "explorer";
}

export const IndiaVisualization: React.FC<IndiaVisualizationProps> = ({
  onExplorePilot,
  variant = "explorer",
}) => {
  return (
    <div
      className={`relative w-full overflow-hidden ${
        variant === "hero"
          ? "rounded-3xl border border-canvas-border/70 bg-[#F7F4EE] shadow-sm"
          : "rounded-2xl border border-canvas-border/80 bg-[#F7F4EE] shadow-md"
      }`}
    >
      <div
        className={`relative w-full ${
          variant === "hero"
            ? "aspect-[1/1] sm:aspect-[4/3] lg:aspect-[1/1] min-h-[420px] max-h-[580px]"
            : "aspect-[16/10] sm:aspect-[16/9] min-h-[500px] max-h-[660px]"
        }`}
      >
        <CesiumGlobe onExplorePilot={onExplorePilot} variant={variant} />
      </div>
    </div>
  );
};

export default IndiaVisualization;

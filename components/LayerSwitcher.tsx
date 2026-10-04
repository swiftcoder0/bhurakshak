"use client";

import React from "react";
import { Layers, Activity, AlertTriangle } from "lucide-react";

export type MapLayer = "baseline" | "change" | "risk";

interface LayerSwitcherProps {
  activeLayer: MapLayer;
  onLayerChange: (layer: MapLayer) => void;
}

export const LayerSwitcher: React.FC<LayerSwitcherProps> = ({
  activeLayer,
  onLayerChange,
}) => {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between px-1">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-charcoal-muted">
          Active Layer
        </span>
        {activeLayer !== "baseline" && (
          <span className="font-mono text-[9px] uppercase tracking-wider text-risk-coral font-medium">
            Demo State
          </span>
        )}
      </div>

      <div className="inline-flex rounded-lg border border-canvas-border bg-canvas-surface/90 p-1 shadow-sm backdrop-blur-sm">
        <button
          onClick={() => onLayerChange("baseline")}
          className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-all ${
            activeLayer === "baseline"
              ? "bg-walnut text-white shadow-xs"
              : "text-charcoal-muted hover:text-charcoal"
          }`}
        >
          <Layers className="h-3.5 w-3.5" />
          <span>Baseline</span>
        </button>

        <button
          onClick={() => onLayerChange("change")}
          className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-all ${
            activeLayer === "change"
              ? "bg-walnut text-white shadow-xs"
              : "text-charcoal-muted hover:text-charcoal"
          }`}
        >
          <Activity className="h-3.5 w-3.5" />
          <span>Change Events</span>
        </button>

        <button
          onClick={() => onLayerChange("risk")}
          className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-all ${
            activeLayer === "risk"
              ? "bg-walnut text-white shadow-xs"
              : "text-charcoal-muted hover:text-charcoal"
          }`}
        >
          <AlertTriangle className="h-3.5 w-3.5" />
          <span>2030 Risk</span>
        </button>
      </div>
    </div>
  );
};

import React from "react";
import { Database } from "lucide-react";

export const DatasetStamp: React.FC = () => {
  return (
    <div className="inline-flex items-center gap-2 rounded border border-canvas-border/80 bg-canvas-surface/85 px-2.5 py-1 backdrop-blur-sm shadow-xs">
      <Database className="h-3 w-3 text-charcoal-muted" />
      <span className="font-mono text-[11px] tracking-tight text-charcoal/80">
        COPERNICUS/S2_SR · DYNAMIC_WORLD_V1 · 10m Res
      </span>
    </div>
  );
};

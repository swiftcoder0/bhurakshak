import React from "react";
import { HONEST_SPECS } from "@/data/specsData";

export const SpecsStrip: React.FC = () => {
  return (
    <div id="specs" className="w-full border-y border-canvas-border/80 py-5">
      <div className="grid grid-cols-2 gap-y-6 sm:grid-cols-3 lg:grid-cols-5 divide-y-0 sm:divide-x divide-canvas-border/70">
        {HONEST_SPECS.map((spec, index) => (
          <div
            key={index}
            className={`flex flex-col justify-between ${
              index === 0 ? "sm:pl-0" : "sm:pl-5"
            } pr-4`}
          >
            <div>
              <div className="text-xl font-bold tracking-tight text-charcoal lg:text-2xl font-sans">
                {spec.metric}
              </div>
              <div className="mt-0.5 text-xs font-semibold text-charcoal/90">
                {spec.label}
              </div>
            </div>
            <div className="mt-2 text-[11px] leading-relaxed text-charcoal-muted">
              {spec.detail}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

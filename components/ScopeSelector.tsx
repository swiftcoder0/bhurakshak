"use client";

import React from "react";

export type GeographicScope = "india" | "state" | "district" | "block" | "village";

interface ScopeSelectorProps {
  currentScope: GeographicScope;
  onScopeChange: (scope: GeographicScope) => void;
}

const SCOPES: { id: GeographicScope; label: string; available: boolean }[] = [
  { id: "india", label: "India", available: true },
  { id: "state", label: "State", available: true },
  { id: "district", label: "District (Lucknow Pilot)", available: true },
  { id: "block", label: "Block", available: false },
  { id: "village", label: "Village", available: false },
];

export const ScopeSelector: React.FC<ScopeSelectorProps> = ({
  currentScope,
  onScopeChange,
}) => {
  return (
    <div className="w-52 rounded-lg border border-canvas-border/80 bg-canvas-surface/85 p-3 backdrop-blur-sm shadow-xs transition-all">
      <div className="text-[10px] font-semibold uppercase tracking-wider text-charcoal-muted">
        Explore Granularity
      </div>
      <p className="mt-0.5 text-[11px] leading-snug text-charcoal-muted">
        Geographic level for land observation & risk analysis.
      </p>

      <div className="mt-2.5 flex flex-col gap-1.5">
        {SCOPES.map((scope) => {
          const isActive = currentScope === scope.id;
          return (
            <button
              key={scope.id}
              onClick={() => {
                if (scope.available) onScopeChange(scope.id);
              }}
              disabled={!scope.available}
              className={`flex items-center gap-2 text-left text-xs transition-colors ${
                isActive
                  ? "font-semibold text-charcoal"
                  : scope.available
                  ? "text-charcoal-muted hover:text-charcoal"
                  : "text-charcoal-faint cursor-not-allowed opacity-60"
              }`}
            >
              <span
                className={`relative flex h-3 w-3 items-center justify-center rounded-full border transition-all ${
                  isActive
                    ? "border-walnut bg-walnut/10"
                    : "border-canvas-border bg-white"
                }`}
              >
                {isActive && (
                  <span className="h-1.5 w-1.5 rounded-full bg-walnut"></span>
                )}
              </span>
              <span>{scope.label}</span>
              {!scope.available && (
                <span className="ml-auto text-[9px] font-mono uppercase text-charcoal-faint">
                  Soon
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

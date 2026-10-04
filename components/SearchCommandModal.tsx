"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, X, MapPin, Activity, Database, ArrowRight, FileText } from "lucide-react";
import { CHANGE_EVENTS } from "@/data/changeEvents";
import { DATASETS } from "@/data/datasets";

interface SearchCommandModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchCommandModal: React.FC<SearchCommandModalProps> = ({
  isOpen,
  onClose,
}) => {
  const router = useRouter();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        // toggle if handled globally
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredEvents = CHANGE_EVENTS.filter(
    (ev) =>
      ev.code.toLowerCase().includes(query.toLowerCase()) ||
      ev.title.toLowerCase().includes(query.toLowerCase()) ||
      ev.category.toLowerCase().includes(query.toLowerCase())
  );

  const filteredDatasets = DATASETS.filter(
    (ds) =>
      ds.name.toLowerCase().includes(query.toLowerCase()) ||
      ds.code.toLowerCase().includes(query.toLowerCase()) ||
      ds.provider.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelectRoute = (path: string) => {
    onClose();
    router.push(path);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-charcoal/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl border border-canvas-border bg-canvas-surface shadow-2xl">
        {/* Search Input Bar */}
        <div className="flex items-center border-b border-canvas-border px-4 py-3.5">
          <Search className="h-5 w-5 text-charcoal-muted mr-3 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search state, district, change event, dataset or coordinates..."
            className="w-full bg-transparent text-sm text-charcoal placeholder:text-charcoal-faint focus:outline-none"
            autoFocus
          />
          {query ? (
            <button
              onClick={() => setQuery("")}
              className="text-xs text-charcoal-muted hover:text-charcoal"
            >
              Clear
            </button>
          ) : (
            <kbd className="rounded border border-canvas-border bg-canvas px-1.5 py-0.5 text-[10px] font-mono text-charcoal-muted">
              ESC
            </kbd>
          )}
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {/* Quick Nav Suggestions */}
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-charcoal-muted font-mono mb-2">
              Core Navigation
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => handleSelectRoute("/explore/lucknow")}
                className="flex items-center gap-2 rounded-lg border border-canvas-border bg-canvas/60 p-2 text-left text-xs hover:border-walnut hover:bg-canvas transition-colors"
              >
                <MapPin className="h-3.5 w-3.5 text-olive shrink-0" />
                <span className="truncate font-medium text-charcoal">Lucknow Pilot</span>
              </button>
              <button
                onClick={() => handleSelectRoute("/events")}
                className="flex items-center gap-2 rounded-lg border border-canvas-border bg-canvas/60 p-2 text-left text-xs hover:border-walnut hover:bg-canvas transition-colors"
              >
                <Activity className="h-3.5 w-3.5 text-risk-amber shrink-0" />
                <span className="truncate font-medium text-charcoal">Change Ledger</span>
              </button>
              <button
                onClick={() => handleSelectRoute("/methodology")}
                className="flex items-center gap-2 rounded-lg border border-canvas-border bg-canvas/60 p-2 text-left text-xs hover:border-walnut hover:bg-canvas transition-colors"
              >
                <FileText className="h-3.5 w-3.5 text-walnut shrink-0" />
                <span className="truncate font-medium text-charcoal">6 Engines</span>
              </button>
              <button
                onClick={() => handleSelectRoute("/datasets")}
                className="flex items-center gap-2 rounded-lg border border-canvas-border bg-canvas/60 p-2 text-left text-xs hover:border-walnut hover:bg-canvas transition-colors"
              >
                <Database className="h-3.5 w-3.5 text-charcoal shrink-0" />
                <span className="truncate font-medium text-charcoal">Datasets</span>
              </button>
            </div>
          </div>

          {/* Change Events Results */}
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-charcoal-muted font-mono mb-2">
              Change Events ({filteredEvents.length})
            </div>
            <div className="space-y-1.5">
              {filteredEvents.map((ev) => (
                <button
                  key={ev.id}
                  onClick={() => handleSelectRoute(`/events/${ev.id}`)}
                  className="flex w-full items-center justify-between rounded-lg border border-transparent p-2.5 text-left text-xs hover:border-canvas-border hover:bg-canvas transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-semibold text-walnut bg-canvas-border/40 px-1.5 py-0.5 rounded text-[11px]">
                      {ev.code}
                    </span>
                    <div>
                      <div className="font-medium text-charcoal group-hover:text-walnut transition-colors">
                        {ev.title}
                      </div>
                      <div className="text-[11px] text-charcoal-muted">
                        {ev.transition} · {ev.areaHa} ha
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-charcoal-muted font-mono text-[11px]">
                    <span>{ev.location.district}</span>
                    <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Datasets Results */}
          {filteredDatasets.length > 0 && (
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-charcoal-muted font-mono mb-2">
                Geospatial Datasets ({filteredDatasets.length})
              </div>
              <div className="space-y-1.5">
                {filteredDatasets.slice(0, 3).map((ds) => (
                  <button
                    key={ds.id}
                    onClick={() => handleSelectRoute("/datasets")}
                    className="flex w-full items-center justify-between rounded-lg border border-transparent p-2.5 text-left text-xs hover:border-canvas-border hover:bg-canvas transition-all group"
                  >
                    <div>
                      <div className="font-medium text-charcoal group-hover:text-walnut transition-colors">
                        {ds.name}
                      </div>
                      <div className="font-mono text-[10px] text-charcoal-muted">
                        {ds.code} · {ds.spatialResolution}
                      </div>
                    </div>
                    <span className="rounded border px-2 py-0.5 text-[10px] font-mono border-canvas-border bg-canvas-surface">
                      {ds.status}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-canvas-border bg-canvas/40 px-4 py-2.5 text-[11px] text-charcoal-muted font-mono">
          <span>Search index updated for Lucknow pilot</span>
          <span>Press ESC to dismiss</span>
        </div>
      </div>
    </div>
  );
};

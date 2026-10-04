"use client";

import React, { useState } from "react";
import Image from "next/image";
import { LucknowMarker } from "./LucknowMarker";
import { LayerSwitcher, MapLayer } from "./LayerSwitcher";
import { ScopeSelector, GeographicScope } from "./ScopeSelector";
import { DatasetStamp } from "./DatasetStamp";
import {
  DEMO_CHANGE_HOTSPOTS,
  DEMO_RISK_ZONES,
  DemoHotspot,
} from "@/data/pilotData";
import { Info } from "lucide-react";

interface IndiaVisualizationProps {
  onExplorePilot: () => void;
}

export const IndiaVisualization: React.FC<IndiaVisualizationProps> = ({
  onExplorePilot,
}) => {
  const [activeLayer, setActiveLayer] = useState<MapLayer>("baseline");
  const [currentScope, setCurrentScope] = useState<GeographicScope>("india");
  const [selectedHotspot, setSelectedHotspot] = useState<DemoHotspot | null>(null);

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-canvas-border bg-[#0B1522] shadow-xl">
      {/* 3D Orbital Terrain Centerpiece */}
      <div className="relative aspect-[16/9] w-full min-h-[460px] sm:min-h-[520px] lg:min-h-[580px]">
        <Image
          src="/india-3d.webp"
          alt="3D satellite elevation relief visualization of the Indian subcontinent showing Himalayan mountains, Indo-Gangetic basin and Deccan plateau"
          fill
          priority
          sizes="(max-width: 1280px) 100vw, 1280px"
          className="object-cover object-center select-none"
        />

        {/* Subtle Atmospheric & Vignette Blending */}
        <div className="pointer-events-none absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/30" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0B1522]/80 to-transparent" />

        {/* Subtle Cartographic Graticule Grid Lines (Non-intrusive, restrained) */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full opacity-20"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Latitude parallels */}
          <line
            x1="0%"
            y1="28%"
            x2="100%"
            y2="28%"
            stroke="white"
            strokeWidth="0.75"
            strokeDasharray="4 6"
          />
          <line
            x1="0%"
            y1="46%"
            x2="100%"
            y2="46%"
            stroke="white"
            strokeWidth="0.75"
            strokeDasharray="4 6"
          />
          <line
            x1="0%"
            y1="68%"
            x2="100%"
            y2="68%"
            stroke="white"
            strokeWidth="0.75"
            strokeDasharray="4 6"
          />

          {/* Longitude meridians */}
          <line
            x1="32%"
            y1="0%"
            x2="32%"
            y2="100%"
            stroke="white"
            strokeWidth="0.75"
            strokeDasharray="4 6"
          />
          <line
            x1="54%"
            y1="0%"
            x2="54%"
            y2="100%"
            stroke="white"
            strokeWidth="0.75"
            strokeDasharray="4 6"
          />
          <line
            x1="76%"
            y1="0%"
            x2="76%"
            y2="100%"
            stroke="white"
            strokeWidth="0.75"
            strokeDasharray="4 6"
          />

          {/* Micro coordinate labels along border */}
          <text x="12" y="27%" fill="white" fontSize="9" fontFamily="monospace" opacity="0.6">
            32°N
          </text>
          <text x="12" y="45%" fill="white" fontSize="9" fontFamily="monospace" opacity="0.6">
            24°N
          </text>
          <text x="12" y="67%" fill="white" fontSize="9" fontFamily="monospace" opacity="0.6">
            16°N
          </text>
          <text x="54.5%" y="20" fill="white" fontSize="9" fontFamily="monospace" opacity="0.6">
            80°E
          </text>
        </svg>

        {/* Lucknow Pilot Anchor Marker */}
        <LucknowMarker onExplore={onExplorePilot} />

        {/* Active Layer Demo Overlays */}
        {activeLayer === "change" && (
          <div className="absolute inset-0 pointer-events-auto">
            {DEMO_CHANGE_HOTSPOTS.map((hotspot) => (
              <div
                key={hotspot.id}
                style={{
                  left: `${hotspot.xPercent}%`,
                  top: `${hotspot.yPercent}%`,
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
              >
                <button
                  onClick={() => setSelectedHotspot(hotspot)}
                  className="group relative flex items-center justify-center"
                >
                  <span className="absolute h-5 w-5 rounded-full bg-risk-amber/30 animate-ping" />
                  <span className="relative h-2.5 w-2.5 rounded-full bg-risk-amber ring-2 ring-white/90" />
                  <span className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-charcoal/90 px-1.5 py-0.5 text-[9px] font-mono text-white opacity-0 transition-opacity group-hover:opacity-100">
                    {hotspot.label}
                  </span>
                </button>
              </div>
            ))}
          </div>
        )}

        {activeLayer === "risk" && (
          <div className="absolute inset-0 pointer-events-auto">
            {DEMO_RISK_ZONES.map((zone) => (
              <div
                key={zone.id}
                style={{
                  left: `${zone.xPercent}%`,
                  top: `${zone.yPercent}%`,
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
              >
                <button
                  onClick={() => setSelectedHotspot(zone)}
                  className="group relative flex items-center justify-center"
                >
                  <span className="absolute h-6 w-6 rounded-full bg-risk-coral/30 animate-pulse" />
                  <span className="relative h-3 w-3 rounded-full bg-risk-coral ring-2 ring-white" />
                  <span className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-charcoal/90 px-1.5 py-0.5 text-[9px] font-mono text-white opacity-0 transition-opacity group-hover:opacity-100">
                    {zone.label}
                  </span>
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Selected Hotspot Drawer Note if clicked */}
        {selectedHotspot && (
          <div className="absolute bottom-16 left-6 z-30 max-w-xs rounded-lg border border-canvas-border bg-canvas-surface/95 p-3 shadow-lg backdrop-blur-md">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[9px] uppercase tracking-wider text-charcoal-muted">
                DEMO STATE · NOT LIVE
              </span>
              <button
                onClick={() => setSelectedHotspot(null)}
                className="text-xs text-charcoal-muted hover:text-charcoal"
              >
                ✕
              </button>
            </div>
            <div className="mt-1 text-xs font-semibold text-charcoal">
              {selectedHotspot.name}
            </div>
            <div className="mt-0.5 text-[11px] text-charcoal-muted">
              {selectedHotspot.label}
            </div>
            {selectedHotspot.transition && (
              <div className="mt-1 font-mono text-[10px] text-walnut">
                Transition: {selectedHotspot.transition}
              </div>
            )}
          </div>
        )}

        {/* Top Controls Bar */}
        <div className="absolute left-4 top-4 z-20 flex flex-wrap items-start gap-3 sm:left-6 sm:top-6">
          <LayerSwitcher
            activeLayer={activeLayer}
            onLayerChange={setActiveLayer}
          />
        </div>

        {/* Right Scope Selector (Matching Reference) */}
        <div className="absolute right-4 top-4 z-20 hidden md:block sm:right-6 sm:top-6">
          <ScopeSelector
            currentScope={currentScope}
            onScopeChange={setCurrentScope}
          />
        </div>

        {/* Bottom Metadata & System Annotation Bar */}
        <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-col gap-2 sm:bottom-5 sm:left-6 sm:right-6 sm:flex-row sm:items-center sm:justify-between">
          <DatasetStamp />

          <div className="flex items-center gap-2">
            {activeLayer !== "baseline" && (
              <div className="flex items-center gap-1.5 rounded border border-risk-amber/40 bg-charcoal/80 px-2 py-0.5 text-[10px] font-mono text-white/90 backdrop-blur-sm">
                <Info className="h-3 w-3 text-risk-amber" />
                <span>Simulated analytical layer (Prototype)</span>
              </div>
            )}
            <div className="font-mono text-[10px] tracking-tight text-white/60">
              EPSG:4326 · Low Earth Orbit Perspective
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

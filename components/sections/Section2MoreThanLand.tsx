"use client";

import React, { useState } from "react";
import { Wheat, Users, Droplets, Building2, Layers, ArrowRight } from "lucide-react";

interface LandPillar {
  id: string;
  title: string;
  devanagari: string;
  tagline: string;
  description: string;
  evidenceMetric: string;
  spatialSignal: string;
  icon: React.ElementType;
  gradient: string;
}

const PILLARS: LandPillar[] = [
  {
    id: "food",
    title: "Food Security",
    devanagari: "खाद्य सुरक्षा",
    tagline: "Land produces the food India depends on.",
    description:
      "Arable alluvial soil in the Indo-Gangetic basin supports multi-season Kharif (paddy) and Rabi (wheat/pulses) harvests. Every converted hectare permanently extinguishes agricultural yields.",
    evidenceMetric: "2.4M+ sq km monitored across double-cropped baselines",
    spatialSignal: "NDVI seasonal amplitude & phenological curves",
    icon: Wheat,
    gradient: "from-amber-900/10 via-emerald-950/5 to-transparent",
  },
  {
    id: "livelihoods",
    title: "Rural Livelihoods",
    devanagari: "आजीविका",
    tagline: "It supports millions of agrarian families.",
    description:
      "Land fragmentation and peri-urban speculation displace tenant cultivators and agricultural wage-earners before planned infrastructure absorbs local labor.",
    evidenceMetric: "700K+ villages integrated into spatial monitoring scope",
    spatialSignal: "Cadastral subdivision & perimeter bunding detection",
    icon: Users,
    gradient: "from-stone-900/10 via-amber-950/5 to-transparent",
  },
  {
    id: "environment",
    title: "Ecological Systems",
    devanagari: "पारिस्थितिकी",
    tagline: "It stores water, moderates heat, and sustains aquifers.",
    description:
      "Natural wetlands, oxbow lakes, and riparian groves around the Gomti River buffer seasonal flood surges and recharge groundwater across Lucknow.",
    evidenceMetric: "48.6 ha seasonal water detention margin variance tracked",
    spatialSignal: "MNDWI water boundary shrinkage & canopy EVI",
    icon: Droplets,
    gradient: "from-blue-950/10 via-teal-950/5 to-transparent",
  },
  {
    id: "development",
    title: "Planned Urban Growth",
    devanagari: "विकास",
    tagline: "It dictates how and where our cities expand.",
    description:
      "Balancing rapid economic infrastructure with ecological conservation requires transparent spatial tracking of ribbons, ring roads, and industrial clusters.",
    evidenceMetric: "31.4% built-up impervious growth along Outer Ring Road",
    spatialSignal: "NDBI built reflectance & SAR double-bounce radar",
    icon: Building2,
    gradient: "from-walnut/10 via-stone-950/5 to-transparent",
  },
];

export const Section2MoreThanLand: React.FC = () => {
  const [activePillar, setActivePillar] = useState<string>("food");

  return (
    <section className="relative w-full border-t border-canvas-border bg-canvas-surface/60 py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 mb-12">
          <div className="flex items-center gap-2">
            <span className="h-px w-6 bg-charcoal-muted/60" />
            <span className="text-[11px] font-semibold tracking-wider text-charcoal-muted uppercase font-mono">
              The Bigger Picture
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-charcoal leading-tight">
            <span>Land is </span>
            <span className="font-serif italic text-walnut font-normal">
              more than just land.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed max-w-2xl">
            It produces food. It supports livelihoods. It stores water. It moderates regional temperatures. It dictates how our cities expand. When land changes, the consequence ripples far beyond administrative boundaries.
          </p>
        </div>

        {/* Visual Transformation Flow: LAND → COVER → USE → CHANGE → IMPACT */}
        <div className="mb-12 rounded-xl border border-canvas-border bg-canvas p-4 sm:p-6">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-charcoal-muted font-mono mb-3">
            Analytical Layer Decomposition
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-5 text-center">
            {[
              { step: "01", label: "LAND", desc: "Topographic & Cadastre Surface" },
              { step: "02", label: "COVER", desc: "Biophysical Spectral Signature" },
              { step: "03", label: "USE", desc: "Human Agro-Economic Function" },
              { step: "04", label: "CHANGE", desc: "Temporal Index Transition" },
              { step: "05", label: "IMPACT", desc: "Ecological & Societal Imprint" },
            ].map((node, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center rounded-lg border border-canvas-border/80 bg-canvas-surface p-3 transition-transform hover:-translate-y-0.5"
              >
                <span className="font-mono text-[10px] text-walnut font-bold">
                  {node.step}
                </span>
                <span className="text-xs font-bold text-charcoal mt-0.5 tracking-wide">
                  {node.label}
                </span>
                <span className="text-[10px] text-charcoal-muted mt-1 leading-snug">
                  {node.desc}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Four Core Pillars Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            const isSelected = activePillar === pillar.id;

            return (
              <div
                key={pillar.id}
                onClick={() => setActivePillar(pillar.id)}
                className={`group relative flex flex-col justify-between rounded-xl border p-6 transition-all cursor-pointer ${
                  isSelected
                    ? "border-walnut bg-canvas-surface shadow-md"
                    : "border-canvas-border bg-canvas-surface/70 hover:border-canvas-border hover:bg-canvas-surface hover:shadow-xs"
                }`}
              >
                {/* Header */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${
                        isSelected
                          ? "border-walnut bg-walnut text-white"
                          : "border-canvas-border bg-canvas text-charcoal group-hover:border-walnut/50"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-sans text-charcoal-faint">
                      {pillar.devanagari}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-charcoal group-hover:text-walnut transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="mt-1 text-xs font-serif italic text-charcoal/80">
                    &ldquo;{pillar.tagline}&rdquo;
                  </p>

                  <p className="mt-3 text-xs leading-relaxed text-charcoal-muted">
                    {pillar.description}
                  </p>
                </div>

                {/* Spatial Metadata Footer */}
                <div className="mt-6 border-t border-canvas-border/80 pt-3 space-y-1.5 font-mono text-[10px]">
                  <div className="text-walnut font-semibold">
                    {pillar.evidenceMetric}
                  </div>
                  <div className="text-charcoal-faint">
                    Signal: {pillar.spatialSignal}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

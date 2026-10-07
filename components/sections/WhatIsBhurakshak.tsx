"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Eye,
  Crosshair,
  FileSearch,
  TrendingUp,
  Ruler,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { EnginesModal } from "../EnginesModal";

export const WhatIsBhurakshak: React.FC = () => {
  const [isEnginesOpen, setIsEnginesOpen] = useState(false);

  return (
    <section
      id="what-is-bhurakshak"
      className="relative w-full overflow-hidden px-4 py-20 sm:px-6 lg:px-8 border-t border-canvas-border/70"
    >
      <div className="mx-auto max-w-7xl">
        {/* Top 2-Column: Editorial Hindi Text (Left) & 3D Isometric Layer Stack (Right) */}
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Hindi Editorial Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2">
              <span className="h-px w-6 bg-charcoal-muted/60" />
              <span className="text-xs font-mono uppercase tracking-widest text-charcoal-muted font-semibold">
                WHAT IS BHURAKSHAK?
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-bold text-charcoal leading-[1.15] tracking-tight font-sans">
              <span>भारत की भूमि पर</span>
              <br />
              <span className="text-walnut">नज़र रखने वाला साथी</span>
            </h2>

            <p className="text-base sm:text-lg text-charcoal/85 leading-relaxed font-normal max-w-xl">
              भूरक्षक उपग्रह चित्रों की मदद से पूरे भारत में कृषि भूमि में हो रहे
              बदलाव को पहचानता है, प्रभावित क्षेत्र का अनुमान लगाता है, कारण
              समझने में मदद करता है और भूमि संरक्षण के लिए सही कार्यवाही सुझाता
              है।
            </p>

            <div className="pt-2">
              <button
                onClick={() => setIsEnginesOpen(true)}
                className="inline-flex items-center gap-2 rounded-full bg-walnut px-7 py-3 text-sm font-medium text-white shadow-xs transition-all hover:bg-walnut-hover active:scale-[0.99]"
              >
                <span>और जानें</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Right Column: 3D Isometric Layer Stack (Exact Match to Mockup) */}
          <div className="lg:col-span-6 flex justify-center items-center py-6">
            <div className="relative w-full max-w-[480px] aspect-[4/3] flex items-center justify-center">
              {/* Stack Container with Isometric Perspective */}
              <div
                className="relative w-[340px] h-[340px] transition-transform duration-500"
                style={{
                  perspective: "1000px",
                }}
              >
                {/* Connecting Perspective Dashed Lines */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none z-10"
                  viewBox="0 0 340 340"
                  fill="none"
                >
                  {/* Vertical connecting lines across layers */}
                  <line
                    x1="170"
                    y1="40"
                    x2="170"
                    y2="280"
                    stroke="#3D2314"
                    strokeWidth="1.2"
                    strokeDasharray="3 3"
                    opacity="0.35"
                  />
                  <line
                    x1="70"
                    y1="100"
                    x2="70"
                    y2="240"
                    stroke="#3D2314"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                    opacity="0.25"
                  />
                  <line
                    x1="270"
                    y1="100"
                    x2="270"
                    y2="240"
                    stroke="#3D2314"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                    opacity="0.25"
                  />
                </svg>

                {/* LAYER 1 (TOP): वर्तमान (2026) */}
                <div
                  className="absolute left-6 top-2 w-[280px] h-[170px] rounded-xl overflow-hidden shadow-2xl border border-white/60 transition-transform hover:-translate-y-2 duration-300 z-30"
                  style={{
                    transform:
                      "rotateX(60deg) rotateZ(-38deg) translateZ(80px)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div className="relative w-full h-full bg-[#4A6741]">
                    <Image
                      src="/images/satellite-before-2022.jpg"
                      alt="Current land cover 2026"
                      fill
                      className="object-cover opacity-90 contrast-110"
                    />
                    {/* Orange active development overlay grid */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-amber-600/30 to-red-600/25 mix-blend-overlay" />
                    <div className="absolute inset-x-8 inset-y-6 border-2 border-dashed border-amber-400/80 rounded" />
                  </div>
                </div>

                {/* Top Layer Label Badge */}
                <div className="absolute right-[-40px] top-6 z-40 flex items-center gap-2">
                  <div className="h-px w-6 bg-charcoal/40" />
                  <div className="text-right">
                    <span className="block text-xs font-bold text-charcoal font-sans">
                      वर्तमान
                    </span>
                    <span className="block text-[11px] font-mono text-charcoal-muted">
                      (2026)
                    </span>
                  </div>
                </div>

                {/* LAYER 2 (MIDDLE): बदला हुआ क्षेत्र (पहचानित) */}
                <div
                  className="absolute left-6 top-16 w-[280px] h-[170px] rounded-xl overflow-hidden shadow-xl border border-amber-500/80 transition-transform hover:-translate-y-1 duration-300 z-20"
                  style={{
                    transform:
                      "rotateX(60deg) rotateZ(-38deg) translateZ(0px)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div className="relative w-full h-full bg-[#1C1613]">
                    <Image
                      src="/images/satellite-after-2026.jpg"
                      alt="Detected change layer"
                      fill
                      className="object-cover opacity-60 filter contrast-125"
                    />
                    {/* Glowing orange/red highlighted polygon zone */}
                    <div className="absolute inset-6 rounded bg-amber-500/40 border-2 border-red-500 shadow-inner">
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="h-3 w-3 rounded-full bg-red-500 animate-ping" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Middle Layer Label Badge */}
                <div className="absolute right-[-70px] top-[130px] z-40 flex items-center gap-2">
                  <div className="h-px w-6 bg-charcoal/40" />
                  <div className="text-right">
                    <span className="block text-xs font-bold text-red-700 font-sans">
                      बदला हुआ क्षेत्र
                    </span>
                    <span className="block text-[11px] font-mono text-charcoal-muted">
                      (पहचानित)
                    </span>
                  </div>
                </div>

                {/* LAYER 3 (BOTTOM): पहले (2022) */}
                <div
                  className="absolute left-6 top-32 w-[280px] h-[170px] rounded-xl overflow-hidden shadow-md border border-white/40 transition-transform duration-300 z-10"
                  style={{
                    transform:
                      "rotateX(60deg) rotateZ(-38deg) translateZ(-80px)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div className="relative w-full h-full bg-[#2A3F25]">
                    <Image
                      src="/images/satellite-before-2022.jpg"
                      alt="Baseline satellite imagery 2022"
                      fill
                      className="object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-charcoal/20" />
                  </div>
                </div>

                {/* Bottom Layer Label Badge */}
                <div className="absolute right-[-40px] top-[240px] z-40 flex items-center gap-2">
                  <div className="h-px w-6 bg-charcoal/40" />
                  <div className="text-right">
                    <span className="block text-xs font-bold text-charcoal font-sans">
                      पहले
                    </span>
                    <span className="block text-[11px] font-mono text-charcoal-muted">
                      (2022)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Flow: Horizontal Editorial Pipeline (6 Engines) */}
        <div className="mt-20 pt-12 border-t border-canvas-border/70 space-y-6">
          {/* Subtle Pipeline Breadcrumb */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] font-mono uppercase tracking-wider text-charcoal-muted">
            <span>Satellite</span>
            <ChevronRight className="h-3 w-3 text-charcoal-muted/50" />
            <span>Land</span>
            <ChevronRight className="h-3 w-3 text-charcoal-muted/50" />
            <span>Change</span>
            <ChevronRight className="h-3 w-3 text-charcoal-muted/50" />
            <span>Evidence</span>
            <ChevronRight className="h-3 w-3 text-charcoal-muted/50" />
            <span>Risk</span>
            <ChevronRight className="h-3 w-3 text-charcoal-muted/50" />
            <span>Impact</span>
            <ChevronRight className="h-3 w-3 text-charcoal-muted/50" />
            <span className="text-olive font-semibold">Action</span>
          </div>

          {/* 4 Engine Cards (Exact Match to Mockup) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 1. देखता है (Observe) */}
            <div className="rounded-2xl border border-canvas-border/80 bg-[#FDFCF9] p-5 text-center space-y-2 shadow-2xs hover:border-walnut/60 transition-all">
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-olive/10 text-olive">
                <Eye className="h-5 w-5" />
              </div>
              <div className="text-sm font-bold text-charcoal font-sans">
                देखता है
              </div>
              <div className="text-xs font-mono text-charcoal-muted">
                (Observe)
              </div>
              <p className="text-xs text-charcoal/70 leading-normal pt-1">
                उपग्रह से भारत की भूमि
              </p>
            </div>

            {/* 2. पहचानता है (Detect) */}
            <div className="rounded-2xl border border-canvas-border/80 bg-[#FDFCF9] p-5 text-center space-y-2 shadow-2xs hover:border-walnut/60 transition-all">
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-red-500/10 text-red-600">
                <Crosshair className="h-5 w-5" />
              </div>
              <div className="text-sm font-bold text-charcoal font-sans">
                पहचानता है
              </div>
              <div className="text-xs font-mono text-charcoal-muted">
                (Detect)
              </div>
              <p className="text-xs text-charcoal/70 leading-normal pt-1">
                जहां बदलाव हो रहा है
              </p>
            </div>

            {/* 3. समझाता है (Explain) */}
            <div className="rounded-2xl border border-canvas-border/80 bg-[#FDFCF9] p-5 text-center space-y-2 shadow-2xs hover:border-walnut/60 transition-all">
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-amber-500/10 text-amber-700">
                <FileSearch className="h-5 w-5" />
              </div>
              <div className="text-sm font-bold text-charcoal font-sans">
                समझाता है
              </div>
              <div className="text-xs font-mono text-charcoal-muted">
                (Explain)
              </div>
              <p className="text-xs text-charcoal/70 leading-normal pt-1">
                क्यों और कैसे बदला
              </p>
            </div>

            {/* 4. सुझाव देता है (Act) */}
            <div className="rounded-2xl border border-canvas-border/80 bg-[#FDFCF9] p-5 text-center space-y-2 shadow-2xs hover:border-walnut/60 transition-all">
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-olive/15 text-olive">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div className="text-sm font-bold text-charcoal font-sans">
                सुझाव देता है
              </div>
              <div className="text-xs font-mono text-charcoal-muted">
                (Act)
              </div>
              <p className="text-xs text-charcoal/70 leading-normal pt-1">
                भूमि संरक्षण के लिए कदम
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Engines Walkthrough Modal */}
      <EnginesModal
        isOpen={isEnginesOpen}
        onClose={() => setIsEnginesOpen(false)}
      />
    </section>
  );
};

export default WhatIsBhurakshak;

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SIX_ENGINES } from "@/data/enginesData";
import { ArrowRight, CheckCircle2, AlertTriangle, Layers, Compass, ArrowUpRight } from "lucide-react";

export const Section3SixEnginesPipeline: React.FC = () => {
  const [selectedEngineId, setSelectedEngineId] = useState<string>("observe");

  const activeEngine =
    SIX_ENGINES.find((e) => e.id === selectedEngineId) || SIX_ENGINES[0];

  return (
    <section id="methodology" className="relative w-full border-t border-canvas-border bg-canvas py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 mb-12">
          <div className="flex items-center gap-2">
            <span className="h-px w-6 bg-charcoal-muted/60" />
            <span className="text-[11px] font-semibold tracking-wider text-charcoal-muted uppercase font-mono">
              The Intelligence Pipeline
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-charcoal leading-tight">
            <span>From satellite image </span>
            <span className="font-serif italic text-walnut font-normal">
              to evidence chain.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed max-w-2xl">
            Bhurakshak converts raw optical and radar signals into a connected, verifiable decision flow. The Six Engines do not act as isolated AI features — they form one continuous intelligence architecture.
          </p>
        </div>

        {/* Pipeline Navigation Nodes */}
        <div className="mb-8 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {SIX_ENGINES.map((engine) => {
            const isSelected = selectedEngineId === engine.id;

            return (
              <button
                key={engine.id}
                onClick={() => setSelectedEngineId(engine.id)}
                className={`flex flex-col items-start rounded-xl border p-4 text-left transition-all ${
                  isSelected
                    ? "border-walnut bg-canvas-surface shadow-md ring-1 ring-walnut"
                    : "border-canvas-border bg-canvas-surface/70 hover:border-canvas-border hover:bg-canvas-surface"
                }`}
              >
                <div className="flex w-full items-center justify-between">
                  <span className="font-mono text-xs font-bold text-walnut">
                    0{engine.step}
                  </span>
                  <span className="text-[11px] text-charcoal-muted">
                    {engine.devanagari}
                  </span>
                </div>

                <div className="mt-2 text-sm font-bold text-charcoal">
                  {engine.name}
                </div>

                <div className="mt-1 line-clamp-1 text-[11px] text-charcoal-muted font-serif italic">
                  {engine.question}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Engine Deep Interactive Panel */}
        <div className="rounded-2xl border border-canvas-border bg-canvas-surface p-6 sm:p-8 lg:p-10 shadow-sm">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Left 7 Columns: Purpose & Methods */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-charcoal-muted">
                  <span>Engine 0{activeEngine.step}</span>
                  <span>·</span>
                  <span className="text-olive font-semibold">{activeEngine.devanagari}</span>
                </div>

                <h3 className="mt-2 font-serif text-2xl sm:text-3xl font-medium italic text-charcoal">
                  &ldquo;{activeEngine.question}&rdquo;
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-charcoal-muted">
                  {activeEngine.purpose}
                </p>
              </div>

              {/* Analytical Methods */}
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-charcoal font-mono mb-3">
                  Applied Analytical Methods
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeEngine.methods.map((m, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 rounded-lg border border-canvas-border/80 bg-canvas p-3 text-xs text-charcoal"
                    >
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-olive shrink-0" />
                      <span className="leading-snug">{m}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Honest Scientific Boundary Notice */}
              <div className="flex items-start gap-3 rounded-xl border border-canvas-border bg-canvas/60 p-4">
                <AlertTriangle className="h-4 w-4 text-walnut mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-charcoal">
                    Uncertainty & Empirical Boundary
                  </div>
                  <p className="mt-0.5 text-xs text-charcoal-muted leading-relaxed">
                    {activeEngine.uncertaintyHonesty}
                  </p>
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Representative Evidence Example */}
            <div className="lg:col-span-5 flex flex-col justify-between rounded-xl border border-canvas-border bg-canvas p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-canvas-border/80 pb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-charcoal font-mono">
                    Live Lucknow Evidence Proof
                  </span>
                  <span className="rounded bg-olive-subtle px-2 py-0.5 text-[10px] font-mono text-olive font-semibold">
                    Step 0{activeEngine.step}
                  </span>
                </div>

                <div>
                  <div className="text-xs font-mono text-charcoal-muted">
                    Finding
                  </div>
                  <div className="text-sm font-bold text-charcoal mt-0.5">
                    {activeEngine.sampleEvidence.title}
                  </div>
                  <p className="text-xs text-charcoal-muted mt-1 leading-relaxed">
                    {activeEngine.sampleEvidence.description}
                  </p>
                </div>

                <div className="rounded-lg border border-canvas-border bg-canvas-surface p-3 font-mono text-xs text-walnut">
                  <div className="text-[10px] uppercase text-charcoal-faint">
                    Derived Observation
                  </div>
                  <div className="mt-1 font-semibold">
                    {activeEngine.sampleEvidence.dataPoint}
                  </div>
                </div>

                <div className="text-[11px] font-mono text-charcoal-muted">
                  Authoritative Ingestion: {activeEngine.sampleEvidence.source}
                </div>
              </div>

              <div className="pt-6">
                <Link
                  href="/methodology"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-canvas-border bg-canvas-surface py-2.5 text-xs font-medium text-charcoal hover:border-walnut hover:text-walnut transition-colors"
                >
                  <span>Inspect Complete Scientific Methodology</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

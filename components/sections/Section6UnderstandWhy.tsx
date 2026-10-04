"use client";

import React, { useState } from "react";
import { SAMPLE_EVIDENCE_CHAIN, EvidenceChainStep } from "@/data/evidenceData";
import { CheckCircle2, ArrowDown, ExternalLink, HelpCircle, AlertCircle } from "lucide-react";

export const Section6UnderstandWhy: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState<number>(1);

  const activeChainItem =
    SAMPLE_EVIDENCE_CHAIN.find((item) => item.step === selectedStep) ||
    SAMPLE_EVIDENCE_CHAIN[0];

  return (
    <section className="relative w-full border-t border-canvas-border bg-canvas-surface py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 mb-12">
          <div className="flex items-center gap-2">
            <span className="h-px w-6 bg-charcoal-muted/60" />
            <span className="text-[11px] font-semibold tracking-wider text-charcoal-muted uppercase font-mono">
              Engine 03 · Explain
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-charcoal leading-tight">
            <span>Why did it </span>
            <span className="font-serif italic text-walnut font-normal">
              change?
            </span>
          </h2>

          <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed max-w-2xl">
            Bhurakshak rejects black-box AI causation. Instead, the Explain engine builds a transparent, multi-tiered spatial evidence chain combining satellite reflectance, infrastructure adjacency, radar coherence, and seasonal continuity.
          </p>
        </div>

        {/* Evidence Chain Flow Container */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          {/* Left Column: Interactive Vertical Step Flow */}
          <div className="lg:col-span-5 space-y-3">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-charcoal-muted font-mono mb-2">
              Verifiable Evidence Chain (#LK-2047)
            </div>

            {SAMPLE_EVIDENCE_CHAIN.map((item) => {
              const isSelected = selectedStep === item.step;
              const isFinal = item.step === SAMPLE_EVIDENCE_CHAIN.length;

              return (
                <div key={item.step} className="relative">
                  <button
                    onClick={() => setSelectedStep(item.step)}
                    className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left transition-all ${
                      isSelected
                        ? "border-walnut bg-canvas shadow-sm ring-1 ring-walnut"
                        : "border-canvas-border bg-canvas-surface/70 hover:border-canvas-border hover:bg-canvas"
                    }`}
                  >
                    <div
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-mono font-bold ${
                        isSelected
                          ? "bg-walnut text-white"
                          : "border border-canvas-border bg-canvas text-charcoal-muted"
                      }`}
                    >
                      {item.step}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-charcoal-muted uppercase tracking-wider">
                          {item.label}
                        </span>
                        <span className="font-mono text-[10px] text-walnut font-semibold">
                          {item.metric}
                        </span>
                      </div>

                      <div className="mt-0.5 text-xs font-bold text-charcoal truncate">
                        {item.headline}
                      </div>
                    </div>
                  </button>

                  {!isFinal && (
                    <div className="flex justify-center my-1 text-charcoal-faint">
                      <ArrowDown className="h-3 w-3" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Deep Evidence Examination Card */}
          <div className="lg:col-span-7 rounded-2xl border border-canvas-border bg-canvas p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-canvas-border/80 pb-4">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-olive font-semibold">
                  Evidence Node 0{activeChainItem.step}
                </span>
                <h3 className="mt-1 text-xl font-bold text-charcoal">
                  {activeChainItem.headline}
                </h3>
              </div>

              <div className="rounded border border-canvas-border bg-canvas-surface px-3 py-1 font-mono text-xs font-bold text-walnut">
                {activeChainItem.metric}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-charcoal font-mono mb-1">
                  Spatial & Scientific Explanation
                </div>
                <p className="text-sm leading-relaxed text-charcoal-muted">
                  {activeChainItem.explanation}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="rounded-xl border border-canvas-border bg-canvas-surface p-4">
                  <div className="text-[10px] uppercase font-mono text-charcoal-muted">
                    Telemetry / Data Source
                  </div>
                  <div className="mt-1 font-mono text-xs font-semibold text-charcoal">
                    {activeChainItem.source}
                  </div>
                </div>

                <div className="rounded-xl border border-canvas-border bg-canvas-surface p-4">
                  <div className="text-[10px] uppercase font-mono text-charcoal-muted">
                    Evidence Contribution
                  </div>
                  <div className="mt-1 font-mono text-xs font-semibold text-olive">
                    {activeChainItem.confidenceContribution}
                  </div>
                </div>
              </div>

              {/* Attribution Policy Notice */}
              <div className="rounded-lg border border-canvas-border bg-canvas-surface/80 p-3.5 flex items-start gap-2.5 text-xs text-charcoal-muted">
                <AlertCircle className="h-4 w-4 text-walnut shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  <strong className="text-charcoal">Language Policy:</strong> Bhurakshak frames attribution as &ldquo;Likely Driver&rdquo; rather than &ldquo;Confirmed Cause&rdquo; to preserve scientific integrity prior to ground truth confirmation.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

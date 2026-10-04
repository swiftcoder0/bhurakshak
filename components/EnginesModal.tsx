"use client";

import React, { useState } from "react";
import { X, ArrowRight, CheckCircle2, AlertCircle, Compass, Layers, ShieldCheck } from "lucide-react";
import { SIX_ENGINES } from "@/data/enginesData";

interface EnginesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EnginesModal: React.FC<EnginesModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeStep, setActiveStep] = useState<number>(1);

  if (!isOpen) return null;

  const currentEngine = SIX_ENGINES.find((e) => e.step === activeStep) || SIX_ENGINES[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Dim backdrop */}
      <div
        className="fixed inset-0 bg-charcoal/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative z-10 flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-canvas-border bg-canvas-surface shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-canvas-border/80 px-6 py-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif italic text-lg text-walnut">
                The Six Engines
              </span>
              <span className="text-xs text-charcoal-muted">|</span>
              <span className="font-mono text-xs text-charcoal-muted uppercase">
                Geospatial Intelligence Pipeline
              </span>
            </div>
            <p className="mt-0.5 text-xs text-charcoal-muted">
              Turning raw Earth observations into an evidence-led decision chain.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-charcoal-muted transition-colors hover:bg-canvas-border/50 hover:text-charcoal"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Engine Pipeline Stepper Navigation */}
        <div className="grid grid-cols-6 border-b border-canvas-border bg-canvas/60 text-xs">
          {SIX_ENGINES.map((engine) => {
            const isActive = engine.step === activeStep;
            return (
              <button
                key={engine.id}
                onClick={() => setActiveStep(engine.step)}
                className={`flex flex-col items-center justify-center py-3 px-1 transition-all border-b-2 ${
                  isActive
                    ? "border-walnut bg-canvas-surface font-semibold text-walnut"
                    : "border-transparent text-charcoal-muted hover:text-charcoal hover:bg-canvas-surface/40"
                }`}
              >
                <span className="font-mono text-[10px] text-charcoal-faint">
                  0{engine.step}
                </span>
                <span className="truncate text-xs">{engine.name}</span>
                <span className="text-[10px] text-charcoal-faint/80 font-normal">
                  {engine.devanagari}
                </span>
              </button>
            );
          })}
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
          {/* Question & Purpose */}
          <div className="border-b border-canvas-border/70 pb-6">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-charcoal-muted">
              <span>Step 0{currentEngine.step}</span>
              <span>·</span>
              <span className="text-olive font-semibold">{currentEngine.name} ({currentEngine.devanagari})</span>
            </div>

            <h3 className="mt-1 font-serif text-2xl md:text-3xl font-medium italic text-charcoal">
              &ldquo;{currentEngine.question}&rdquo;
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-charcoal-muted max-w-3xl">
              {currentEngine.purpose}
            </p>
          </div>

          {/* Methods and Evidence Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Left: Scientific Methods */}
            <div className="rounded-xl border border-canvas-border bg-canvas/50 p-5">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-charcoal">
                <Layers className="h-4 w-4 text-walnut" />
                <span>Analytical Methods & Sensors</span>
              </div>

              <ul className="mt-4 space-y-2.5">
                {currentEngine.methods.map((method, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-charcoal/90">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-olive shrink-0" />
                    <span>{method}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: Concrete Lucknow Evidence Example */}
            <div className="rounded-xl border border-canvas-border bg-canvas/50 p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-charcoal">
                  <Compass className="h-4 w-4 text-olive" />
                  <span>Representative Evidence Example</span>
                </div>

                <div className="mt-3 text-xs font-bold text-charcoal">
                  {currentEngine.sampleEvidence.title}
                </div>
                <p className="mt-1 text-xs leading-relaxed text-charcoal-muted">
                  {currentEngine.sampleEvidence.description}
                </p>

                <div className="mt-3 rounded border border-canvas-border bg-canvas-surface p-2 font-mono text-[11px] text-walnut">
                  {currentEngine.sampleEvidence.dataPoint}
                </div>
              </div>

              <div className="mt-3 text-[10px] font-mono text-charcoal-faint">
                Source: {currentEngine.sampleEvidence.source}
              </div>
            </div>
          </div>

          {/* Honest Uncertainty Disclaimer */}
          <div className="flex items-start gap-3 rounded-lg border border-canvas-border bg-canvas-surface p-4">
            <AlertCircle className="h-4 w-4 text-walnut mt-0.5 shrink-0" />
            <div>
              <div className="text-xs font-semibold text-charcoal">
                Scientific Uncertainty & Boundary Notice
              </div>
              <p className="mt-0.5 text-xs leading-relaxed text-charcoal-muted">
                {currentEngine.uncertaintyHonesty}
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between border-t border-canvas-border/80 bg-canvas/40 px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="text-xs text-charcoal-muted font-mono">
              Engine {activeStep} of 6
            </span>
          </div>

          <div className="flex items-center gap-3">
            {activeStep > 1 && (
              <button
                onClick={() => setActiveStep(activeStep - 1)}
                className="rounded-full border border-canvas-border bg-canvas-surface px-4 py-2 text-xs font-medium text-charcoal hover:bg-canvas transition-colors"
              >
                Previous Engine
              </button>
            )}

            {activeStep < 6 ? (
              <button
                onClick={() => setActiveStep(activeStep + 1)}
                className="inline-flex items-center gap-1.5 rounded-full bg-walnut px-4 py-2 text-xs font-medium text-white hover:bg-walnut-hover transition-colors"
              >
                <span>Next: {SIX_ENGINES[activeStep].name}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            ) : (
              <button
                onClick={onClose}
                className="rounded-full bg-walnut px-5 py-2 text-xs font-medium text-white hover:bg-walnut-hover transition-colors"
              >
                Explore Map
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

"use client";

import React, { useState } from "react";
import { RISK_ZONES, RiskZone } from "@/data/riskData";
import { AlertTriangle, TrendingUp, Info, ShieldAlert, Sparkles } from "lucide-react";

export const Section7LookAheadRisk: React.FC = () => {
  const [selectedZoneId, setSelectedZoneId] = useState<string>("zone-a");

  const activeZone =
    RISK_ZONES.find((z) => z.id === selectedZoneId) || RISK_ZONES[0];

  return (
    <section className="relative w-full border-t border-canvas-border bg-canvas py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 mb-12">
          <div className="flex items-center gap-2">
            <span className="h-px w-6 bg-charcoal-muted/60" />
            <span className="text-[11px] font-semibold tracking-wider text-charcoal-muted uppercase font-mono">
              Engine 04 · Predict
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-charcoal leading-tight">
            <span>Look </span>
            <span className="font-serif italic text-walnut font-normal">
              ahead.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed max-w-2xl">
            Where could agriculture give way to concrete next? By projecting empirical transition probabilities along newly paved transport corridors, Bhurakshak models 2030 spatial conversion risk.
          </p>
        </div>

        {/* Prototype Warning Banner */}
        <div className="mb-8 flex items-center justify-between rounded-xl border border-risk-amber/40 bg-risk-amber/10 p-4 text-xs text-charcoal">
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="h-4 w-4 text-risk-amber shrink-0" />
            <span className="font-mono">
              <strong>PROTOTYPE SPATIAL RISK MODEL:</strong> Projections represent statistical likelihoods under current trends, not deterministic certainties.
            </span>
          </div>
          <span className="hidden sm:inline font-mono text-[10px] uppercase tracking-wider text-charcoal-muted">
            Horizon: 2028–2030
          </span>
        </div>

        {/* Risk Zones Interactive Selector */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-start">
          {/* Left: Zone Selection Buttons */}
          <div className="lg:col-span-5 space-y-3">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-charcoal-muted font-mono mb-2">
              Modelled 2030 Risk Corridors
            </div>

            {RISK_ZONES.map((zone) => {
              const isSelected = selectedZoneId === zone.id;

              return (
                <button
                  key={zone.id}
                  onClick={() => setSelectedZoneId(zone.id)}
                  className={`flex w-full flex-col rounded-xl border p-5 text-left transition-all ${
                    isSelected
                      ? "border-walnut bg-canvas-surface shadow-md ring-1 ring-walnut"
                      : "border-canvas-border bg-canvas-surface/70 hover:border-canvas-border hover:bg-canvas-surface"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-charcoal">
                      {zone.code}
                    </span>

                    <span
                      className={`rounded px-2 py-0.5 font-mono text-[10px] font-bold uppercase ${
                        zone.riskLevel === "HIGH"
                          ? "bg-risk-coral/15 text-risk-coral"
                          : zone.riskLevel === "MEDIUM"
                          ? "bg-risk-amber/15 text-risk-amber"
                          : "bg-olive/15 text-olive"
                      }`}
                    >
                      {zone.riskLevel} RISK
                    </span>
                  </div>

                  <div className="mt-2 text-sm font-bold text-charcoal">
                    {zone.zoneName}
                  </div>

                  <div className="mt-2 flex items-center justify-between text-xs text-charcoal-muted font-mono">
                    <span>Transition Probability</span>
                    <span className="font-bold text-charcoal">
                      {(zone.probabilityScore * 100).toFixed(0)}%
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Selected Zone Risk Factor Breakdown */}
          <div className="lg:col-span-7 rounded-2xl border border-canvas-border bg-canvas-surface p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-canvas-border/80 pb-4">
              <div>
                <span className="font-mono text-xs text-charcoal-muted">
                  2030 MODELLED RISK DOSSIER
                </span>
                <h3 className="mt-1 text-xl font-bold text-charcoal">
                  {activeZone.zoneName}
                </h3>
              </div>

              <div className="text-right">
                <div className="font-mono text-2xl font-bold text-walnut">
                  {(activeZone.probabilityScore * 100).toFixed(0)}%
                </div>
                <div className="font-mono text-[10px] text-charcoal-muted">
                  Empirical Probability
                </div>
              </div>
            </div>

            {/* Factor Weights */}
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-charcoal font-mono mb-3">
                Primary Model Predictors & Driving Factors
              </div>

              <div className="space-y-3">
                {activeZone.factors.map((factor, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-canvas-border bg-canvas p-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-charcoal">
                        {factor.name}
                      </span>
                      <span className="font-mono text-xs font-semibold text-walnut">
                        Weight: {factor.weight}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-charcoal-muted leading-relaxed">
                      {factor.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Projected Footprint & Methodology */}
            <div className="rounded-xl border border-canvas-border bg-canvas p-4 space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-charcoal-muted">Forecasted Exposure:</span>
                <span className="font-bold text-charcoal">
                  ~{activeZone.forecastHaPotential} ha at risk of conversion by 2030
                </span>
              </div>
              <p className="text-[11px] text-charcoal-muted leading-relaxed font-mono">
                {activeZone.methodologyNote}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

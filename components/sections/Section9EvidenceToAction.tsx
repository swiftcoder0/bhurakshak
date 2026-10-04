"use client";

import React, { useState } from "react";
import { CheckCircle2, ArrowRight, ShieldCheck, FileCheck, Eye, Search, AlertOctagon } from "lucide-react";

interface ActionScenario {
  id: string;
  name: string;
  observation: string;
  evidence: string;
  likelyDriver: string;
  risk: string;
  recommendedAction: string;
  actionType: "Ground Verification" | "Continued Monitoring" | "Planning Review" | "Prioritized Investigation";
  actionBadgeColor: string;
  protocolDetails: string[];
}

const ACTION_SCENARIOS: ActionScenario[] = [
  {
    id: "scen-1",
    name: "Sultanpur Corridor Farmland Inversion",
    observation: "Persistent double-cropped agricultural vegetation loss across 18.4 hectares.",
    evidence: "3-season consecutive bare soil; NDBI positive inversion (+0.42); direct 140m highway frontage.",
    likelyDriver: "Peri-urban commercial freight warehousing expansion.",
    risk: "Elevated risk of ribbon development spillover into adjacent 64 ha arable tract.",
    recommendedAction: "Ground verification recommended: Dispatch revenue inspector to cross-check land-use non-agricultural (NA) conversion permits.",
    actionType: "Ground Verification",
    actionBadgeColor: "bg-olive-subtle text-olive border-olive/30",
    protocolDetails: [
      "Generate geofenced GPS inspection task for field surveyor app.",
      "Verify registration of statutory Section 143 NA certificate with Tehsildar office.",
      "Cross-check storm runoff detention swale against Gomti master plan drainage.",
    ],
  },
  {
    id: "scen-2",
    name: "Mohanlalganj Agro-Forestry Thinning",
    observation: "Abrupt tree canopy index drop (-54% EVI) in contiguous 7.2 ha mango/neem belt.",
    evidence: "Loss confirmed over 45-day window; feeder dirt tracks carved through parcel boundary.",
    likelyDriver: "Unregulated plotted residential colonisation.",
    risk: "Irreversible loss of mature peri-urban green buffer and microclimate canopy.",
    recommendedAction: "Prioritized field drone survey and municipal notice issuance under UP Tree Preservation regulations.",
    actionType: "Prioritized Investigation",
    actionBadgeColor: "bg-risk-coral/15 text-risk-coral border-risk-coral/30",
    protocolDetails: [
      "Acquire high-resolution micro-UAV orthomosaic to document severed root systems.",
      "Verify forest department felling permits.",
      "Alert Lucknow Development Authority unauthorized colony enforcement division.",
    ],
  },
  {
    id: "scen-3",
    name: "Bakshi Ka Talab Wetland Margin Shrinkage",
    observation: "Seasonal aquatic retention margin dried across 3.1 hectares post-monsoon.",
    evidence: "MNDWI water index failed to recover across 4 consecutive post-monsoon cycles.",
    likelyDriver: "Earthen filling and drainage channel diversion for peripheral storage.",
    risk: "Loss of natural flood detention capacity during extreme monsoon precipitation.",
    recommendedAction: "Enrol in High-Frequency Automated Sentinel-2 5-day monitoring watch-list and notify UP Irrigation Department.",
    actionType: "Continued Monitoring",
    actionBadgeColor: "bg-amber-900/15 text-amber-800 border-amber-800/30",
    protocolDetails: [
      "Automated radar (SAR) backscatter anomaly alerts triggered every 6 days.",
      "Hydrological flood routing simulation update in CartoDEM basin model.",
      "Public notice to village revenue panchayat regarding preservation of water bodies.",
    ],
  },
];

export const Section9EvidenceToAction: React.FC = () => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>("scen-1");

  const activeScenario =
    ACTION_SCENARIOS.find((s) => s.id === selectedScenarioId) ||
    ACTION_SCENARIOS[0];

  return (
    <section className="relative w-full border-t border-canvas-border bg-canvas py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 mb-12">
          <div className="flex items-center gap-2">
            <span className="h-px w-6 bg-charcoal-muted/60" />
            <span className="text-[11px] font-semibold tracking-wider text-charcoal-muted uppercase font-mono">
              Engine 06 · Act
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-charcoal leading-tight">
            <span>Turn evidence </span>
            <span className="font-serif italic text-walnut font-normal">
              into action.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed max-w-2xl">
            Bhurakshak never makes unilateral automated policy decisions. The Act engine delivers verified, evidence-backed decision support: recommending prioritized ground truth inspections, statutory reviews, and targeted alerts.
          </p>
        </div>

        {/* Scenarios Selector & Action Framework */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          {/* Left Column: Scenarios List */}
          <div className="lg:col-span-5 space-y-3">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-charcoal-muted font-mono mb-2">
              Decision Support Scenarios
            </div>

            {ACTION_SCENARIOS.map((scen) => {
              const isSelected = selectedScenarioId === scen.id;

              return (
                <button
                  key={scen.id}
                  onClick={() => setSelectedScenarioId(scen.id)}
                  className={`flex w-full flex-col rounded-xl border p-5 text-left transition-all ${
                    isSelected
                      ? "border-walnut bg-canvas-surface shadow-md ring-1 ring-walnut"
                      : "border-canvas-border bg-canvas-surface/70 hover:border-canvas-border hover:bg-canvas-surface"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-charcoal truncate">
                      {scen.name}
                    </span>
                    <span
                      className={`rounded border px-2 py-0.5 font-mono text-[10px] font-medium ${scen.actionBadgeColor}`}
                    >
                      {scen.actionType}
                    </span>
                  </div>

                  <p className="mt-2 text-xs text-charcoal-muted line-clamp-2">
                    {scen.observation}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right Column: Complete Evidence-to-Action Blueprint */}
          <div className="lg:col-span-7 rounded-2xl border border-canvas-border bg-canvas-surface p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-canvas-border/80 pb-4">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-charcoal-muted">
                  EVIDENCE-LED ACTION DOSSIER
                </span>
                <h3 className="mt-1 text-xl font-bold text-charcoal">
                  {activeScenario.name}
                </h3>
              </div>

              <span
                className={`rounded border px-3 py-1 font-mono text-xs font-semibold ${activeScenario.actionBadgeColor}`}
              >
                {activeScenario.actionType}
              </span>
            </div>

            {/* Stepper Chain */}
            <div className="space-y-4">
              <div className="rounded-xl border border-canvas-border bg-canvas p-3.5">
                <div className="text-[10px] font-mono uppercase text-charcoal-muted">
                  01 · SATELLITE OBSERVATION
                </div>
                <div className="text-xs font-medium text-charcoal mt-1">
                  {activeScenario.observation}
                </div>
              </div>

              <div className="rounded-xl border border-canvas-border bg-canvas p-3.5">
                <div className="text-[10px] font-mono uppercase text-charcoal-muted">
                  02 · SPATIAL & TEMPORAL EVIDENCE
                </div>
                <div className="text-xs font-medium text-charcoal mt-1">
                  {activeScenario.evidence}
                </div>
              </div>

              <div className="rounded-xl border border-canvas-border bg-canvas p-3.5">
                <div className="text-[10px] font-mono uppercase text-charcoal-muted">
                  03 · ATTRIBUTED LIKELY DRIVER
                </div>
                <div className="text-xs font-medium text-charcoal mt-1">
                  {activeScenario.likelyDriver}
                </div>
              </div>

              <div className="rounded-xl border border-canvas-border bg-canvas p-3.5">
                <div className="text-[10px] font-mono uppercase text-charcoal-muted">
                  04 · PROJECTED SPATIAL RISK
                </div>
                <div className="text-xs font-medium text-charcoal mt-1">
                  {activeScenario.risk}
                </div>
              </div>

              <div className="rounded-xl border border-walnut/40 bg-walnut/5 p-4 space-y-2">
                <div className="text-[10px] font-mono uppercase text-walnut font-bold flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>RECOMMENDED DECISION STEP</span>
                </div>
                <div className="text-sm font-bold text-charcoal">
                  {activeScenario.recommendedAction}
                </div>
              </div>
            </div>

            {/* Operational Protocols */}
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-charcoal font-mono mb-2">
                Action Protocol Checklist
              </div>
              <ul className="space-y-1.5 text-xs text-charcoal-muted">
                {activeScenario.protocolDetails.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-olive shrink-0 mt-0.5" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

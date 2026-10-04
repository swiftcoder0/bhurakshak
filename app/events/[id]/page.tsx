import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CHANGE_EVENTS, ChangeEvent } from "@/data/changeEvents";
import {
  MapPin,
  Calendar,
  ShieldCheck,
  Activity,
  AlertTriangle,
  ArrowRight,
  Database,
  ExternalLink,
  Layers,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";

export function generateStaticParams() {
  return CHANGE_EVENTS.map((event) => ({
    id: event.id,
  }));
}

interface EventPageProps {
  params: {
    id: string;
  };
}

export default function EventDetailPage({ params }: EventPageProps) {
  const event = CHANGE_EVENTS.find((e) => e.id === params.id);

  if (!event) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-canvas text-charcoal flex flex-col justify-between">
      <Navigation />

      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        {/* Breadcrumb Header */}
        <div className="mb-8 border-b border-canvas-border pb-6">
          <div className="flex items-center gap-2 font-mono text-xs text-charcoal-muted">
            <Link href="/" className="hover:text-walnut">HOME</Link>
            <span>/</span>
            <Link href="/events" className="hover:text-walnut">CHANGE EVENTS</Link>
            <span>/</span>
            <span className="text-walnut font-bold">EVENT #{event.code}</span>
          </div>

          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-walnut bg-canvas-border/40 px-2 py-0.5 rounded">
                  #{event.code}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-olive-subtle px-2.5 py-0.5 text-xs font-mono font-medium text-olive">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>{event.confidence} Confidence ({(event.confidenceScore * 100).toFixed(0)}%)</span>
                </span>
                <span className="rounded bg-canvas border border-canvas-border px-2 py-0.5 font-mono text-xs text-charcoal-muted">
                  {event.category}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold text-charcoal mt-2">
                {event.title}
              </h1>

              <div className="mt-2 font-mono text-sm text-walnut font-medium">
                Categorical Transition: {event.transition}
              </div>
            </div>

            <Link
              href="/events"
              className="inline-flex items-center gap-1.5 rounded-full border border-canvas-border bg-canvas-surface px-4 py-2 text-xs font-medium text-charcoal hover:border-walnut transition-colors shrink-0"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Ledger</span>
            </Link>
          </div>
        </div>

        {/* Core Dossier Layout */}
        <div className="space-y-8">
          {/* 1. Summary & Geography Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-xl border border-canvas-border bg-canvas-surface p-5 space-y-1">
              <span className="font-mono text-[10px] uppercase text-charcoal-muted">
                GEOGRAPHIC LOCATION
              </span>
              <div className="font-bold text-sm text-charcoal flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-olive" />
                <span>{event.location.microRegion}</span>
              </div>
              <div className="font-mono text-xs text-charcoal-muted pt-1">
                {event.location.district}, {event.location.state}
              </div>
              <div className="font-mono text-[11px] text-charcoal-muted">
                {event.location.coordinates}
              </div>
            </div>

            <div className="rounded-xl border border-canvas-border bg-canvas-surface p-5 space-y-1">
              <span className="font-mono text-[10px] uppercase text-charcoal-muted">
                SPATIAL FOOTPRINT
              </span>
              <div className="font-bold text-2xl text-charcoal font-mono">
                {event.areaHa} ha
              </div>
              <div className="text-xs text-charcoal-muted">
                Cadastral parcel area computed in EPSG:32644
              </div>
            </div>

            <div className="rounded-xl border border-canvas-border bg-canvas-surface p-5 space-y-1">
              <span className="font-mono text-[10px] uppercase text-charcoal-muted">
                TEMPORAL ACQUISITION
              </span>
              <div className="font-bold text-sm text-charcoal">
                {event.firstDetected} → {event.lastConfirmed}
              </div>
              <div className="text-xs text-charcoal-muted">
                Verified persistent across 8+ Sentinel-2 passes
              </div>
            </div>
          </div>

          {/* 2. Timeline Progression */}
          <div className="rounded-2xl border border-canvas-border bg-canvas-surface p-6 sm:p-8 space-y-4">
            <div className="border-b border-canvas-border/80 pb-3">
              <span className="font-mono text-xs uppercase tracking-wider text-charcoal-muted">
                Engine 02 · Detect / Temporal Invariance
              </span>
              <h2 className="text-lg font-bold text-charcoal mt-1">
                Multi-Year Transition Chronology
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2">
              {event.timelineYears.map((step, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-canvas-border bg-canvas p-3.5 space-y-2 flex flex-col justify-between"
                >
                  <div>
                    <span className="font-mono text-xs font-bold text-walnut">
                      {step.year}
                    </span>
                    <p className="mt-1 text-xs text-charcoal font-medium leading-snug">
                      {step.state}
                    </p>
                  </div>
                  <span className="font-mono text-[10px] text-charcoal-muted bg-canvas-surface px-1.5 py-0.5 rounded border border-canvas-border/60 self-start">
                    {step.spectralValue}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Supporting Evidence Stack */}
          <div className="rounded-2xl border border-canvas-border bg-canvas-surface p-6 sm:p-8 space-y-4">
            <div className="border-b border-canvas-border/80 pb-3">
              <span className="font-mono text-xs uppercase tracking-wider text-charcoal-muted">
                Engine 03 · Explain / Empirical Proof
              </span>
              <h2 className="text-lg font-bold text-charcoal mt-1">
                Spatial Evidence Supporting Detection
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {event.evidenceItems.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-canvas-border bg-canvas p-4 space-y-1.5"
                >
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="font-bold text-charcoal">{item.title}</span>
                    <span className="font-bold text-walnut">{item.metric}</span>
                  </div>
                  <p className="text-xs text-charcoal-muted leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-canvas-border bg-canvas p-4 text-xs">
              <span className="font-mono text-[10px] uppercase text-charcoal-muted block">
                Attributed Likely Driver
              </span>
              <span className="font-bold text-charcoal mt-1 block text-sm">
                {event.likelyDriver}
              </span>
            </div>
          </div>

          {/* 4. Quantification & Impact */}
          <div className="rounded-2xl border border-canvas-border bg-canvas-surface p-6 sm:p-8 space-y-4">
            <div className="border-b border-canvas-border/80 pb-3">
              <span className="font-mono text-xs uppercase tracking-wider text-charcoal-muted">
                Engine 05 · Quantify / Measured Impact
              </span>
              <h2 className="text-lg font-bold text-charcoal mt-1">
                Measured Physical Alteration Summary
              </h2>
            </div>

            <div className="grid grid-cols-3 gap-4 font-mono text-xs">
              <div className="rounded-xl border border-canvas-border bg-canvas p-4">
                <span className="text-charcoal-muted block">BUILT-UP EXPANSION</span>
                <span className="text-2xl font-bold text-walnut mt-1 block">
                  +{event.impactSummary.builtUpIncreasePercent}%
                </span>
              </div>
              <div className="rounded-xl border border-canvas-border bg-canvas p-4">
                <span className="text-charcoal-muted block">CANOPY LOSS</span>
                <span className="text-2xl font-bold text-risk-coral mt-1 block">
                  -{event.impactSummary.vegetationCanopyLostHa} ha
                </span>
              </div>
              <div className="rounded-xl border border-canvas-border bg-canvas p-4">
                <span className="text-charcoal-muted block">BUFFER PROXIMITY</span>
                <span className="text-2xl font-bold text-olive mt-1 block">
                  {event.impactSummary.waterBufferAffectedMeters} m
                </span>
              </div>
            </div>
          </div>

          {/* 5. Recommended Decision Action */}
          <div className="rounded-2xl border border-walnut/30 bg-walnut/5 p-6 sm:p-8 space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs uppercase font-bold text-walnut">
              <ShieldCheck className="h-4 w-4" />
              <span>Engine 06 · Act / Recommended Follow-up</span>
            </div>
            <h3 className="text-lg font-bold text-charcoal">
              {event.recommendedAction}
            </h3>
            <p className="text-xs text-charcoal-muted leading-relaxed">
              Ground validation tasks can be assigned directly to registered field survey teams or verified against cadastral land records at the Tehsil office.
            </p>
          </div>

          {/* 6. Technical Source Metadata */}
          <div className="flex items-center justify-between border-t border-canvas-border pt-4 text-xs font-mono text-charcoal-muted">
            <div className="flex items-center gap-2">
              <Database className="h-3.5 w-3.5" />
              <span>Source Telemetry: {event.datasetSource}</span>
            </div>
            <Link
              href="/explore/lucknow"
              className="inline-flex items-center gap-1 font-medium text-walnut hover:underline"
            >
              <span>Inspect on Pilot Map</span>
              <ExternalLink className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

import React from "react";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { DATASETS, DatasetItem } from "@/data/datasets";
import { Database, ShieldCheck, ArrowRight, ExternalLink, Info } from "lucide-react";

export default function DatasetsPage() {
  return (
    <div className="min-h-screen bg-canvas text-charcoal flex flex-col justify-between">
      <Navigation />

      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        {/* Breadcrumb Header */}
        <div className="mb-10 border-b border-canvas-border pb-6">
          <div className="flex items-center gap-2 font-mono text-xs text-charcoal-muted">
            <Link href="/" className="hover:text-walnut">HOME</Link>
            <span>/</span>
            <span className="text-charcoal font-bold">DATASETS</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-charcoal mt-3">
            Remote Sensing & Geospatial Datasets
          </h1>

          <p className="mt-2 text-sm text-charcoal-muted max-w-2xl leading-relaxed">
            Transparent inventory of multi-spectral Earth observation imagery, land use classifications, digital elevation models, and spatial infrastructure layers utilized across Bhurakshak.
          </p>
        </div>

        {/* Datasets Table / Cards */}
        <div className="space-y-6 mb-16">
          {DATASETS.map((dataset) => (
            <div
              key={dataset.id}
              className="rounded-2xl border border-canvas-border bg-canvas-surface p-6 sm:p-8 space-y-5"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between border-b border-canvas-border/80 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-walnut bg-canvas px-2 py-0.5 rounded border border-canvas-border">
                      {dataset.code}
                    </span>
                    <span
                      className={`rounded border px-2.5 py-0.5 font-mono text-[10px] font-semibold ${dataset.statusColor}`}
                    >
                      {dataset.status}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-charcoal mt-2">
                    {dataset.name}
                  </h2>
                  <div className="text-xs text-charcoal-muted mt-0.5">
                    Provider: {dataset.provider}
                  </div>
                </div>

                <div className="font-mono text-xs text-charcoal-muted text-right">
                  License: {dataset.license}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
                {dataset.description}
              </p>

              {/* Specifications Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 rounded-xl border border-canvas-border bg-canvas p-4 font-mono text-xs">
                <div>
                  <div className="text-[10px] text-charcoal-muted">SPATIAL RESOLUTION</div>
                  <div className="font-bold text-charcoal mt-0.5">{dataset.spatialResolution}</div>
                </div>
                <div>
                  <div className="text-[10px] text-charcoal-muted">TEMPORAL BASELINE</div>
                  <div className="font-bold text-charcoal mt-0.5">{dataset.temporalCoverage}</div>
                </div>
                <div>
                  <div className="text-[10px] text-charcoal-muted">REVISIT FREQUENCY</div>
                  <div className="font-bold text-charcoal mt-0.5">{dataset.updateFrequency}</div>
                </div>
                <div>
                  <div className="text-[10px] text-charcoal-muted">PRIMARY USE CASE</div>
                  <div className="font-bold text-walnut mt-0.5 truncate">{dataset.purpose.slice(0, 24)}...</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

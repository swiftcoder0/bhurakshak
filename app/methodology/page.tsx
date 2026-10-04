import React from "react";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SIX_ENGINES } from "@/data/enginesData";
import {
  Layers,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Compass,
  FileText,
  HelpCircle,
  XCircle,
} from "lucide-react";

export default function MethodologyPage() {
  return (
    <div className="min-h-screen bg-canvas text-charcoal flex flex-col justify-between">
      <Navigation />

      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        {/* Breadcrumb Header */}
        <div className="mb-12 border-b border-canvas-border pb-8">
          <div className="flex items-center gap-2 font-mono text-xs text-charcoal-muted">
            <Link href="/" className="hover:text-walnut">HOME</Link>
            <span>/</span>
            <span className="text-charcoal font-bold">METHODOLOGY</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-charcoal mt-3 leading-tight">
            <span>The Science of </span>
            <span className="font-serif italic text-walnut font-normal">
              Bhurakshak.
            </span>
          </h1>

          <p className="mt-3 text-base text-charcoal-muted max-w-2xl leading-relaxed">
            How Earth-observation streams become a verifiable, evidence-led decision chain. Bhurakshak combines multi-spectral remote sensing, spatial graph heuristics, and transparent uncertainty calibration.
          </p>
        </div>

        {/* Core Epistemological Matrix: What the System Can Know vs Cannot Know */}
        <div className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* What We Can Know */}
          <div className="rounded-2xl border border-olive/30 bg-olive-subtle/40 p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2 text-olive font-bold text-sm">
              <CheckCircle2 className="h-5 w-5" />
              <span className="uppercase tracking-wider font-mono text-xs">
                What Bhurakshak Can Know
              </span>
            </div>

            <h3 className="text-lg font-bold text-charcoal">
              Empirical Biophysical Observations
            </h3>

            <ul className="space-y-2.5 text-xs text-charcoal/90 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-olive mt-1 shrink-0" />
                <span>
                  <strong>Surface reflectance shifts:</strong> Multi-spectral changes in chlorophyll absorption (NDVI), surface moisture (NDWI), and built materials (NDBI).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-olive mt-1 shrink-0" />
                <span>
                  <strong>Multi-season persistence:</strong> Distinguishing permanent conversions from seasonal crop rotation cycles across Kharif, Rabi, and Zaid seasons.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-olive mt-1 shrink-0" />
                <span>
                  <strong>Spatial proximity:</strong> Exact Euclidean distance to transport corridors, expanding peri-urban fringes, and water bodies.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-olive mt-1 shrink-0" />
                <span>
                  <strong>Physical polygon metrics:</strong> Rigorous GIS surface area calculations down to 10-meter pixel resolution (0.01 ha).
                </span>
              </li>
            </ul>
          </div>

          {/* What We Cannot Know */}
          <div className="rounded-2xl border border-risk-coral/30 bg-risk-coral/5 p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2 text-risk-coral font-bold text-sm">
              <XCircle className="h-5 w-5" />
              <span className="uppercase tracking-wider font-mono text-xs">
                What Bhurakshak Cannot Know
              </span>
            </div>

            <h3 className="text-lg font-bold text-charcoal">
              Institutional & Sub-Surface Boundaries
            </h3>

            <ul className="space-y-2.5 text-xs text-charcoal/90 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-risk-coral mt-1 shrink-0" />
                <span>
                  <strong>Legal ownership or tenure title:</strong> Satellite reflectance cannot verify revenue record disputes, registry authenticity, or private deed contracts.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-risk-coral mt-1 shrink-0" />
                <span>
                  <strong>Absolute causal intent:</strong> Proximity to highways indicates high likelihood, but satellites cannot discern private planning motivations without ground truth.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-risk-coral mt-1 shrink-0" />
                <span>
                  <strong>Sub-canopy soil degradation:</strong> Internal soil chemistry, contamination, or microbial health beneath dense undisturbed canopy.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-risk-coral mt-1 shrink-0" />
                <span>
                  <strong>Instantaneous real-time monitoring:</strong> Satellite revisit is periodic (~5 days) and subject to heavy monsoon cloud occlusion.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Detailed Breakdown of the Six Engines */}
        <div className="space-y-12 mb-16">
          <div className="border-b border-canvas-border pb-3">
            <span className="font-mono text-xs uppercase tracking-wider text-charcoal-muted">
              Deep Pipeline Specifications
            </span>
            <h2 className="text-2xl font-bold text-charcoal mt-1">
              The Six Engines in Depth
            </h2>
          </div>

          {SIX_ENGINES.map((engine) => (
            <div
              key={engine.id}
              className="rounded-2xl border border-canvas-border bg-canvas-surface p-6 sm:p-8 space-y-6"
            >
              <div className="flex items-center justify-between border-b border-canvas-border/80 pb-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-walnut text-xs font-mono font-bold text-white">
                    0{engine.step}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-charcoal">
                      Engine {engine.step}: {engine.name} ({engine.devanagari})
                    </h3>
                    <div className="font-serif italic text-xs text-charcoal-muted">
                      &ldquo;{engine.question}&rdquo;
                    </div>
                  </div>
                </div>

                <span className="font-mono text-xs uppercase text-walnut font-bold">
                  STEP 0{engine.step} / 06
                </span>
              </div>

              <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
                {engine.purpose}
              </p>

              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-charcoal font-mono mb-2">
                  Key Technical Methods
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {engine.methods.map((method, idx) => (
                    <div
                      key={idx}
                      className="rounded-lg border border-canvas-border bg-canvas p-3 text-xs text-charcoal flex items-start gap-2"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-olive mt-1 shrink-0" />
                      <span>{method}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-canvas-border bg-canvas p-4 text-xs">
                <div className="font-semibold text-charcoal flex items-center gap-2 mb-1">
                  <AlertTriangle className="h-3.5 w-3.5 text-walnut" />
                  <span>Uncertainty Notice:</span>
                </div>
                <p className="text-charcoal-muted leading-relaxed">
                  {engine.uncertaintyHonesty}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

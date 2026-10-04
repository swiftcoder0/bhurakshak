import React from "react";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ArrowRight, Compass, ShieldCheck, Heart, Leaf, Mountain } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-canvas text-charcoal flex flex-col justify-between">
      <Navigation />

      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        {/* Breadcrumb Header */}
        <div className="mb-12 border-b border-canvas-border pb-8">
          <div className="flex items-center gap-2 font-mono text-xs text-charcoal-muted">
            <Link href="/" className="hover:text-walnut">HOME</Link>
            <span>/</span>
            <span className="text-charcoal font-bold">ABOUT</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-charcoal mt-3 leading-tight">
            <span>The ethos behind </span>
            <span className="font-serif italic text-walnut font-normal">
              भूरक्षक (Bhurakshak).
            </span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-charcoal-muted leading-relaxed font-sans">
            Bhurakshak was founded on a simple conviction: India&rsquo;s land is changing faster than our institutions can verify on foot, but generic AI dashboards and flashy marketing slogans cannot replace genuine scientific evidence.
          </p>
        </div>

        {/* Narrative Essay */}
        <div className="space-y-12 text-sm sm:text-base text-charcoal/90 leading-relaxed font-sans mb-16">
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-charcoal font-serif italic text-walnut">
              1. India’s Land in Transition
            </h2>
            <p>
              Across India, the boundary between agricultural countryside and expanding metropolitan fringes is dissolving. Expressways, logistics corridors, freight junctions, and suburban layouts are converting thousands of hectares of double-cropped alluvial soil every quarter.
            </p>
            <p>
              When arable land is paved, the consequence is permanent. Groundwater recharge margins diminish, agricultural livelihoods shift, food systems absorb localized shocks, and municipal heat vulnerability intensifies. Yet planning decisions are frequently made using outdated master plans or piecemeal field inspections.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-charcoal font-serif italic text-walnut">
              2. The False Promise of AI Hype
            </h2>
            <p>
              In recent years, the market has been flooded with generic AI platforms claiming to &ldquo;predict the future with certainty&rdquo; or &ldquo;solve climate change with one click.&rdquo;
            </p>
            <p>
              Bhurakshak rejects this posturing. Satellites do not possess omniscient foresight. Optical sensors are blocked by monsoon cloud cover; multi-spectral vegetation indices can confuse harvest fallowing with permanent concrete; and proximity to highways indicates high likelihood, not legal causality.
            </p>
            <p>
              We believe true intelligence lies in <strong>honest uncertainty</strong>: clearly delineating what the satellite sees, what the spatial model infers, and what requires human ground truth verification.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-charcoal font-serif italic text-walnut">
              3. The Evidence Chain: Six Engines
            </h2>
            <p>
              Rather than presenting disconnected analytics cards, Bhurakshak structures every observation into a continuous six-step pipeline:
            </p>

            <div className="rounded-2xl border border-canvas-border bg-canvas-surface p-6 font-mono text-xs space-y-2 text-charcoal">
              <div><strong>01 OBSERVE</strong> — What does the land look like? (Multispectral Sentinel-2 & SAR)</div>
              <div><strong>02 DETECT</strong> — What has changed? (Persistent multi-season differencing)</div>
              <div><strong>03 EXPLAIN</strong> — Why did it change? (Spatial proximity & infrastructure drivers)</div>
              <div><strong>04 PREDICT</strong> — What could happen next? (Empirical transition risk models)</div>
              <div><strong>05 QUANTIFY</strong> — How much does it matter? (Cadastral polygon hectares & variance)</div>
              <div><strong>06 ACT</strong> — What should be investigated? (Prioritized field truth verification)</div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-charcoal font-serif italic text-walnut">
              4. Why Lucknow?
            </h2>
            <p>
              We chose Lucknow, Uttar Pradesh as our foundational pilot because its peri-urban growth along the Outer Ring Road (Kisan Path), Sultanpur Road, and Gomti River basin represents the quintessential Indian development paradigm.
            </p>
            <p>
              By anchoring our methods in 2,528 sq km of real geography, we ensure that our tools withstand the scrutiny of local tehsildars, town planners, and environmental advocates before scaling across India.
            </p>
          </section>
        </div>

        {/* Closing Action Card */}
        <div className="rounded-3xl border border-canvas-border bg-canvas-surface p-8 sm:p-10 mb-16 text-center space-y-4">
          <h3 className="text-2xl font-bold text-charcoal">
            Explore the Platform Firsthand
          </h3>
          <p className="text-xs sm:text-sm text-charcoal-muted max-w-md mx-auto">
            Interact with verified change events, investigate spatial evidence chains, and inspect prototype 2030 risk models.
          </p>
          <div className="pt-2">
            <Link
              href="/explore/lucknow"
              className="inline-flex items-center gap-2 rounded-full bg-walnut px-7 py-3 text-xs font-medium text-white hover:bg-walnut-hover transition-colors shadow-sm"
            >
              <span>Launch Lucknow Pilot Workspace</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

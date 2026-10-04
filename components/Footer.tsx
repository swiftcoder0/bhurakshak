import React from "react";
import Link from "next/link";
import { ArrowUpRight, Compass, ShieldCheck } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-canvas-border bg-canvas-surface py-12 text-charcoal">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand & Manifesto */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold tracking-tight text-charcoal">
                Bhurakshak
              </span>
              <span className="text-xs font-semibold tracking-wide text-charcoal-muted">
                भूरक्षक
              </span>
            </div>

            <p className="font-serif italic text-base text-walnut">
              See where. Understand why. Measure what it means.
            </p>

            <p className="text-xs text-charcoal-muted max-w-sm leading-relaxed">
              An evidence-led Earth observation and geospatial intelligence platform for understanding how India’s land is changing. Synthesizing multispectral satellite data into transparent spatial decisions.
            </p>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-canvas-border bg-canvas px-3 py-1 text-[11px] font-mono text-charcoal-muted">
                <span className="h-2 w-2 rounded-full bg-olive"></span>
                <span>Active Pilot District: Lucknow, Uttar Pradesh</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-charcoal-muted mb-3 font-mono">
              Exploration
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/explore" className="text-charcoal hover:text-walnut transition-colors">
                  Geospatial Workspace
                </Link>
              </li>
              <li>
                <Link href="/explore/lucknow" className="text-charcoal hover:text-walnut transition-colors">
                  Lucknow Pilot Map
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-charcoal hover:text-walnut transition-colors">
                  Change Events Ledger
                </Link>
              </li>
              <li>
                <Link href="/events/lk-2047" className="text-charcoal hover:text-walnut transition-colors">
                  Sample Event LK-2047
                </Link>
              </li>
            </ul>
          </div>

          {/* Intelligence & Data */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-charcoal-muted mb-3 font-mono">
              Platform & Science
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/methodology" className="text-charcoal hover:text-walnut transition-colors">
                  The Six Engines
                </Link>
              </li>
              <li>
                <Link href="/datasets" className="text-charcoal hover:text-walnut transition-colors">
                  Remote Sensing Datasets
                </Link>
              </li>
              <li>
                <Link href="/reports" className="text-charcoal hover:text-walnut transition-colors">
                  Lucknow Change Report
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-charcoal hover:text-walnut transition-colors">
                  Product Philosophy
                </Link>
              </li>
            </ul>
          </div>

          {/* System & Metadata */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-charcoal-muted mb-3 font-mono">
              System Specifications
            </div>
            <ul className="space-y-2 text-xs text-charcoal-muted">
              <li>
                <span className="block font-mono text-[11px] text-charcoal">Sentinel-2 MSI Level-2A</span>
                <span className="text-[10px]">10m resolution · ~5d revisit</span>
              </li>
              <li>
                <span className="block font-mono text-[11px] text-charcoal">Dynamic World V1</span>
                <span className="text-[10px]">Near real-time 9-class probabilities</span>
              </li>
              <li>
                <span className="block font-mono text-[11px] text-charcoal">Coordinate Standard</span>
                <span className="text-[10px]">WGS 84 / UTM Zone 44N (EPSG:32644)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Data Disclaimer */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-canvas-border pt-6 text-xs text-charcoal-muted md:flex-row">
          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <span>© {new Date().getFullYear()} Bhurakshak Geospatial Intelligence.</span>
            <span>·</span>
            <span>All predictive and future risk layers represent prototype models.</span>
          </div>

          <div className="flex items-center gap-3 font-mono text-[10px] text-charcoal-faint">
            <span>OBSERVE</span>
            <span>→</span>
            <span>DETECT</span>
            <span>→</span>
            <span>EXPLAIN</span>
            <span>→</span>
            <span>PREDICT</span>
            <span>→</span>
            <span>QUANTIFY</span>
            <span>→</span>
            <span>ACT</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

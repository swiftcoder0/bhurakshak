"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, MapPin, ArrowRight, FilePlus2, Menu, X, Compass, Activity, Database, FileText, Info } from "lucide-react";
import { LUCKNOW_PILOT } from "@/data/pilotData";
import { SearchCommandModal } from "./SearchCommandModal";

interface NavigationProps {
  onOpenReport?: () => void;
  onExplorePilot?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  onOpenReport,
  onExplorePilot,
}) => {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleExploreAction = () => {
    if (onExplorePilot) {
      onExplorePilot();
    } else {
      router.push("/explore/lucknow");
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-canvas-border/70 bg-canvas/90 backdrop-blur-md transition-all">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand & Pilot Status */}
          <div className="flex items-center gap-4 sm:gap-6">
            <Link href="/" className="flex items-baseline gap-2 group">
              <span className="text-xl font-bold tracking-tight text-charcoal sm:text-2xl group-hover:text-walnut transition-colors">
                Bhurakshak
              </span>
              <span className="text-xs font-semibold tracking-wide text-charcoal-muted font-sans">
                भूरक्षक
              </span>
            </Link>

            <Link
              href="/explore/lucknow"
              className="hidden items-center gap-2 rounded-full border border-canvas-border bg-canvas-surface/80 px-2.5 py-1 text-xs text-charcoal-muted md:flex hover:border-walnut transition-colors"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-olive opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-olive"></span>
              </span>
              <span className="font-medium text-charcoal">
                Pilot: {LUCKNOW_PILOT.district}, UP
              </span>
            </Link>
          </div>

          {/* Editorial Navigation Links */}
          <nav className="hidden items-center gap-5 text-sm font-medium text-charcoal-muted lg:flex">
            <Link
              href="/explore"
              className="transition-colors hover:text-charcoal"
            >
              Explore
            </Link>
            <Link
              href="/events"
              className="transition-colors hover:text-charcoal"
            >
              Change Events
            </Link>
            <Link
              href="/methodology"
              className="transition-colors hover:text-charcoal"
            >
              Methodology
            </Link>
            <Link
              href="/datasets"
              className="transition-colors hover:text-charcoal"
            >
              Datasets
            </Link>
            <Link
              href="/reports"
              className="transition-colors hover:text-charcoal"
            >
              Reports
            </Link>
            <Link
              href="/about"
              className="transition-colors hover:text-charcoal"
            >
              About
            </Link>
          </nav>

          {/* Actions: Search, Report, Primary CTA */}
          <div className="hidden items-center gap-3 md:flex">
            {/* Quick Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex h-9 w-52 items-center justify-between rounded-full border border-canvas-border bg-canvas-surface px-3 text-xs text-charcoal-muted hover:border-walnut transition-all xl:w-64"
            >
              <span className="flex items-center gap-2">
                <Search className="h-3.5 w-3.5" />
                <span className="truncate">Search location, event...</span>
              </span>
              <kbd className="rounded border border-canvas-border/80 px-1 py-0.5 text-[10px] font-mono text-charcoal-faint">
                ⌘K
              </kbd>
            </button>

            {/* Secondary / Ghost Action: Report an Observation */}
            {onOpenReport && (
              <button
                onClick={onOpenReport}
                className="inline-flex h-9 items-center gap-1.5 rounded-full border border-canvas-border bg-canvas-surface px-3.5 text-xs font-medium text-charcoal transition-colors hover:bg-canvas-border/40 hover:text-walnut"
              >
                <FilePlus2 className="h-3.5 w-3.5 text-olive" />
                <span>Report Observation</span>
              </button>
            )}

            {/* Primary CTA: Dark Walnut */}
            <button
              onClick={handleExploreAction}
              className="inline-flex h-9 items-center gap-1.5 rounded-full bg-walnut px-4 text-xs font-medium text-white transition-all hover:bg-walnut-hover shadow-sm"
            >
              <span>Explore Pilot</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="rounded-full border border-canvas-border bg-canvas-surface p-2 text-charcoal"
              title="Search"
            >
              <Search className="h-4 w-4" />
            </button>
            {onOpenReport && (
              <button
                onClick={onOpenReport}
                className="rounded-full border border-canvas-border bg-canvas-surface p-2 text-charcoal"
                title="Report Observation"
              >
                <FilePlus2 className="h-4 w-4 text-olive" />
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-full border border-canvas-border bg-canvas-surface p-2 text-charcoal"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="border-b border-canvas-border bg-canvas-surface px-4 py-4 md:hidden space-y-3">
            <div className="flex items-center justify-between text-xs text-charcoal-muted">
              <span className="flex items-center gap-1.5 font-medium">
                <span className="h-2 w-2 rounded-full bg-olive"></span>
                Pilot: Lucknow, UP
              </span>
              <span className="font-mono text-[11px]">
                {LUCKNOW_PILOT.coordinates.formatted}
              </span>
            </div>

            <nav className="grid grid-cols-2 gap-2 text-xs font-medium">
              <Link
                href="/explore"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg border border-canvas-border p-2.5 text-charcoal hover:bg-canvas"
              >
                Geospatial Workspace
              </Link>
              <Link
                href="/explore/lucknow"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg border border-canvas-border p-2.5 text-charcoal hover:bg-canvas"
              >
                Lucknow Pilot
              </Link>
              <Link
                href="/events"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg border border-canvas-border p-2.5 text-charcoal hover:bg-canvas"
              >
                Change Events
              </Link>
              <Link
                href="/methodology"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg border border-canvas-border p-2.5 text-charcoal hover:bg-canvas"
              >
                6 Engines
              </Link>
              <Link
                href="/datasets"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg border border-canvas-border p-2.5 text-charcoal hover:bg-canvas"
              >
                Datasets
              </Link>
              <Link
                href="/reports"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg border border-canvas-border p-2.5 text-charcoal hover:bg-canvas"
              >
                Change Dossier
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg border border-canvas-border p-2.5 text-charcoal hover:bg-canvas"
              >
                About Bhurakshak
              </Link>
            </nav>

            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleExploreAction();
                }}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-walnut py-2.5 text-xs font-medium text-white shadow-sm"
              >
                <span>Explore Lucknow Pilot</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Global Command Palette */}
      <SearchCommandModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
};

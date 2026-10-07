"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Menu, X, Sprout } from "lucide-react";
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

  const handleExploreAction = () => {
    if (onExplorePilot) {
      onExplorePilot();
    } else {
      router.push("/explore");
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-canvas-border/60 bg-[#F7F4EE]/90 backdrop-blur-md transition-all">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand: Sprout Icon + भूरक्षक */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-olive/15 text-olive group-hover:bg-olive/25 transition-colors">
                <Sprout className="h-4 w-4" />
              </span>
              <span className="text-xl font-bold tracking-tight text-charcoal group-hover:text-walnut transition-colors font-sans">
                भूरक्षक
              </span>
            </Link>
          </div>

          {/* Center Links (Matching Reference Image) */}
          <nav className="hidden items-center gap-7 text-sm font-normal text-charcoal/80 md:flex">
            <a
              href="#explore"
              className="transition-colors hover:text-walnut"
            >
              Explore
            </a>
            <a
              href="#changes"
              className="transition-colors hover:text-walnut"
            >
              Changes
            </a>
            <a
              href="#impact"
              className="transition-colors hover:text-walnut"
            >
              Impact
            </a>
            <Link
              href="/methodology"
              className="transition-colors hover:text-walnut"
            >
              Methodology
            </Link>
            <a
              href="#what-is-bhurakshak"
              className="transition-colors hover:text-walnut"
            >
              About
            </a>
          </nav>

          {/* Right Action: Explore India → */}
          <div className="hidden items-center gap-3 md:flex">
            <button
              onClick={handleExploreAction}
              className="inline-flex items-center gap-1.5 rounded-full bg-walnut px-5 py-2 text-xs font-medium text-white transition-all hover:bg-walnut-hover shadow-xs active:scale-[0.98]"
            >
              <span>Explore India</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={handleExploreAction}
              className="rounded-full bg-walnut px-3 py-1.5 text-xs font-medium text-white"
            >
              Explore →
            </button>
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
          <div className="border-b border-canvas-border bg-[#FDFCF9] px-4 py-6 md:hidden animate-in slide-in-from-top-2">
            <nav className="flex flex-col gap-4 text-sm font-medium text-charcoal">
              <a
                href="#explore"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 transition-colors hover:text-walnut"
              >
                Explore
              </a>
              <a
                href="#changes"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 transition-colors hover:text-walnut"
              >
                Changes
              </a>
              <a
                href="#impact"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 transition-colors hover:text-walnut"
              >
                Impact
              </a>
              <Link
                href="/methodology"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 transition-colors hover:text-walnut"
              >
                Methodology
              </Link>
              <a
                href="#what-is-bhurakshak"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 transition-colors hover:text-walnut"
              >
                About
              </a>

              <div className="pt-4 border-t border-canvas-border/60">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleExploreAction();
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-walnut py-2.5 text-xs font-medium text-white shadow-xs"
                >
                  <span>Explore India</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      <SearchCommandModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
};

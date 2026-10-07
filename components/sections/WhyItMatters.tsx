"use client";

import React from "react";
import Image from "next/image";
import {
  Wheat,
  Droplets,
  Leaf,
  Users2,
  TreePine,
  Building2,
  ArrowRight,
} from "lucide-react";

interface WhyItMattersProps {
  onExplorePilot?: () => void;
}

export const WhyItMatters: React.FC<WhyItMattersProps> = ({ onExplorePilot }) => {
  const pillars = [
    {
      icon: Wheat,
      label: "Food Security",
      desc: "Preserving fertile cropland ensures sustained agricultural yields for India's 1.4B population.",
    },
    {
      icon: Droplets,
      label: "Water Resources",
      desc: "Protecting recharge zones, traditional aquifers, and riparian corridors against paving.",
    },
    {
      icon: Leaf,
      label: "Environment & Biodiversity",
      desc: "Preventing fragmented natural habitats and supporting indigenous agrarian biodiversity.",
    },
    {
      icon: Users2,
      label: "Rural Livelihoods",
      desc: "Shielding smallholder farmers from predatory peripheral conversion and loss of tenure.",
    },
    {
      icon: TreePine,
      label: "Climate Resilience",
      desc: "Maintaining soil organic carbon sinks, microclimate buffers, and flood attenuation.",
    },
    {
      icon: Building2,
      label: "Sustainable Development",
      desc: "Balancing planned infrastructure with agricultural conservation through transparent data.",
    },
  ];

  return (
    <section
      id="impact"
      className="relative w-full overflow-hidden px-4 pt-20 pb-12 sm:px-6 lg:px-8 border-t border-canvas-border/70 scroll-mt-16"
    >
      <div className="mx-auto max-w-7xl">
        {/* Top Header */}
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-2">
            <span className="h-px w-6 bg-charcoal-muted/60" />
            <span className="text-xs font-mono uppercase tracking-widest text-charcoal-muted font-semibold">
              WHY IT MATTERS
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-bold text-charcoal leading-[1.1] tracking-tight font-sans">
            <span>Land fuels our future.</span>
          </h2>

          <p className="text-base sm:text-lg text-charcoal/80 leading-relaxed font-normal">
            Farmland, forests and natural ecosystems support food security,
            water, climate and livelihoods. Unplanned land conversion can impact
            communities, ecosystems and future generations.
          </p>
        </div>

        {/* 6 Impact Pillars (Exact Match to Mockup Row) */}
        <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {pillars.map((pillar, idx) => {
            const IconComponent = pillar.icon;
            return (
              <div
                key={idx}
                className="group flex flex-col items-start space-y-2.5 rounded-2xl border border-transparent p-3 transition-all hover:border-canvas-border hover:bg-[#FDFCF9]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-canvas-border/40 text-walnut group-hover:bg-olive/15 group-hover:text-olive transition-colors">
                  <IconComponent className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-semibold text-charcoal font-sans leading-snug">
                  {pillar.label}
                </h3>
                <p className="text-xs text-charcoal-muted leading-relaxed hidden sm:block">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom Panoramic Landscape Image (Exact Match to Mockup) */}
        <div className="relative mt-16 w-full overflow-hidden rounded-3xl border border-canvas-border/80 shadow-md">
          <div className="relative aspect-[21/9] sm:aspect-[24/9] w-full min-h-[260px] max-h-[460px]">
            <Image
              src="/images/farmland-panoramic.jpg"
              alt="Panoramic Indian rural farmland landscape at dawn"
              fill
              priority
              className="object-cover object-bottom"
            />
            {/* Gentle gradient fade overlay at the bottom and top */}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-black/10" />

            {/* Overlaid Editorial Caption */}
            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-4 text-white">
              <div className="max-w-xl">
                <span className="font-mono text-[10px] tracking-widest uppercase text-white/80 block">
                  Agrarian Heritage & Ecosystem Integrity
                </span>
                <p className="font-serif italic text-lg sm:text-xl text-white drop-shadow-sm mt-0.5">
                  &ldquo;A nation that destroys its soils destroys itself.&rdquo;
                </p>
              </div>

              {onExplorePilot && (
                <button
                  onClick={onExplorePilot}
                  className="inline-flex items-center gap-2 rounded-full bg-white/90 px-5 py-2 text-xs font-semibold text-charcoal backdrop-blur-md transition-all hover:bg-white hover:text-walnut shadow-sm active:scale-95"
                >
                  <span>Explore Lucknow Pilot</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyItMatters;

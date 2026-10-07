"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { WhatIsBhurakshak } from "@/components/sections/WhatIsBhurakshak";
import { ExploreIn3D } from "@/components/sections/ExploreIn3D";
import { RealSatelliteEvidence } from "@/components/sections/RealSatelliteEvidence";
import { WhyItMatters } from "@/components/sections/WhyItMatters";
import { Footer } from "@/components/Footer";
import { ReportObservationModal } from "@/components/ReportObservationModal";

export default function Home() {
  const router = useRouter();
  const [isReportOpen, setIsReportOpen] = useState(false);

  const handleExplorePilot = () => {
    router.push("/explore/lucknow");
  };

  return (
    <main className="min-h-screen bg-canvas text-charcoal flex flex-col justify-between selection:bg-walnut/15 selection:text-walnut scroll-smooth">
      {/* Top Editorial Navigation */}
      <Navigation
        onOpenReport={() => setIsReportOpen(true)}
        onExplorePilot={handleExplorePilot}
      />

      {/* Editorial Landing Page Matching Reference Design */}
      <div className="flex-1">
        {/* 1. Hero: India's land is changing + 3D Earth (Hero Variant) */}
        <HeroSection onExplorePilot={handleExplorePilot} />

        {/* 2. What Is Bhurakshak: भारत की भूमि पर नज़र रखने वाला साथी + 3D Layer Stack */}
        <WhatIsBhurakshak />

        {/* 3. Explore in 3D: See the Changes Across India + Full Cesium Explorer */}
        <ExploreIn3D onExplorePilot={handleExplorePilot} />

        {/* 4. Real Satellite Evidence: From Farmland to Development (2022 vs 2026) */}
        <RealSatelliteEvidence onExplorePilot={handleExplorePilot} />

        {/* 5. Why It Matters: Land fuels our future + 6 Pillars + Panoramic Landscape */}
        <WhyItMatters onExplorePilot={handleExplorePilot} />
      </div>

      {/* Citizen & Officer Ground Truth Observation Modal */}
      <ReportObservationModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
      />

      {/* Master Editorial Footer */}
      <Footer />
    </main>
  );
}

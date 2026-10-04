"use client";

import React, { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { Section2MoreThanLand } from "@/components/sections/Section2MoreThanLand";
import { Section3SixEnginesPipeline } from "@/components/sections/Section3SixEnginesPipeline";
import { Section4TemporalChange } from "@/components/sections/Section4TemporalChange";
import { Section5ChangeEvents } from "@/components/sections/Section5ChangeEvents";
import { Section6UnderstandWhy } from "@/components/sections/Section6UnderstandWhy";
import { Section7LookAheadRisk } from "@/components/sections/Section7LookAheadRisk";
import { Section8QuantifyImpact } from "@/components/sections/Section8QuantifyImpact";
import { Section9EvidenceToAction } from "@/components/sections/Section9EvidenceToAction";
import { Section10LucknowPilotClosing } from "@/components/sections/Section10LucknowPilotClosing";
import { Footer } from "@/components/Footer";
import { ReportObservationModal } from "@/components/ReportObservationModal";
import { LUCKNOW_PILOT } from "@/data/pilotData";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [pilotToast, setPilotToast] = useState<string | null>(null);

  const handleExplorePilot = () => {
    router.push("/explore/lucknow");
  };

  return (
    <main className="min-h-screen bg-canvas text-charcoal flex flex-col justify-between selection:bg-walnut/15 selection:text-walnut">
      {/* Top Editorial Navigation */}
      <Navigation
        onOpenReport={() => setIsReportOpen(true)}
        onExplorePilot={handleExplorePilot}
      />

      {/* Complete Long-form Editorial Landing Page Story */}
      <div className="flex-1">
        {/* Section 1: Hero + 3D Orbital India Visual */}
        <HeroSection onExplorePilot={handleExplorePilot} />

        {/* Section 2: Land is more than land */}
        <Section2MoreThanLand />

        {/* Section 3: From observation to evidence (The Six Engines) */}
        <Section3SixEnginesPipeline />

        {/* Section 4: See change over time (Temporal Satellite Comparison) */}
        <Section4TemporalChange />

        {/* Section 5: Where change is happening (Change Events Ledger) */}
        <Section5ChangeEvents />

        {/* Section 6: Why did it change? (Explain Evidence Chain) */}
        <Section6UnderstandWhy />

        {/* Section 7: Look ahead (2030 Spatial Risk Prediction) */}
        <Section7LookAheadRisk />

        {/* Section 8: Measure what it means (Quantify Impact Metrics) */}
        <Section8QuantifyImpact />

        {/* Section 9: Turn evidence into action (Act Engine Decision Support) */}
        <Section9EvidenceToAction />

        {/* Section 10: Lucknow Pilot Closing */}
        <Section10LucknowPilotClosing />
      </div>

      {/* Ground Truth Report Drawer */}
      <ReportObservationModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
      />

      {/* Master Editorial Footer */}
      <Footer />
    </main>
  );
}

export interface EvidenceChainStep {
  step: number;
  label: string;
  category: "observation" | "spatial" | "temporal" | "inference";
  headline: string;
  metric: string;
  source: string;
  explanation: string;
  confidenceContribution: string;
}

export const SAMPLE_EVIDENCE_CHAIN: EvidenceChainStep[] = [
  {
    step: 1,
    label: "Step 1: Signal Observation",
    category: "observation",
    headline: "Persistent Multispectral NDVI Decline",
    metric: "0.72 → 0.21 (-71%)",
    source: "Sentinel-2 L2A BOA Reflectance",
    explanation:
      "Vegetation index exhibited irreversible reduction across consecutive post-monsoon and rabi windows rather than expected harvest rebound.",
    confidenceContribution: "+28% Initial Alert Confidence",
  },
  {
    step: 2,
    label: "Step 2: Spectral Transition",
    category: "observation",
    headline: "Built-up Inversion & Impervious Surface Confirmation",
    metric: "NDBI +0.46 Positive Peak",
    source: "Dynamic World V1 Probability Shift",
    explanation:
      "Normalized difference built-up index turned positive, matching asphalt, concrete slabs, and industrial roofing materials.",
    confidenceContribution: "+25% Categorical Transition",
  },
  {
    step: 3,
    label: "Step 3: Spatial Context",
    category: "spatial",
    headline: "Direct Proximity to Kisan Path Outer Ring Road Link",
    metric: "140 m from Arterial Grade",
    source: "OpenStreetMap Highways + State PWD GIS",
    explanation:
      "Parcels are immediately adjacent to high-capacity freight transit corridors, exhibiting typical ribbon-development expansion signatures.",
    confidenceContribution: "+20% Driver Attribution",
  },
  {
    step: 4,
    label: "Step 4: Structural Verification",
    category: "spatial",
    headline: "SAR Radar Coherence & Double-Bounce Increase",
    metric: "VV/VH Backscatter +4.8 dB",
    source: "Sentinel-1 Synthetic Aperture Radar",
    explanation:
      "Independent microwave radar backscatter rules out seasonal crop drying and confirms vertical masonry structures and walls.",
    confidenceContribution: "+15% Structural Invariance",
  },
  {
    step: 5,
    label: "Step 5: Multi-season Persistence",
    category: "temporal",
    headline: "Multi-year Temporal Continuity Verification",
    metric: "8 Consecutive Quarters",
    source: "Bhurakshak Temporal Aggregator",
    explanation:
      "Change persisted across Kharif 2023, Rabi 2024, Zaid 2024, and Kharif 2025. Unquestionably rules out weather or temporary fallow cycles.",
    confidenceContribution: "+12% Temporal Robustness",
  },
  {
    step: 6,
    label: "Synthesis: Attribution",
    category: "inference",
    headline: "Attributed Likely Driver: Peri-urban Logistics Expansion",
    metric: "0.91 Calibrated Confidence",
    source: "Evidence Graph Synthesis Engine",
    explanation:
      "Synthesized spatial, spectral, and temporal chains indicate high probability of transportation-induced peri-urban conversion.",
    confidenceContribution: "Validated Candidate for Field Inspection",
  },
];

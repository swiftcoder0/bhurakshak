export interface TimelineSnapshot {
  year: number;
  label: string;
  season: string;
  headline: string;
  landCoverClass: string;
  builtUpPercent: number;
  agriculturePercent: number;
  vegetationPercent: number;
  waterPercent: number;
  description: string;
  spectralMetric: string;
  visualPalette: {
    primaryBg: string;
    overlayGradient: string;
    tagBg: string;
  };
}

export const TIMELINE_SNAPSHOTS: TimelineSnapshot[] = [
  {
    year: 2018,
    label: "2018 Baseline",
    season: "Post-Monsoon (October)",
    headline: "Contiguous Double-Crop Farmland",
    landCoverClass: "Arable Agriculture (Kharif / Rabi)",
    builtUpPercent: 8,
    agriculturePercent: 74,
    vegetationPercent: 14,
    waterPercent: 4,
    description:
      "Undisturbed agricultural parcels along the Gomti River flood basin and rural feeder lanes. High soil moisture and healthy vegetative biomass.",
    spectralMetric: "NDVI: 0.72 · NDBI: -0.32",
    visualPalette: {
      primaryBg: "from-emerald-950/60 to-emerald-900/40",
      overlayGradient: "rgba(46, 125, 50, 0.25)",
      tagBg: "bg-emerald-900/50 text-emerald-200",
    },
  },
  {
    year: 2020,
    label: "2020 Intermediate",
    season: "Winter Rabi (December)",
    headline: "Early Arterial Grading & Right-of-Way Clearing",
    landCoverClass: "Mixed Agricultural / Unpaved Corridors",
    builtUpPercent: 14,
    agriculturePercent: 66,
    vegetationPercent: 16,
    waterPercent: 4,
    description:
      "Initial earthwork for the Outer Ring Road (Kisan Path) emerges in multispectral imagery. Tubewell channels severed in southern plots.",
    spectralMetric: "NDVI: 0.61 · NDBI: -0.18",
    visualPalette: {
      primaryBg: "from-amber-950/50 to-emerald-950/40",
      overlayGradient: "rgba(180, 130, 40, 0.2)",
      tagBg: "bg-amber-900/50 text-amber-200",
    },
  },
  {
    year: 2022,
    label: "2022 Transition",
    season: "Pre-Monsoon Zaid (May)",
    headline: "Parcel Aggregation & Boundary Demarcation",
    landCoverClass: "Transition: Fallow Bare Soil / Civil Excavation",
    builtUpPercent: 24,
    agriculturePercent: 52,
    vegetationPercent: 20,
    waterPercent: 4,
    description:
      "High spectral bare-soil signature. Farmland ceases cultivation across 42 surveyed cadastre plots following commercial land transactions.",
    spectralMetric: "NDVI: 0.38 · NDBI: +0.08",
    visualPalette: {
      primaryBg: "from-stone-900/60 to-amber-950/50",
      overlayGradient: "rgba(160, 100, 40, 0.3)",
      tagBg: "bg-stone-800/80 text-stone-200",
    },
  },
  {
    year: 2024,
    label: "2024 Built-up Inflection",
    season: "Post-Monsoon (November)",
    headline: "Structural Framing & Logistics Warehousing",
    landCoverClass: "Active Construction & Industrial Footprint",
    builtUpPercent: 36,
    agriculturePercent: 41,
    vegetationPercent: 19,
    waterPercent: 4,
    description:
      "Rapid erection of pre-engineered steel buildings, asphalt access aprons, and perimeter walls. Permanent loss of topsoil permeability.",
    spectralMetric: "NDVI: 0.28 · NDBI: +0.29",
    visualPalette: {
      primaryBg: "from-stone-950/70 to-orange-950/50",
      overlayGradient: "rgba(190, 80, 30, 0.25)",
      tagBg: "bg-orange-950/60 text-orange-200",
    },
  },
  {
    year: 2026,
    label: "2026 Current State",
    season: "Spring / Latest Acquisition (March 2026)",
    headline: "Consolidated Peri-Urban Commercial Settlement",
    landCoverClass: "High-density Built-up / Impervious Surface",
    builtUpPercent: 48,
    agriculturePercent: 32,
    vegetationPercent: 16,
    waterPercent: 4,
    description:
      "Fully consolidated transport interchange node with retail plazas, fuel stations, and high-frequency vehicular movements.",
    spectralMetric: "NDVI: 0.21 · NDBI: +0.46",
    visualPalette: {
      primaryBg: "from-neutral-950 to-stone-900",
      overlayGradient: "rgba(120, 50, 20, 0.35)",
      tagBg: "bg-walnut text-stone-100",
    },
  },
];

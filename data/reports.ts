export interface ReportSummary {
  id: string;
  reportNumber: string;
  title: string;
  district: string;
  state: string;
  period: string;
  dateGenerated: string;
  executiveSummary: string;
  metrics: {
    totalAreaMonitoredHa: number;
    totalChangedHa: number;
    builtUpIncreasePercent: number;
    vegetationCanopyLostHa: number;
    waterBodyVarianceHa: number;
    highRiskParcelsCount: number;
  };
  keyFindings: string[];
  evidenceHighlights: {
    eventCode: string;
    description: string;
    area: string;
    driver: string;
  }[];
  recommendedActionPlan: {
    priority: "Immediate (0–30d)" | "Quarterly (1–3m)" | "Policy / Strategic";
    action: string;
    targetAgency: string;
  }[];
}

export const LUCKNOW_PILOT_REPORT: ReportSummary = {
  id: "lko-change-report-2026",
  reportNumber: "BHR-REP-LKO-2026-Q1",
  title: "Lucknow Peri-Urban Land Transition & Environmental Risk Dossier",
  district: "Lucknow",
  state: "Uttar Pradesh",
  period: "2018–2026 Multi-Season Baseline",
  dateGenerated: "March 2026 (Synthesized)",
  executiveSummary:
    "Systematic analysis of Copernicus Sentinel-2 multispectral surface reflectance and Dynamic World probability shifts over 2,528 sq km reveals accelerated conversion of fertile double-cropped alluvial farmland along the southern and eastern arterial highway spokes. A net 1,420 hectares of farmland transitioned permanently to commercial and logistics built-up infrastructure, with a 31% expansion in impervious surface footprints along the Kisan Path Outer Ring Road.",
  metrics: {
    totalAreaMonitoredHa: 252800,
    totalChangedHa: 1420.4,
    builtUpIncreasePercent: 31.4,
    vegetationCanopyLostHa: 890.2,
    waterBodyVarianceHa: -48.6,
    highRiskParcelsCount: 42,
  },
  keyFindings: [
    "Arterial Ribbon Expansion: Over 64% of detected conversions are concentrated within 500 meters of the Outer Ring Road and Sultanpur Road interchanges.",
    "Permanent Agricultural Inversion: Conversion is sustained across Kharif, Rabi, and Zaid agricultural seasons, ruling out seasonal fallowing.",
    "Drainage Impedance: Micro-watershed corridors linking to the Gomti River basin exhibit a 48.6 ha reduction in seasonal water detention margins.",
    "Tree Canopy Fragmentation: Mango orchard belts in the western peri-urban boundary show edge encroachment by commercial yards.",
  ],
  evidenceHighlights: [
    {
      eventCode: "LK-2047",
      description: "Sultanpur Road Logistics Conversion",
      area: "18.4 ha",
      driver: "Outer Ring Road freight node development",
    },
    {
      eventCode: "LK-1082",
      description: "Mohanlalganj Scrub Canopy Clearance",
      area: "7.2 ha",
      driver: "Unplanned residential layout subdivision",
    },
    {
      eventCode: "LK-4105",
      description: "Kisan Path Cloverleaf Interchange",
      area: "24.8 ha",
      driver: "Transit-oriented commercial plazas & fuel hubs",
    },
    {
      eventCode: "LK-3091",
      description: "Bakshi Ka Talab Wetland Margin",
      area: "3.1 ha",
      driver: "Agricultural infilling and embankment encroachment",
    },
  ],
  recommendedActionPlan: [
    {
      priority: "Immediate (0–30d)",
      action: "Field ground-truth verification of 14 high-confidence event clusters along Kisan Path.",
      targetAgency: "Lucknow Development Authority & Revenue Dept",
    },
    {
      priority: "Quarterly (1–3m)",
      action: "Establish automated Sentinel-2 5-day NDVI anomaly threshold alerts for Gomti riparian floodway buffers.",
      targetAgency: "UP Directorate of Environment & Bhurakshak Watch",
    },
    {
      priority: "Policy / Strategic",
      action: "Incorporate spatial risk decay models into the Master Plan 2031 agricultural preservation zoning review.",
      targetAgency: "Town & Country Planning Department, UP",
    },
  ],
};

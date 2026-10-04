export interface RiskZone {
  id: string;
  code: string;
  zoneName: string;
  riskLevel: "HIGH" | "MEDIUM" | "LOW";
  colorClass: string;
  probabilityScore: number;
  confidence: "High" | "Medium" | "Low";
  projectedHorizon: "2028–2030";
  forecastHaPotential: number;
  factors: {
    name: string;
    weight: string;
    desc: string;
  }[];
  methodologyNote: string;
}

export const RISK_ZONES: RiskZone[] = [
  {
    id: "zone-a",
    code: "ZONE LK-A",
    zoneName: "Kisan Path / Sultanpur Radial Corridor",
    riskLevel: "HIGH",
    colorClass: "text-risk-coral border-risk-coral/40 bg-risk-coral/10",
    probabilityScore: 0.84,
    confidence: "Medium",
    projectedHorizon: "2028–2030",
    forecastHaPotential: 64.2,
    factors: [
      {
        name: "Arterial Road Proximity",
        weight: "34%",
        desc: "Within 250m of active 4-lane expressway junctions and feeder branches.",
      },
      {
        name: "Historical Conversion Velocity",
        weight: "28%",
        desc: "Adjacent parcels exhibited +18.4 ha conversion over 2022–2025.",
      },
      {
        name: "Land Fragmentation Index",
        weight: "22%",
        desc: "Cadastral plots subdivided into smaller commercial parcels.",
      },
      {
        name: "Topographic Permeability",
        weight: "16%",
        desc: "Flat Gangetic alluvium requiring minimal terrain earthwork.",
      },
    ],
    methodologyNote:
      "PROTOTYPE MODEL / DEMO ONLY: Modelled using empirical spatial decay kernels. Does not account for prospective state municipal zoning amendments.",
  },
  {
    id: "zone-b",
    code: "ZONE LK-B",
    zoneName: "Mohanlalganj Southward Expansion Fringe",
    riskLevel: "MEDIUM",
    colorClass: "text-risk-amber border-risk-amber/40 bg-risk-amber/10",
    probabilityScore: 0.58,
    confidence: "Medium",
    projectedHorizon: "2028–2030",
    forecastHaPotential: 32.8,
    factors: [
      {
        name: "Secondary Road Network",
        weight: "38%",
        desc: "Intermediate connectivity to state highways via 2-lane MDRs.",
      },
      {
        name: "Gradual Tree Felling Velocity",
        weight: "30%",
        desc: "Dispersed tree canopy thinning observed in Sentinel-2 indices.",
      },
      {
        name: "Agricultural Yield Proxy",
        weight: "32%",
        desc: "Marginal soil salinity encouraging land-use diversification.",
      },
    ],
    methodologyNote:
      "PROTOTYPE MODEL / DEMO ONLY: Probability estimates are simulated to demonstrate the predictive pipeline UI.",
  },
  {
    id: "zone-c",
    code: "ZONE LK-C",
    zoneName: "Gomti Northern Riparian Floodway Buffer",
    riskLevel: "LOW",
    colorClass: "text-olive border-olive/40 bg-olive/10",
    probabilityScore: 0.22,
    confidence: "High",
    projectedHorizon: "2028–2030",
    forecastHaPotential: 8.5,
    factors: [
      {
        name: "High Seasonal Flood Risk Buffer",
        weight: "52%",
        desc: "Historical floodway inundation maps discourage permanent capital construction.",
      },
      {
        name: "Statutory Greenbelt Protections",
        weight: "32%",
        desc: "Zoned riparian buffer along river embankments.",
      },
      {
        name: "Low Road Ingress Density",
        weight: "16%",
        desc: "Limited vehicular access bridges across seasonal drainage channels.",
      },
    ],
    methodologyNote:
      "PROTOTYPE MODEL / DEMO ONLY: Low transition risk attributed to natural hydrological constraints and administrative conservation.",
  },
];

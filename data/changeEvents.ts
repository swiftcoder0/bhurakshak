export interface ChangeEvent {
  id: string;
  code: string;
  title: string;
  location: {
    district: string;
    state: string;
    microRegion: string;
    coordinates: string;
    lat: number;
    lng: number;
  };
  transition: string;
  category: "Urban Expansion" | "Vegetation Loss" | "Water-body Change" | "Infrastructure Corridor";
  areaHa: number;
  confidence: "High" | "Medium" | "Validation Needed";
  confidenceScore: number;
  firstDetected: string;
  lastConfirmed: string;
  likelyDriver: string;
  risk2030: "Elevated" | "Moderate" | "Low";
  evidenceCount: number;
  evidenceItems: {
    type: "spectral" | "proximity" | "temporal" | "ground";
    title: string;
    metric: string;
    detail: string;
  }[];
  timelineYears: {
    year: number;
    state: string;
    spectralValue: string;
  }[];
  impactSummary: {
    builtUpIncreasePercent: number;
    vegetationCanopyLostHa: number;
    waterBufferAffectedMeters: number;
  };
  recommendedAction: string;
  datasetSource: string;
}

export const CHANGE_EVENTS: ChangeEvent[] = [
  {
    id: "lk-2047",
    code: "LK-2047",
    title: "Sultanpur Road Peri-Urban Conversion",
    location: {
      district: "Lucknow",
      state: "Uttar Pradesh",
      microRegion: "Gomti South / Outer Ring Rd Jct",
      coordinates: "26.7812° N, 81.0245° E",
      lat: 26.7812,
      lng: 81.0245,
    },
    transition: "Agriculture → Built-up",
    category: "Urban Expansion",
    areaHa: 18.4,
    confidence: "High",
    confidenceScore: 0.91,
    firstDetected: "Q3 2022",
    lastConfirmed: "Q1 2026",
    likelyDriver: "Outer Ring Road Logistics & Commercial Expansion",
    risk2030: "Elevated",
    evidenceCount: 5,
    evidenceItems: [
      {
        type: "spectral",
        title: "NDBI Sharp Inversion",
        metric: "+0.42 Index Shift",
        detail: "Normalized Difference Built-up Index spiked permanently from negative baseline to positive built reflectance.",
      },
      {
        type: "temporal",
        title: "3-Season Persistent Bare Soil",
        metric: "Kharif + Rabi + Zaid",
        detail: "Absence of cyclical monsoon crop sowing in 2023, 2024, and 2025 indicates permanent conversion rather than fallow rotation.",
      },
      {
        type: "proximity",
        title: "Arterial Road Adjacency",
        metric: "140 m from Highway",
        detail: "Parcels directly border the newly widened Sultanpur 4-lane corridor with registered road access cuts.",
      },
      {
        type: "spectral",
        title: "Dynamic World Class Shift",
        metric: "0.89 Crops → 0.92 Built",
        detail: "Google Dynamic World probability consensus transitioned definitively across 18.4 contiguous hectares.",
      },
    ],
    timelineYears: [
      { year: 2018, state: "Active Double-Cropped Agriculture", spectralValue: "NDVI: 0.68" },
      { year: 2020, state: "Arable Farmland with Tubewell Irrigation", spectralValue: "NDVI: 0.64" },
      { year: 2022, state: "Initial Earthwork & Perimeter Bunding", spectralValue: "NDVI: 0.38" },
      { year: 2024, state: "Compacted Concrete & Warehouse Framing", spectralValue: "NDBI: +0.28" },
      { year: 2026, state: "Fully Paved Industrial/Logistics Facility", spectralValue: "NDBI: +0.44" },
    ],
    impactSummary: {
      builtUpIncreasePercent: 31,
      vegetationCanopyLostHa: 14.8,
      waterBufferAffectedMeters: 45,
    },
    recommendedAction: "Ground verification recommended to record building permit compliance and storm runoff mitigation.",
    datasetSource: "Copernicus S2_SR Tile T44RLP / Dynamic World V1",
  },
  {
    id: "lk-1082",
    code: "LK-1082",
    title: "Mohanlalganj Scrub Canopy Clearance",
    location: {
      district: "Lucknow",
      state: "Uttar Pradesh",
      microRegion: "Southern Mohanlalganj Belt",
      coordinates: "26.6841° N, 80.9856° E",
      lat: 26.6841,
      lng: 80.9856,
    },
    transition: "Open Scrub & Tree Cover → Levelled Ground",
    category: "Vegetation Loss",
    areaHa: 7.2,
    confidence: "High",
    confidenceScore: 0.88,
    firstDetected: "Q1 2023",
    lastConfirmed: "Q4 2025",
    likelyDriver: "Unplanned Plotted Residential Layout",
    risk2030: "Elevated",
    evidenceCount: 4,
    evidenceItems: [
      {
        type: "spectral",
        title: "Tree Canopy Loss via EVI",
        metric: "-54% Green Reflectance",
        detail: "Enhanced Vegetation Index dropped consistently across 7.2 hectares within a single 45-day acquisition gap.",
      },
      {
        type: "proximity",
        title: "Feeder Road Construction",
        metric: "80 m from Rural Road",
        detail: "New unpaved grid tracks detected branching into the cleared canopy.",
      },
    ],
    timelineYears: [
      { year: 2018, state: "Semi-dense Neem and Babool Groves", spectralValue: "EVI: 0.59" },
      { year: 2021, state: "Dense Natural Vegetative Buffer", spectralValue: "EVI: 0.58" },
      { year: 2023, state: "Segmented Felling & Clearing", spectralValue: "EVI: 0.31" },
      { year: 2026, state: "Grid-subdivided Cleared Plots", spectralValue: "EVI: 0.16" },
    ],
    impactSummary: {
      builtUpIncreasePercent: 12,
      vegetationCanopyLostHa: 7.2,
      waterBufferAffectedMeters: 120,
    },
    recommendedAction: "Prioritize field drone survey to evaluate tree preservation guidelines and local municipal notification.",
    datasetSource: "Sentinel-2 L2A / Global Forest Watch Proxy",
  },
  {
    id: "lk-3091",
    code: "LK-3091",
    title: "Bakshi Ka Talab Wetland Margin Shrinkage",
    location: {
      district: "Lucknow",
      state: "Uttar Pradesh",
      microRegion: "Northern BKT Aquatic Buffer",
      coordinates: "27.0210° N, 80.8920° E",
      lat: 27.021,
      lng: 80.892,
    },
    transition: "Seasonal Water Margin → Encroached Silt Basin",
    category: "Water-body Change",
    areaHa: 3.1,
    confidence: "Medium",
    confidenceScore: 0.79,
    firstDetected: "Q4 2021",
    lastConfirmed: "Q1 2026",
    likelyDriver: "Agricultural Infilling and Drainage Alteration",
    risk2030: "Moderate",
    evidenceCount: 3,
    evidenceItems: [
      {
        type: "spectral",
        title: "MNDWI Water Inversion",
        metric: "-0.38 Water Index",
        detail: "Modified Normalized Difference Water Index shows 3.1 hectares dry even during post-monsoon high-water stand.",
      },
      {
        type: "temporal",
        title: "Failed Post-Monsoon Recharge",
        metric: "4 Consecutive Years",
        detail: "Wetland perimeter failed to refill in Octobers of 2022, 2023, 2024, and 2025 despite normal regional monsoon rainfall.",
      },
    ],
    timelineYears: [
      { year: 2018, state: "Perennial Water Margin & Reeds", spectralValue: "MNDWI: +0.48" },
      { year: 2021, state: "Narrowing Water Rim", spectralValue: "MNDWI: +0.22" },
      { year: 2024, state: "Silt Deposition & Weeds", spectralValue: "MNDWI: -0.10" },
      { year: 2026, state: "Compacted Earthen Fill", spectralValue: "MNDWI: -0.28" },
    ],
    impactSummary: {
      builtUpIncreasePercent: 4,
      vegetationCanopyLostHa: 1.1,
      waterBufferAffectedMeters: 310,
    },
    recommendedAction: "Ground verification with UP Irrigation Department hydrological records to verify natural watercourse sanctity.",
    datasetSource: "Sentinel-2 L2A MNDWI / Bhuvan Water Bodies Database",
  },
  {
    id: "lk-4105",
    code: "LK-4105",
    title: "Kisan Path Ring Road Interchange Zone",
    location: {
      district: "Lucknow",
      state: "Uttar Pradesh",
      microRegion: "Eastern Kisan Path Belt",
      coordinates: "26.8520° N, 81.0890° E",
      lat: 26.852,
      lng: 81.089,
    },
    transition: "Open Farmland → High-density Commercial Infrastructure",
    category: "Infrastructure Corridor",
    areaHa: 24.8,
    confidence: "High",
    confidenceScore: 0.94,
    firstDetected: "Q2 2021",
    lastConfirmed: "Q1 2026",
    likelyDriver: "Ring Road Transit Node & Institutional Hub",
    risk2030: "Elevated",
    evidenceCount: 6,
    evidenceItems: [
      {
        type: "proximity",
        title: "Direct Cloverleaf Interchange Proximity",
        metric: "Adjacent (0 m)",
        detail: "Zone sits on the primary cloverleaf intersection linking Lucknow-Faizabad and Lucknow-Sultanpur arteries.",
      },
      {
        type: "spectral",
        title: "SAR Dual-Pol Coherence Shift",
        metric: "Sentinel-1 VV/VH",
        detail: "Significant increase in radar double-bounce reflection confirming dense masonry/structural concrete erection.",
      },
    ],
    timelineYears: [
      { year: 2018, state: "Fertile Rabi Wheat Fields", spectralValue: "NDVI: 0.72" },
      { year: 2021, state: "Civil Grading for Highway Link", spectralValue: "NDVI: 0.25" },
      { year: 2024, state: "Service Road & Commercial Plazas", spectralValue: "NDBI: +0.38" },
      { year: 2026, state: "High-density Mixed Transit Zone", spectralValue: "NDBI: +0.52" },
    ],
    impactSummary: {
      builtUpIncreasePercent: 48,
      vegetationCanopyLostHa: 22.4,
      waterBufferAffectedMeters: 80,
    },
    recommendedAction: "Integrate with Lucknow Development Authority Master Plan 2031 spatial review for stormwater zoning.",
    datasetSource: "Copernicus S2 + Sentinel-1 SAR Composite",
  },
  {
    id: "lk-5512",
    code: "LK-5512",
    title: "Kakori Agro-Forestry Patch Transition",
    location: {
      district: "Lucknow",
      state: "Uttar Pradesh",
      microRegion: "Western Kakori Mango Orchards",
      coordinates: "26.8820° N, 80.7950° E",
      lat: 26.882,
      lng: 80.795,
    },
    transition: "Heritage Mango Orchard → Low-rise Storage Yards",
    category: "Vegetation Loss",
    areaHa: 9.6,
    confidence: "Medium",
    confidenceScore: 0.81,
    firstDetected: "Q3 2023",
    lastConfirmed: "Q1 2026",
    likelyDriver: "Expressway Connector Warehousing Spillover",
    risk2030: "Elevated",
    evidenceCount: 4,
    evidenceItems: [
      {
        type: "spectral",
        title: "Perennial Tree Phenology Inversion",
        metric: "Loss of Annual Bloom Cycle",
        detail: "Permanent dampening of spring flowering green reflectance signature over Malihabad-Kakori geographical indication zone.",
      },
    ],
    timelineYears: [
      { year: 2018, state: "Mature Dasheri Mango Orchard", spectralValue: "NDVI: 0.76" },
      { year: 2022, state: "Partial Tree Clearing at Fringe", spectralValue: "NDVI: 0.54" },
      { year: 2024, state: "Tin-roof Logistics Warehouses", spectralValue: "NDBI: +0.31" },
      { year: 2026, state: "Logistics Fleet Parking & Hardstand", spectralValue: "NDBI: +0.42" },
    ],
    impactSummary: {
      builtUpIncreasePercent: 24,
      vegetationCanopyLostHa: 9.1,
      waterBufferAffectedMeters: 20,
    },
    recommendedAction: "Notify UP Horticulture Directorate to check Malihabad special heritage orchard preservation buffer compliance.",
    datasetSource: "Copernicus S2_SR 10m / Landsat-8 Historical",
  },
];

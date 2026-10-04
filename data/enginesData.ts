export interface EngineStep {
  step: number;
  id: string;
  name: string;
  devanagari: string;
  question: string;
  purpose: string;
  methods: string[];
  sampleEvidence: {
    title: string;
    description: string;
    dataPoint: string;
    source: string;
  };
  uncertaintyHonesty: string;
}

export const SIX_ENGINES: EngineStep[] = [
  {
    step: 1,
    id: "observe",
    name: "Observe",
    devanagari: "अवलोकन",
    question: "What does the land look like?",
    purpose:
      "Ingest, calibrate, and organize continuous Earth-observation streams across multispectral satellite sensors and open geographic datasets.",
    methods: [
      "Copernicus Sentinel-2 Level-2A (Bottom-of-Atmosphere surface reflectance)",
      "Dynamic World 10m near-real-time global land use / land cover",
      "Sentinel-1 SAR backscatter for soil moisture and structural surface variance",
      "Bhuvan Indian geo-platform baseline data & topography relief",
    ],
    sampleEvidence: {
      title: "Multi-band Spectral Acquisition",
      description:
        "10-meter spatial resolution multi-band reflectance over Lucknow peri-urban grid.",
      dataPoint: "B2/B3/B4/B8 Harmonized SR Tile T44RLP",
      source: "Copernicus S2_SR / Dynamic World V1",
    },
    uncertaintyHonesty:
      "Satellite revisit (~5 days) is cloud-dependent; monsoon seasons require radar (SAR) or composite temporal filtering.",
  },
  {
    step: 2,
    id: "detect",
    name: "Detect",
    devanagari: "संसूचन",
    question: "What has changed?",
    purpose:
      "Isolate physical land-cover transitions across multi-season baselines using change vector analysis and categorical probability shifts.",
    methods: [
      "Bi-temporal spectral difference indexing (NDVI, NDBI, NDWI)",
      "Dynamic World 9-class land-cover transition probabilities",
      "Persistent multi-season anomaly verification (Kharif, Rabi, Zaid)",
      "Pixel-level morphological change clustering",
    ],
    sampleEvidence: {
      title: "Land-cover Transition Event",
      description:
        "Agricultural parcel shift to compacted non-vegetated surface sustained over 3 consecutive quarters.",
      dataPoint: "Agriculture → Built-up (+0.84 probability shift)",
      source: "Multi-temporal differencing algorithm",
    },
    uncertaintyHonesty:
      "Seasonal crop rotations can mimic vegetation loss; requires multi-season baseline verification to avoid false alerts.",
  },
  {
    step: 3,
    id: "explain",
    name: "Explain",
    devanagari: "व्याख्या",
    question: "Why did it change?",
    purpose:
      "Synthesize spatial and contextual signals to attribute detected changes to likely drivers rather than asserting unsupported causality.",
    methods: [
      "Proximity to transport corridors (Kisan Path, Sultanpur Rd, highways)",
      "Spatial clustering of building footprints and industrial corridors",
      "Hydrological basin buffer analysis and flood inundation history",
      "Deterministic spatial rule validation combined with contextual GIS layers",
    ],
    sampleEvidence: {
      title: "Corridor Adjacency Evidence",
      description:
        "Detected transition lies within 180 meters of the Outer Ring Road expansion corridor.",
      dataPoint: "Likely driver: Peri-urban infrastructure expansion",
      source: "Spatial proximity & master plan overlay",
    },
    uncertaintyHonesty:
      "Framed strictly as 'Likely Driver' based on proximity and historical correlation; avoids claiming absolute causality.",
  },
  {
    step: 4,
    id: "predict",
    name: "Predict",
    devanagari: "पूर्वानुमान",
    question: "What could happen next?",
    purpose:
      "Estimate future spatial conversion risk along dynamic fringes using empirical growth models and contextual probability surfaces.",
    methods: [
      "Gradient-boosted spatial transition risk models (XGBoost/LightGBM)",
      "Distance decay kernels from existing urban fringes and arterial roads",
      "Historical conversion velocity over 2018–2024 baselines",
      "Restrained scenario projections with calibrated confidence bounds",
    ],
    sampleEvidence: {
      title: "2030 Spatial Risk Forecast",
      description:
        "Parcels adjacent to newly paved arterial networks exhibit elevated transition probabilities.",
      dataPoint: "Zone LK-A: 0.74 risk score (Elevated Risk)",
      source: "Spatial risk model (prototype)",
    },
    uncertaintyHonesty:
      "Predictions represent risk likelihoods under current trends, not certainties; policy or zoning changes directly alter outcomes.",
  },
  {
    step: 5,
    id: "quantify",
    name: "Quantify",
    devanagari: "मात्रा निर्धारण",
    question: "How much does it matter?",
    purpose:
      "Convert spatial detections into rigorous, measurable geographic metrics and impact indicators.",
    methods: [
      "Hectares of arable agricultural soil permanently converted",
      "Vegetation canopy reduction and carbon-stock proxy changes",
      "Wetland surface shrinkage and natural drainage impediment assessment",
      "Landscape fragmentation and patch geometry metrics",
    ],
    sampleEvidence: {
      title: "Empirical Impact Metrics",
      description:
        "18.4 hectares converted across 3 adjacent cadastre parcels in Lucknow district.",
      dataPoint: "18.4 ha converted · 31% built-up increase · 7.2 ha vegetation loss",
      source: "Vectorized polygon area computation (EPSG:32644)",
    },
    uncertaintyHonesty:
      "Pixel boundary resolution (10m) introduces an estimated ±5% edge error margin on smaller parcels.",
  },
  {
    step: 6,
    id: "act",
    name: "Act",
    devanagari: "कार्रवाई",
    question: "What should be investigated or monitored?",
    purpose:
      "Translate evidence chains into prioritized decision-support workflows for field teams, planners, and ground observers.",
    methods: [
      "Ground truth validation task generation with geographic coordinate pins",
      "Targeted field inspection routing for local environmental authorities",
      "High-priority watch-list enrollment for rapid quarterly re-imaging",
      "Public and researcher observation logging for ground validation",
    ],
    sampleEvidence: {
      title: "Recommended Decision Step",
      description:
        "Ground verification recommended to differentiate licensed industrial warehousing from unregulated earthfilling.",
      dataPoint: "Action: Prioritized Ground Verification Candidate",
      source: "Decision-support matrix",
    },
    uncertaintyHonesty:
      "The system advises and prioritizes human investigation; it never replaces statutory inspection or legal verification.",
  },
];

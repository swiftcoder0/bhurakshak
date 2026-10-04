export interface DatasetItem {
  id: string;
  name: string;
  code: string;
  provider: string;
  purpose: string;
  spatialResolution: string;
  temporalCoverage: string;
  updateFrequency: string;
  status: "Implemented (Mock)" | "Prototype Pipeline" | "Planned Integration";
  statusColor: string;
  description: string;
  license: string;
}

export const DATASETS: DatasetItem[] = [
  {
    id: "sentinel-2",
    name: "Copernicus Sentinel-2 Level-2A",
    code: "COPERNICUS/S2_SR_HARMONIZED",
    provider: "European Space Agency (ESA) / Copernicus",
    purpose: "Multispectral bottom-of-atmosphere surface reflectance for vegetation and built-up indices",
    spatialResolution: "10 m (B2, B3, B4, B8) · 20 m (Red Edge, SWIR)",
    temporalCoverage: "2015 – Present",
    updateFrequency: "~5 days (constellation revisit)",
    status: "Implemented (Mock)",
    statusColor: "bg-olive/15 text-olive border-olive/30",
    description: "Core optical earth-observation baseline used for NDVI, NDBI, and MNDWI calculation.",
    license: "Open Access / Copernicus Free & Open License",
  },
  {
    id: "dynamic-world",
    name: "Google Dynamic World V1",
    code: "GOOGLE/DYNAMICWORLD/V1",
    provider: "World Resources Institute (WRI) / Google",
    purpose: "Near-real-time 9-class land use / land cover probability predictions",
    spatialResolution: "10 m",
    temporalCoverage: "2015 – Present",
    updateFrequency: "Per Sentinel-2 acquisition",
    status: "Implemented (Mock)",
    statusColor: "bg-olive/15 text-olive border-olive/30",
    description: "Probabilistic pixel categorization across water, trees, grass, flooded vegetation, crops, shrub/scrub, built, bare, and snow/ice.",
    license: "CC-BY 4.0 Open Dataset",
  },
  {
    id: "sentinel-1",
    name: "Copernicus Sentinel-1 SAR GRD",
    code: "COPERNICUS/S1_GRD",
    provider: "European Space Agency (ESA)",
    purpose: "Synthetic Aperture Radar (C-band) for cloud-penetrating structural and moisture detection",
    spatialResolution: "10 m (pixel spacing)",
    temporalCoverage: "2014 – Present",
    updateFrequency: "6–12 days",
    status: "Prototype Pipeline",
    statusColor: "bg-amber-900/15 text-amber-800 border-amber-800/30",
    description: "Dual-polarization (VV + VH) backscatter to observe ground changes through heavy monsoon cloud cover.",
    license: "Copernicus Open Access",
  },
  {
    id: "bhuvan-lulc",
    name: "Bhuvan Thematic LULC 1:50,000",
    code: "ISRO/NRSC/BHUVAN_LULC",
    provider: "ISRO / National Remote Sensing Centre (NRSC)",
    purpose: "Authoritative Indian national land use and land cover cartography and agro-ecological baselines",
    spatialResolution: "1:50,000 cartographic scale",
    temporalCoverage: "Multi-decadal multi-cycle assessments",
    updateFrequency: "Multi-year census cycle",
    status: "Prototype Pipeline",
    statusColor: "bg-amber-900/15 text-amber-800 border-amber-800/30",
    description: "Provides verified national baseline classes for agricultural classification and forest boundary legal definitions.",
    license: "Government of India Open Data License / Bhuvan Portal",
  },
  {
    id: "cartosat-dem",
    name: "Cartosat-1 Digital Elevation Model (CartoDEM)",
    code: "ISRO/NRSC/CARTODEM",
    provider: "ISRO / Space Applications Centre",
    purpose: "High-resolution Indian topographic relief and hydrological watershed modeling",
    spatialResolution: "10–30 m",
    temporalCoverage: "National coverage baseline",
    updateFrequency: "Static elevation surface",
    status: "Planned Integration",
    statusColor: "bg-charcoal/10 text-charcoal-muted border-charcoal/20",
    description: "Enables slope, aspect, and basin runoff calculations to explain waterlogging and floodplain risks.",
    license: "Bhuvan Open Geoportal Access",
  },
  {
    id: "osm-infra",
    name: "OpenStreetMap Infrastructure & Transport Network",
    code: "OSM/IN/ROADS_BUILDINGS",
    provider: "OpenStreetMap Contributors / Geofabrik",
    purpose: "Vector road centerline networks, highway classifications, and building footprints",
    spatialResolution: "Vector geometry (sub-meter accuracy)",
    temporalCoverage: "Live community baseline",
    updateFrequency: "Daily / Weekly updates",
    status: "Implemented (Mock)",
    statusColor: "bg-olive/15 text-olive border-olive/30",
    description: "Used to compute Euclidean distance decay kernels from major arterial corridors to model spatial driver causality.",
    license: "ODbL (Open Database License)",
  },
  {
    id: "gpm-imerg",
    name: "NASA GPM IMERG Precipitation",
    code: "NASA/GPM_L3/IMERG_V06",
    provider: "NASA / JAXA",
    purpose: "Multi-satellite precipitation anomalies to differentiate drought/crop cycles from land conversions",
    spatialResolution: "0.1° (~10 km)",
    temporalCoverage: "2000 – Present",
    updateFrequency: "Daily / Monthly aggregations",
    status: "Planned Integration",
    statusColor: "bg-charcoal/10 text-charcoal-muted border-charcoal/20",
    description: "Contextual rainfall data ensures agricultural vegetation changes are not misclassified due to seasonal rainfall anomalies.",
    license: "NASA Earth Science Open Data",
  },
  {
    id: "soi-admin",
    name: "Survey of India Administrative Boundaries",
    code: "SOI/ADMIN_V2",
    provider: "Survey of India (SoI)",
    purpose: "State, district, tehsil, and village revenue boundaries",
    spatialResolution: "Administrative vector boundaries",
    temporalCoverage: "Latest gazetted boundaries",
    updateFrequency: "Annual / Official notifications",
    status: "Implemented (Mock)",
    statusColor: "bg-olive/15 text-olive border-olive/30",
    description: "Authoritative spatial boundary masks for administrative aggregation from Lucknow district to block levels.",
    license: "National Map Policy / SoI Open Series",
  },
];

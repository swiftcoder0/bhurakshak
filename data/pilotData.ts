export interface PilotMetadata {
  district: string;
  state: string;
  coordinates: {
    lat: number;
    lng: number;
    formatted: string;
  };
  focusCorridor: string;
  status: string;
  validationCandidate: boolean;
}

export const LUCKNOW_PILOT: PilotMetadata = {
  district: "Lucknow",
  state: "Uttar Pradesh",
  coordinates: {
    lat: 26.8467,
    lng: 80.9462,
    formatted: "26.8467° N, 80.9462° E",
  },
  focusCorridor: "Peri-urban Gomti & Sultanpur Rd Belt",
  status: "Validation Pilot",
  validationCandidate: true,
};

export interface DemoHotspot {
  id: string;
  name: string;
  xPercent: number; // percentage on map coordinate frame
  yPercent: number;
  type: "change" | "risk";
  label: string;
  areaHa?: number;
  riskLevel?: "Elevated" | "Moderate" | "Low";
  transition?: string;
  isMock: true;
}

export const DEMO_CHANGE_HOTSPOTS: DemoHotspot[] = [
  {
    id: "LK-GOMTI-01",
    name: "Gomti South Riverfront",
    xPercent: 54.2,
    yPercent: 44.1,
    type: "change",
    label: "Peri-urban expansion · 18.4 ha",
    areaHa: 18.4,
    transition: "Agriculture → Built-up",
    isMock: true,
  },
  {
    id: "LK-MOHANLAL-02",
    name: "Mohanlalganj Corridor",
    xPercent: 53.6,
    yPercent: 45.8,
    type: "change",
    label: "Vegetation loss · 7.2 ha",
    areaHa: 7.2,
    transition: "Open scrub → Commercial",
    isMock: true,
  },
  {
    id: "LK-BAKSHI-03",
    name: "Bakshi Ka Talab Zone",
    xPercent: 54.8,
    yPercent: 42.6,
    type: "change",
    label: "Water-body alteration · 3.1 ha",
    areaHa: 3.1,
    transition: "Wetland margin → Compacted surface",
    isMock: true,
  },
];

export const DEMO_RISK_ZONES: DemoHotspot[] = [
  {
    id: "LK-RISK-A",
    name: "Outer Ring Road Fringe",
    xPercent: 55.4,
    yPercent: 43.5,
    type: "risk",
    label: "Modelled 2030 Risk: Elevated",
    riskLevel: "Elevated",
    isMock: true,
  },
  {
    id: "LK-RISK-B",
    name: "Kanpur Highway Transition",
    xPercent: 52.8,
    yPercent: 46.2,
    type: "risk",
    label: "Modelled 2030 Risk: Moderate",
    riskLevel: "Moderate",
    isMock: true,
  },
];

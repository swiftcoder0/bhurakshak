export interface SpecItem {
  metric: string;
  label: string;
  detail: string;
}

export const HONEST_SPECS: SpecItem[] = [
  {
    metric: "~5 days",
    label: "Typical revisit",
    detail: "Cloud-dependent · Sentinel-2",
  },
  {
    metric: "10 m",
    label: "Spatial resolution",
    detail: "0.01 ha per pixel",
  },
  {
    metric: "2018–Present",
    label: "Temporal baseline",
    detail: "Multi-season Kharif / Rabi / Zaid",
  },
  {
    metric: "6 Engines",
    label: "Intelligence pipeline",
    detail: "Observe → Detect → Explain → Predict → Quantify → Act",
  },
  {
    metric: "Lucknow",
    label: "Pilot district",
    detail: "Validation candidate · Uttar Pradesh",
  },
];

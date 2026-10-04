# Bhurakshak (भूरक्षक)
### Geospatial Intelligence & Earth Observation Platform for India’s Changing Land

> **India’s land is changing.**  
> **See where. Understand why. Measure what it means.**  
> Pipeline: **Observe → Detect → Explain → Predict → Quantify → Act**

---

## 1. Overview

**Bhurakshak** is a geospatial intelligence platform designed to understand how India's land is changing over time. By transforming multi-temporal Earth-observation satellites (Copernicus Sentinel-2, Sentinel-1 SAR) and probabilistic land use layers (Google Dynamic World V1) into an understandable evidence chain, Bhurakshak helps planners, researchers, and field teams identify:

- **Where** land is transforming across agricultural and peri-urban frontiers.
- **Why** changes occur through spatial driver correlation (transport corridors, zoning, infrastructure).
- **What** future conversion risks exist under empirical 2030 models.
- **How much** impact is inflicted upon arable soils, tree canopies, and aquatic flood buffers.
- **What actions** are prioritized for ground-truth verification.

---

## 2. The Six Engines Pipeline

Bhurakshak replaces black-box AI causation with a structured six-step intelligence pipeline:

1. **Observe (अवलोकन)**: Ingest multi-spectral Sentinel-2 Level-2A and SAR radar backscatter.
2. **Detect (संसूचन)**: Identify multi-season land-cover transitions (Kharif, Rabi, Zaid) using change vector analysis.
3. **Explain (व्याख्या)**: Synthesize proximity kernels and infrastructure ribbons to determine likely drivers.
4. **Predict (पूर्वानुमान)**: Model spatial conversion risks using distance decay kernels and growth velocities.
5. **Quantify (मात्रा निर्धारण)**: Compute precise cadastral polygon areas (hectares) and environmental variance.
6. **Act (कार्रवाई)**: Deliver decision-support alerts and geofenced ground-truth verification tasks.

---

## 3. Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom editorial design tokens (`#F7F4EE`, `#3D2314`, `#4A6741`)
- **Typography**: Inter (Body/UI), Newsreader (Serif headlines/accents), JetBrains Mono (GIS coordinates & metadata)
- **Icons**: Lucide React
- **Motion**: Framer Motion & CSS custom keyframes

---

## 4. Application Routes

| Route | Description |
|---|---|
| `/` | Master editorial landing page (Sections 1–10: Hero, Land Philosophy, 6 Engines, Time-Series Slider, Change Events, Explain, Risk, Quantify, Act, Lucknow Pilot) |
| `/explore` | National geospatial exploration workspace with raster layers, timeline scrubber, and side panel |
| `/explore/lucknow` | Dedicated Lucknow district pilot workspace (2,528 sq km Gomti basin scope) |
| `/events` | Change event discovery ledger with category filters and metrics |
| `/events/[id]` | Comprehensive individual event dossier (Chronology, Evidence Stack, Impact, Action) |
| `/methodology` | Complete scientific methodology and epistemology (What the system can know vs. cannot know) |
| `/datasets` | Remote sensing data sources, resolutions, revisit cycles, and license metadata |
| `/reports` | Lucknow pilot change dossier with PDF, CSV, and GeoJSON export simulations |
| `/about` | Product ethos, problem statement, and founding philosophy |

---

## 5. Local Development Setup

### Prerequisites
- Node.js >= 18.17.0 (Node 20 or 22 recommended)
- npm >= 9.0.0

### Installation & Run

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open http://localhost:3000 in your browser
```

### Production Build

```bash
# Build the Next.js application
npm run build

# Start the optimized production server
npm start
```

---

## 6. Render Deployment Guide

The repository includes a production-ready `render.yaml` configuration.

### Deploying to Render as a Web Service:

1. **Push to GitHub**: Ensure the repository is pushed to your GitHub account on the `main` branch.
2. **New Web Service**: Log in to [Render Dashboard](https://dashboard.render.com/) and click **New +** → **Blueprint** or **Web Service**.
3. **Connect Repository**: Select the `bhurakshak` repository.
4. **Configuration Settings**:
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Auto-Deploy**: Enabled (`commit` trigger)
5. **Environment Variables**:
   - `NODE_VERSION`: `20.14.0`
   - `NEXT_TELEMETRY_DISABLED`: `1`
6. Click **Deploy Web Service**. Render will execute the production build and provide your live URL.

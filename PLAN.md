# BHURAKSHAK
## भूरक्षक
### Master Product, Website, UX, Data & Technical Blueprint

---

# 0. PROJECT STATUS

This project is being rebuilt from scratch.

The previous implementation has been deleted because the frontend became inconsistent during development and the design/model changed midway.

This repository is now a clean implementation.

IMPORTANT:

This document is the **master source of truth** for the Bhurakshak product.

Read the entire PLAN.md before implementing major features.

Do not invent a different product direction.

Do not turn Bhurakshak into a generic SaaS dashboard.

Do not prematurely implement complex backend systems before the corresponding UX/product flow is established.

Build progressively according to the roadmap in this document.

---

# 1. WHAT IS BHURAKSHAK?

Bhurakshak is a **geospatial intelligence and Earth-observation platform for understanding how India's land is changing**.

The product combines:

- satellite imagery
- land-cover information
- geographic data
- temporal analysis
- change detection
- spatial evidence
- predictive risk modelling
- quantitative measurement
- human observations
- actionable recommendations

The central product question is:

> **Where is India's land changing?**
>
> **Why is it changing?**
>
> **What could happen next?**
>
> **How much does it matter?**
>
> **What should be investigated or monitored?**

Bhurakshak should turn large amounts of complex geospatial information into an understandable evidence chain.

---

# 2. CORE PRODUCT PROMISE

The central product statement is:

> **See where. Understand why. Measure what it means.**

The complete analytical journey is:

> **Observe → Detect → Explain → Predict → Quantify → Act**

These six stages are called the **Six Engines**.

The Six Engines are not six unrelated features.

They form one continuous intelligence pipeline.

```text
OBSERVE
   ↓
DETECT
   ↓
EXPLAIN
   ↓
PREDICT
   ↓
QUANTIFY
   ↓
ACT
```

---

# 3. PRODUCT PHILOSOPHY

Bhurakshak should be:

- evidence-led
- geographically grounded
- scientifically cautious
- visually calm
- technically credible
- transparent about uncertainty
- useful to people who need to investigate land/environmental change

Bhurakshak should NOT:

- exaggerate AI capabilities
- claim certainty where there is only inference
- present mock data as live data
- claim to prevent events it cannot actually prevent
- use AI merely for marketing
- become an ordinary map viewer
- become a generic analytics dashboard

---

# 4. TARGET USERS

The platform should eventually serve multiple types of users.

## Primary users

### 1. Researchers

Need to:

- compare locations
- analyse changes over time
- inspect evidence
- understand trends
- export findings

### 2. Government / planners

Need to:

- monitor land-use changes
- identify priority areas
- investigate urban expansion
- monitor environmental changes
- support evidence-based planning

### 3. Environmental organisations

Need to:

- identify vegetation/water changes
- investigate potential environmental stress
- monitor specific regions
- collect observations

### 4. Field teams / observers

Need to:

- report observations
- upload evidence
- validate satellite-derived findings

### 5. General public

Need a simplified experience:

- understand what changed
- understand where
- see evidence
- explore their region

---

# 5. WEBSITE / APPLICATION STRUCTURE

The complete Bhurakshak product should eventually contain:

```text
LANDING PAGE
    ↓
EXPLORE PILOT
    ↓
PILOT WORKSPACE
    ↓
MAP + TIMELINE
    ↓
CHANGE EVENTS
    ↓
EVIDENCE
    ↓
EXPLANATION
    ↓
RISK / PREDICTION
    ↓
QUANTIFICATION
    ↓
ACT
```

Additional product areas:

```text
Report an Observation
Research / Methodology
About Bhurakshak
Datasets
Case Studies
```

Future application navigation may include:

- Explore
- Change Events
- Risk
- Observations
- Reports
- Methodology

Keep navigation intentionally simple.

---

# 6. VISUAL IDENTITY

The product should look like a combination of:

- modern cartography
- Earth observation
- editorial publishing
- environmental intelligence
- research software

It should NOT look like:

- generic AI startup
- cryptocurrency dashboard
- futuristic sci-fi interface
- gaming UI
- blue/purple SaaS
- neon data visualisation
- generic admin dashboard

The interface should communicate:

> **Earth + Evidence + Intelligence**

---

# 7. DESIGN TOKENS

## Background

Primary background:

```text
#F7F4EE
```

Warm off-white.

Surface:

```text
#FDFCF9
```

Subtle border:

```text
#E5DED3
```

---

## Primary action

Walnut:

```text
#3D2314
```

Hover:

```text
#2A1709
```

Primary buttons use walnut.

Do NOT use blue/purple as primary CTA colours.

---

## Environmental accent

Olive:

```text
#4A6741
```

Use sparingly for:

- environmental indicators
- positive trends
- geographic annotations
- selected analytical states

---

# 8. TYPOGRAPHY

Use:

### Inter

For:

- navigation
- body
- buttons
- labels
- UI
- analytics

### Newsreader

For:

- editorial headline accents
- storytelling
- selected emphasis
- section titles where appropriate

### JetBrains Mono

For:

- coordinates
- timestamps
- dataset identifiers
- technical metadata
- system labels
- analytical stamps

---

# 9. BRAND

Primary brand:

**Bhurakshak**

Hindi:

**भूरक्षक**

The brand should remain minimal.

Do not create an overly complex logo unless explicitly requested.

---

# 10. LANDING PAGE — COMPLETE STRUCTURE

The landing page is a story, not a product catalogue.

The visitor should move from:

> **What is happening?**

to:

> **How do you know?**

to:

> **Why does it matter?**

to:

> **What can be done?**

---

# SECTION 1
## INDIA'S LAND IS CHANGING.

This is the hero.

### Headline

> **India’s land is changing.**

The word:

> **changing.**

should use Newsreader with subtle italic editorial styling and walnut colour.

### Supporting copy

> **See where. Understand why. Measure what it means.**

### Primary CTA

> **Explore Lucknow Pilot →**

### Secondary interaction

> **How it works (6 Engines)**

This opens an elegant modal/drawer showing:

```text
Observe
   ↓
Detect
   ↓
Explain
   ↓
Predict
   ↓
Quantify
   ↓
Act
```

---

# 11. HERO VISUAL

The main visual centerpiece is a **3D/terrain-style visualization of India**.

It must NOT look like a flat generic India SVG.

Desired visual:

- recognizable Indian subcontinent
- terrain relief
- Himalayan elevation
- flatter northern plains
- Deccan terrain
- satellite/Earth-observation texture
- subtle dimensional perspective
- slightly elevated/tilted presentation
- sophisticated cartographic appearance

The visual is a primary part of the brand identity.

---

# 12. INDIA VISUAL IMPLEMENTATION STRATEGY

## First version

Use a high-quality local static image:

```text
/public/india-3d.webp
```

or:

```text
/public/india-3d.png
```

The image should ideally have transparency.

Overlay on top:

- Lucknow location
- radar pulse
- labels
- coordinate grid
- metadata
- layer switcher

## Future version

Replace the static visual with an interactive geospatial/3D renderer where appropriate.

Potential future technologies:

- CesiumJS
- MapLibre
- Mapbox
- other appropriate geospatial rendering tools

Do not implement a complex real-time 3D engine before the product actually needs it.

---

# 13. LUCKNOW PILOT

Lucknow, Uttar Pradesh is the initial pilot.

Display:

> **Pilot: Lucknow, UP**

The primary India visualization should highlight Lucknow.

Lucknow marker:

- subtle pulse
- precise location indicator
- restrained callout
- coordinates
- pilot label

Do not make the marker look like a military target.

---

# 14. MAP LAYER SWITCHER

Hero map should have:

### Baseline

Shows current/reference land appearance.

### Change Events

Highlights areas where significant change has been detected.

### 2030 Risk

Shows areas with elevated modelled future risk.

Initially these are UI/demo states.

Do NOT claim they are live or scientifically validated until the real analytical pipeline exists.

---

# 15. DATASET STAMP

Use:

> **COPERNICUS/S2_SR · DYNAMIC_WORLD_V1 · 10m Res**

Style:

- JetBrains Mono
- small
- precise
- understated

Use dataset/source metadata honestly.

---

# 16. HONEST SPECIFICATION STRIP

Use an inline editorial metric strip.

Do NOT use generic SaaS cards.

Show:

### ~5 days

Satellite revisit

Cloud-dependent · Sentinel-2

### 10 m

Spatial resolution

0.01 ha per pixel

### 2018–Present

Temporal baseline

Multi-season Kharif / Rabi / Zaid

### 6 Engines

Observe → Detect → Explain → Predict → Quantify → Act

### Lucknow

Pilot district

Validation candidate

IMPORTANT:

Satellite revisit is not equivalent to guaranteed cloud-free observations.

Do not imply continuous real-time imagery.

---

# SECTION 2
## LAND IS MORE THAN LAND

Purpose:

Introduce Bhurakshak's philosophy.

Core idea:

Land is not merely pixels.

A piece of land can represent:

- agriculture
- settlements
- water
- trees
- roads
- infrastructure
- economic activity
- ecological systems
- people

The section should visually move from a simple satellite image into multiple layers of meaning.

Possible visual:

```text
LAND
 ↓
COVER
 ↓
USE
 ↓
CHANGE
 ↓
IMPACT
```

This section establishes that Bhurakshak connects physical land change to real-world meaning.

---

# SECTION 3
## FROM SATELLITE IMAGE TO EVIDENCE

Introduce the Six Engines.

Visual pipeline:

```text
OBSERVE
What do we see?

↓

DETECT
What changed?

↓

EXPLAIN
Why might it have changed?

↓

PREDICT
What could happen next?

↓

QUANTIFY
How much does it matter?

↓

ACT
What should be investigated?
```

Each engine should have:

- concise description
- visual example
- evidence/data annotation

Avoid empty marketing copy.

---

# SECTION 4
## SEE CHANGE OVER TIME

Show the temporal nature of land change.

Primary interaction:

### Timeline

```text
2018 ── 2020 ── 2022 ── 2024 ── 2026
```

Allow the user to compare periods.

Potential visual modes:

- swipe comparison
- before/after
- opacity overlay
- animated timeline

Example:

```text
2019
Agriculture
       ↓
2022
Mixed
       ↓
2026
Built-up
```

This demonstrates the DETECT engine.

---

# SECTION 5
## WHERE CHANGE IS HAPPENING

Introduce the concept of **Change Events**.

Example:

```text
CHANGE EVENT #LK-2047

Area:
18.4 ha

Transition:
Agriculture → Built-up

Confidence:
High

First detected:
2023

Most recent:
2026
```

Map should show the event spatially.

Clicking it opens evidence.

---

# SECTION 6
## WHY DID IT CHANGE?

This is the EXPLAIN engine.

Do not simply make an AI-generated statement.

Build an evidence chain.

Potential contextual evidence:

- roads
- buildings
- land-cover transition
- vegetation trends
- water changes
- rainfall
- flood events
- infrastructure
- seasonal patterns

Example:

```text
CHANGE DETECTED
       ↓
Built-up growth
       ↓
Road expansion nearby
       ↓
Construction footprint increase
       ↓
Persistent across seasons
       ↓
LIKELY DRIVER:
Urban expansion
```

Use:

> **Likely driver**

instead of:

> **Confirmed cause**

unless independently verified.

---

# SECTION 7
## LOOK AHEAD

This is the PREDICT engine.

Show future risk.

Example:

```text
2030 LAND CHANGE RISK

Zone A   HIGH
Zone B   MEDIUM
Zone C   LOW
```

Potential factors:

- historical change
- proximity to roads
- proximity to built-up areas
- historical expansion
- vegetation trend
- water proximity
- infrastructure trends
- other validated spatial predictors

Prediction should communicate uncertainty.

Use:

- probability
- risk
- forecast
- confidence

Never promise certainty.

---

# SECTION 8
## MEASURE WHAT IT MEANS

This is the QUANTIFY engine.

Example:

```text
LAND CHANGE SUMMARY

Area changed       18.4 ha
Built-up increase  +31%
Vegetation loss    7.2 ha
Water change       3.1 ha
```

Depending on validated data, future metrics may include:

- land-cover area
- percentage change
- vegetation trends
- water-area change
- fragmentation
- affected infrastructure
- exposed assets/population

Do not present derived metrics unless their methodology is understood and documented.

---

# SECTION 9
## FROM EVIDENCE TO ACTION

This is the ACT engine.

The system does NOT independently make policy decisions.

Instead it gives evidence-backed next steps.

Example:

```text
OBSERVATION
Persistent vegetation loss

EVIDENCE
Change confirmed across multiple periods

LIKELY DRIVER
Urban expansion

RISK
Further conversion likely

NEXT STEP
Ground verification recommended
```

Potential actions:

- ground verification
- field observation
- planning review
- continued monitoring
- prioritised investigation

---

# SECTION 10
## LUCKNOW PILOT

Bring the story back to the initial pilot.

Show:

- Lucknow map
- monitored areas
- change events
- temporal data
- pilot status
- sample analytical story

Potential copy:

> **Start local. Understand the pattern. Scale the method.**

Do not claim nationwide operational deployment.

---

# SECTION 11
## REPORT AN OBSERVATION

Navigation and product CTA:

> **Report an Observation**

Users can eventually report what they physically observe.

Form:

- location
- observation type
- description
- date
- optional image
- optional notes

Purpose:

Satellite detection can be supplemented by **ground truth**.

Possible future flow:

```text
Satellite detects change
        ↓
User reports observation
        ↓
Field evidence
        ↓
Validation
        ↓
Confidence improves
```

---

# SECTION 12
## METHODOLOGY / HOW IT WORKS

Create a methodology page.

Explain:

### Data

What datasets are used.

### Processing

How imagery is processed.

### Detection

How change is determined.

### Explanation

How spatial context is evaluated.

### Prediction

How future risk is estimated.

### Quantification

How metrics are calculated.

### Validation

How ground observations or independent evidence are used.

The methodology page is important for trust.

---

# SECTION 13
## DATASETS PAGE

Eventually provide a transparent dataset page.

Potential sources to investigate:

- Sentinel-2
- Sentinel-1
- Dynamic World
- Bhuvan / Indian geospatial datasets
- elevation data
- rainfall/weather
- roads
- buildings
- administrative boundaries
- other relevant open geospatial datasets

Each dataset should show:

- name
- provider
- purpose
- spatial resolution
- temporal coverage
- update frequency
- licensing/usage notes

Do not claim a dataset is used until it is actually integrated.

---

# SECTION 14
## CASE STUDIES

Eventually create real-world evidence stories.

Each case study should follow:

```text
LOCATION
     ↓
OBSERVATION
     ↓
CHANGE
     ↓
EVIDENCE
     ↓
LIKELY EXPLANATION
     ↓
IMPACT
     ↓
FOLLOW-UP
```

The first case study can be the Lucknow pilot.

---

# 15. THE ACTUAL PRODUCT — PILOT WORKSPACE

The main application is not just the landing page.

The core application should eventually be a **geospatial investigation workspace**.

When the user clicks:

> **Explore Lucknow Pilot →**

open:

```text
Lucknow Pilot Workspace
```

---

# 16. PILOT WORKSPACE LAYOUT

Desktop layout:

```text
┌─────────────────────────────────────────────────────┐
│ Navigation                                           │
├─────────────────────────────────────────────────────┤
│ Pilot / Search / Filters                             │
├───────────────────────────────────┬─────────────────┤
│                                   │                 │
│                                   │ Change Events   │
│                                   │                 │
│               MAP                 │ Evidence        │
│                                   │                 │
│                                   │ Risk            │
│                                   │                 │
├───────────────────────────────────┴─────────────────┤
│ Timeline                                             │
└─────────────────────────────────────────────────────┘
```

The map should dominate.

The side panel provides intelligence.

---

# 17. PILOT WORKSPACE FEATURES

## Map

Core map.

## Search

Search for:

- locations
- districts
- change events
- coordinates

## Timeline

Explore change across time.

## Layers

Potential layers:

- baseline
- change events
- 2030 risk
- vegetation
- built-up
- water
- roads
- other validated datasets

## Event list

Shows important detected changes.

## Evidence panel

Shows supporting information.

---

# 18. CHANGE EVENT OBJECT

A Change Event is a core data object.

Example:

```text
Change Event #LK-2047

Location:
Lucknow, Uttar Pradesh

Detected:
2026

Area:
18.4 ha

Transition:
Agriculture → Built-up

Confidence:
High

Evidence:
Road expansion
Built-up increase
Persistent seasonal change

Likely driver:
Urban expansion

Risk:
Elevated

Recommended action:
Ground verification
```

The same structure should be reusable across the platform.

---

# 19. EVENT DETAIL PAGE

When a user clicks a Change Event:

Show:

### Summary

What changed.

### Location

Where.

### Timeline

When.

### Evidence

What supports the finding.

### Explanation

Likely driver.

### Prediction

Future risk.

### Quantification

Measured impact.

### Action

Recommended next step.

### Source metadata

Dataset and processing information.

---

# 20. SEARCH AND EXPLORATION

Users should eventually be able to:

- search a district
- click a region
- inspect change events
- filter by event type
- filter by date
- filter by confidence
- filter by risk
- compare time periods

The product should prioritize exploration over a complicated control panel.

---

# 21. SIX ENGINE — REAL TECHNICAL DEFINITION

## ENGINE 1 — OBSERVE

Question:

> What does the land look like?

Primary role:

Ingest and organize geographic observations.

Potential data:

- Sentinel-2
- Sentinel-1
- Dynamic World
- Bhuvan
- elevation
- rainfall/weather
- roads
- buildings
- boundaries

Technology:

- Earth observation APIs
- raster processing
- GIS
- PostGIS

AI is not required for the core observation layer.

---

# 22. ENGINE 2 — DETECT

Question:

> What changed?

Potential techniques:

- image differencing
- temporal comparison
- vegetation-index change
- water-index change
- built-up indicators
- land-cover transitions
- anomaly detection

Outputs:

- location
- area
- old state
- new state
- change time
- confidence

---

# 23. ENGINE 3 — EXPLAIN

Question:

> Why might it have changed?

Combine:

- detected change
- nearby infrastructure
- land-cover context
- temporal behaviour
- environmental conditions
- external events

Output:

```text
Likely driver
+
Supporting evidence
+
Confidence
```

This should use a combination of deterministic spatial logic, statistical analysis and ML where justified.

An LLM can later help present the evidence in natural language, but it should not invent causal explanations.

---

# 24. ENGINE 4 — PREDICT

Question:

> What could happen next?

Potential models:

- XGBoost
- LightGBM
- time-series models
- spatial risk models
- other appropriate models after experimentation

Potential input:

- historical land-cover change
- road proximity
- built-up density
- change velocity
- environmental trends
- infrastructure changes

Output:

```text
Risk score
Probability
Confidence
Forecast horizon
```

---

# 25. ENGINE 5 — QUANTIFY

Question:

> How much does it matter?

Use:

- GIS
- statistics
- spatial calculations

Potential outputs:

- hectares
- percentage change
- land-cover transition
- vegetation change
- water change
- fragmentation
- exposure

This engine should prioritize transparent calculations over black-box AI.

---

# 26. ENGINE 6 — ACT

Question:

> What should happen next?

This is a decision-support layer.

Potential outputs:

- ground verification
- continued monitoring
- field observation
- planning review
- priority classification

Recommendations should be tied to evidence.

---

# 27. AI STRATEGY

Do not put AI everywhere.

Use:

## Deterministic logic for

- geographic calculations
- area calculations
- rule checks
- thresholds
- metadata
- spatial relationships

## ML for

- anomaly detection
- prediction
- pattern recognition
- risk scoring
- classification where appropriate

## LLM for

- natural-language explanation
- summarising evidence
- answering questions about the evidence
- making technical results easier to understand

The LLM must use the structured evidence produced by the system.

It must not fabricate data.

---

# 28. DATA PIPELINE — FUTURE

Possible architecture:

```text
SOURCE DATA
   │
   ├── Sentinel-2
   ├── Sentinel-1
   ├── Dynamic World
   ├── Bhuvan / GIS
   ├── Weather
   ├── Infrastructure
   └── User observations
           ↓
      INGESTION
           ↓
     PREPROCESSING
           ↓
       OBSERVE
           ↓
       DETECT
           ↓
      EVIDENCE
           ↓
      EXPLAIN
           ↓
      PREDICT
           ↓
     QUANTIFY
           ↓
        ACT
           ↓
       FRONTEND
```

---

# 29. FUTURE DATA TECHNOLOGY

Potential stack:

### Data

- Copernicus Data Space
- Google Earth Engine where appropriate
- Bhuvan / NRSC resources
- open geospatial datasets

### Geospatial processing

- Python
- Rasterio
- GeoPandas
- Shapely
- GDAL

### Database

- PostgreSQL
- PostGIS

### Backend

- FastAPI

### ML

- scikit-learn
- XGBoost
- LightGBM
- PyTorch only when justified

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Framer Motion

### Mapping

- MapLibre
- Mapbox where appropriate
- CesiumJS for future true 3D experiences

---

# 30. MOCK DATA FIRST

Until the real data pipeline exists, use structured mock data.

Example:

```text
Change Event:
LK-2047

Area:
18.4 ha

Transition:
Agriculture → Built-up

Likely driver:
Urban expansion

Risk:
Elevated

Confidence:
0.91
```

Clearly distinguish mock data from real data.

Use a development flag if necessary:

```text
DEMO DATA
```

Do not hide the fact that the analytical engine is not yet connected.

---

# 31. REAL DATA DEVELOPMENT PHASE

Once UI is stable:

### Stage 1

Connect real imagery for Lucknow.

### Stage 2

Create temporal comparison.

### Stage 3

Create actual change events.

### Stage 4

Add evidence/context layers.

### Stage 5

Add prediction model.

### Stage 6

Add quantification.

### Stage 7

Add user observations.

### Stage 8

Validate results.

### Stage 9

Expand beyond Lucknow.

---

# 32. LUCKNOW MVP

The first real implementation should focus narrowly on Lucknow rather than all of India.

MVP should answer:

> **Can Bhurakshak detect and explain meaningful land-cover change in Lucknow using real data?**

Target workflow:

```text
Lucknow
   ↓
Choose location
   ↓
View baseline
   ↓
View historical/current comparison
   ↓
Detect change
   ↓
Select event
   ↓
Show evidence
   ↓
Explain likely driver
   ↓
Quantify area
   ↓
Show risk
   ↓
Recommend verification
```

---

# 33. VALIDATION

This is extremely important.

Do not assume a detected change is correct.

Potential validation mechanisms:

- ground observations
- independent imagery
- authoritative GIS layers
- historical maps
- field reports
- manual expert review

For every analytical model, eventually measure:

- precision
- recall
- false positives
- false negatives
- confidence calibration
- spatial accuracy

---

# 34. UNCERTAINTY

Every AI/analytical output must communicate uncertainty where meaningful.

Prefer:

```text
High confidence
Medium confidence
Low confidence
```

or a probability/risk representation with methodology.

Avoid:

> "This definitely happened because X."

Prefer:

> "Evidence suggests X is the likely driver."

---

# 35. REPORTING

Eventually users should be able to generate an evidence report.

Example:

```text
BHURAKSHAK CHANGE REPORT

Location
Lucknow, Uttar Pradesh

Change detected
Agriculture → Built-up

Area
18.4 ha

Time period
2019–2026

Evidence
Road expansion
Built-up increase
Persistent seasonal change

Likely driver
Urban expansion

Future risk
Elevated

Recommended follow-up
Ground verification
```

Potential export formats:

- PDF
- CSV
- GeoJSON
- image/map export

---

# 36. USER OBSERVATIONS

Observation workflow:

```text
User
 ↓
Choose location
 ↓
Select observation type
 ↓
Add description
 ↓
Upload image
 ↓
Submit
 ↓
Observation stored
 ↓
Available for validation
```

Observation status could be:

```text
Submitted
↓
Under Review
↓
Validated
↓
Integrated
```

---

# 37. FUTURE ALERTS

Eventually allow users to monitor regions.

Example:

> "Notify me when significant land-cover change is detected in this area."

Potential monitoring frequencies depend on data availability and cloud conditions.

Do not promise continuous real-time monitoring from satellite imagery.

---

# 38. PERFORMANCE PRINCIPLES

The landing page should load quickly.

Large visual assets should be:

- optimized
- compressed
- lazy-loaded where appropriate
- served locally where appropriate

Do not load unnecessary geospatial libraries on the landing page.

Only load heavy mapping/3D functionality inside the appropriate application route.

---

# 39. ACCESSIBILITY

Ensure:

- readable contrast
- keyboard-friendly controls
- semantic HTML
- accessible buttons
- alt text
- reduced-motion support
- mobile usability

The product should remain understandable without relying exclusively on colour.

---

# 40. RESPONSIVE DESIGN

Desktop should preserve the editorial composition.

Tablet should reduce complexity gracefully.

Mobile should restructure the information rather than simply shrinking desktop.

Example:

```text
HEADLINE
↓
SUPPORTING COPY
↓
CTA
↓
INDIA VISUAL
↓
METADATA
↓
SPECIFICATIONS
↓
CONTENT
```

---

# 41. MOTION SYSTEM

Use subtle motion.

Good:

- India visual entrance
- Lucknow radar pulse
- map transition
- layer transition
- timeline animation
- modal transition
- hover feedback

Avoid:

- excessive particles
- neon glow
- constant movement
- aggressive parallax
- distracting animation

The product should feel calm.

---

# 42. TRUST / SOURCE DESIGN

Bhurakshak should make evidence visible.

Potential source tags:

```text
Satellite
GIS
Historical
Observed
Modelled
User Report
```

Potential confidence labels:

```text
High
Medium
Low
```

The interface should make it possible for a user to ask:

> **"How do you know this?"**

and see the evidence.

---

# 43. EXPLANATION DESIGN

Every major analytical result should eventually have:

### Finding

What happened?

### Evidence

What supports it?

### Method

How was it calculated?

### Confidence

How certain is it?

### Limitation

What can the system not know?

This is a core trust principle.

---

# 44. SECURITY / DATA

For the first frontend:

No sensitive user data is required.

Future backend should include:

- authentication
- authorization
- secure storage
- audit logs
- protected user submissions

Keep user-uploaded observations separated from authoritative datasets until validated.

---

# 45. DEVELOPMENT ROADMAP

## PHASE 1 — VISUAL FOUNDATION

Build:

- design system
- typography
- navigation
- hero
- 3D India visual
- Lucknow anchor
- layer switcher
- specification strip

STOP FOR REVIEW.

---

## PHASE 2 — COMPLETE LANDING PAGE

Build:

- Section 2
- Section 3
- Section 4
- Section 5
- Section 6
- Section 7
- Section 8
- Section 9
- Section 10

STOP FOR REVIEW.

---

## PHASE 3 — PILOT WORKSPACE

Build:

- map
- timeline
- layers
- events
- evidence panel
- event detail

Use mock data.

---

## PHASE 4 — REAL DATA

Start with Lucknow.

Connect:

- satellite imagery
- land-cover data
- historical periods

---

## PHASE 5 — CHANGE DETECTION

Implement:

- temporal comparison
- change events
- land-cover transitions
- confidence

---

## PHASE 6 — EXPLANATION ENGINE

Add:

- contextual datasets
- spatial evidence
- likely-driver logic

---

## PHASE 7 — PREDICTION

Build first validated predictive model.

Don't add complex deep learning without evidence that it improves performance.

---

## PHASE 8 — QUANTIFICATION

Add transparent impact measurements.

---

## PHASE 9 — ACTION

Add recommendations and monitoring.

---

## PHASE 10 — GROUND VALIDATION

Add:

- observations
- field evidence
- validation workflow

---

# 46. RESEARCH REQUIREMENT

Before implementing advanced analytics, conduct research on:

- Earth observation
- land-cover classification
- change detection
- temporal remote sensing
- geospatial statistics
- urban expansion
- vegetation monitoring
- water monitoring
- environmental risk
- digital twins where relevant
- spatial prediction
- model validation

The research must identify:

> What can realistically be detected?

> What cannot reliably be detected?

> Which datasets are available?

> What is the spatial resolution?

> What is the temporal resolution?

> What is the cloud limitation?

> What is the uncertainty?

---

# 47. RESEARCH SOURCES

Prefer high-quality sources:

### Government / institutional

- ISRO
- NRSC
- Bhuvan
- Copernicus
- ESA
- NASA
- official Indian government datasets

### Scientific

- peer-reviewed papers
- established remote-sensing literature
- established GIS literature

### Technical

- official API documentation
- official dataset documentation

Do not rely on random blogs for critical scientific claims.

---

# 48. PRODUCT COMPETITION RESEARCH

Eventually investigate:

- existing satellite monitoring platforms
- geospatial intelligence platforms
- Earth observation analytics companies
- climate/environmental intelligence products
- land-use monitoring systems
- change detection platforms

For each competitor determine:

- what they do
- what datasets they use
- who uses them
- what they charge where available
- their strengths
- their limitations
- where Bhurakshak can differentiate

Bhurakshak should not claim uniqueness without research.

---

# 49. DIFFERENTIATION HYPOTHESIS

Potential differentiation:

> Bhurakshak is not simply a satellite map.

It aims to provide an **evidence chain**:

```text
WHERE
↓
WHAT CHANGED
↓
WHY IT LIKELY CHANGED
↓
WHAT MAY HAPPEN NEXT
↓
HOW MUCH IT MATTERS
↓
WHAT TO INVESTIGATE
```

This hypothesis must be tested against competitors.

---

# 50. WHAT NOT TO CLAIM

Never say:

> "Bhurakshak knows exactly why the land changed."

Instead:

> "Bhurakshak identifies likely drivers using spatial and temporal evidence."

Never say:

> "Bhurakshak predicts the future."

Instead:

> "Bhurakshak estimates future risk based on historical patterns and contextual variables."

Never say:

> "Satellite data provides live monitoring."

Instead:

> "Satellite observations provide periodic monitoring, subject to acquisition and cloud conditions."

Never say:

> "AI makes decisions."

Instead:

> "AI provides analytical and decision-support outputs."

---

# 51. LANDING PAGE CONTENT PRINCIPLE

Every section should answer one question.

```text
SECTION 1
What is happening?

SECTION 2
Why does land matter?

SECTION 3
How do you know?

SECTION 4
When did it change?

SECTION 5
Where is it happening?

SECTION 6
Why might it be happening?

SECTION 7
What could happen next?

SECTION 8
How much does it matter?

SECTION 9
What should happen now?

SECTION 10
Where do we start?
```

This makes the website feel like one continuous story.

---

# 52. DESIGN PRINCIPLE FOR CARDS

Do not turn every piece of information into a floating card.

Use:

- editorial layouts
- inline statistics
- separators
- labels
- map overlays
- panels only where necessary

Cards should exist when they provide clear grouping/functionality.

---

# 53. MAP DESIGN PRINCIPLE

The map is the main product canvas.

Avoid clutter.

Use visual hierarchy:

```text
PRIMARY
Change / risk

SECONDARY
Roads / water / vegetation

TERTIARY
Metadata / grids / boundaries
```

Every map layer should have a reason to exist.

---

# 54. COLOUR SEMANTICS

Do not use arbitrary rainbow colours.

Maintain semantic meaning.

Example:

```text
Walnut
Primary action / key emphasis

Olive
Environmental / positive state

Warm red/orange
Risk / significant change

Neutral
Baseline / context
```

Use restrained intensity.

---

# 55. PRODUCT FEEL

The user should feel:

> "I am investigating the Earth."

Not:

> "I am using another dashboard."

This is a central design principle.

---

# 56. COMPLETE FUTURE PRODUCT ARCHITECTURE

Eventually:

```text
                    BHURAKSHAK
                         │
              ┌──────────┴──────────┐
              │                     │
        PUBLIC WEBSITE        APPLICATION
              │                     │
        Story / Intro          Workspace
                                    │
                         ┌──────────┼──────────┐
                         ↓          ↓          ↓
                       MAP      EVENTS      REPORTS
                         │
                         ↓
                     TIMELINE
                         │
                         ↓
                    SIX ENGINES
                         │
        ┌────────────────┼────────────────┐
        ↓                ↓                ↓
     GEO DATA          ML            OBSERVATIONS
        │                │                │
        └────────────────┼────────────────┘
                         ↓
                   EVIDENCE GRAPH
                         ↓
                    ACTION LAYER
```

---

# 57. MVP DEFINITION

The smallest meaningful Bhurakshak MVP is NOT the entire vision.

The MVP should demonstrate one complete intelligence loop.

### Recommended MVP

```text
Lucknow
   ↓
Real satellite data
   ↓
Historical comparison
   ↓
Detect one class of change
   ↓
Create a change event
   ↓
Show evidence
   ↓
Quantify area
   ↓
Show confidence
   ↓
Recommend ground verification
```

If this works reliably, expand to prediction.

---

# 58. FIRST SUCCESS CRITERIA

Bhurakshak's first meaningful technical success is:

> A user can select an area in Lucknow, observe historical/current satellite-derived land-cover information, identify a genuine change event, inspect the supporting evidence, understand the likely explanation, and see a transparent quantitative summary.

That is better than having ten unfinished AI features.

---

# 59. SECTION IMPLEMENTATION RULE

When building the website:

### First

Complete Section 1.

### Then

Review Section 1 visually.

### Then

Build Section 2.

Continue section-by-section.

Do not generate the entire website blindly in one pass.

---

# 60. FINAL PRODUCT PRINCIPLE

Bhurakshak should ultimately become:

> **A visual intelligence layer over India's changing land.**

It should connect:

**Earth observation**

+

**Geospatial analysis**

+

**Temporal evidence**

+

**Machine learning**

+

**Human observation**

+

**Actionable interpretation**

into one coherent experience.

The central narrative remains:

# **India’s land is changing.**

## **See where. Understand why. Measure what it means.**

And the underlying intelligence pipeline remains:

# **Observe → Detect → Explain → Predict → Quantify → Act**

---

# 61. FINAL IMPLEMENTATION INSTRUCTION TO ANTIGRAVITY

Before writing code:

1. Read this entire PLAN.md.
2. Create a clean application architecture.
3. Establish the Bhurakshak design system.
4. Build Section 1 only.
5. Use the attached reference image as the visual reference for Section 1.
6. Implement the 3D India visual as a proper local asset.
7. Use mock data for analytical interactions.
8. Do not build fake live satellite functionality.
9. Do not create a standalone preview.html replacement for the application.
10. Ensure the actual project runs through the normal development command.
11. Keep components reusable.
12. Keep the code clean and extensible.
13. Stop after Section 1.
14. Do not automatically implement later sections until Section 1 has been reviewed.

The product must be built progressively, with the design system and user experience established first and the real data/AI layers added afterward.

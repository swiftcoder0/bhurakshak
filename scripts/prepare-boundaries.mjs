import fs from "fs";
import path from "path";

const SOURCE_STATES_PATH = "c:/Users/aditya/Downloads/maps-master/maps-master/website/docs/data/geojson/states.geojson";
const SOURCE_DISTS_PATH = "c:/Users/aditya/Downloads/maps-master/maps-master/website/docs/data/geojson/dists11.geojson";

const OUTPUT_BASE = path.resolve("public/data");
const OUTPUT_INDEX_DIR = path.join(OUTPUT_BASE, "search-index");
const OUTPUT_STATES_DIR = path.join(OUTPUT_BASE, "boundaries", "states");
const OUTPUT_DIST_DIR = path.join(OUTPUT_BASE, "boundaries", "districts");
const OUTPUT_ALL_STATES_FILE = path.join(OUTPUT_BASE, "boundaries", "states-outline.geojson");

fs.mkdirSync(OUTPUT_INDEX_DIR, { recursive: true });
fs.mkdirSync(OUTPUT_STATES_DIR, { recursive: true });
fs.mkdirSync(OUTPUT_DIST_DIR, { recursive: true });

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Compute Bounding Box [minLon, minLat, maxLon, maxLat] and Centroid
function getBboxAndCenter(geometry) {
  let minLon = Infinity, minLat = Infinity, maxLon = -Infinity, maxLat = -Infinity;
  let totalLon = 0, totalLat = 0, pointCount = 0;

  function traverse(coords) {
    if (typeof coords[0] === "number") {
      const [lon, lat] = coords;
      if (lon < minLon) minLon = lon;
      if (lon > maxLon) maxLon = lon;
      if (lat < minLat) minLat = lat;
      if (lat > maxLat) maxLat = lat;
      totalLon += lon;
      totalLat += lat;
      pointCount++;
    } else {
      for (const sub of coords) {
        traverse(sub);
      }
    }
  }

  traverse(geometry.coordinates);

  const centerLon = pointCount > 0 ? totalLon / pointCount : (minLon + maxLon) / 2;
  const centerLat = pointCount > 0 ? totalLat / pointCount : (minLat + maxLat) / 2;

  return {
    bbox: [
      Math.round(minLon * 10000) / 10000,
      Math.round(minLat * 10000) / 10000,
      Math.round(maxLon * 10000) / 10000,
      Math.round(maxLat * 10000) / 10000,
    ],
    center: [
      Math.round(centerLon * 10000) / 10000,
      Math.round(centerLat * 10000) / 10000,
    ],
  };
}

// Round coordinates to 5 decimals (~1.1 meter precision) to optimize size
function roundCoords(coords) {
  if (typeof coords[0] === "number") {
    return [
      Math.round(coords[0] * 100000) / 100000,
      Math.round(coords[1] * 100000) / 100000,
    ];
  }
  return coords.map(roundCoords);
}

// Simple Douglas-Peucker simplification for nationwide states outline
function simplifyPoints(points, sqTolerance) {
  if (points.length <= 2) return points;

  function getSqDist(p1, p2) {
    const dx = p1[0] - p2[0];
    const dy = p1[1] - p2[1];
    return dx * dx + dy * dy;
  }

  function getSqSegDist(p, p1, p2) {
    let x = p1[0], y = p1[1];
    let dx = p2[0] - x, dy = p2[1] - y;

    if (dx !== 0 || dy !== 0) {
      const t = ((p[0] - x) * dx + (p[1] - y) * dy) / (dx * dx + dy * dy);
      if (t > 1) {
        x = p2[0];
        y = p2[1];
      } else if (t > 0) {
        x += dx * t;
        y += dy * t;
      }
    }

    dx = p[0] - x;
    dy = p[1] - y;
    return dx * dx + dy * dy;
  }

  function simplifyDPStep(pts, first, last, sqTol, simplified) {
    let maxSqDist = sqTol;
    let index = -1;

    for (let i = first + 1; i < last; i++) {
      const sqDist = getSqSegDist(pts[i], pts[first], pts[last]);
      if (sqDist > maxSqDist) {
        index = i;
        maxSqDist = sqDist;
      }
    }

    if (maxSqDist > sqTol) {
      if (index - first > 1) simplifyDPStep(pts, first, index, sqTol, simplified);
      simplified.push(pts[index]);
      if (last - index > 1) simplifyDPStep(pts, index, last, sqTol, simplified);
    }
  }

  const simplified = [points[0]];
  simplifyDPStep(points, 0, points.length - 1, sqTolerance, simplified);
  simplified.push(points[points.length - 1]);
  return simplified;
}

function simplifyGeometry(geom, tolerance = 0.005) {
  const sqTol = tolerance * tolerance;
  function simplifyCoords(coords, type) {
    if (type === "Polygon") {
      return coords.map((ring) => {
        const simplified = simplifyPoints(ring, sqTol);
        return simplified.length >= 4 ? simplified : ring;
      });
    } else if (type === "MultiPolygon") {
      return coords.map((poly) =>
        poly.map((ring) => {
          const simplified = simplifyPoints(ring, sqTol);
          return simplified.length >= 4 ? simplified : ring;
        })
      );
    }
    return coords;
  }

  return {
    type: geom.type,
    coordinates: simplifyCoords(geom.coordinates, geom.type),
  };
}

console.log("[1/5] Loading states and districts datasets...");
const statesRaw = JSON.parse(fs.readFileSync(SOURCE_STATES_PATH, "utf8"));
const distsRaw = JSON.parse(fs.readFileSync(SOURCE_DISTS_PATH, "utf8"));

console.log(`Loaded ${statesRaw.features.length} state features and ${distsRaw.features.length} district features.`);

// Telangana 10 districts in Census 2011
const TELANGANA_DISTRICTS = new Set([
  "adilabad", "hyderabad", "karimnagar", "khammam",
  "mahbubnagar", "medak", "nalgonda", "nizamabad",
  "rangareddy", "warangal"
]);

// Map districts by state
const districtsByState = new Map();
for (const feat of distsRaw.features) {
  let stateName = feat.properties.ST_NM.trim();
  const distName = feat.properties.DISTRICT ? feat.properties.DISTRICT.trim() : "Unknown";
  const distSlug = slugify(distName);

  // If district belongs to Telangana
  if (TELANGANA_DISTRICTS.has(distSlug)) {
    // Add to Telangana
    if (!districtsByState.has("Telangana")) {
      districtsByState.set("Telangana", []);
    }
    districtsByState.get("Telangana").push(feat);
  }

  if (!districtsByState.has(stateName)) {
    districtsByState.set(stateName, []);
  }
  districtsByState.get(stateName).push(feat);
}

console.log("[2/5] Building lightweight search index...");
const searchIndex = {
  states: [],
};

const simplifiedStatesFeatures = [];

for (const stateFeat of statesRaw.features) {
  const stateName = stateFeat.properties.ST_NM.trim();
  const stateSlug = slugify(stateName);
  const { bbox, center } = getBboxAndCenter(stateFeat.geometry);

  // State output GeoJSON
  const stateGeoJSON = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {
          id: stateSlug,
          name: stateName,
          type: "state",
        },
        geometry: {
          type: stateFeat.geometry.type,
          coordinates: roundCoords(stateFeat.geometry.coordinates),
        },
      },
    ],
  };

  fs.writeFileSync(
    path.join(OUTPUT_STATES_DIR, `${stateSlug}.geojson`),
    JSON.stringify(stateGeoJSON)
  );

  // Simplified outline for nationwide overlay
  const simplifiedGeom = simplifyGeometry(stateFeat.geometry, 0.008);
  simplifiedStatesFeatures.push({
    type: "Feature",
    properties: {
      id: stateSlug,
      name: stateName,
    },
    geometry: {
      type: simplifiedGeom.type,
      coordinates: roundCoords(simplifiedGeom.coordinates),
    },
  });

  // Collect and process districts for this state
  const stateDistFeatures = districtsByState.get(stateName) || [];
  const stateDistDir = path.join(OUTPUT_DIST_DIR, stateSlug);
  fs.mkdirSync(stateDistDir, { recursive: true });

  const districtEntries = [];

  for (const distFeat of stateDistFeatures) {
    const distName = distFeat.properties.DISTRICT ? distFeat.properties.DISTRICT.trim() : "Unknown";
    const distSlug = slugify(distName);
    const distMetrics = getBboxAndCenter(distFeat.geometry);

    districtEntries.push({
      id: distSlug,
      name: distName,
      stateId: stateSlug,
      stateName: stateName,
      bbox: distMetrics.bbox,
      center: distMetrics.center,
      censuscode: distFeat.properties.censuscode,
    });

    // Write individual district geometry
    const distGeoJSON = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {
            id: distSlug,
            name: distName,
            stateId: stateSlug,
            stateName: stateName,
            censuscode: distFeat.properties.censuscode,
            type: "district",
          },
          geometry: {
            type: distFeat.geometry.type,
            coordinates: roundCoords(distFeat.geometry.coordinates),
          },
        },
      ],
    };

    fs.writeFileSync(
      path.join(stateDistDir, `${distSlug}.geojson`),
      JSON.stringify(distGeoJSON)
    );
  }

  // Sort districts alphabetically
  districtEntries.sort((a, b) => a.name.localeCompare(b.name));

  searchIndex.states.push({
    id: stateSlug,
    name: stateName,
    bbox,
    center,
    districtCount: districtEntries.length,
    districts: districtEntries,
  });
}

// Sort states alphabetically
searchIndex.states.sort((a, b) => a.name.localeCompare(b.name));

console.log("[3/5] Writing search index to public/data/search-index/india-hierarchy.json...");
const indexFile = path.join(OUTPUT_INDEX_DIR, "india-hierarchy.json");
fs.writeFileSync(indexFile, JSON.stringify(searchIndex));
const indexStats = fs.statSync(indexFile);
console.log(`Search index size: ${(indexStats.size / 1024).toFixed(1)} KB`);

console.log("[4/5] Writing simplified nationwide states outline...");
const allStatesGeoJSON = {
  type: "FeatureCollection",
  features: simplifiedStatesFeatures,
};
fs.writeFileSync(OUTPUT_ALL_STATES_FILE, JSON.stringify(allStatesGeoJSON));
const allStatesStats = fs.statSync(OUTPUT_ALL_STATES_FILE);
console.log(`Simplified nationwide states outline size: ${(allStatesStats.size / 1024).toFixed(1)} KB`);

console.log("[5/5] Done! All boundary and index files successfully generated.");

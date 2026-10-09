"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import "cesium/Build/Cesium/Widgets/widgets.css";
import {
  Search,
  X,
  MapPin,
  Calendar,
  Ruler,
  Sprout,
  Building,
  ArrowRight,
  Layers,
  Globe2,
  Map as MapIcon,
  Grid,
  Activity,
  Plus,
  Minus,
  ChevronDown,
  ChevronUp,
  Compass,
} from "lucide-react";
import {
  LUCKNOW_CHANGE_POLYGONS,
  INDIA_CHANGE_POINTS,
  LocalChangePolygon,
  IndiaChangePoint,
} from "@/data/landChangeDemo";

// Set Cesium base URL safely for client runtime
if (typeof window !== "undefined") {
  (window as any).CESIUM_BASE_URL = "/cesium";
  (globalThis as any).CESIUM_BASE_URL = "/cesium";
}

export interface CesiumGlobeProps {
  onExplorePilot?: () => void;
  variant?: "hero" | "explorer";
}

export interface DistrictEntry {
  id: string;
  name: string;
  stateId: string;
  stateName: string;
  bbox: [number, number, number, number];
  center: [number, number];
  censuscode?: number;
}

export interface StateEntry {
  id: string;
  name: string;
  bbox: [number, number, number, number];
  center: [number, number];
  districtCount: number;
  districts: DistrictEntry[];
}

export interface IndiaHierarchy {
  states: StateEntry[];
}

type BaseMapMode = "base_map" | "satellite";

export const CesiumGlobe: React.FC<CesiumGlobeProps> = ({
  onExplorePilot,
  variant = "explorer",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const creditRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<any>(null);

  // Imagery & GeoJSON references
  const satelliteLayerRef = useRef<any>(null);
  const cartographicLayerRef = useRef<any>(null);
  const soilLayerRef = useRef<any>(null);
  const bordersDataSourceRef = useRef<any>(null);
  const selectionDataSourceRef = useRef<any>(null);

  // Telemetry & lifecycle
  const [isLoaded, setIsLoaded] = useState(false);
  const [initError, setInitError] = useState<string | null>(null);
  const [cameraAltitudeKm, setCameraAltitudeKm] = useState<number>(3100);

  // Two-Level Controls (Matching Reference Image)
  const [baseMapMode, setBaseMapMode] = useState<BaseMapMode>("base_map");
  const [isManualBaseMode, setIsManualBaseMode] = useState<boolean>(false);
  const [soilActive, setSoilActive] = useState<boolean>(false);
  const [landCoverActive, setLandCoverActive] = useState<boolean>(false);
  const [landChangeActive, setLandChangeActive] = useState<boolean>(true);

  // Search & Hierarchy
  const [hierarchy, setHierarchy] = useState<IndiaHierarchy | null>(null);
  const [selectedState, setSelectedState] = useState<StateEntry | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictEntry | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
  const searchDropdownRef = useRef<HTMLDivElement>(null);

  // Land Change Selection
  const [selectedChange, setSelectedChange] = useState<LocalChangePolygon | null>(
    LUCKNOW_CHANGE_POLYGONS[0] // Default selected: Mohan Road LK-2047
  );
  const [legendCollapsed, setLegendCollapsed] = useState<boolean>(false);

  // Load search index
  useEffect(() => {
    let isMounted = true;
    fetch("/data/search-index/india-hierarchy.json")
      .then((res) => res.json())
      .then((data: IndiaHierarchy) => {
        if (isMounted) setHierarchy(data);
      })
      .catch((err) => {
        console.warn("[Bhurakshak] Failed to load search index:", err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Sync Base Map layers
  const syncBaseLayers = useCallback((mode: BaseMapMode) => {
    if (cartographicLayerRef.current) {
      cartographicLayerRef.current.show = mode === "base_map";
      cartographicLayerRef.current.alpha = 1.0;
    }
    if (satelliteLayerRef.current) {
      satelliteLayerRef.current.show = mode === "satellite";
      satelliteLayerRef.current.alpha = 1.0;
    }
  }, []);

  // Set Base Map Mode
  const handleSetBaseMode = useCallback(
    (mode: BaseMapMode, isManual = true) => {
      setBaseMapMode(mode);
      if (isManual) setIsManualBaseMode(true);
      syncBaseLayers(mode);
    },
    [syncBaseLayers]
  );

  // Toggle SoilGrids layer
  const handleToggleSoil = useCallback(() => {
    setSoilActive((prev) => {
      const next = !prev;
      if (soilLayerRef.current) {
        soilLayerRef.current.show = next;
      }
      return next;
    });
  }, []);

  // Return to clean India 3D Structure View (India Level)
  const flyToIndiaView = useCallback(() => {
    const v = viewerRef.current;
    if (!v || v.isDestroyed()) return;

    handleSetBaseMode("base_map", false);
    setIsManualBaseMode(false);
    setSelectedState(null);
    setSelectedDistrict(null);
    setSelectedChange(null);
    setSearchQuery("");

    if (selectionDataSourceRef.current) {
      v.dataSources.remove(selectionDataSourceRef.current, true);
      selectionDataSourceRef.current = null;
    }

    import("cesium").then((Cesium) => {
      v.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(79.0, 22.0, 3100000), // ~3,100 km centered over India
        orientation: {
          heading: Cesium.Math.toRadians(0.0),
          pitch: Cesium.Math.toRadians(-72.0),
          roll: 0.0,
        },
        duration: 1.8,
      });
    });
  }, [handleSetBaseMode]);

  // Dedicated Zoom Controls
  const handleZoomIn = useCallback(() => {
    const v = viewerRef.current;
    if (!v || v.isDestroyed()) return;
    const height = v.camera.positionCartographic.height;
    v.camera.zoomIn(Math.max(height * 0.35, 3000));
  }, []);

  const handleZoomOut = useCallback(() => {
    const v = viewerRef.current;
    if (!v || v.isDestroyed()) return;
    const height = v.camera.positionCartographic.height;
    v.camera.zoomOut(Math.min(height * 0.45, 12000000));
  }, []);

  // Highlight Boundary GeoJSON
  const loadAndHighlightBoundary = useCallback(
    async (
      type: "state" | "district",
      stateId: string,
      districtId?: string,
      bbox?: [number, number, number, number],
      center?: [number, number]
    ) => {
      const v = viewerRef.current;
      if (!v || v.isDestroyed()) return;

      const Cesium = await import("cesium");

      if (selectionDataSourceRef.current) {
        v.dataSources.remove(selectionDataSourceRef.current, true);
        selectionDataSourceRef.current = null;
      }

      const url =
        type === "state"
          ? `/data/boundaries/states/${stateId}.geojson`
          : `/data/boundaries/districts/${stateId}/${districtId}.geojson`;

      try {
        const strokeColor = Cesium.Color.fromCssColorString("#3D2314");
        const fillColor =
          type === "state"
            ? Cesium.Color.fromCssColorString("#3D2314").withAlpha(0.06)
            : Cesium.Color.fromCssColorString("#4A6741").withAlpha(0.12);

        const ds = await Cesium.GeoJsonDataSource.load(url, {
          stroke: strokeColor,
          fill: fillColor,
          strokeWidth: 2.5,
          clampToGround: true,
        });

        for (const entity of ds.entities.values) {
          if (entity.polygon) {
            (entity.polygon as any).material = new Cesium.ColorMaterialProperty(
              fillColor
            );
            (entity.polygon as any).outline = true;
            (entity.polygon as any).outlineColor = new Cesium.ConstantProperty(
              strokeColor
            );
            (entity.polygon as any).outlineWidth = 2.5;
            (entity.polygon as any).classificationType =
              Cesium.ClassificationType.TERRAIN;
          }
          if (entity.polyline) {
            (entity.polyline as any).material = new Cesium.ColorMaterialProperty(
              strokeColor
            );
            (entity.polyline as any).width = 2.5;
            (entity.polyline as any).clampToGround = true;
          }
        }

        v.dataSources.add(ds);
        selectionDataSourceRef.current = ds;

        if (bbox && center) {
          const spanLon = Math.abs(bbox[2] - bbox[0]);
          const spanLat = Math.abs(bbox[3] - bbox[1]);
          const maxSpan = Math.max(spanLon, spanLat);
          const altitude = Math.max(
            maxSpan * 111000 * (type === "state" ? 1.6 : 2.2),
            type === "state" ? 450000 : 180000
          );

          v.camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(
              center[0],
              center[1],
              altitude
            ),
            orientation: {
              heading: Cesium.Math.toRadians(0.0),
              pitch: Cesium.Math.toRadians(-62.0),
              roll: 0.0,
            },
            duration: 1.8,
          });
        }
      } catch (err) {
        console.warn("[Bhurakshak] Failed to load boundary GeoJSON:", err);
      }
    },
    []
  );

  // Fly and zoom to a specific change location
  const flyToChangeSite = useCallback(
    (lng: number, lat: number, targetPolygon?: LocalChangePolygon) => {
      const v = viewerRef.current;
      if (!v || v.isDestroyed()) return;

      handleSetBaseMode("satellite", false);
      if (targetPolygon) setSelectedChange(targetPolygon);

      import("cesium").then((Cesium) => {
        v.camera.flyTo({
          destination: Cesium.Cartesian3.fromDegrees(lng, lat, 14500),
          orientation: {
            heading: Cesium.Math.toRadians(0.0),
            pitch: Cesium.Math.toRadians(-60.0),
            roll: 0.0,
          },
          duration: 2.2,
        });
      });
    },
    [handleSetBaseMode]
  );

  // Search filter
  const searchResults = useMemo(() => {
    if (!hierarchy) return { states: [], districts: [] };
    const q = searchQuery.trim().toLowerCase();

    if (!q && selectedState) {
      return {
        states: [],
        districts: selectedState.districts.slice(0, 30),
      };
    }
    if (!q) return { states: [], districts: [] };

    const tokens = q.split(/\s+/).filter(Boolean);

    const matchedStates: StateEntry[] = [];
    if (!selectedState) {
      for (const st of hierarchy.states) {
        const nameLower = st.name.toLowerCase();
        if (
          nameLower.includes(q) ||
          (q === "up" && st.id === "uttar-pradesh") ||
          (q === "mp" && st.id === "madhya-pradesh") ||
          (q === "rj" && st.id === "rajasthan")
        ) {
          matchedStates.push(st);
        }
      }
    }

    const matchedDistricts: DistrictEntry[] = [];
    for (const state of hierarchy.states) {
      if (selectedState && state.id !== selectedState.id) continue;
      for (const dist of state.districts) {
        const dName = dist.name.toLowerCase();
        const sName = state.name.toLowerCase();
        if (tokens.length > 1) {
          if (tokens.every((t) => dName.includes(t) || sName.includes(t))) {
            matchedDistricts.push(dist);
          }
        } else {
          if (dName.includes(q)) matchedDistricts.push(dist);
        }
      }
    }

    return {
      states: matchedStates.slice(0, 6),
      districts: matchedDistricts.slice(0, 20),
    };
  }, [hierarchy, searchQuery, selectedState]);

  // Main Cesium Setup
  useEffect(() => {
    let isMounted = true;
    let removeCameraListener: (() => void) | null = null;
    let clickHandler: any = null;
    const container = containerRef.current;

    async function init() {
      if (typeof window === "undefined" || !container) return;

      try {
        const token = process.env.NEXT_PUBLIC_CESIUM_ION_TOKEN;

        if (!token) {
          console.warn(
            "[Bhurakshak] NEXT_PUBLIC_CESIUM_ION_TOKEN is not defined in environment variables. Running in key-free ESRI cartographic mode."
          );
        }

        if (typeof window !== "undefined") {
          (window as any).CESIUM_BASE_URL = "/cesium";
          (globalThis as any).CESIUM_BASE_URL = "/cesium";
        }

        let Cesium: any;
        for (let attempt = 1; attempt <= 3; attempt++) {
          try {
            Cesium = await import("cesium");
            break;
          } catch (chunkErr) {
            console.warn(`[Bhurakshak] Cesium chunk load attempt ${attempt} failed, retrying...`, chunkErr);
            if (attempt === 3) throw chunkErr;
            await new Promise((res) => setTimeout(res, 800 * attempt));
          }
        }

        if (typeof (Cesium.buildModuleUrl as any)?.setBaseUrl === "function") {
          (Cesium.buildModuleUrl as any).setBaseUrl("/cesium/");
        }

        if (token) {
          Cesium.Ion.defaultAccessToken = token;
        }

        if (!isMounted || !containerRef.current) return;

        const viewer = new Cesium.Viewer(containerRef.current, {
          animation: false,
          timeline: false,
          baseLayerPicker: false,
          baseLayer: false, // Critical: do not attempt to load default Ion World Imagery
          geocoder: false,
          homeButton: false,
          sceneModePicker: false,
          navigationHelpButton: false,
          infoBox: false,
          selectionIndicator: false,
          fullscreenButton: false,
          creditContainer: creditRef.current || undefined,
        });

        viewerRef.current = viewer;

        // Screen space controller
        const controller = viewer.scene.screenSpaceCameraController;
      controller.zoomEventTypes = [
        Cesium.CameraEventType.RIGHT_DRAG,
        Cesium.CameraEventType.PINCH,
      ];
      controller.enableTilt = true;
      controller.enableRotate = true;
      controller.enableTranslate = true;

      // VISUAL RESTORATION: Warm-white canvas background, NO dark space!
      viewer.scene.backgroundColor = Cesium.Color.fromCssColorString("#F7F4EE");
      viewer.scene.globe.baseColor = Cesium.Color.fromCssColorString("#F7F4EE");
      viewer.scene.globe.enableLighting = false;
      viewer.scene.globe.depthTestAgainstTerrain = true;

      // Disable outer space, stars, and atmospheric haze in black void
      if (viewer.scene.skyBox) viewer.scene.skyBox.show = false;
      if (viewer.scene.sun) viewer.scene.sun.show = false;
      if (viewer.scene.moon) viewer.scene.moon.show = false;
      if (viewer.scene.skyAtmosphere) viewer.scene.skyAtmosphere.show = false;

      // Remove default Ion satellite layer from index 0 so we use clean, key-free providers
      viewer.imageryLayers.removeAll();

      // 1. Clean Light Cartographic Base Map (ESRI World Light Gray Canvas - NO API KEY REQUIRED)
      try {
        const cartoProvider = new Cesium.UrlTemplateImageryProvider({
          url: "https://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",
          maximumLevel: 16,
          credit: "Esri, HERE, Garmin, © OpenStreetMap contributors",
        });
        const cartoLayer = viewer.imageryLayers.addImageryProvider(cartoProvider);
        cartographicLayerRef.current = cartoLayer;
        cartoLayer.show = variant !== "hero"; // Base map active by default in explorer mode
      } catch (err) {
        console.warn("[Bhurakshak] Could not load light base layer:", err);
      }

      // 2. High-Resolution Satellite Imagery (ESRI World Imagery - NO API KEY REQUIRED)
      try {
        const satProvider = new Cesium.UrlTemplateImageryProvider({
          url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
          maximumLevel: 19,
          credit: "Esri, Maxar, Earthstar Geographics",
        });
        const satLayer = viewer.imageryLayers.addImageryProvider(satProvider);
        satelliteLayerRef.current = satLayer;
        satLayer.show = variant === "hero"; // Satellite active by default in hero mode, hidden at India level in explorer mode
      } catch (err) {
        console.warn("[Bhurakshak] Could not load satellite layer:", err);
      }

      // 3. ISRIC SoilGrids WRB WMS Layer
      try {
        const soilProvider = new Cesium.WebMapServiceImageryProvider({
          url: "https://maps.isric.org/mapserv/wrb",
          layers: "MostProbable",
          parameters: {
            service: "WMS",
            version: "1.3.0",
            request: "GetMap",
            transparent: "true",
            format: "image/png",
            styles: "default",
          },
          credit: "ISRIC - World Soil Information · SoilGrids WRB",
        });
        const soilLayer = viewer.imageryLayers.addImageryProvider(soilProvider);
        soilLayer.alpha = 0.65;
        soilLayer.show = false;
        soilLayerRef.current = soilLayer;
      } catch (err) {
        console.warn("[Bhurakshak] Could not load SoilGrids WMS:", err);
      }

      // 4. Clean State Boundaries Outline (Loaded non-blocking so globe renders immediately)
      Cesium.GeoJsonDataSource.load("/data/boundaries/states-outline.geojson", {
        stroke: Cesium.Color.fromCssColorString("#3D2314").withAlpha(0.4),
        fill: Cesium.Color.TRANSPARENT,
        strokeWidth: 1.2,
        clampToGround: true,
      })
        .then((ds: any) => {
          if (!viewer || viewer.isDestroyed()) return;
          viewer.dataSources.add(ds);
          bordersDataSourceRef.current = ds;
        })
        .catch((err: any) => {
          console.warn("[Bhurakshak] Could not load state outline GeoJSON:", err);
        });

      // 5. Add India-Level Change Dots (Visible at country scale)
      for (const pt of INDIA_CHANGE_POINTS) {
        const isBuiltUp = pt.category === "built_up";
        const dotColor = isBuiltUp ? "#D9381E" : "#E67300"; // Red or Orange
        viewer.entities.add({
          id: `india-dot-${pt.id}`,
          name: pt.title,
          position: Cesium.Cartesian3.fromDegrees(pt.lng, pt.lat, 100),
          point: {
            pixelSize: 10,
            color: Cesium.Color.fromCssColorString(dotColor),
            outlineColor: Cesium.Color.fromCssColorString("#FDFCF9"),
            outlineWidth: 2,
            disableDepthTestDistance: Number.POSITIVE_INFINITY,
            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
              250000,
              25000000
            ),
          },
        });
      }

      // Lucknow Pilot marker (subtle, calm olive dot with label)
      viewer.entities.add({
        id: "lucknow-pilot-marker",
        name: "Lucknow Pilot",
        position: Cesium.Cartesian3.fromDegrees(80.9462, 26.8467, 100),
        point: {
          pixelSize: 8,
          color: Cesium.Color.fromCssColorString("#4A6741"),
          outlineColor: Cesium.Color.fromCssColorString("#FFFFFF"),
          outlineWidth: 2,
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
        },
        label: {
          text: "Lucknow Pilot",
          font: "11px Inter, sans-serif",
          fillColor: Cesium.Color.fromCssColorString("#3D2314"),
          backgroundColor: Cesium.Color.fromCssColorString("#FDFCF9").withAlpha(0.9),
          showBackground: true,
          backgroundPadding: new Cesium.Cartesian2(6, 3),
          pixelOffset: new Cesium.Cartesian2(0, -18),
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
          distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 15000000),
        },
      });

      // 6. Add Detailed Change Polygons for Local Zoom
      for (const poly of LUCKNOW_CHANGE_POLYGONS) {
        const isBuiltUp = poly.category === "built_up";
        const isDisturbed = poly.category === "disturbed";

        const fillColor = isBuiltUp
          ? "rgba(217, 56, 30, 0.45)"
          : isDisturbed
          ? "rgba(230, 115, 0, 0.45)"
          : "rgba(245, 158, 11, 0.42)";

        const outlineColor = isBuiltUp
          ? "#8B1E0F"
          : isDisturbed
          ? "#9E4700"
          : "#B45309";

        const flatCoords: number[] = [];
        for (const [lng, lat] of poly.coordinates) {
          flatCoords.push(lng, lat);
        }

        viewer.entities.add({
          id: `local-poly-${poly.id}`,
          name: poly.title,
          polygon: {
            hierarchy: Cesium.Cartesian3.fromDegreesArray(flatCoords),
            material: Cesium.Color.fromCssColorString(fillColor),
            outline: true,
            outlineColor: Cesium.Color.fromCssColorString(outlineColor),
            outlineWidth: 2.5,
            classificationType: Cesium.ClassificationType.TERRAIN,
            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
              0,
              800000
            ),
          },
        });
      }

      // 7. Initial Camera: Framed DIRECTLY on India 3D Structure (NOT deep space)
      viewer.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(79.0, 22.0, 3100000), // Centered directly over India
        orientation: {
          heading: Cesium.Math.toRadians(0.0),
          pitch: Cesium.Math.toRadians(-72.0),
          roll: 0.0,
        },
      });

      // 8. Screen Space Click Handler for Change Dots & Polygons
      clickHandler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
      clickHandler.setInputAction((click: any) => {
        const picked = viewer.scene.pick(click.position);
        if (Cesium.defined(picked) && picked.id) {
          const id = typeof picked.id === "string" ? picked.id : picked.id.id;
          if (id && id.startsWith("india-dot-")) {
            const ptId = id.replace("india-dot-", "");
            const pt = INDIA_CHANGE_POINTS.find((p) => p.id === ptId);
            if (pt) {
              const matchedLocal = LUCKNOW_CHANGE_POLYGONS.find(
                (p) => p.code === pt.code
              );
              flyToChangeSite(
                pt.lng,
                pt.lat,
                matchedLocal || LUCKNOW_CHANGE_POLYGONS[0]
              );
            }
          } else if (id && id.startsWith("local-poly-")) {
            const polyId = id.replace("local-poly-", "");
            const poly = LUCKNOW_CHANGE_POLYGONS.find((p) => p.id === polyId);
            if (poly) {
              setSelectedChange(poly);
            }
          }
        }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

      // 9. Camera Altitude Listener & Auto Transition
      removeCameraListener = viewer.camera.changed.addEventListener(() => {
        if (!viewer || viewer.isDestroyed()) return;
        const heightMeters = viewer.camera.positionCartographic.height;
        const altKm = Math.round(heightMeters / 1000);
        setCameraAltitudeKm(altKm);

        if (!isManualBaseMode) {
          if (altKm > 1000 && baseMapMode !== "base_map") {
            setBaseMapMode("base_map");
            syncBaseLayers("base_map");
          } else if (altKm <= 1000 && baseMapMode !== "satellite") {
            setBaseMapMode("satellite");
            syncBaseLayers("satellite");
          }
        }
      });

        if (isMounted) setIsLoaded(true);
      } catch (err: any) {
        console.error("[Bhurakshak] Cesium initialization error:", err);
        if (isMounted) {
          setInitError(err?.message || "Failed to initialize 3D Earth view");
          setIsLoaded(true);
        }
      }
    }

    init();

    const handleWheelPinch = (e: WheelEvent) => {
      const v = viewerRef.current;
      if (!v || v.isDestroyed()) return;

      if (e.ctrlKey) {
        e.preventDefault();
        const height = v.camera.positionCartographic.height;
        const zoomDelta = height * 0.18;
        if (e.deltaY < 0) {
          v.camera.zoomIn(zoomDelta);
        } else {
          v.camera.zoomOut(zoomDelta);
        }
      }
    };

    if (container) {
      container.addEventListener("wheel", handleWheelPinch, { passive: false });
    }

    return () => {
      isMounted = false;
      if (container) {
        container.removeEventListener("wheel", handleWheelPinch);
      }
      if (removeCameraListener) removeCameraListener();
      if (clickHandler) clickHandler.destroy();
      if (viewerRef.current && !viewerRef.current.isDestroyed()) {
        viewerRef.current.destroy();
        viewerRef.current = null;
      }
    };
  }, [
    isManualBaseMode,
    baseMapMode,
    syncBaseLayers,
    flyToChangeSite,
  ]);

  // Click outside to close search dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchDropdownRef.current &&
        !searchDropdownRef.current.contains(event.target as Node)
      ) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isLocalZoom = cameraAltitudeKm <= 1000 || baseMapMode === "satellite";

  return (
    <div className="relative h-full w-full overflow-hidden select-none bg-[#F7F4EE]">
      {/* Cesium Canvas Container */}
      <div
        ref={containerRef}
        className="h-full w-full outline-none bg-[#F7F4EE]"
        style={{ minHeight: "560px" }}
      />

      {/* Hidden credit container */}
      <div
        ref={creditRef}
        className="pointer-events-none absolute bottom-1 right-1 opacity-40 text-[9px] text-charcoal/50 z-10 font-mono"
      />

      {/* Loading Overlay */}
      {!isLoaded && !initError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#F7F4EE] text-charcoal z-20">
          <div className="flex items-center gap-2 font-mono text-xs text-charcoal">
            <span className="h-2 w-2 rounded-full bg-olive animate-ping" />
            <span>Rendering India 3D Structure...</span>
          </div>
          <span className="font-mono text-[10px] text-charcoal-muted mt-1">
            Loading Cartographic Surface & Land Change Layers
          </span>
        </div>
      )}

      {/* Error Fallback Notice */}
      {initError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#F7F4EE] text-charcoal z-25 p-6 text-center">
          <div className="max-w-md rounded-2xl border border-canvas-border bg-[#FDFCF9] p-6 shadow-sm space-y-3">
            <div className="text-sm font-semibold text-walnut">
              WebGL / 3D Globe Initialization Notice
            </div>
            <p className="text-xs text-charcoal-muted leading-relaxed font-mono">
              {initError}
            </p>
            <p className="text-[11px] text-charcoal-muted/80">
              Please check if WebGL is supported by your browser or refresh the page.
            </p>
            <button
              onClick={() => {
                window.location.href = window.location.origin + window.location.pathname + "?t=" + Date.now();
              }}
              className="inline-flex items-center gap-2 rounded-full bg-walnut px-5 py-2 text-xs font-medium text-white hover:bg-walnut-hover transition-colors shadow-xs active:scale-95"
            >
              Reload View
            </button>
          </div>
        </div>
      )}

      {/* HERO VARIANT: Minimal Script Annotations & India Badge */}
      {variant === "hero" && (
        <>
          <div className="pointer-events-none absolute top-4 left-4 z-20 rounded-full border border-canvas-border/80 bg-[#FDFCF9]/90 px-3 py-1 text-[11px] font-mono text-charcoal shadow-xs backdrop-blur-md flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-olive animate-ping" />
            <span>3D Earth · India Focus</span>
          </div>

          {/* Script Callouts on Right (Matches Reference Image) */}
          <div className="pointer-events-none absolute bottom-12 right-6 sm:bottom-16 sm:right-10 z-20 flex flex-col items-end text-right select-none">
            <span className="font-serif italic text-2xl sm:text-3xl lg:text-4xl text-charcoal/85 tracking-tight leading-snug drop-shadow-xs">
              Observe
            </span>
            <span className="font-serif italic text-2xl sm:text-3xl lg:text-4xl text-charcoal/85 tracking-tight leading-snug drop-shadow-xs">
              Detect
            </span>
            <span className="font-serif italic text-2xl sm:text-3xl lg:text-4xl text-charcoal/85 tracking-tight leading-snug drop-shadow-xs">
              Explain
            </span>
            <span className="font-serif italic text-2xl sm:text-3xl lg:text-4xl text-olive tracking-tight leading-snug font-medium drop-shadow-xs">
              Protect
            </span>
          </div>

          <button
            onClick={flyToIndiaView}
            className="absolute bottom-4 left-4 z-20 rounded-full border border-canvas-border/80 bg-canvas-surface/90 px-3 py-1.5 text-[10px] font-mono text-charcoal-muted backdrop-blur-md hover:text-walnut hover:bg-white transition-colors shadow-xs active:scale-95"
            title="Reset India camera view"
          >
            Reset View
          </button>
        </>
      )}

      {/* EXPLORER VARIANT: TOP CONTROLS BAR: SEARCH & 5 LAYER PILLS (Matches Reference Image) */}
      {variant === "explorer" && (
        <div className="absolute top-4 left-4 right-4 sm:right-auto z-30 flex flex-col gap-2.5 max-w-2xl">
          {/* Search Bar */}
          <div ref={searchDropdownRef} className="relative w-full">
          <div className="flex items-center rounded-xl border border-canvas-border/90 bg-[#FDFCF9]/95 px-3 py-2 shadow-sm backdrop-blur-md transition-all focus-within:border-walnut/70 focus-within:ring-1 focus-within:ring-walnut/30">
            <Search className="h-4 w-4 text-charcoal-muted shrink-0 mr-2" />

            {selectedState && (
              <div className="flex items-center gap-1 mr-2 px-2 py-0.5 rounded bg-canvas-border/40 text-[11px] font-medium text-walnut shrink-0">
                <span>{selectedState.name}</span>
                {selectedDistrict && (
                  <>
                    <span className="text-charcoal-muted text-[10px]">›</span>
                    <span className="text-olive">{selectedDistrict.name}</span>
                  </>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (selectedDistrict) {
                      setSelectedDistrict(null);
                      loadAndHighlightBoundary(
                        "state",
                        selectedState.id,
                        undefined,
                        selectedState.bbox,
                        selectedState.center
                      );
                    } else {
                      flyToIndiaView();
                    }
                  }}
                  className="ml-1 text-charcoal-muted hover:text-walnut"
                  title="Clear level"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchFocused(true);
              }}
              onFocus={() => setIsSearchFocused(true)}
              placeholder={
                isLocalZoom
                  ? "Search district or village (e.g. Lucknow, Malihabad...)"
                  : "Search India, state or district (e.g. Rajasthan, Jaipur)..."
              }
              className="w-full bg-transparent text-xs text-charcoal placeholder-charcoal-muted/70 outline-none font-sans"
            />

            {(searchQuery || selectedState) && (
              <button
                onClick={flyToIndiaView}
                className="text-charcoal-muted hover:text-charcoal p-0.5 ml-1"
                title="Reset view"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Autocomplete Dropdown */}
          {isSearchFocused &&
            (searchResults.states.length > 0 ||
              searchResults.districts.length > 0) && (
              <div className="absolute top-full left-0 right-0 mt-1 max-h-72 overflow-y-auto rounded-xl border border-canvas-border/80 bg-[#FDFCF9]/98 p-1.5 shadow-2xl backdrop-blur-md z-40 text-xs custom-scrollbar">
                {searchResults.states.length > 0 && (
                  <div className="mb-2">
                    <div className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-charcoal-muted">
                      States ({searchResults.states.length})
                    </div>
                    {searchResults.states.map((st) => (
                      <button
                        key={st.id}
                        onClick={() => {
                          setSelectedState(st);
                          setSelectedDistrict(null);
                          setSearchQuery("");
                          setIsSearchFocused(false);
                          loadAndHighlightBoundary(
                            "state",
                            st.id,
                            undefined,
                            st.bbox,
                            st.center
                          );
                        }}
                        className="flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left hover:bg-canvas-border/30 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <Compass className="h-3.5 w-3.5 text-walnut shrink-0" />
                          <span className="font-medium text-charcoal">
                            {st.name}
                          </span>
                        </div>
                        <span className="font-mono text-[10px] text-charcoal-muted">
                          {st.districtCount} districts
                        </span>
                      </button>
                    ))}
                  </div>
                )}

                {searchResults.districts.length > 0 && (
                  <div>
                    <div className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-charcoal-muted">
                      Districts ({searchResults.districts.length})
                    </div>
                    {searchResults.districts.map((d) => (
                      <button
                        key={`${d.stateId}-${d.id}`}
                        onClick={() => {
                          if (
                            hierarchy &&
                            (!selectedState || selectedState.id !== d.stateId)
                          ) {
                            const parentState = hierarchy.states.find(
                              (s) => s.id === d.stateId
                            );
                            if (parentState) setSelectedState(parentState);
                          }
                          setSelectedDistrict(d);
                          setSearchQuery("");
                          setIsSearchFocused(false);
                          if (d.name.toLowerCase() === "lucknow") {
                            flyToChangeSite(
                              80.9168,
                              26.8362,
                              LUCKNOW_CHANGE_POLYGONS[0]
                            );
                          } else {
                            handleSetBaseMode("satellite", false);
                            loadAndHighlightBoundary(
                              "district",
                              d.stateId,
                              d.id,
                              d.bbox,
                              d.center
                            );
                          }
                        }}
                        className="flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left hover:bg-canvas-border/30 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <MapPin className="h-3.5 w-3.5 text-olive shrink-0" />
                          <span className="font-medium text-charcoal">
                            {d.name}
                          </span>
                        </div>
                        <span className="font-mono text-[10px] text-charcoal-muted">
                          {d.stateName}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
        </div>

        {/* 5 Layer Controls (Exact match to reference image pills) */}
        <div className="flex flex-wrap items-center gap-1.5">
          {/* 1. Base Map */}
          <button
            onClick={() => handleSetBaseMode("base_map")}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all shadow-xs backdrop-blur-md ${
              baseMapMode === "base_map"
                ? "border-walnut bg-walnut text-white shadow-sm"
                : "border-canvas-border/80 bg-canvas-surface/90 text-charcoal hover:bg-canvas-surface"
            }`}
            title="Clean Cartographic Base Map (India Level)"
          >
            <MapIcon className="h-3.5 w-3.5" />
            <span>Base Map</span>
          </button>

          {/* 2. Satellite */}
          <button
            onClick={() => handleSetBaseMode("satellite")}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all shadow-xs backdrop-blur-md ${
              baseMapMode === "satellite"
                ? "border-walnut bg-walnut text-white shadow-sm"
                : "border-canvas-border/80 bg-canvas-surface/90 text-charcoal hover:bg-canvas-surface"
            }`}
            title="High-Resolution Satellite Imagery"
          >
            <Globe2 className="h-3.5 w-3.5" />
            <span>Satellite</span>
          </button>

          {/* 3. Soil */}
          <button
            onClick={handleToggleSoil}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all shadow-xs backdrop-blur-md ${
              soilActive
                ? "border-olive bg-olive text-white shadow-sm"
                : "border-canvas-border/80 bg-canvas-surface/90 text-charcoal hover:bg-canvas-surface"
            }`}
            title="ISRIC SoilGrids WRB Soil Classification (250m)"
          >
            <Layers className="h-3.5 w-3.5" />
            <span>Soil</span>
          </button>

          {/* 4. Land Cover */}
          <button
            onClick={() => setLandCoverActive((prev) => !prev)}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all shadow-xs backdrop-blur-md ${
              landCoverActive
                ? "border-walnut bg-walnut text-white shadow-sm"
                : "border-canvas-border/80 bg-canvas-surface/90 text-charcoal hover:bg-canvas-surface"
            }`}
            title="Dynamic World 10m LULC Baseline"
          >
            <Grid className="h-3.5 w-3.5" />
            <span>Land Cover</span>
          </button>

          {/* 5. Land Change */}
          <button
            onClick={() => setLandChangeActive((prev) => !prev)}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all shadow-xs backdrop-blur-md ${
              landChangeActive
                ? "border-walnut bg-walnut text-white shadow-sm"
                : "border-canvas-border/80 bg-canvas-surface/90 text-charcoal hover:bg-canvas-surface"
            }`}
            title="Detected Land Change Markers & Polygons"
          >
            <Activity className="h-3.5 w-3.5" />
            <span>Land Change</span>
            <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse ml-0.5" />
          </button>
        </div>
      </div>
      )}

      {/* TOP-RIGHT LOCATION BADGE (Visible in Zoomed / District Level in Explorer Mode) */}
      {variant === "explorer" && isLocalZoom && (
        <div className="hidden sm:block absolute top-4 right-16 z-25 rounded-xl border border-canvas-border/80 bg-[#FDFCF9]/95 px-3.5 py-2 text-xs shadow-md backdrop-blur-md">
          <div className="font-semibold text-charcoal text-xs">
            {selectedDistrict
              ? `${selectedDistrict.name}, ${selectedDistrict.stateName}`
              : "Lucknow, Uttar Pradesh"}
          </div>
          <div className="font-mono text-[10px] text-charcoal-muted mt-0.5">
            {selectedDistrict
              ? `${selectedDistrict.center[1]}° N, ${selectedDistrict.center[0]}° E`
              : "26.8467° N, 80.9462° E"}
          </div>
        </div>
      )}

      {/* DEDICATED ZOOM IN / OUT BUTTONS */}
      <div className="absolute top-4 right-4 z-20 flex flex-col items-center gap-1.5">
        <button
          onClick={handleZoomIn}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-canvas-border/80 bg-canvas-surface/95 text-charcoal shadow-sm backdrop-blur-md hover:bg-white hover:text-walnut transition-colors active:scale-95"
          title="Zoom in"
          aria-label="Zoom in"
        >
          <Plus className="h-4 w-4" />
        </button>
        <button
          onClick={handleZoomOut}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-canvas-border/80 bg-canvas-surface/95 text-charcoal shadow-sm backdrop-blur-md hover:bg-white hover:text-walnut transition-colors active:scale-95"
          title="Zoom out"
          aria-label="Zoom out"
        >
          <Minus className="h-4 w-4" />
        </button>
      </div>

      {/* BOTTOM-LEFT FLOATING LEGEND (Matches Reference Image Left vs Right) */}
      {variant === "explorer" && (
        <div className="absolute bottom-12 left-4 z-25 max-w-[280px] sm:max-w-xs rounded-xl border border-canvas-border/80 bg-[#FDFCF9]/95 text-charcoal shadow-lg backdrop-blur-md transition-all">
          <div className="flex items-center justify-between border-b border-canvas-border/60 px-3 py-2">
            <span className="text-xs font-semibold text-charcoal font-sans">
              {!isLocalZoom ? "Land Use & Change" : "Recent Land Change"}
            </span>
            <button
              onClick={() => setLegendCollapsed((prev) => !prev)}
              className="flex h-5 w-5 items-center justify-center rounded text-charcoal-muted hover:text-charcoal transition-colors"
            >
              {legendCollapsed ? (
                <ChevronUp className="h-3.5 w-3.5" />
              ) : (
                <ChevronDown className="h-3.5 w-3.5" />
              )}
            </button>
          </div>

          {!legendCollapsed && (
            <div className="p-3 space-y-2.5 text-[11px]">
              {/* 1. Country Level: Land Use (Current) + Recent Changes */}
              {!isLocalZoom ? (
                <>
                  <div className="space-y-1.5">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-charcoal-muted font-semibold">
                      Land Use (Current)
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-xs bg-[#68BB59] shrink-0" />
                      <span>Agriculture</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-xs bg-[#2D7238] shrink-0" />
                      <span>Forest / Trees</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-xs bg-[#E56050] shrink-0" />
                      <span>Built-up</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-xs bg-[#E5A350] shrink-0" />
                      <span>Bare / Disturbed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-xs bg-[#4AA5E5] shrink-0" />
                      <span>Water</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-canvas-border/50 space-y-1.5">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-charcoal-muted font-semibold">
                      Recent Changes (Last 6 months)
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[#D9381E] shrink-0 ring-2 ring-red-200" />
                      <span>New Built-up / Plotting</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[#E67300] shrink-0 ring-2 ring-amber-200" />
                      <span>Disturbed / Under Development</span>
                    </div>
                  </div>
                </>
              ) : (
                /* 2. Zoomed View: Recent Land Change */
                <div className="space-y-2">
                  <div className="flex items-center gap-2.5">
                    <span className="h-3 w-4 rounded-xs bg-[#D9381E] border border-[#8B1E0F] shrink-0 shadow-2xs" />
                    <span className="font-medium text-charcoal">
                      New Built-up / Plotting
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="h-3 w-4 rounded-xs bg-[#E67300] border border-[#9E4700] shrink-0 shadow-2xs" />
                    <span className="font-medium text-charcoal">Disturbed Land</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span
                      className="h-3 w-4 rounded-xs bg-[#F59E0B] border border-[#B45309] shrink-0 shadow-2xs"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.4) 2px, rgba(255,255,255,0.4) 4px)",
                      }}
                    />
                    <span className="font-medium text-charcoal">
                      Under Development
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="h-3 w-4 rounded-xs border-2 border-dashed border-[#3D2314] shrink-0" />
                    <span className="font-medium text-charcoal">Selected Area</span>
                  </div>
                </div>
              )}

              {/* Quick Helper */}
              <div className="pt-2 border-t border-canvas-border/50 text-[10px] font-mono text-charcoal-muted">
                {!isLocalZoom
                  ? "Click any change dot to zoom into local parcels"
                  : "Click any change parcel to inspect evidence"}
              </div>
            </div>
          )}
        </div>
      )}

      {/* RIGHT-SIDE INFO PANEL: DETECTED CHANGE (Matches Reference Image Right Side) */}
      {variant === "explorer" && selectedChange && isLocalZoom && (
        <div className="absolute top-20 right-4 z-30 w-[300px] sm:w-[340px] rounded-2xl border border-canvas-border/80 bg-[#FDFCF9]/98 p-4 text-xs shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-right-4 duration-200">
          {/* Header */}
          <div className="flex items-start justify-between pb-2.5 border-b border-canvas-border/60">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                <h3 className="text-sm font-semibold text-charcoal font-sans">
                  Detected Change
                </h3>
              </div>
              <span className="text-[10px] font-mono text-charcoal-muted mt-0.5 block">
                Parcel ID: #{selectedChange.code} · Sentinel-2 Derived
              </span>
            </div>
            <button
              onClick={() => setSelectedChange(null)}
              className="text-charcoal-muted hover:text-charcoal p-1 rounded-lg hover:bg-canvas-border/30 transition-colors"
              title="Close panel"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Metadata Rows */}
          <div className="py-3 space-y-2 text-xs">
            {/* Location */}
            <div className="flex items-center gap-2 text-charcoal">
              <MapPin className="h-4 w-4 text-charcoal-muted shrink-0" />
              <span>{selectedChange.location}</span>
            </div>

            {/* Detected Date */}
            <div className="flex items-center gap-2 text-charcoal">
              <Calendar className="h-4 w-4 text-charcoal-muted shrink-0" />
              <span>
                Detected:{" "}
                <strong className="font-medium">{selectedChange.detectedDate}</strong>
              </span>
            </div>

            {/* Approx Area */}
            <div className="flex items-center gap-2 text-charcoal">
              <Ruler className="h-4 w-4 text-charcoal-muted shrink-0" />
              <span>
                Approx. Area:{" "}
                <strong className="font-medium text-walnut">
                  {selectedChange.areaHa} ha
                </strong>
              </span>
            </div>

            {/* Previous Land Use */}
            <div className="flex items-center gap-2 text-charcoal">
              <Sprout className="h-4 w-4 text-olive shrink-0" />
              <span>
                Previous Land Use:{" "}
                <strong className="font-medium text-olive">
                  {selectedChange.previousUse}
                </strong>
              </span>
            </div>

            {/* Current Land Use */}
            <div className="flex items-center gap-2 text-charcoal">
              <Building className="h-4 w-4 text-red-600 shrink-0" />
              <span>
                Current Land Use:{" "}
                <strong className="font-medium text-red-700">
                  {selectedChange.currentUse}
                </strong>
              </span>
            </div>
          </div>

          {/* Side-by-Side Before / After Images (Matches Reference Image) */}
          <div className="pt-2 border-t border-canvas-border/60">
            <div className="grid grid-cols-2 gap-2">
              {/* BEFORE CARD */}
              <div className="space-y-1">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-canvas-border/80 bg-[#345B38] shadow-inner flex flex-col justify-between p-1.5">
                  <svg
                    viewBox="0 0 100 75"
                    className="absolute inset-0 w-full h-full object-cover opacity-90"
                    preserveAspectRatio="none"
                  >
                    <rect width="100" height="75" fill="#3D683A" />
                    <line
                      x1="0"
                      y1="25"
                      x2="100"
                      y2="25"
                      stroke="#2D502B"
                      strokeWidth="1.5"
                    />
                    <line
                      x1="0"
                      y1="50"
                      x2="100"
                      y2="50"
                      stroke="#2D502B"
                      strokeWidth="1.5"
                    />
                    <line
                      x1="35"
                      y1="0"
                      x2="35"
                      y2="75"
                      stroke="#2D502B"
                      strokeWidth="1.5"
                    />
                    <line
                      x1="70"
                      y1="0"
                      x2="70"
                      y2="75"
                      stroke="#2D502B"
                      strokeWidth="1.5"
                    />
                    <rect
                      x="2"
                      y="2"
                      width="31"
                      height="21"
                      fill="#4A7C46"
                      opacity="0.8"
                    />
                    <rect
                      x="37"
                      y="2"
                      width="31"
                      height="21"
                      fill="#558C51"
                      opacity="0.8"
                    />
                    <rect
                      x="72"
                      y="2"
                      width="26"
                      height="21"
                      fill="#447540"
                      opacity="0.8"
                    />
                    <rect
                      x="2"
                      y="27"
                      width="31"
                      height="21"
                      fill="#52874E"
                      opacity="0.8"
                    />
                    <rect
                      x="37"
                      y="27"
                      width="31"
                      height="21"
                      fill="#3E6B3B"
                      opacity="0.8"
                    />
                    <rect
                      x="72"
                      y="27"
                      width="26"
                      height="21"
                      fill="#4A7D46"
                      opacity="0.8"
                    />
                  </svg>
                  <span className="relative z-10 text-[8px] font-mono font-semibold px-1 py-0.5 rounded bg-black/50 text-white w-fit">
                    NDVI: 0.68
                  </span>
                </div>
                <div className="text-[10px] font-mono text-center text-charcoal-muted">
                  Before ({selectedChange.beforeDate})
                </div>
              </div>

              {/* AFTER CARD */}
              <div className="space-y-1">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-canvas-border/80 bg-[#B8875B] shadow-inner flex flex-col justify-between p-1.5">
                  <svg
                    viewBox="0 0 100 75"
                    className="absolute inset-0 w-full h-full object-cover opacity-95"
                    preserveAspectRatio="none"
                  >
                    <rect width="100" height="75" fill="#AF7E54" />
                    <rect
                      x="0"
                      y="32"
                      width="100"
                      height="12"
                      fill="#D5C5B2"
                    />
                    <rect
                      x="42"
                      y="0"
                      width="14"
                      height="75"
                      fill="#D5C5B2"
                    />
                    <rect
                      x="6"
                      y="6"
                      width="30"
                      height="22"
                      fill="#8F623F"
                      stroke="#E2D5C3"
                      strokeWidth="1"
                    />
                    <rect
                      x="60"
                      y="6"
                      width="34"
                      height="22"
                      fill="#8F623F"
                      stroke="#E2D5C3"
                      strokeWidth="1"
                    />
                    <rect
                      x="6"
                      y="48"
                      width="30"
                      height="22"
                      fill="#8F623F"
                      stroke="#E2D5C3"
                      strokeWidth="1"
                    />
                    <rect
                      x="60"
                      y="48"
                      width="34"
                      height="22"
                      fill="#8F623F"
                      stroke="#E2D5C3"
                      strokeWidth="1"
                    />
                  </svg>
                  <span className="relative z-10 text-[8px] font-mono font-semibold px-1 py-0.5 rounded bg-black/50 text-white w-fit">
                    NDBI: +0.44
                  </span>
                </div>
                <div className="text-[10px] font-mono text-center text-charcoal-muted">
                  After ({selectedChange.afterDate})
                </div>
              </div>
            </div>
          </div>

          {/* Action CTA Button */}
          <div className="pt-3">
            <button
              onClick={() => {
                if (onExplorePilot) onExplorePilot();
              }}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-walnut px-4 py-2 text-xs font-medium text-white shadow-sm transition-all hover:bg-walnut-hover active:scale-[0.99]"
            >
              <span>View Details</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
            <div className="mt-1 text-[9px] font-mono text-center text-charcoal-muted">
              Prototype Evidence View · Copernicus S2 Derived
            </div>
          </div>
        </div>
      )}

      {/* BOTTOM TELEMETRY BAR */}
      {variant === "explorer" && (
        <div className="pointer-events-none absolute bottom-4 left-4 right-4 z-20 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div className="rounded-full border border-canvas-border/60 bg-canvas-surface/90 px-3 py-1 text-[10px] font-mono text-charcoal-muted backdrop-blur-md shadow-xs">
            <span>
              {isLocalZoom
                ? "Local Satellite Mode · 10m Resolution · Drag to pan · Click parcel"
                : "India 3D Structure · Click red/orange dot to inspect affected parcels"}
            </span>
          </div>

          <div className="rounded-full border border-canvas-border/60 bg-canvas-surface/90 px-3 py-1 text-[10px] font-mono text-charcoal backdrop-blur-md shadow-xs text-right">
            <span>
              Mode:{" "}
              <strong className="text-walnut">
                {baseMapMode === "base_map" ? "Base Map (India)" : "Satellite (Local)"}
              </strong>{" "}
              · Altitude: <strong>~{cameraAltitudeKm.toLocaleString()} km</strong>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CesiumGlobe;

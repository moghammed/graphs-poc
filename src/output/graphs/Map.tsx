import mapboxgl from "mapbox-gl"; // or "const mapboxgl = require('mapbox-gl');"
import { useEffect, useMemo, useRef, useState } from "react";
import { dataAtom } from "../../input";
import { useStore } from "../../store/store";
import { applyFilters } from "../../util/applyFilters";
import { useAtom } from "jotai";
import GraphTypes from "../../graphTypes.json";
import { handleMapMarkerClick, Tooltip } from "./common";
import { schemeSet1 } from "d3-scale-chromatic";
import { scaleOrdinal } from "@visx/scale";
import { Stack, Typography } from "@mui/material";

mapboxgl.accessToken =
  "pk.eyJ1IjoibW9naGFtbWVkIiwiYSI6ImNtNW8xNHg3dTBmejcya3M4dDc4aGMwMmwifQ.fEAXt0NPdjD_gT9rTcVzvQ";

const MapType = GraphTypes.find((graphType) => graphType.id === "map")!;

export const MapChart = () => {
  const mapping = useStore((state) => state.mapping);
  const hasAllRequiredMappings = MapType.slots.every((slot) =>
    slot.required ? mapping[slot.name] !== undefined : true
  );
  return hasAllRequiredMappings ? <MapChartCmp /> : null;
};

export const MapChartCmp = () => {
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [markersSource, setMarkersSource] =
    useState<mapboxgl.GeoJSONSource | null>(null);
  const [heatmapSource, setHeatmapSource] =
    useState<mapboxgl.GeoJSONSource | null>(null);

  const tooltipRef = useRef<HTMLDivElement>(null);

  const [unfilteredData] = useAtom(dataAtom);
  const mapping = useStore((state) => state.mapping);
  const filters = useStore((state) => state.filters);
  const filteredData = useMemo(
    () => applyFilters(unfilteredData, filters),
    [unfilteredData, filters]
  );

  const showTooltip = (props: {
    tooltipLeft: number;
    tooltipTop: number;
    tooltipData: {
      label: string;
      nMarkers: number;
    };
  }) => {
    if (!tooltipRef.current) return;
    tooltipRef.current.style.display = "block";
    tooltipRef.current.style.left = `${props.tooltipLeft}px`;
    tooltipRef.current.style.top = `${props.tooltipTop}px`;
    tooltipRef.current.innerHTML = props.tooltipData.label;
  };

  const getColor = scaleOrdinal({
    domain: filteredData.map((d) => d[mapping["color"]?.column]),
    range: schemeSet1 as string[],
    unknown: "#000",
  });

  const mapData = useMemo(() => {
    return {
      markers: filteredData.flatMap((row) =>
        row[mapping["markers"]?.column]
          ? [
              {
                latitude: parseFloat(
                  row[mapping["markers"]?.column]?.split(",")?.[0]
                ),
                longitude: parseFloat(
                  row[mapping["markers"]?.column]?.split(",")?.[1]
                ),
                label: row[mapping["label"]?.column],
                color: getColor(row[mapping["color"]?.column]),
              },
            ]
          : []
      ),
      heatmap: filteredData.flatMap((row) =>
        row[mapping["heatmap"]?.column]
          ? [
              {
                latitude: parseFloat(
                  row[mapping["heatmap"]?.column]?.split(",")?.[0]
                ),
                longitude: parseFloat(
                  row[mapping["heatmap"]?.column]?.split(",")?.[1]
                ),
              },
            ]
          : []
      ),
    };
  }, [filteredData, mapping, getColor]);

  console.log({ unfilteredData, filteredData, mapData });

  useEffect(() => {
    if (map) return;
    const container = document.getElementById("map");
    if (!container) return;
    const mBoxMap = new mapboxgl.Map({
      container: container,
      // style: "mapbox://styles/mapbox/streets-v12",
      center: [4, 52],
      zoom: 10,
    });
    setMap(mBoxMap);
    mBoxMap.on("load", () => {
      setMapLoaded(true);
    });

    mBoxMap.on("mousemove", "markers", (e) => {
      const markers = mBoxMap.queryRenderedFeatures(e.point, {
        layers: ["markers"],
      });
      console.log(markers);
      handleMapMarkerClick(showTooltip)(e, markers);
    });
    mBoxMap.on("mouseleave", "markers", () => {
      if (tooltipRef.current) {
        tooltipRef.current.style.display = "none";
      }
    });
  }, [map]);

  useEffect(() => {
    if (!mapLoaded || !map) return;
    if (map.getSource("markers")) {
      if (map.getLayer("markers")) {
        map.removeLayer("markers");
      }
      map.removeSource("markers");
    }
    map.addSource("markers", {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [],
      },
    });
    if (map.getSource("heatmap")) {
      if (map.getLayer("heatmap")) {
        map.removeLayer("heatmap");
      }
      map.removeSource("heatmap");
    }
    map.addSource("heatmap", {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [],
      },
    });

    setMarkersSource(map.getSource("markers") as mapboxgl.GeoJSONSource);
    setHeatmapSource(map.getSource("heatmap") as mapboxgl.GeoJSONSource);
  }, [map, mapLoaded]);

  useEffect(() => {
    if (!markersSource || !map) return;
    markersSource.setData({
      type: "FeatureCollection",
      features: mapData.markers.map((d) => ({
        type: "Feature",
        properties: {
          title: d.label,
          color: d.color,
        },
        geometry: {
          type: "Point",
          coordinates: [d.longitude, d.latitude],
        },
      })),
    });
    if (map.getLayer("markers")) {
      map.removeLayer("markers");
    }
    map.addLayer({
      id: "markers",
      type: "circle",
      source: "markers",
      paint: {
        "circle-radius": 10,
        "circle-color": ["get", "color"],
        "circle-stroke-color": "#fff",
        "circle-stroke-width": 1,
      },
    });
  }, [map, mapData, markersSource]);

  useEffect(() => {
    if (!heatmapSource || !map) return;
    heatmapSource.setData({
      type: "FeatureCollection",
      features: mapData.heatmap.map((d) => ({
        type: "Feature",
        properties: {},
        geometry: {
          type: "Point",
          coordinates: [d.longitude, d.latitude],
        },
      })),
    });
    if (map.getLayer("heatmap")) {
      map.removeLayer("heatmap");
    }
    map.addLayer({
      id: "heatmap",
      type: "heatmap",
      source: "heatmap",
      paint: {
        "heatmap-weight": 0.2,
        "heatmap-intensity": 0.5,
        "heatmap-radius": {
          type: "interval",
          stops: [
            [0, 2],
            [1, 20],
            [2, 30],
            [3, 40],
          ],
          base: 1.5,
          property: "count",
        },
        "heatmap-opacity": 0.5,
      },
    });
  }, [map, mapData, heatmapSource]);

  return (
    <div
      id="map"
      style={{
        width: "100%",
        height: "100%",
        minHeight: "600px",
        position: "relative",
      }}
    >
      <Tooltip ref={tooltipRef} sx={{ display: "none", maxWidth: "unset" }} />
      {mapping["color"]?.column ? (
        <div
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            backgroundColor: "#fff",
            padding: 10,
            borderRadius: 5,
            zIndex: 1000,
          }}
        >
          <Typography>Legend</Typography>
          {getColor.domain().map((d) => (
            <Stack direction="row" key={d} alignItems="center" gap={1}>
              <div
                style={{
                  backgroundColor: getColor(d),
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  border: "1px solid #000",
                }}
              />
              <Typography>{d || "unknown"}</Typography>
            </Stack>
          ))}
        </div>
      ) : null}
    </div>
  );
};

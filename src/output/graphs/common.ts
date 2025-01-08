import { MouseEvent } from "react";
import { localPoint } from "@visx/event";
import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { groupBy } from "ramda";

export const Tooltip = styled(Paper)(({ theme }) => ({
  position: "absolute",
  padding: theme.spacing(1, 1.5),
  backgroundColor: theme.palette.grey[800],
  color: theme.palette.common.white,
  borderRadius: theme.shape.borderRadius,
  fontSize: 14,
  maxWidth: 250,
  zIndex: theme.zIndex.tooltip,
}));

export const handleMouseOver =
  (
    showTooltip: (props: {
      tooltipLeft: number;
      tooltipTop: number;
      tooltipData: { label: string; value: number };
    }) => void
  ) =>
  (event: MouseEvent<SVGElement>, datum: { label: string; value: number }) => {
    const parent = document.getElementById("chart-svg");

    if (!parent) return;

    const point = localPoint(parent, event);

    const parentRect = parent.getBoundingClientRect();

    showTooltip({
      tooltipLeft: (point?.x ?? 0) - parentRect.width / 2,
      tooltipTop: (point?.y ?? 0) + 40 - parentRect.height / 2, // Small offset to not overlap with cursor
      tooltipData: datum,
    });
  };

export const handleMapMarkerClick =
  (
    showTooltip: (props: {
      tooltipLeft: number;
      tooltipTop: number;
      tooltipData: {
        label: string;
        nMarkers: number;
      };
    }) => void
  ) =>
  (e: mapboxgl.MapMouseEvent, markers: mapboxgl.GeoJSONFeature[]) => {
    const buckets = groupBy((marker) => marker.properties?.title, markers);

    showTooltip({
      tooltipLeft: e.originalEvent.offsetX,
      tooltipTop: e.originalEvent.offsetY,
      tooltipData: {
        label: `${Object.entries(buckets)
          .map(([key, value]) => `${key || "Unknown"} (${value?.length ?? 0})`)
          .join("<br/>")}`,
        nMarkers: markers.length,
      },
    });
  };

import { useAtom } from "jotai";
import { localPoint } from "@visx/event";
import Pie from "@visx/shape/lib/shapes/Pie";
import { scaleOrdinal } from "@visx/scale";
import { Group } from "@visx/group";
import { useTooltip } from "@visx/tooltip";
import { MouseEvent, useMemo } from "react";
import styled from "@emotion/styled";
import { schemePaired } from "d3-scale-chromatic";

import { useStore } from "../../store/store";
import { dataAtom } from "../../input";
import { applyFilters } from "../../util/applyFilters";

const Tooltip = styled.div`
  position: fixed;
  padding: 8px 12px;
  background: #333;
  color: white;
  border-radius: 4px;
  font-size: 14px;
  max-width: 250px;
  z-index: 1000;
`;

export const PieChart = () => {
  const [unfilteredData] = useAtom(dataAtom);
  const { filters } = useStore();
  const data = useMemo(
    () => applyFilters(unfilteredData, filters),
    [unfilteredData, filters]
  );

  const { mapping } = useStore();

  const {
    tooltipData,
    tooltipLeft,
    tooltipTop,
    tooltipOpen,
    showTooltip,
    hideTooltip,
  } = useTooltip();

  const pieData = data.map((row) => {
    return {
      label: row[mapping["label"]],
      value: row[mapping["value"]],
      color: row[mapping["color"]] ?? row[mapping["label"]],
    };
  });

  const margin = { top: 20, right: 20, bottom: 20, left: 20 };
  const width = 800;
  const height = 600;

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const radius = Math.min(innerWidth, innerHeight) / 2;

  const centerX = innerWidth / 2;
  const centerY = innerHeight / 2;

  const handleMouseOver = (
    event: MouseEvent<SVGPathElement>,
    datum: { label: string; value: number }
  ) => {
    const coords = localPoint(
      (event.target as any).ownerSVGElement as any,
      event
    );
    showTooltip({
      tooltipLeft: (coords?.x ?? 0) + 10,
      tooltipTop: (coords?.y ?? 0) + 200 - window.scrollY,
      tooltipData: datum,
    });
  };

  const getColor = scaleOrdinal({
    domain: pieData.map((d) => d.color),
    range: schemePaired as any,
    unknown: "#000",
  });

  return (
    <>
      <svg width={width} height={height}>
        <Group top={centerY + margin.top} left={centerX + margin.left}>
          <Pie
            data={pieData}
            pieValue={(d) => d.value}
            outerRadius={radius}
            innerRadius={0}
          >
            {(pie) => {
              return pie.arcs.map((arc) => (
                <path
                  key={arc.data.label}
                  d={pie.path(arc)!}
                  fill={getColor(arc.data.color)}
                  onMouseMove={(event) => handleMouseOver(event, arc.data)}
                  onMouseOut={hideTooltip}
                />
              ));
            }}
          </Pie>
        </Group>
      </svg>
      {tooltipOpen && tooltipData && (
        <Tooltip
          style={{
            transform: `translate(${tooltipLeft ?? 0}px, ${tooltipTop ?? 0}px)`,
          }}
        >
          {(tooltipData as { label: string }).label}
        </Tooltip>
      )}
    </>
  );
};

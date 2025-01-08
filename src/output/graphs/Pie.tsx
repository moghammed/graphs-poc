import { useAtom } from "jotai";
import Pie from "@visx/shape/lib/shapes/Pie";
import { scaleOrdinal } from "@visx/scale";
import { Group } from "@visx/group";
import { useTooltip } from "@visx/tooltip";
import { useMemo } from "react";
import { schemePaired } from "d3-scale-chromatic";
import { groupBy, mean, sum } from "ramda";

import { useStore } from "../../store/store";
import { dataAtom } from "../../input";
import { applyFilters } from "../../util/applyFilters";
import { handleMouseOver, Tooltip } from "./common";
import GraphTypes from "../../graphTypes.json";

const PieType = GraphTypes.find((graphType) => graphType.id === "pie")!;

export const PieChart = () => {
  const mapping = useStore((state) => state.mapping);
  const hasAllRequiredMappings = PieType.slots.every((slot) =>
    slot.required ? mapping[slot.name] !== undefined : true
  );
  return hasAllRequiredMappings ? <PieChartCmp /> : null;
};

export const PieChartCmp = () => {
  const [unfilteredData] = useAtom(dataAtom);
  const mapping = useStore((state) => state.mapping);
  const filters = useStore((state) => state.filters);
  const filteredData = useMemo(
    () => applyFilters(unfilteredData, filters),
    [unfilteredData, filters]
  );

  const pieData = useMemo(() => {
    const groups = groupBy(
      (d) => d.label,
      filteredData.map((row) => ({
        label: row[mapping["label"]?.column],
        value: parseFloat(row[mapping["value"].column]),
        color: row[mapping["color"]?.column] ?? row[mapping["label"]?.column],
      }))
    );

    console.log(filteredData);

    return Object.entries(groups).map(([label, entries]) => {
      const aggregationType = mapping["value"].aggregation;
      const aggregatedValue =
        aggregationType === "sum"
          ? sum((entries ?? []).map((d) => d.value))
          : aggregationType === "count"
          ? entries?.length ?? 0
          : mean((entries ?? []).map((d) => d.value));

      return {
        label: `${label}`,
        value: aggregatedValue.toString(),
        color: (entries?.[0]?.color ?? label).toString(),
      };
    });
  }, [filteredData, mapping]);

  const {
    tooltipData,
    tooltipLeft,
    tooltipTop,
    tooltipOpen,
    showTooltip,
    hideTooltip,
  } = useTooltip();

  const margin = { top: 20, right: 20, bottom: 20, left: 20 };
  const width = 800;
  const height = 600;

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const radius = Math.min(innerWidth, innerHeight) / 2;

  const centerX = innerWidth / 2;
  const centerY = innerHeight / 2;

  const getColor = scaleOrdinal({
    domain: pieData.map((d) => d.color),
    range: schemePaired as string[],
    unknown: "#000",
  });

  return (
    <>
      <svg
        width={width}
        height={height}
        style={{ background: "#f0f0f0" }}
        id="chart-svg"
      >
        <Group top={centerY + margin.top} left={centerX + margin.left}>
          <Pie
            data={pieData}
            pieValue={(d) => Number.parseFloat(d.value)}
            outerRadius={radius}
            innerRadius={0}
          >
            {(pie) => {
              return pie.arcs.map((arc) => (
                <path
                  key={arc.data.label}
                  d={pie.path(arc)!}
                  fill={getColor(arc.data.color)}
                  onMouseMove={(event) =>
                    handleMouseOver(showTooltip)(event, {
                      label: arc.data.label,
                      value: Number.parseFloat(arc.data.value),
                    })
                  }
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
          {(tooltipData as { label: string }).label}:{" "}
          {(tooltipData as { value: string }).value}
        </Tooltip>
      )}
    </>
  );
};

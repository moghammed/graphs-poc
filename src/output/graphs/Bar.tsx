import { useCallback, useMemo } from "react";
import { useTooltip } from "@visx/tooltip";

import { scaleOrdinal } from "@visx/scale";
import { schemePaired } from "d3-scale-chromatic";
import { useAtom } from "jotai";
import { scaleBand, scaleLinear } from "@visx/scale";
import { Bar } from "@visx/shape";
import { range } from "ramda";

import { RootState, useStore } from "../../store/store";
import { dataAtom } from "../../input";
import { Group } from "@visx/group";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { applyFilters } from "../../util/applyFilters";
import { handleMouseOver, Tooltip } from "./common";

import GraphTypes from "../../graphTypes.json";

const BarType = GraphTypes.find((graphType) => graphType.id === "bar")!;

export const BarChart = () => {
  const mapping = useStore((state) => state.mapping);
  const hasAllRequiredMappings = BarType.slots.every((slot) =>
    slot.required ? mapping[slot.name] !== undefined : true
  );
  return hasAllRequiredMappings ? <BarChartCmp /> : null;
};

export const BarChartCmp = () => {
  const [unfilteredData] = useAtom(dataAtom);
  const filters = useStore((state) => state.filters);

  const xAxisMapping = useStore((state) => state.mapping["xAxis"]);
  const yAxisMapping = useStore((state) => state.mapping["yAxis"]);
  const colorMapping = useStore((state) => state.mapping["color"]);
  const labelMapping = useStore((state) => state.mapping["label"]);

  const data = useMemo(
    () => applyFilters(unfilteredData, filters),
    [unfilteredData, filters]
  );

  const barData = useMemo(
    () =>
      data.map((d) => ({
        x: d[xAxisMapping],
        value: d[yAxisMapping],
        color: d[colorMapping] ?? d[xAxisMapping],
        label: d[labelMapping] ?? `${d[xAxisMapping]}: ${d[yAxisMapping]}`,
      })),
    [data, xAxisMapping, yAxisMapping, colorMapping, labelMapping]
  );

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

  const xAxisHeight = 20;
  const yAxisWidth = 40;

  const innerHeight = height - margin.top - margin.bottom - xAxisHeight;
  const innerWidth = width - margin.left - margin.right - yAxisWidth;

  const xMax = innerWidth;
  const yMax = innerHeight - margin.bottom - xAxisHeight;

  const xScale = useMemo(
    () =>
      scaleBand<string>({
        range: [0, xMax],
        round: true,
        domain: barData.map((d) => d.x),
        padding: 0.4,
      }),
    [xMax, barData]
  );
  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [yMax, 0],
        round: true,
        domain: [0, Math.max(...barData.map((d) => d.value))],
      }),
    [yMax, barData]
  );

  const getColor = scaleOrdinal({
    domain: barData.map((d) => d.color),
    range: schemePaired as any,
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
        <Group top={margin.top} left={margin.left + yAxisWidth}>
          {barData.map((d) => {
            const barWidth = xScale.bandwidth();
            const barHeight = yMax - yScale(d.value ?? 0);
            const barX = xScale(d.x);
            const barY = yMax - barHeight - 2;

            return (
              <Bar
                key={`${d.x}-${d.value}-${d.color}`}
                x={barX}
                y={barY}
                width={barWidth}
                height={barHeight}
                fill={getColor(d.color)}
                onMouseMove={(e) => handleMouseOver(showTooltip)(e, d)}
                onMouseLeave={hideTooltip}
              />
            );
          })}
        </Group>
        <Group top={margin.top} left={margin.left}>
          <AxisBottom
            scale={xScale}
            top={innerHeight - margin.bottom - xAxisHeight}
            left={yAxisWidth}
            tickValues={range(0, 12).map(
              (i) =>
                xScale.domain()[Math.ceil((i * xScale.domain().length) / 12)]
            )}
            numTicks={12}
            hideAxisLine={false}
            tickLabelProps={() => ({
              fontSize: 10,
              angle: 45,
            })}
          />
        </Group>
        <Group top={margin.top} left={margin.left}>
          <AxisLeft
            scale={yScale}
            top={0}
            left={margin.left + yAxisWidth}
            tickValues={yScale.ticks(10)}
            numTicks={10}
            tickLabelProps={() => ({
              fontSize: 10,
              textAnchor: "end",
            })}
          />
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

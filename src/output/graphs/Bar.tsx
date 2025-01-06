import { MouseEvent, useMemo } from "react";
import { localPoint } from "@visx/event";
import styled from "@emotion/styled";
import { useTooltip } from "@visx/tooltip";

import { scaleOrdinal } from "@visx/scale";
import { schemePaired } from "d3-scale-chromatic";
import { useAtom } from "jotai";
import { scaleBand, scaleLinear } from "@visx/scale";
import { Bar } from "@visx/shape";
import { range } from "ramda";

import { useStore } from "../../store/store";
import { dataAtom } from "../../input";
import { Group } from "@visx/group";
import { AxisBottom, AxisLeft } from "@visx/axis";
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

export const BarChart = () => {
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

  const margin = { top: 20, right: 20, bottom: 20, left: 20 };
  const width = 800;
  const height = 600;

  const xAxisHeight = 60;
  const yAxisWidth = 40;

  const innerHeight = height - margin.top - margin.bottom - xAxisHeight;
  const innerWidth = width - margin.left - margin.right - yAxisWidth;

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

  const barData = data.map((d) => {
    return {
      x: d[mapping["xAxis"]],
      value: d[mapping["yAxis"]],
      color: d[mapping["color"]] ?? d[mapping["xAxis"]],
      label:
        d[mapping["label"]] ?? `${d[mapping["xAxis"]]}: ${d[mapping["yAxis"]]}`,
    };
  });

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
      <svg width={width} height={height} style={{ background: "#f0f0f0" }}>
        <Group top={margin.top} left={margin.left + yAxisWidth}>
          {barData.map((d) => {
            const barWidth = xScale.bandwidth();
            const barHeight = yMax - yScale(d.value ?? 0);
            const barX = xScale(d.x);
            const barY = yMax - barHeight - 2;

            // console.log({ xMax, yMax, barWidth, barHeight, barX, barY });

            return (
              <Bar
                x={barX}
                y={barY}
                width={barWidth}
                height={barHeight}
                fill={getColor(d.color)}
                onMouseMove={(e) => handleMouseOver(e, d)}
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

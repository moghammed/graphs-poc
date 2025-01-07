import { useMemo } from "react";
import { useTooltip } from "@visx/tooltip";
import { scaleOrdinal, scaleLinear } from "@visx/scale";
import { schemePaired } from "d3-scale-chromatic";
import { useAtom } from "jotai";
import { Circle } from "@visx/shape";
import { Group } from "@visx/group";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { groupBy, mean, sum } from "ramda";

import { useStore } from "../../store/store";
import { dataAtom } from "../../input";
import { applyFilters } from "../../util/applyFilters";
import { handleMouseOver, Tooltip } from "./common";
import GraphTypes from "../../graphTypes.json";

const BubbleType = GraphTypes.find((graphType) => graphType.id === "bubble")!;

export const BubbleChart = () => {
  const mapping = useStore((state) => state.mapping);
  const hasAllRequiredMappings = BubbleType.slots.every((slot) =>
    slot.required ? mapping[slot.name] !== undefined : true
  );
  return hasAllRequiredMappings ? <BubbleChartCmp /> : null;
};

export const BubbleChartCmp = () => {
  const mapping = useStore((state) => state.mapping);
  const filters = useStore((state) => state.filters);

  const {
    tooltipData,
    tooltipLeft,
    tooltipTop,
    tooltipOpen,
    showTooltip,
    hideTooltip,
  } = useTooltip();

  const [unfilteredData] = useAtom(dataAtom);
  const filteredData = useMemo(
    () => applyFilters(unfilteredData, filters),
    [unfilteredData, filters]
  );

  const bubbleData = useMemo(() => {
    const rawData = filteredData
      .map((d) => ({
        x: parseFloat(d[mapping["xAxis"].column]),
        y: parseFloat(d[mapping["yAxis"].column]),
        size: parseFloat(d[mapping["size"]?.column] ?? "1"),
        color: d[mapping["color"]?.column] ?? d[mapping["xAxis"].column],
        label: d[mapping["label"]?.column],
      }))
      .filter((d) => !isNaN(d.x) && !isNaN(d.y) && !isNaN(d.size));

    const groups = groupBy((d) => `${d.x},${d.y}`, rawData);

    return Object.entries(groups).map(([key, entries]) => {
      const [x, y] = key.split(",").map(Number);
      const aggregationType = mapping["size"]?.aggregation ?? "sum";
      const aggregatedSize =
        aggregationType === "sum"
          ? sum((entries ?? []).map((d) => d.size))
          : mean((entries ?? []).map((d) => d.size));

      return {
        x,
        y,
        size: aggregatedSize,
        color: (entries?.[0]?.color ?? "").toString(),
        label: entries?.[0]?.label ?? `${x}, ${y} (${aggregatedSize})`,
      };
    });
  }, [filteredData, mapping]);

  const margin = { top: 20, right: 20, bottom: 20, left: 20 };
  const width = 800;
  const height = 600;

  const xAxisHeight = 20;
  const yAxisWidth = 20;

  const innerHeight = height - margin.top - margin.bottom - xAxisHeight;
  const innerWidth = width - margin.left - margin.right - yAxisWidth;

  const xMax = innerWidth;
  const yMax = innerHeight;
  const xMin = margin.left;

  const minX = Math.min(...bubbleData.map((d) => d.x));
  const maxX = Math.max(...bubbleData.map((d) => d.x));

  const xScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [xMin, xMax],
        round: true,
        domain: [minX - (maxX - minX) * 0.05, maxX + (maxX - minX) * 0.05],
      }),
    [xMin, xMax, minX, maxX]
  );

  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [yMax, 0],
        round: true,
        domain: [
          Math.min(...bubbleData.map((d) => d.y)),
          Math.max(...bubbleData.map((d) => d.y)),
        ],
      }),
    [yMax, bubbleData]
  );

  const sizeScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [4, 40],
        domain: [
          Math.min(...bubbleData.map((d) => d.size)),
          Math.max(...bubbleData.map((d) => d.size)),
        ],
      }),
    [bubbleData]
  );

  const getColor = scaleOrdinal({
    domain: bubbleData.map((d) => d.color),
    range: schemePaired as string[],
    unknown: "#000",
  });

  return (
    <>
      <svg width={width} height={height} style={{ background: "#f0f0f0" }}>
        <Group top={margin.top} left={margin.left + yAxisWidth}>
          {bubbleData.map((d, i) => {
            const cx = xScale(d.x);
            const cy = yScale(d.y);
            const r = sizeScale(d.size);

            return (
              <Circle
                key={i}
                cx={cx}
                cy={cy}
                r={r}
                fill={getColor(d.color)}
                opacity={0.7}
                onMouseMove={(e) =>
                  handleMouseOver(showTooltip)(e, {
                    label: d.label,
                    value: d.size,
                  })
                }
                onMouseLeave={hideTooltip}
              />
            );
          })}
        </Group>
        <Group top={margin.top} left={margin.left}>
          <AxisBottom
            scale={xScale}
            top={innerHeight}
            left={yAxisWidth}
            numTicks={10}
            tickLabelProps={() => ({
              fontSize: 10,
              textAnchor: "middle",
            })}
          />
        </Group>
        <Group top={margin.top} left={margin.left}>
          <AxisLeft
            scale={yScale}
            top={0}
            left={margin.left + yAxisWidth}
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

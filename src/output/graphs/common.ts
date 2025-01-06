import { MouseEvent } from "react";
import { localPoint } from "@visx/event";
import styled from "@emotion/styled";

export const Tooltip = styled.div`
  position: absolute;
  padding: 8px 12px;
  background: #333;
  color: white;
  border-radius: 4px;
  font-size: 14px;
  max-width: 250px;
  z-index: 1000;
`;

export const handleMouseOver =
  (showTooltip: (props: any) => void) =>
  (event: MouseEvent<SVGElement>, datum: { label: string; value: number }) => {
    const point = localPoint(
      (event.target as any).ownerSVGElement as any,
      event
    );

    const parent = document.getElementById("chart-svg")!;

    const parentRect = parent.getBoundingClientRect();
    showTooltip({
      tooltipLeft:
        (point?.x ?? 0) -
          (event.target as any).ownerSVGElement.getBoundingClientRect().width /
            2 ?? 0,
      tooltipTop:
        (point?.y ?? 0) +
          20 +
          parentRect?.top -
          parentRect?.height +
          window.scrollY ?? 0,
      tooltipData: datum,
    });
  };

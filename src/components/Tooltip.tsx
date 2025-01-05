import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styled from "@emotion/styled";

const TooltipContent = styled.div`
  position: fixed;
  padding: 8px 12px;
  background: #333;
  color: white;
  border-radius: 4px;
  font-size: 14px;
  max-width: 250px;
  z-index: 1000;

  // Add a small arrow
  &::before {
    content: "";
    position: absolute;
    top: -4px;
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
    width: 8px;
    height: 8px;
    background: #333;
  }
`;

type TooltipProps = {
  anchorEl?: HTMLElement | null;
  transform?: string;
  children?: React.ReactNode;
};

export const Tooltip = ({ anchorEl, transform, children }: TooltipProps) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (anchorEl) {
      const rect = anchorEl.getBoundingClientRect();
      setPosition({
        top: rect.bottom + 8, // 8px below the element
        left: rect.left + rect.width / 2, // Centered horizontally
      });
    }
  }, [anchorEl]);

  if (!anchorEl) return null;

  return createPortal(
    <TooltipContent
      style={{
        top: position.top,
        left: position.left,
        transform: anchorEl ? "translateX(-50%)" : transform,
      }}
    >
      {children}
    </TooltipContent>,
    document.body
  );
};

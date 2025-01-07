import { useEffect, useState } from "react";
import { Popper, Paper, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const TooltipContent = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1, 1.5),
  backgroundColor: theme.palette.grey[800],
  color: theme.palette.common.white,
  fontSize: 14,
  maxWidth: 250,
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    top: -4,
    left: "50%",
    transform: "translateX(-50%) rotate(45deg)",
    width: 8,
    height: 8,
    backgroundColor: theme.palette.grey[800],
  },
}));

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
        top: rect.bottom + 8,
        left: rect.left + rect.width / 2,
      });
    }
  }, [anchorEl]);

  return (
    <Popper
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      placement="bottom"
      modifiers={[
        {
          name: "offset",
          options: {
            offset: [0, 8],
          },
        },
      ]}
    >
      <TooltipContent elevation={2}>
        <Box sx={{ position: "relative" }}>{children}</Box>
      </TooltipContent>
    </Popper>
  );
};

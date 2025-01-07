import { Box, Card, CardContent, Popover, Typography } from "@mui/material";
import { AggregationConfiguration } from "./settings/AggregationConfiguration";
import { Slot } from "../GraphTypePicker/GraphTypePicker";

export type SettingsProps = {
  anchorEl: HTMLElement | null;
  close: () => void;
  slot: Slot;
};

export const Settings = ({ slot, anchorEl, close }: SettingsProps) => {
  return (
    <Popover
      anchorEl={anchorEl}
      open={!!anchorEl}
      onClose={close}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
    >
      <Card>
        <CardContent>
          <Typography variant="h6">Settings</Typography>
          <Box>
            <AggregationConfiguration slot={slot} />
          </Box>
        </CardContent>
      </Card>
    </Popover>
  );
};

import { Box, MenuItem, Select, Stack, Typography } from "@mui/material";
import { AggregationType, useStore } from "../../../store/store";
import { Slot } from "../../GraphTypePicker/GraphTypePicker";

export const AggregationConfiguration = ({ slot }: { slot: Slot }) => {
  const updateMapping = useStore((state) => state.updateMapping);
  const mapping = useStore((state) => state.mapping[slot.id]);

  return (
    <Box>
      <Box>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="body2">Aggregation Type</Typography>
          <Select
            value={mapping?.aggregation}
            onChange={(e) =>
              updateMapping(slot.id, {
                ...mapping,
                aggregation: e.target.value as AggregationType,
              })
            }
            size="small"
          >
            <MenuItem value="sum">Sum</MenuItem>
            <MenuItem value="average">Average</MenuItem>
          </Select>
        </Stack>
      </Box>
    </Box>
  );
};

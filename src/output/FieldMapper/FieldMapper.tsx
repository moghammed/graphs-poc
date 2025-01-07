import { Box, Paper, Typography } from "@mui/material";
import { GraphType } from "../GraphTypePicker/GraphTypePicker";
import { SlotCard } from "./SlotCard";
import { ColumnDragZone } from "../ColumnDragZone/ColumnDragZone";

export const FieldMapper = ({ graphType }: { graphType: GraphType }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        p: 1,
        borderBottom: "2px solid #fff",
        borderTop: "2px solid #fff",
        mt: 1,
        mb: 2,
      }}
    >
      <Typography>Drag columns from here:</Typography>
      <ColumnDragZone />
      <Typography sx={{ mt: 4 }}>
        And drop them here to configure how the graph relates to your data:
      </Typography>
      <Box
        sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 1 }}
      >
        {graphType.slots.map((slot) => (
          <SlotCard key={slot.name} slot={slot} />
        ))}
      </Box>
    </Box>
  );
};

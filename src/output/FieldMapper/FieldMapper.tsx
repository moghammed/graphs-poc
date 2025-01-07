import { Alert, Box, Typography } from "@mui/material";
import { GraphType } from "../GraphTypePicker/GraphTypePicker";
import { SlotCard } from "./SlotCard";
import { ColumnDragZone } from "../ColumnDragZone/ColumnDragZone";
import { useStore } from "../../store/store";

export const FieldMapper = ({ graphType }: { graphType: GraphType }) => {
  const mapping = useStore((state) => state.mapping);

  const isOnboarding =
    graphType.id === "bar" && !mapping.xAxis && !mapping.yAxis;
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
      {isOnboarding && (
        <Alert severity="info" sx={{ mt: 2 }}>
          If you're not sure what to do, we recommend dragging the "Country"
          column to the "X Axis" slot, and the "Medals" column to the "Y Axis"
          slot.
        </Alert>
      )}
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

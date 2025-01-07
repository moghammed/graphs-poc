import { Box, Typography } from "@mui/material";
import { GraphButton } from "./GraphButton";
import graphTypes from "../../graphTypes.json";

export type GraphType = (typeof graphTypes)[number];
export type Slot = GraphType["slots"][number];

export const GraphTypePicker = () => {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Choose a graph type:
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 1.5,
          justifyContent: "center",
        }}
      >
        {graphTypes.map((graphType) => (
          <GraphButton key={graphType.name} graphType={graphType} />
        ))}
      </Box>
    </Box>
  );
};

import { Box, Typography } from "@mui/material";
import { GraphButton } from "./GraphButton";
import graphTypes from "../../graphTypes.json";
import { ColumnConfigAtom } from "../../input/ColumnConfig";
import { useAtomValue } from "jotai";
import { GraphTypeAtom } from "..";

export type GraphType = (typeof graphTypes)[number];
export type Slot = GraphType["slots"][number];

export const GraphTypePicker = () => {
  const columns = useAtomValue(ColumnConfigAtom);
  const pickedGraphType = useAtomValue(GraphTypeAtom);

  const isOnboarding = columns[0].name === "Year" && !pickedGraphType;

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Choose a graph type:
      </Typography>
      {isOnboarding ? (
        <Typography variant="body2" sx={{ mb: 1 }}>
          If you're new here, we recommend starting with a Bar Chart
        </Typography>
      ) : null}
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
          <GraphButton
            key={graphType.name}
            graphType={graphType}
            highlight={
              isOnboarding && (graphType as { id: string }).id === "bar"
            }
          />
        ))}
      </Box>
    </Box>
  );
};

import { Badge, Box, IconButton } from "@mui/material";
import { GraphType, GraphTypePicker } from "./GraphTypePicker/GraphTypePicker";
import { atom, useAtom } from "jotai";
import { FieldMapper } from "./FieldMapper/FieldMapper";
import { PieChart } from "./graphs/Pie";
import { BarChart } from "./graphs/Bar";
import { BubbleChart } from "./graphs/Bubble";
import { FilterConfigurator } from "./FilterConfigurator/FilterConfigurator";
import { FilterAlt as MdFilterAlt } from "@mui/icons-material";
import { useState } from "react";
import { useStore } from "../store/store";
import { MapChart } from "./graphs/Map";

export const GraphTypeAtom = atom<GraphType | null>(null);

export const Output = () => {
  const [graphType] = useAtom(GraphTypeAtom);
  const [showFilterConfigurator, setShowFilterConfigurator] = useState(false);

  const filters = useStore((state) => state.filters);

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", position: "relative" }}
    >
      <GraphTypePicker />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          height: "100%",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            width: "100%",
          }}
        >
          {graphType && (
            <Box
              sx={{
                position: "fixed",
                top: "50%",
                right: "10px",
                width: "64px",
              }}
            >
              <IconButton
                onClick={() =>
                  setShowFilterConfigurator(!showFilterConfigurator)
                }
              >
                <Badge
                  badgeContent={`${Object.keys(filters).length}`}
                  color="primary"
                  invisible={!Object.keys(filters).length}
                  variant="standard"
                >
                  <MdFilterAlt sx={{ fontSize: 42 }} />
                </Badge>
              </IconButton>
            </Box>
          )}
          {graphType && showFilterConfigurator && (
            <FilterConfigurator
              close={() => setShowFilterConfigurator(false)}
            />
          )}
          {graphType && <FieldMapper graphType={graphType} />}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
            }}
          >
            {graphType?.id === "pie" && <PieChart />}
            {graphType?.id === "bar" && <BarChart />}
            {graphType?.id === "bubble" && <BubbleChart />}
            {graphType?.id === "map" && <MapChart />}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

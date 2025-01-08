import { useAtom } from "jotai";
import { ColumnConfigAtom } from "../../input/ColumnConfig";
import { Box } from "@mui/material";
import { ColumnDraggable } from "./ColumnDraggable";

export const ColumnDragZone = () => {
  const [columns] = useAtom(ColumnConfigAtom);

  return (
    <Box
      sx={{
        flex: "0 0 auto",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        flexWrap: "wrap",
        width: "100%",
        gap: 1,
      }}
    >
      {columns.map((column) => (
        <ColumnDraggable key={column.name} column={column} />
      ))}
    </Box>
  );
};

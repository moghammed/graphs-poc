import { useDroppable } from "@dnd-kit/core";
import { Slot } from "../GraphTypePicker/GraphTypePicker";
import {
  Paper,
  Typography,
  Chip,
  Stack,
  IconButton,
  Theme,
} from "@mui/material";
import { useAtom, useAtomValue } from "jotai";
import { draggingColumnAtom } from "../../App";
import { Close as MdClose } from "@mui/icons-material";
import { getAllowedTypesIcons } from "./getAllowedTypesIcons";
import { getColumnTypeIcon } from "../ColumnDragZone/ColumnDraggable";
import { ColumnConfigAtom } from "../../input/ColumnConfig";
import { useStore } from "../../store/store";

export const SlotDropZone = ({ slot }: { slot: Slot }) => {
  const removeMapping = useStore((state) => state.removeMapping);
  const mapping = useStore((state) => state.mapping[slot.name]?.column);

  const columns = useAtomValue(ColumnConfigAtom);
  const column = mapping
    ? columns.find((column) => column.name === mapping)
    : null;

  const { setNodeRef } = useDroppable({
    id: slot.name,
    data: {
      allowedTypes: slot.allowedTypes,
    },
  });

  const [draggingColumn] = useAtom(draggingColumnAtom);

  const getBackgroundColor = (theme: Theme) => {
    if (!draggingColumn?.type) return theme.palette.grey[200];
    return slot.allowedTypes.includes(draggingColumn?.type)
      ? theme.palette.success.light
      : theme.palette.error.light;
  };

  return (
    <Paper
      ref={setNodeRef}
      elevation={2}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        height: 50,
        width: 250,
        bgcolor: (theme) => getBackgroundColor(theme),
      }}
    >
      {slot.required ? (
        mapping ? (
          <Stack direction="row" spacing={1} alignItems="center">
            <Chip
              label={
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <Typography variant="body2">{mapping}</Typography>
                  {column && getColumnTypeIcon(column)}
                  <IconButton
                    size="small"
                    onClick={() => {
                      console.log("removeMapping", slot.name);
                      removeMapping(slot.name);
                    }}
                    color="error"
                  >
                    <MdClose />
                  </IconButton>
                </Stack>
              }
              color="primary"
            />
          </Stack>
        ) : (
          <Stack direction="row" spacing={1} alignItems="center">
            <MdClose color="error" sx={{ fontSize: 28 }} />
            <Typography variant="body2">
              Required: {getAllowedTypesIcons(slot)}
            </Typography>
          </Stack>
        )
      ) : mapping ? (
        <Chip
          label={
            <Stack direction="row" spacing={0.5} alignItems="center">
              <Typography variant="body2">{mapping}</Typography>
              {column && getColumnTypeIcon(column)}
              <IconButton
                size="small"
                onClick={() => {
                  console.log("removeMapping", slot.name);
                  removeMapping(slot.name);
                }}
                color="error"
              >
                <MdClose />
              </IconButton>
            </Stack>
          }
          color="primary"
        />
      ) : (
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Drop Columns here:
          </Typography>
          {getAllowedTypesIcons(slot)}
        </Stack>
      )}
    </Paper>
  );
};

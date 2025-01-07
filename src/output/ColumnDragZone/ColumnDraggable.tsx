import { ColumnConfig } from "../../input/ColumnConfig";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Chip, Stack } from "@mui/material";
import {
  CalendarMonth as MdCalendarMonth,
  CheckBox as MdCheckBox,
  DragIndicator as MdDragIndicator,
  Numbers as MdNumbers,
  TextFields as MdTextFields,
} from "@mui/icons-material";

type ColumnDraggableProps = {
  column: ColumnConfig;
};

export const getColumnTypeIcon = (column: ColumnConfig) => {
  if (column.type === "string") {
    return <MdTextFields fontSize="small" />;
  }
  if (column.type === "number") {
    return <MdNumbers fontSize="small" />;
  }
  if (column.type === "date") {
    return <MdCalendarMonth fontSize="small" />;
  }
  if (column.type === "boolean") {
    return <MdCheckBox fontSize="small" />;
  }
  return <MdTextFields fontSize="small" />;
};

export const ColumnDraggable = ({ column }: ColumnDraggableProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: column.name,
    data: {
      ...column,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
  };

  return (
    <Chip
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      sx={{
        p: 0.5,
        backgroundColor: "primary.main",
        color: "primary.contrastText",
        cursor: "grab",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 1,
        "&:hover": {
          backgroundColor: "primary.dark",
        },
      }}
      label={
        <Stack direction="row" alignItems="center" gap={1}>
          <MdDragIndicator fontSize="small" />
          {column.name}
          {getColumnTypeIcon(column)}
        </Stack>
      }
      color="primary"
    />
  );
};

import { ColumnConfig } from "../../input/ColumnConfig";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import styled from "@emotion/styled";
import {
  MdCalendarMonth,
  MdCheckBox,
  MdDragIndicator,
  MdNumbers,
  MdTextFields,
} from "react-icons/md";

type ColumnDraggableProps = {
  column: ColumnConfig;
};

const ColumnDraggableContainer = styled.div`
  padding: 5px;

  background-color: #0070f3;
  color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: grab;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

export const getColumnTypeIcon = (column: ColumnConfig) => {
  if (column.type === "string") {
    return <MdTextFields />;
  }
  if (column.type === "number") {
    return <MdNumbers />;
  }
  if (column.type === "date") {
    return <MdCalendarMonth />;
  }
  if (column.type === "boolean") {
    return <MdCheckBox />;
  }
  return <MdTextFields />;
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
    <ColumnDraggableContainer
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      <MdDragIndicator size={24} />
      {column.name}
      {getColumnTypeIcon(column)}
    </ColumnDraggableContainer>
  );
};

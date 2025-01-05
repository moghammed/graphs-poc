import { useAtom } from "jotai";
import { ColumnConfigAtom } from "../../input/ColumnConfig";
import styled from "@emotion/styled";
import { ColumnDraggable } from "./ColumnDraggable";
import { DragOverlay } from "@dnd-kit/core";
import { draggingColumnAtom } from "../../App";

const ColumnDragZoneContainer = styled.div`
  flex: 0 0 auto;
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: start;
  width: 100vw;
  height: 100px;
`;

export const ColumnDragZone = () => {
  const [columns] = useAtom(ColumnConfigAtom);
  const [draggingColumn] = useAtom(draggingColumnAtom);

  return (
    <ColumnDragZoneContainer>
      {columns.map((column) => (
        <ColumnDraggable key={column.name} column={column} />
      ))}
      {/* <DragOverlay>
        {draggingColumn ? <ColumnDraggable column={draggingColumn} /> : null}
      </DragOverlay> */}
    </ColumnDragZoneContainer>
  );
};

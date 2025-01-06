import { useAtom } from "jotai";
import { ColumnConfigAtom } from "../../input/ColumnConfig";
import styled from "@emotion/styled";
import { ColumnDraggable } from "./ColumnDraggable";

const ColumnDragZoneContainer = styled.div`
  flex: 0 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  gap: 10px;
`;

export const ColumnDragZone = () => {
  const [columns] = useAtom(ColumnConfigAtom);

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

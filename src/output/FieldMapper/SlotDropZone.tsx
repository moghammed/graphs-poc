import { useDroppable } from "@dnd-kit/core";
import { Slot } from "../GraphTypePicker/GraphTypePicker";
import styled from "@emotion/styled";
import { useAtom, useAtomValue } from "jotai";
import { draggingColumnAtom } from "../../App";
import { MdCheck, MdClose } from "react-icons/md";
import { getAllowedTypesIcons } from "./SlotCard";
import { getColumnTypeIcon } from "../ColumnDragZone/ColumnDraggable";
import { ColumnConfigAtom } from "../../input/ColumnConfig";

const SlotDropZoneContainer = styled.div<{ allowed?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  height: 50px;
  width: 250px;
  background-color: ${({ allowed }) =>
    allowed === undefined ? "gray" : allowed ? "green" : "red"};
`;

const DroppedColumn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  border: 1px solid #fff;
  border-radius: 4px;
  padding: 4px;
  gap: 4px;
  background-color: #0070f3;
  color: #fff;
`;

export const SlotDropZone = ({
  slot,
  mapping,
}: {
  slot: Slot;
  mapping: string;
}) => {
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

  return (
    <SlotDropZoneContainer
      ref={setNodeRef}
      allowed={
        draggingColumn?.type
          ? slot.allowedTypes.includes(draggingColumn?.type)
          : undefined
      }
    >
      {slot.required ? (
        mapping ? (
          <>
            <MdCheck color="green" size={40} />
            <DroppedColumn>
              {mapping} {column ? getColumnTypeIcon(column) : null}
            </DroppedColumn>
          </>
        ) : (
          <>
            <MdClose color="red" size={40} />
            Required: {getAllowedTypesIcons(slot)}
          </>
        )
      ) : mapping ? (
        mapping
      ) : (
        <>Drop Columns here: {getAllowedTypesIcons(slot)}</>
      )}
    </SlotDropZoneContainer>
  );
};

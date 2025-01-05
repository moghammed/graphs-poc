import { useDroppable } from "@dnd-kit/core";
import { Slot } from "../GraphTypePicker/GraphTypePicker";
import styled from "@emotion/styled";
import { useAtom } from "jotai";
import { draggingColumnAtom } from "../../App";
import { MdCheck, MdClose } from "react-icons/md";
import { getAllowedTypesIcons } from "./SlotCard";

const SlotDropZoneContainer = styled.div<{ allowed?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  height: 50px;
  width: 150px;
  background-color: ${({ allowed }) =>
    allowed === undefined ? "gray" : allowed ? "green" : "red"};
`;

export const SlotDropZone = ({
  slot,
  mapping,
}: {
  slot: Slot;
  mapping: string;
}) => {
  const { setNodeRef } = useDroppable({
    id: slot.name,
    data: {
      allowedTypes: slot.allowedTypes,
    },
  });

  const [draggingColumn] = useAtom(draggingColumnAtom);

  console.log(draggingColumn);

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
            {mapping}
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
        getAllowedTypesIcons(slot)
      )}
    </SlotDropZoneContainer>
  );
};

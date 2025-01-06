import { Slot } from "../GraphTypePicker/GraphTypePicker";
import { useRef, useState } from "react";
import { Tooltip } from "../../components/Tooltip";

import {
  MdCalendarMonth,
  MdCheckBox,
  MdClear,
  MdNumbers,
  MdQuestionMark,
  MdTextFields,
} from "react-icons/md";
import { SlotDropZone } from "./SlotDropZone";
import { useStore } from "../../store/store";
import styled from "@emotion/styled";

export const getAllowedTypesIcons = (slot: Slot) => {
  return slot.allowedTypes
    .map((type) => {
      if (type === "string") {
        return <MdTextFields key="TextFields" />;
      }
      if (type === "number") {
        return <MdNumbers key="Numbers" />;
      }
      if (type === "date") {
        return <MdCalendarMonth key="CalendarMonth" />;
      }
      if (type === "boolean") {
        return <MdCheckBox key="CheckBox" />;
      }
      return null;
    })
    .filter(Boolean);
};

const Card = styled.div`
  border: 1px solid #000;
  border-radius: 10px;
  padding: 10px;
  width: 200px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CardHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  place-items: center;
  gap: 10px;
`;

const CardFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const CardActionButton = styled.button`
  background-color: #000;
  color: #fff;
  border: 1px solid #000;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

export const SlotCard = ({ slot }: { slot: Slot }) => {
  const { mapping, removeMapping } = useStore();
  const [showTooltip, setShowTooltip] = useState(false);
  const questionMarkRef = useRef<HTMLDivElement>(null);

  return (
    <Card className="max-w-sm">
      <CardHeader>
        {slot.name}{" "}
        <div
          ref={questionMarkRef}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <MdQuestionMark
            style={{
              cursor: "pointer",
            }}
          />
        </div>
      </CardHeader>
      <CardBody>
        <SlotDropZone slot={slot} mapping={mapping[slot.name]} />
      </CardBody>
      <CardFooter>
        <CardActionButton
          onClick={() => {
            removeMapping(slot.name);
          }}
        >
          <MdClear /> Clear
        </CardActionButton>
      </CardFooter>
      {showTooltip && (
        <Tooltip anchorEl={questionMarkRef.current}>{slot.description}</Tooltip>
      )}
    </Card>
  );
};

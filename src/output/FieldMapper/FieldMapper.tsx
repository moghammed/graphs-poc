import styled from "@emotion/styled";
import { GraphType } from "../GraphTypePicker/GraphTypePicker";
import { SlotCard } from "./SlotCard";
import { ColumnDragZone } from "../ColumnDragZone/ColumnDragZone";

const FieldMapperContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-content: start;
  gap: 10px;
  padding: 10px;
  border-bottom: 2px solid #fff;
  border-top: 2px solid #fff;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const SlotCardsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
`;

export const FieldMapper = ({ graphType }: { graphType: GraphType }) => {
  return (
    <FieldMapperContainer>
      Drag columns from here:
      <ColumnDragZone />
      And drop them here to map them to the graph type:
      <SlotCardsContainer>
        {graphType.slots.map((slot) => (
          <SlotCard key={slot.name} slot={slot} />
        ))}
      </SlotCardsContainer>
    </FieldMapperContainer>
  );
};

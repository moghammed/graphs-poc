import styled from "@emotion/styled";
import { GraphType } from "../GraphTypePicker/GraphTypePicker";
import { SlotCard } from "./SlotCard";

const FieldMapperContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
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
      <h2>FieldMapper: {graphType.name}</h2>
      <SlotCardsContainer>
        {graphType.slots.map((slot) => (
          <SlotCard key={slot.name} slot={slot} />
        ))}
      </SlotCardsContainer>
    </FieldMapperContainer>
  );
};

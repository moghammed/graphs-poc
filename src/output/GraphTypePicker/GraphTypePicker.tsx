import styled from "@emotion/styled";
import { GraphButton } from "./GraphButton";
import graphTypes from "../../graphTypes.json";

export type GraphType = (typeof graphTypes)[number];
export type Slot = GraphType["slots"][number];

const GraphTypePickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 150px;
`;

export const GraphTypePicker = () => {
  return (
    <GraphTypePickerContainer>
      {graphTypes.map((graphType) => (
        <GraphButton key={graphType.name} graphType={graphType} />
      ))}
    </GraphTypePickerContainer>
  );
};

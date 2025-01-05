import styled from "@emotion/styled";
import { ColumnDragZone } from "./ColumnDragZone/ColumnDragZone";
import { GraphType, GraphTypePicker } from "./GraphTypePicker/GraphTypePicker";
import { atom, useAtom } from "jotai";
import { FieldMapper } from "./FieldMapper/FieldMapper";
import { PieChart } from "./graphs/Pie";

const OutputContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`;

const HorizontalFlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
`;

const VerticalFlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

export const GraphTypeAtom = atom<GraphType | null>(null);

export const Output = () => {
  const [graphType] = useAtom(GraphTypeAtom);

  console.log({ graphType });

  return (
    <OutputContainer>
      <ColumnDragZone />
      <HorizontalFlexContainer>
        <GraphTypePicker />
        <VerticalFlexContainer>
          {graphType && <FieldMapper graphType={graphType} />}
          {graphType?.id === "pie" && <PieChart />}
        </VerticalFlexContainer>
      </HorizontalFlexContainer>
    </OutputContainer>
  );
};

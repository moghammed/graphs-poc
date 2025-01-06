import styled from "@emotion/styled";
import { GraphType, GraphTypePicker } from "./GraphTypePicker/GraphTypePicker";
import { atom, useAtom } from "jotai";
import { FieldMapper } from "./FieldMapper/FieldMapper";
import { PieChart } from "./graphs/Pie";
import { BarChart } from "./graphs/Bar";
import { BubbleChart } from "./graphs/Bubble";
import { FilterConfigurator } from "./FilterConfigurator/FilterConfigurator";
import { MdFilterAlt } from "react-icons/md";
import { useState } from "react";

const OutputContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
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

const FloatingButtonContainer = styled.div`
  position: fixed;
  top: 50%;
  right: 10px;
  width: 64px;
`;

const FilterButton = styled.button`
  background-color: white;
  color: #000;
  border: 1px solid #000;
  padding: 5px;
  border-radius: 50%;
  width: 64px;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GraphContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const GraphTypeAtom = atom<GraphType | null>(null);

export const Output = () => {
  const [graphType] = useAtom(GraphTypeAtom);
  const [showFilterConfigurator, setShowFilterConfigurator] = useState(false);

  console.log({ graphType });

  return (
    <OutputContainer>
      <GraphTypePicker />
      <HorizontalFlexContainer>
        <VerticalFlexContainer>
          {graphType && (
            <FloatingButtonContainer>
              <FilterButton
                onClick={() =>
                  setShowFilterConfigurator(!showFilterConfigurator)
                }
              >
                <MdFilterAlt size={42} />
              </FilterButton>
            </FloatingButtonContainer>
          )}
          {graphType && showFilterConfigurator && (
            <FilterConfigurator
              close={() => setShowFilterConfigurator(false)}
            />
          )}
          {graphType && <FieldMapper graphType={graphType} />}
          <GraphContainer>
            {graphType?.id === "pie" && <PieChart />}
            {graphType?.id === "bar" && <BarChart />}
            {graphType?.id === "bubble" && <BubbleChart />}
          </GraphContainer>
        </VerticalFlexContainer>
      </HorizontalFlexContainer>
    </OutputContainer>
  );
};

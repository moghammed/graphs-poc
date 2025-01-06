import styled from "@emotion/styled";
import { GraphType } from "./GraphTypePicker";
import { useAtom } from "jotai";
import { GraphTypeAtom } from "..";

const GraphButtonCmp = styled.button`
  color: #000;
  background-color: #bbb;
  border: 1px solid #000;
  padding: 5px;
  border-radius: 5px;
`;

export const GraphButton = ({ graphType }: { graphType: GraphType }) => {
  const [, setGraphType] = useAtom(GraphTypeAtom);

  const handleClick = () => {
    setGraphType(graphType);
  };

  return (
    <GraphButtonCmp onClick={handleClick}>{graphType.name}</GraphButtonCmp>
  );
};

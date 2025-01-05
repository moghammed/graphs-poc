import styled from "@emotion/styled";
import { GraphType } from "./GraphTypePicker";
import { useAtom } from "jotai";
import { GraphTypeAtom } from "..";

const GraphButtonCmp = styled.button`
  background-color: #000;
  color: #fff;
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

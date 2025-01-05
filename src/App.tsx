import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./compiled.css";
import { dataAtom, Input, metaAtom } from "./input";
import { Output } from "./output";
import styled from "@emotion/styled";
import { MdArrowForward, MdArrowBack } from "react-icons/md";
import { atom, useAtom } from "jotai";
import { ColumnConfig, ColumnConfigAtom } from "./input/ColumnConfig";
import { DndContext, DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { useStore } from "./store/store";

enum Step {
  Input = 0,
  Output = 1,
}

const StepButton = styled.div`
  position: fixed;
  height: 50px;
  width: 50px;
  top: calc(50vh - 25px);
  background-color: #000;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const NextStepButton = styled(StepButton)`
  right: 25px;
`;

const PrevStepButton = styled(StepButton)`
  left: 25px;
`;

export const draggingColumnAtom = atom<ColumnConfig | null>(null);

function App() {
  const [step, setStep] = useState<Step>(Step.Input);
  const [data] = useAtom(dataAtom);
  const [columns] = useAtom(ColumnConfigAtom);
  const [draggingColumn, setDraggingColumn] = useAtom(draggingColumnAtom);
  const { addMapping, removeMapping } = useStore();

  const handleDragStart = (event: DragStartEvent) => {
    setDraggingColumn(event.active.data.current as ColumnConfig);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setDraggingColumn(null);

    if (
      event.over?.data.current?.allowedTypes.includes(
        event.active.data.current?.type as string
      )
    ) {
      addMapping(
        event.over?.id as string,
        event.active.data.current?.name as string
      );
    }
  };

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <>
        {step === Step.Input && <Input />}
        {step === Step.Output && <Output />}
        {step === Step.Input && data.length > 0 && columns ? (
          <NextStepButton
            onClick={() =>
              setStep(step === Step.Input ? Step.Output : Step.Input)
            }
          >
            <MdArrowForward />
          </NextStepButton>
        ) : null}
        {step === Step.Output ? (
          <PrevStepButton
            onClick={() =>
              setStep(step === Step.Output ? Step.Input : Step.Output)
            }
          >
            <MdArrowBack />
          </PrevStepButton>
        ) : null}
      </>
    </DndContext>
  );
}

export default App;

import { useState } from "react";
import "./compiled.css";
import { Input } from "./input";
import { Output } from "./output";
import { atom, useAtom } from "jotai";
import { ColumnConfig } from "./input/ColumnConfig";
import { DndContext, DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { useStore } from "./store/store";

enum Step {
  Input = 0,
  Output = 1,
}

export const draggingColumnAtom = atom<ColumnConfig | null>(null);

function App() {
  const [step, setStep] = useState<Step>(Step.Input);
  const [, setDraggingColumn] = useAtom(draggingColumnAtom);
  const { addMapping } = useStore();

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
        {step === Step.Input && <Input next={() => setStep(Step.Output)} />}
        {step === Step.Output && <Output />}
      </>
    </DndContext>
  );
}

export default App;

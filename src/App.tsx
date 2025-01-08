import { useState } from "react";
import "./App.css";
import { Input } from "./input";
import { Output } from "./output";
import { atom, useSetAtom } from "jotai";
import { ColumnConfig } from "./input/ColumnConfig";
import { DndContext, DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { Mapping, useStore } from "./store/store";
import { ThemeProvider, createTheme, CssBaseline, Box } from "@mui/material";

enum Step {
  Input = 0,
  Output = 1,
}

export const draggingColumnAtom = atom<ColumnConfig | null>(null);

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0070f3",
      dark: "#0051cc",
    },
    background: {
      default: "#ffffff",
      paper: "#f5f5f5",
    },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
});

function App() {
  const [step, setStep] = useState<Step>(Step.Input);
  const setDraggingColumn = useSetAtom(draggingColumnAtom);
  const addMapping = useStore((state) => state.addMapping);

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
        {
          column: event.active.data.current?.name as string,
          aggregation: "sum",
          multi: event.active.data.current?.multi ?? false,
        } as Mapping
      );
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          p: 3,
          minHeight: "100vh",
          maxWidth: 1200,
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          {step === Step.Input && <Input next={() => setStep(Step.Output)} />}
          {step === Step.Output && <Output />}
        </DndContext>
      </Box>
    </ThemeProvider>
  );
}

export default App;

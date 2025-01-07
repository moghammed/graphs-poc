import { useAtom } from "jotai";
import { ColumnConfig, ColumnConfigAtom } from "../../input/ColumnConfig";
import { useStore } from "../../store/store";
import { FilterCard } from "./FilterCard";
import {
  Box,
  Button,
  IconButton,
  Modal,
  Paper,
  Typography,
} from "@mui/material";
import { Add as MdAdd, Close as MdClose } from "@mui/icons-material";
import { v4 as uuidv4 } from "uuid";

export const getDefaultValue = (column: ColumnConfig) => {
  if (column.type === "boolean") {
    return false;
  }
  if (column.type === "date") {
    return new Date().toISOString().split("T")[0];
  }
  if (column.type === "number") {
    return 0;
  }
  if (column.type === "string") {
    return "";
  }
  return "";
};

export const FilterConfigurator = ({ close }: { close: () => void }) => {
  const filters = useStore((state) => state.filters);
  const addFilter = useStore((state) => state.addFilter);
  const [columns] = useAtom(ColumnConfigAtom);

  return (
    <Modal
      open={true}
      onClose={close}
      aria-labelledby="filter-configurator-modal"
      aria-describedby="configure-data-filters"
    >
      <Paper
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "50%",
          height: "50%",
          bgcolor: "background.paper",
          borderRadius: 1,
          boxShadow: 3,
          outline: "none",
        }}
        elevation={3}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            bgcolor: "primary.main",
            color: "primary.contrastText",
            p: 1,
            borderRadius: "8px 8px 0 0",
          }}
        >
          <Typography variant="h6">Filters</Typography>
          <IconButton onClick={close} sx={{ color: "inherit" }}>
            <MdClose />
          </IconButton>
        </Box>
        <Box sx={{ p: 2, height: "calc(100% - 56px)", overflow: "auto" }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {Object.entries(filters).map(([key, filter]) => (
              <FilterCard key={key} filter={filter} />
            ))}
          </Box>
          <Button
            variant="contained"
            startIcon={<MdAdd />}
            onClick={() =>
              addFilter({
                id: uuidv4(),
                column: columns[0],
                operator: "equals",
                value: getDefaultValue(columns[0]),
              })
            }
            sx={{ mt: 2 }}
          >
            Add a new filter
          </Button>
        </Box>
      </Paper>
    </Modal>
  );
};

import { useAtomValue } from "jotai";
import { ColumnConfigAtom } from "../../input/ColumnConfig";
import { Filter, FilterOperator, useStore } from "../../store/store";
import {
  Box,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { getOperators } from "../../util/operators";
import { useMemo } from "react";
import { dataAtom } from "../../input";
import { uniq } from "ramda";
import { getInput } from "../../util/inputs";
import { Delete as MdDelete } from "@mui/icons-material";
import { getDefaultValue } from "./FilterConfigurator";

export const FilterCard = ({ filter }: { filter: Filter }) => {
  const columnType = filter.column.type;
  const data = useAtomValue(dataAtom);
  const availableOperators = getOperators(columnType);
  const columns = useAtomValue(ColumnConfigAtom);
  const updateFilter = useStore((state) => state.updateFilter);
  const removeFilter = useStore((state) => state.removeFilter);

  const uniqueValues = useMemo(() => {
    return uniq(data.map((d) => d[filter.column.name]));
  }, [data, filter.column.name]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        minWidth: "200px",
        borderBottom: "1px solid",
        borderColor: "divider",
        p: 1,
        gap: 1,
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "grey.800" : "grey.100",
        "&:nth-of-type(odd)": {
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "grey.900" : "grey.50",
        },
      }}
    >
      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel>Column</InputLabel>
        <Select
          value={filter.column.name}
          label="Column"
          onChange={(e) =>
            updateFilter(filter.id, {
              ...filter,
              column: columns.find((c) => c.name === e.target.value)!,
              value: getDefaultValue(
                columns.find((c) => c.name === e.target.value)!
              ),
            })
          }
        >
          {columns.map((column) => (
            <MenuItem key={column.name} value={column.name}>
              {column.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel>Operator</InputLabel>
        <Select
          value={filter.operator}
          label="Operator"
          onChange={(e) =>
            updateFilter(filter.id, {
              ...filter,
              operator: e.target.value as FilterOperator,
            })
          }
        >
          {availableOperators.map((operator) => (
            <MenuItem key={operator.value} value={operator.value}>
              {operator.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {getInput(filter, (value) =>
        updateFilter(filter.id, { ...filter, value })
      )(uniqueValues)}

      <IconButton
        size="small"
        onClick={() => removeFilter(filter.id)}
        color="error"
        sx={{ ml: "auto" }}
      >
        <MdDelete />
      </IconButton>
    </Box>
  );
};

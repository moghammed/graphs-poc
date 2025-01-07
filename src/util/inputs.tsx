import { Filter } from "../store/store";
import {
  FormControl,
  Select,
  MenuItem,
  TextField,
  Checkbox,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const getNumberInput = (filter: Filter, onChange: (value: number) => void) => {
  if (filter.operator === "equals") {
    return (options: string[]) => (
      <FormControl size="small" sx={{ minWidth: 120 }}>
        <Select
          value={filter.value.toString()}
          onChange={(e) => onChange(Number.parseFloat(e.target.value))}
          displayEmpty
        >
          <MenuItem value="">
            <em>Select</em>
          </MenuItem>
          {options.sort().map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  } else {
    return () => (
      <TextField
        type="number"
        size="small"
        value={filter.value.toString()}
        onChange={(e) => onChange(Number.parseFloat(e.target.value))}
        sx={{ minWidth: 120 }}
      />
    );
  }
};

const getStringInput = (filter: Filter, onChange: (value: string) => void) => {
  if (filter.operator === "equals") {
    return (options: string[]) => (
      <FormControl size="small" sx={{ minWidth: 120 }}>
        <Select
          value={filter.value.toString()}
          onChange={(e) => onChange(e.target.value)}
          displayEmpty
        >
          {options.sort().map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  } else {
    return () => (
      <TextField
        size="small"
        value={filter.value.toString()}
        onChange={(e) => onChange(e.target.value)}
        sx={{ minWidth: 120 }}
      />
    );
  }
};

const getBooleanInput = (
  filter: Filter,
  onChange: (value: boolean) => void
) => {
  return () => (
    <FormControl size="small">
      <Checkbox
        checked={filter.value === true}
        onChange={(e) => onChange(e.target.checked)}
        sx={{ p: 0.5 }}
      />
    </FormControl>
  );
};

const getDateInput = (filter: Filter, onChange: (value: string) => void) => {
  return () => (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        value={
          new Date(
            typeof filter.value !== "boolean" ? filter.value : Date.now()
          )
        }
        onChange={(date) =>
          onChange(date ? date.toISOString() : new Date().toISOString())
        }
        slotProps={{
          textField: {
            size: "small",
            sx: { minWidth: 120 },
          },
        }}
      />
    </LocalizationProvider>
  );
};

export const getInput = (
  filter: Filter,
  onChange: (value: string | number | boolean | Date) => void
) => {
  switch (filter.column.type) {
    case "number":
      return getNumberInput(filter, onChange);
    case "string":
      return getStringInput(filter, onChange);
    case "boolean":
      return getBooleanInput(filter, onChange);
    case "date":
      return getDateInput(filter, onChange);
    default:
      return () => <span>No input for {filter.column.type}</span>;
  }
};

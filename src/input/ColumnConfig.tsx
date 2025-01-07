import { atom, useAtom } from "jotai";
import {
  Box,
  Typography,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

export type ColumnType = "string" | "number" | "date" | "boolean";

export type ColumnConfig = {
  name: string;
  type: ColumnType;
};

export const ColumnConfigAtom = atom<ColumnConfig[]>([]);

const inferType = (value: any): ColumnType => {
  if (value === undefined || value === null || value === "") return "string";
  if (!isNaN(value)) return "number";
  if (!isNaN(Date.parse(value))) return "date";
  if (value === "true" || value === "false") return "boolean";
  return "string";
};

export const ColumnConfig = ({
  data,
  meta,
}: {
  data: any[];
  meta: { fields: string[] };
}) => {
  const [columns, setColumns] = useAtom(ColumnConfigAtom);

  if (columns.length === 0 && meta?.fields) {
    const inferredColumns = meta.fields.map((field) => {
      const values = data.map((row) => row[field]);
      const nonEmptyValues = values.filter(
        (value) => value !== undefined && value !== null && value !== ""
      );
      const firstValue = nonEmptyValues[0];
      return {
        name: field,
        type: inferType(firstValue),
      };
    });
    setColumns(inferredColumns);
  }

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Configure your columns
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        We've automatically detected the type of each column. You can change
        these if needed.
      </Typography>
      <Box
        sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 2 }}
      >
        {columns.map((column, index) => (
          <Paper key={column.name} elevation={1} sx={{ p: 2, minWidth: 250 }}>
            <FormControl fullWidth size="small">
              <InputLabel id={`column-type-label-${index}`}>
                {column.name}
              </InputLabel>
              <Select
                labelId={`column-type-label-${index}`}
                value={column.type}
                label={`Type for ${column.name}`}
                onChange={(e) => {
                  const newColumns = [...columns];
                  newColumns[index] = {
                    ...column,
                    type: e.target.value as ColumnType,
                  };
                  setColumns(newColumns);
                }}
              >
                <MenuItem value="string">Text</MenuItem>
                <MenuItem value="number">Number</MenuItem>
                <MenuItem value="date">Date</MenuItem>
                <MenuItem value="boolean">Boolean</MenuItem>
              </Select>
            </FormControl>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

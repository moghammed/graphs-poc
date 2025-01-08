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
import { guessColumnTypes } from "./guessColumnTypes";

export type ColumnType =
  | "string"
  | "number"
  | "date"
  | "boolean"
  | "geocoordinates";

export type ColumnConfig = {
  name: string;
  type: ColumnType;
};

export const ColumnConfigAtom = atom<ColumnConfig[]>([]);

export const ColumnConfig = ({
  data,
  meta,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>[];
  meta: { fields: string[] };
}) => {
  const [columns, setColumns] = useAtom(ColumnConfigAtom);

  if (columns.length === 0 && meta?.fields) {
    const inferredColumns = guessColumnTypes(data, meta.fields);
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
          <Paper key={column.name} elevation={1} sx={{ p: 2, minWidth: 200 }}>
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
                <MenuItem value="geocoordinates">Geocoordinates</MenuItem>
              </Select>
            </FormControl>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

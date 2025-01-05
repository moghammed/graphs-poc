import { ColumnConfig } from "./ColumnConfig";

export const guessColumnTypes = (
  data: any[],
  fields: string[]
): ColumnConfig[] => {
  // Return empty array if no data
  if (!data.length) return [];

  return fields.map((field) => {
    // Get first 100 non-null values for this field
    const sampleValues = data
      .slice(0, Math.min(100, data.length))
      .map((row) => row[field])
      .filter((val) => val !== null && val !== undefined && val !== "");

    if (!sampleValues.length) {
      return { name: field, type: "string" };
    }

    // Regex patterns
    const patterns = {
      number: /^-?\d*\.?\d+$/,
      date: /^\d{4}[-/.]\d{1,2}[-/.]\d{1,2}$|^\d{1,2}[-/.]\d{1,2}[-/.]\d{4}$/,
      boolean: /^(true|false|1|0)$/i,
    };

    // Check if all non-empty values match the patterns
    const matchesPattern = (pattern: RegExp) =>
      sampleValues.every((val) => pattern.test(String(val).trim()));

    // Determine type based on patterns
    if (matchesPattern(patterns.boolean))
      return { name: field, type: "boolean" };
    if (matchesPattern(patterns.number)) return { name: field, type: "number" };
    if (matchesPattern(patterns.date)) return { name: field, type: "date" };

    return { name: field, type: "string" };
  });
};

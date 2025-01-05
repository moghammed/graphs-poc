import { ColumnConfig } from "../input/ColumnConfig";

export const getOperators = (columnType: ColumnConfig["type"]) => {
  switch (columnType) {
    case "boolean":
      return ["equals", "not_equals"];
    case "number":
      return [
        "equals",
        "not_equals",
        "greater_than",
        "less_than",
        "greater_than_or_equal_to",
        "less_than_or_equal_to",
      ];
    case "string":
      return ["equals", "not_equals", "contains", "does_not_contain"];
    case "date":
      return [
        "equals",
        "not_equals",
        "greater_than",
        "less_than",
        "greater_than_or_equal_to",
        "less_than_or_equal_to",
      ];
    default:
      return [];
  }
};

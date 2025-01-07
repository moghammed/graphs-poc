import { ColumnConfig } from "../input/ColumnConfig";

type OperatorConfig = {
  value: string;
  label: string;
};

const operatorConfigs: Record<string, OperatorConfig> = {
  equals: { value: "equals", label: "Equals" },
  not_equals: { value: "not_equals", label: "Not equals" },
  greater_than: { value: "greater_than", label: "Greater than" },
  less_than: { value: "less_than", label: "Less than" },
  greater_than_or_equal_to: {
    value: "greater_than_or_equal_to",
    label: "Greater than or equal to",
  },
  less_than_or_equal_to: {
    value: "less_than_or_equal_to",
    label: "Less than or equal to",
  },
  contains: { value: "contains", label: "Contains" },
  does_not_contain: { value: "does_not_contain", label: "Does not contain" },
};

export const getOperators = (
  columnType: ColumnConfig["type"]
): OperatorConfig[] => {
  const operatorValues = (() => {
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
  })();

  return operatorValues.map((value) => operatorConfigs[value]);
};

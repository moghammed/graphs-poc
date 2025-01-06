import { Filter } from "../store/store";

const getNumberInput = (filter: Filter, onChange: (value: number) => void) => {
  if (filter.operator === "equals") {
    return (options: string[]) => (
      <select
        value={filter.value.toString()}
        onChange={(e) => onChange(Number.parseFloat(e.target.value))}
      >
        <option value="">Select</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  } else {
    return () => (
      <input
        type="number"
        value={filter.value.toString()}
        onChange={(e) => onChange(Number.parseFloat(e.target.value))}
      />
    );
  }
};

const getStringInput = (filter: Filter, onChange: (value: string) => void) => {
  if (filter.operator === "equals") {
    return (options: string[]) => (
      <select
        value={filter.value.toString()}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }
  {
    return () => (
      <input
        type="text"
        value={filter.value.toString()}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }
};

const getBooleanInput = (
  filter: Filter,
  onChange: (value: boolean) => void
) => {
  return () => (
    <input
      type="checkbox"
      checked={filter.value === true}
      onClick={(e) => onChange((e.target as HTMLInputElement).checked)}
    />
  );
};

const getDateInput = (filter: Filter, onChange: (value: string) => void) => {
  return () => (
    <input
      type="date"
      value={
        new Date(typeof filter.value !== "boolean" ? filter.value : Date.now())
          .toISOString()
          .split("T")[0]
      }
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export const getInput = (filter: Filter, onChange: (value: any) => void) => {
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

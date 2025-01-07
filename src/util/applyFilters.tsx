import { Filter } from "../store/store";

const getNumberFilterFunction = (filter: Filter) => {
  const getValue = (d: typeof filter.value) =>
    typeof d === "string" ? parseFloat(d) : d;

  const filterValue = getValue(filter.value);

  switch (filter.operator) {
    case "equals":
      return (d: Record<string, string>) =>
        getValue(d[filter.column.name]) == filterValue;
    case "not_equals":
      return (d: Record<string, string>) =>
        getValue(d[filter.column.name]) != filterValue;
    case "greater_than":
      return (d: Record<string, string>) =>
        getValue(d[filter.column.name]) > filterValue;
    case "less_than":
      return (d: Record<string, string>) =>
        getValue(d[filter.column.name]) < filterValue;
    case "greater_than_or_equal_to":
      return (d: Record<string, string>) =>
        getValue(d[filter.column.name]) >= filterValue;
    case "less_than_or_equal_to":
      return (d: Record<string, string>) =>
        getValue(d[filter.column.name]) <= filterValue;
    default:
      return () => true;
  }
};

const getStringFilterFunction = (filter: Filter) => {
  switch (filter.operator) {
    case "equals":
      return (d: Record<string, string>) =>
        d[filter.column.name] == filter.value;
    case "not_equals":
      return (d: Record<string, string>) =>
        d[filter.column.name] != filter.value;
    case "contains":
      return (d: Record<string, string>) =>
        d[filter.column.name].includes(filter.value as string);

    default:
      return () => true;
  }
};

const getBooleanFilterFunction = (filter: Filter) => {
  switch (filter.operator) {
    case "equals":
      return (d: Record<string, string>) =>
        d[filter.column.name] == filter.value;
    case "not_equals":
      return (d: Record<string, string>) =>
        d[filter.column.name] != filter.value;
    default:
      return () => true;
  }
};

const getDateFilterFunction = (filter: Filter) => {
  switch (filter.operator) {
    case "equals":
      return (d: Record<string, string>) =>
        d[filter.column.name] == filter.value;
    case "not_equals":
      return (d: Record<string, string>) =>
        d[filter.column.name] != filter.value;
    case "is_before":
      return (d: Record<string, string>) =>
        d[filter.column.name] < filter.value;
    case "is_after":
      return (d: Record<string, string>) =>
        d[filter.column.name] > filter.value;
    case "is_on_or_before":
      return (d: Record<string, string>) =>
        d[filter.column.name] <= filter.value;
    case "is_on_or_after":
      return (d: Record<string, string>) =>
        d[filter.column.name] >= filter.value;
    default:
      return () => true;
  }
};

const getFilterFunction = (filter: Filter) => {
  switch (filter.column.type) {
    case "number":
      return getNumberFilterFunction(filter);
    case "string":
      return getStringFilterFunction(filter);
    case "boolean":
      return getBooleanFilterFunction(filter);
    case "date":
      return getDateFilterFunction(filter);
    default:
      return () => true;
  }
};

function applyFilter(data: Record<string, string>[], filter: Filter) {
  return data.filter((d) => {
    return getFilterFunction(filter)(d as Record<string, string>);
  });
}

export function applyFilters(
  data: Record<string, string>[],
  filters: Record<string, Filter>
) {
  return Object.entries(filters).reduce((acc, [, filter]) => {
    return applyFilter(acc, filter);
  }, data);
}

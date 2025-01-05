import { Filter } from "../store/store";

const getNumberFilterFunction = (filter: Filter) => {
  const getValue = (d: string) => parseFloat(d);

  const filterValue = getValue(filter.value);

  switch (filter.operator) {
    case "equals":
      return (d: any) => getValue(d[filter.column.name]) === filterValue;
    case "not_equals":
      return (d: any) => getValue(d[filter.column.name]) !== filterValue;
    case "greater_than":
      return (d: any) => getValue(d[filter.column.name]) > filterValue;
    case "less_than":
      return (d: any) => getValue(d[filter.column.name]) < filterValue;
    case "greater_than_or_equal_to":
      return (d: any) => getValue(d[filter.column.name]) >= filterValue;
    case "less_than_or_equal_to":
      return (d: any) => getValue(d[filter.column.name]) <= filterValue;
    default:
      return () => true;
  }
};

const getStringFilterFunction = (filter: Filter) => {
  switch (filter.operator) {
    case "equals":
      return (d: any) => d[filter.column.name] === filter.value;
    case "not_equals":
      return (d: any) => d[filter.column.name] !== filter.value;
    case "contains":
      return (d: any) => d[filter.column.name].includes(filter.value);

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
    default:
      return () => true;
  }
};

function applyFilter(data: any[], filter: Filter) {
  return data.filter((d) => {
    const filterFunction = getFilterFunction(filter);
    console.log(d, filterFunction(d));
    return filterFunction(d);
  });
}

export function applyFilters(data: any[], filters: Record<string, Filter>) {
  return Object.entries(filters).reduce((acc, [key, filter]) => {
    return applyFilter(acc, filter);
  }, data);
}

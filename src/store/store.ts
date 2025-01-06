import { create } from "zustand";
import { ColumnConfig } from "../input/ColumnConfig";

export type NumberFilterOperator =
  | "equals"
  | "not_equals"
  | "greater_than"
  | "less_than"
  | "greater_than_or_equal_to"
  | "less_than_or_equal_to";

export type StringFilterOperator =
  | "equals"
  | "contains"
  | "starts_with"
  | "ends_with"
  | "is_empty"
  | "is_not_empty";

export type BooleanFilterOperator = "equals" | "not_equals";

export type DateFilterOperator =
  | "equals"
  | "not_equals"
  | "is_before"
  | "is_after"
  | "is_on_or_before"
  | "is_on_or_after"
  | "is_on_or_on"
  | "is_not_on";

export type FilterOperator =
  | NumberFilterOperator
  | StringFilterOperator
  | DateFilterOperator
  | BooleanFilterOperator;

export type Filter = {
  id: string;
  column: ColumnConfig;
  value: string | boolean | Date | number;
  operator: FilterOperator;
};

export const useStore = create<{
  mapping: Record<string, string>;
  filters: Record<string, Filter>;
  setMapping: (mapping: Record<string, string>) => void;
  addMapping: (key: string, value: string) => void;
  removeMapping: (key: string) => void;
  setFilters: (filters: Record<string, Filter>) => void;
  addFilter: (filter: Filter) => void;
  removeFilter: (id: string) => void;
  updateFilter: (id: string, filter: Filter) => void;
}>((set) => ({
  mapping: {},
  filters: {},
  setMapping: (mapping: Record<string, string>) => {
    set({ mapping });
  },
  addMapping: (key: string, value: string) => {
    set((state) => ({
      mapping: { ...state.mapping, [key]: value },
    }));
  },
  removeMapping: (key: string) => {
    set((state) => ({
      mapping: Object.fromEntries(
        Object.entries(state.mapping).filter(([k]) => k !== key)
      ),
    }));
  },
  setFilters: (filters: Record<string, Filter>) => {
    set({ filters });
  },
  addFilter: (filter: Filter) => {
    set((state) => ({
      filters: { ...state.filters, [filter.id]: filter },
    }));
  },
  removeFilter: (id: string) => {
    set((state) => ({
      filters: Object.fromEntries(
        Object.entries(state.filters).filter(([k]) => k !== id)
      ),
    }));
  },
  updateFilter: (id: string, filter: Filter) => {
    set((state) => ({
      filters: { ...state.filters, [id]: filter },
    }));
  },
}));

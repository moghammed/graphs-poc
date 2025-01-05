import { create } from "zustand";

export const useStore = create<{
  mapping: Record<string, string>;
  setMapping: (mapping: Record<string, string>) => void;
  addMapping: (key: string, value: string) => void;
  removeMapping: (key: string) => void;
}>((set) => ({
  mapping: {},
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
}));

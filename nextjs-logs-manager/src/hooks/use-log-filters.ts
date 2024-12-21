import { create } from "zustand";
import { LogFilters } from "@/src/modules/records/application/readLogs";

type Store = {
  filters: LogFilters;
  update: <K extends keyof LogFilters>(key: K, value: LogFilters[K]) => void;
};

const useFilterStore = create<Store>((set) => ({
  filters: {},
  update: (key, value) =>
    set((state) => ({
      filters: {
        ...state.filters,
        [key]: value,
      },
    })),
}));

export default useFilterStore;

import LogRecord from "@/src/modules/records/domain/LogRecord";
import { create } from "zustand";

type Store = {
  records: LogRecord[];
  page: number;
  totalPages: () => number;
  setRecords: (newRecords: LogRecord[]) => void;
  next: () => void;
  previous: () => void;
  setPage: (newPage: number) => void;
};

const useLogRecordsStore = create<Store>((set, get) => ({
  records: [],
  page: 1,
  totalPages: () => Math.ceil(get().records.length / 10),
  setRecords: (newRecords) => {
    set({
      records: newRecords,
      page: 1,
      totalPages: () => Math.ceil(newRecords.length / 10),
    });
  },
  next: () => {
    set((state) => ({
      page: Math.min(Math.max(state.page + 1, 1), get().totalPages()),
    }));
  },
  setPage: (newPage) => {
    // validate the new page number
    const totalPages = get().totalPages();
    if (newPage < 1 || newPage > totalPages) {
      return;
    }
    set({ page: newPage });
  },
  previous: () => {
    set((state) => ({
      page: Math.max(Math.min(state.page - 1, get().totalPages()), 1),
    }));
  },
}));

export default useLogRecordsStore;

"use client";

import React, { createContext, useState, useContext } from "react";

interface FilterContextType {
  filters: {
    startDate: string;
    endDate: string;
    logLevel: string;
    serviceName: string;
  };
  setFilters: React.Dispatch<
    React.SetStateAction<FilterContextType["filters"]>
  >;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    logLevel: "",
    serviceName: "",
  });

  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilters must be used within a FilterProvider");
  }
  return context;
}

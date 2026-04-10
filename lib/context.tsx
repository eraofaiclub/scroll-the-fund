"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { FilterState, defaultFilters } from "./filters";
import { RoundType } from "./types";

interface FilterContextValue {
  filters: FilterState;
  setFilters: (f: FilterState) => void;
  toggleRoundType: (rt: RoundType) => void;
  toggleSector: (s: string) => void;
  setAmountRange: (min: number | null, max: number | null) => void;
  clearFilters: () => void;
}

const FilterContext = createContext<FilterContextValue | null>(null);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  const toggleRoundType = useCallback((rt: RoundType) => {
    setFilters((prev) => ({
      ...prev,
      roundTypes: prev.roundTypes.includes(rt)
        ? prev.roundTypes.filter((t) => t !== rt)
        : [...prev.roundTypes, rt],
    }));
  }, []);

  const toggleSector = useCallback((s: string) => {
    setFilters((prev) => ({
      ...prev,
      sectors: prev.sectors.includes(s)
        ? prev.sectors.filter((x) => x !== s)
        : [...prev.sectors, s],
    }));
  }, []);

  const setAmountRange = useCallback(
    (min: number | null, max: number | null) => {
      setFilters((prev) => ({ ...prev, amountMin: min, amountMax: max }));
    },
    []
  );

  const clearFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  return (
    <FilterContext.Provider
      value={{
        filters,
        setFilters,
        toggleRoundType,
        toggleSector,
        setAmountRange,
        clearFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters() {
  const ctx = useContext(FilterContext);
  if (!ctx) throw new Error("useFilters must be inside FilterProvider");
  return ctx;
}

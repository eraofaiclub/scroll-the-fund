import { FundingRound, RoundType } from "./types";

export interface FilterState {
  roundTypes: RoundType[];
  sectors: string[];
  amountMin: number | null;
  amountMax: number | null;
}

export const defaultFilters: FilterState = {
  roundTypes: [],
  sectors: [],
  amountMin: null,
  amountMax: null,
};

export function applyFilters(
  rounds: FundingRound[],
  filters: FilterState
): FundingRound[] {
  return rounds.filter((round) => {
    if (
      filters.roundTypes.length > 0 &&
      !filters.roundTypes.includes(round.roundType)
    ) {
      return false;
    }
    if (
      filters.sectors.length > 0 &&
      !round.sector.some((s) => filters.sectors.includes(s))
    ) {
      return false;
    }
    if (filters.amountMin !== null && round.amount < filters.amountMin) {
      return false;
    }
    if (filters.amountMax !== null && round.amount > filters.amountMax) {
      return false;
    }
    return true;
  });
}

export function hasActiveFilters(filters: FilterState): boolean {
  return (
    filters.roundTypes.length > 0 ||
    filters.sectors.length > 0 ||
    filters.amountMin !== null ||
    filters.amountMax !== null
  );
}

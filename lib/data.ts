import rounds from "@/data/rounds.json";
import { FundingRound } from "./types";

const typedRounds: FundingRound[] = rounds as FundingRound[];

export function getAllRounds(): FundingRound[] {
  return typedRounds;
}

export function getRoundById(id: string): FundingRound | undefined {
  return typedRounds.find((r) => r.id === id);
}

export function getRoundsBatch(
  offset: number,
  limit: number
): FundingRound[] {
  return typedRounds.slice(offset, offset + limit);
}

export function getAllSectors(): string[] {
  const sectors = new Set<string>();
  for (const round of typedRounds) {
    for (const s of round.sector) {
      sectors.add(s);
    }
  }
  return Array.from(sectors).sort();
}

export function getAllRoundTypes(): string[] {
  const types = new Set<string>();
  for (const round of typedRounds) {
    types.add(round.roundType);
  }
  return Array.from(types).sort();
}

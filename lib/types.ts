export type RoundType =
  | "pre-seed"
  | "seed"
  | "series-a"
  | "series-b"
  | "series-c"
  | "series-d"
  | "growth";

export interface Investor {
  name: string;
  logo?: string;
  lead: boolean;
}

export interface PreviousRound {
  roundType: RoundType;
  amount: number;
  amountFormatted: string;
  date: string;
}

export interface FundingRound {
  id: string;
  companyName: string;
  companyLogo?: string;
  oneLiner: string;
  amount: number;
  amountFormatted: string;
  roundType: RoundType;
  investors: Investor[];
  date: string;
  sector: string[];
  website?: string;
  foundedYear?: number;
  teamSize?: number;
  totalRaised?: number;
  previousRounds?: PreviousRound[];
}

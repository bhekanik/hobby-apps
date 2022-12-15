import { LogoRelation } from "./logo";

interface InvestorBase {
  id: number;
  name: string;
  website: string;
  created_at: string;
}

export type Investor = InvestorBase & LogoRelation;

export interface ReturnType {
  success: boolean;
  investors?: Investor[];
  investor?: Investor;
  investorId?: string;
  error: unknown;
}

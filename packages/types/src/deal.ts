import { Company } from "./company";

export interface PressRelease {
  id?: number;
  link: string | null;
  date: Date | string;
  created_at?: string;
  title?: string | null;
  company_id?: number;
}

export interface Deal {
  id: number;
  amount: number;
  stage: string;
  created_at?: string;
  investors: string[];
  company: Company | never;
  company_id: number | null;
  press_release: PressRelease | never;
  press_release_id: number | null;
}

export interface DatabaseDeal {
  id: number | never;
  company_id?: number;
  company?: Company;
  press_release?: PressRelease;
  press_release_id?: number | null;
  investors: string;
  amount: number;
  stage: string;
  created_at?: string;
}

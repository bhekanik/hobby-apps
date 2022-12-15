import { LogoRelation } from "./logo";
interface CompanyBase {
    id: number;
    name: string;
    sector: string;
    female_founder: boolean;
    diverse_founders: boolean;
    website: string;
    country: string;
    about: string;
    launch_year: string;
    created_at: string;
}
export declare type Company = CompanyBase & LogoRelation;
export {};

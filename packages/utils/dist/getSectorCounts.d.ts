import { Deal } from "types";
export declare const getSectors: (deals: Deal[]) => string[];
export declare const getSectorCounts: (deals: Deal[]) => {
    [key: string]: number;
};
export declare const getFormattedSectorCounts: (deals: Deal[]) => string;

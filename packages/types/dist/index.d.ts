export * from "./company";
export * from "./deal";
export * from "./dealflow";
export * from "./investor";
export * from "./logo";
export interface ResultType<T> {
    success: boolean;
    data?: T[] | T;
    error: unknown;
}
import { TableInstance, UsePaginationInstanceProps, UsePaginationState, UseSortByInstanceProps } from "react-table";
export declare enum Collections {
    Deals = "deal",
    Companies = "company",
    Investors = "investor",
    PressReleases = "press_release",
    Logos = "logo",
    Subscribers = "subscriber",
    CrowdsourcedDeals = "crowdsourced_deal"
}
export declare type TableInstanceWithHooks<T extends object> = TableInstance<T> & UsePaginationInstanceProps<T> & UseSortByInstanceProps<T> & {
    state: UsePaginationState<T>;
};
export declare type DataViewType = "table" | "grid";
export interface FormatTopOptions {
    top?: number;
}

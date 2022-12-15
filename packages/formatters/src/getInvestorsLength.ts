import { Deal } from "types";

export const getInvestorsLength = (deals: Deal[]) => {
  return [...new Set(deals.map((deal) => deal.investors as string[]).flat())]
    .length;
};

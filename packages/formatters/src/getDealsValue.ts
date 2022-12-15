import { Deal } from "types";

export const getDealsValue = (deals: Deal[]) => {
  return deals.reduce((acc, deal) => acc + deal.amount, 0);
};

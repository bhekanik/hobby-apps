import { moneyFormatter } from "formatters";
import { Deal } from "types";

export const getDealRange = (deal: Deal[]): { min: number; max: number } => {
  const dealAmounts = deal.map(({ amount }) => amount).filter(Boolean);

  const min = Math.min(...dealAmounts);
  const max = Math.max(...dealAmounts);
  return { min, max };
};

export const getFormattedDealRange = (deal: Deal[]): string => {
  const { min, max } = getDealRange(deal);

  if (min === Infinity) {
    return `Undisclosed`;
  }

  if (min === max) {
    return `${moneyFormatter(min)}`;
  }

  return `${moneyFormatter(min)} - ${moneyFormatter(max)}`;
};

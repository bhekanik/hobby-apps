import { Deal, Investor } from "types";

export const filterInvestors = (
  deals: Deal[],
  investors: Investor[]
): Investor[] => {
  const investorsInDeals = deals.reduce((acc, deal) => {
    const investors = deal.investors as string[];
    return [...acc, ...investors];
  }, [] as string[]);

  return investors.filter((investor) => {
    if (investorsInDeals.includes(investor.name)) {
      return true;
    }
    return false;
  });
};

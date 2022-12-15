import { useEffect, useMemo, useState } from "react";
import { useInvestors } from "src/hooks";
import { Investor } from "types";
import {
  filterInvestors,
  getDealRange,
  getFormattedDealRange,
  getFormattedSectorCounts,
  getFormattedStageCounts,
  getSectors,
} from "utils";
import { useFilteredDeals } from "./useFilteredDeals";

export type InvestorWithDeals = Investor & {
  allDeals?: number;
  numberOfDealsInPeriod?: number;
  dealsRange?: string;
  stageCounts?: string;
  sectorCounts?: string;
  maxDealValue?: number;
  minDealValue?: number;
  sectors?: string[];
};

export const useFilteredInvestors = (): {
  filteredInvestors: InvestorWithDeals[];
  investors: Investor[];
  investorsLoading: boolean;
  isFetched: boolean;
} => {
  const { investors, isLoading: investorsLoading, isFetched } = useInvestors();
  const { filteredDeals } = useFilteredDeals();

  const [filteredInvestors, setFilteredInvestors] = useState<
    InvestorWithDeals[]
  >(() => investors ?? []);

  useEffect(() => {
    if (investors && filteredDeals) {
      const filteredInvestors = filterInvestors(filteredDeals, investors).map(
        (investor) => {
          const dealsInPeriod = filteredDeals.filter((deal) =>
            deal.investors.includes(investor.name)
          );

          return {
            ...investor,
            numberOfDealsInPeriod: dealsInPeriod.length,
            dealsInPeriod,
            maxDealValue: getDealRange(dealsInPeriod).max,
            minDealValue: getDealRange(dealsInPeriod).min,
            dealsRange: getFormattedDealRange(dealsInPeriod),
            stageCounts: getFormattedStageCounts(dealsInPeriod),
            sectorCounts: getFormattedSectorCounts(dealsInPeriod),
            sectors: getSectors(dealsInPeriod),
          };
        }
      );

      setFilteredInvestors(filteredInvestors);
    }
  }, [investors, filteredDeals]);

  return useMemo(
    () => ({
      filteredInvestors,
      investors: investors ?? [],
      investorsLoading,
      isFetched,
    }),
    [filteredInvestors, investors, investorsLoading, isFetched]
  );
};

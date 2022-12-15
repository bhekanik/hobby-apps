import { getDealsValue, getInvestorsLength } from "formatters";
import { useMemo } from "react";
import { useDeals } from "src/hooks";
import { useStore } from "src/stores/dealflow";
import { filterDeals } from "utils";
import shallow from "zustand/shallow";

export const useSectorBreakdownData = () => {
  const { deals: allDeals } = useDeals();

  const filter = useStore((state) => state.dealflow.filter, shallow);

  const filteredDeals = useMemo(
    () => (allDeals ? filterDeals(allDeals, filter) : []),
    [allDeals, filter]
  );

  const amountPerSector = useMemo(
    () =>
      filteredDeals.reduce<Record<string, { sector: string; Amount: number }>>(
        (acc, curr) => {
          const sector = JSON.parse(curr.company.sector)[0];

          if (sector) {
            if (acc[sector]) {
              acc[sector] = {
                ...acc[sector],
                Amount: acc[sector].Amount + curr.amount,
              };
            } else {
              acc[sector] = {
                sector,
                Amount: curr.amount,
              };
            }
          }

          return acc;
        },
        {}
      ),
    [filteredDeals]
  );

  return {
    deals: filteredDeals?.length || 0,
    investors: getInvestorsLength(filteredDeals),
    value: getDealsValue(filteredDeals),
    data: Object.entries(amountPerSector)
      .map(([key, value]) => {
        return {
          label: key,
          Amount: value.Amount,
          sector: value.sector,
        };
      })
      .sort((a, b) => a.sector.localeCompare(b.sector)),
    start: filter.dateRange.start,
    end: filter.dateRange.end,
  };
};

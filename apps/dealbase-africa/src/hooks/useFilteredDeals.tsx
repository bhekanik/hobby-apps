import { useEffect, useMemo, useState } from "react";
import { useDeals } from "src/hooks";
import { useStore } from "src/stores/dealflow";
import { filterDeals } from "utils";
import shallow from "zustand/shallow";

export const useFilteredDeals = () => {
  const { deals, isLoading: dealsLoading, isFetched } = useDeals();

  const filter = useStore((state) => state.dealflow.filter, shallow);
  const { searchTerm, resetFilter, calculateStats } = useStore((state) => ({
    searchTerm: state.dealflow.searchTerm,
    resetFilter: state.resetFilter,
    calculateStats: state.calculateStats,
  }));

  const [filteredDeals, setFilteredDeals] = useState(() => deals);

  useEffect(() => {
    if (filteredDeals) {
      calculateStats(filteredDeals);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredDeals]);

  useEffect(() => {
    if (deals) {
      setFilteredDeals(filterDeals(deals, filter));
    }
  }, [deals, filter]);

  useEffect(() => {
    if (deals) {
      if (searchTerm) {
        const filtered = deals.filter((deal) =>
          deal.company.name.includes(searchTerm)
        );
        setFilteredDeals(filtered);
      } else {
        setFilteredDeals(filterDeals(deals, filter));
        resetFilter();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  return useMemo(
    () => ({ filteredDeals, deals, dealsLoading, isFetched }),
    [filteredDeals, deals, dealsLoading, isFetched]
  );
};

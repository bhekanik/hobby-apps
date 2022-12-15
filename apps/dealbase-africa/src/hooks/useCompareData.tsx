import { formatDuration, sub } from "date-fns";
import { getDealsValue, getInvestorsLength } from "formatters";
import { useMemo } from "react";
import { useDeals } from "src/hooks";
import { useStore } from "src/stores/dealflow";
import { filterDeals } from "utils";
import shallow from "zustand/shallow";

export const useCompareData = (offset = false) => {
  const compareOffset = useStore((state) => state.compareOffset);

  const { deals: allDeals } = useDeals();

  const filter = useStore((state) => state.dealflow.filter, shallow);

  const start = sub(
    filter.dateRange.start,
    offset ? compareOffset : { years: 0 }
  );
  const end = sub(filter.dateRange.end, offset ? compareOffset : { years: 0 });

  const currentDeals = useMemo(
    () => (allDeals ? filterDeals(allDeals, filter) : []),
    [allDeals, filter]
  );

  const offsetDeals = useMemo(
    () =>
      allDeals
        ? filterDeals(allDeals, {
            ...filter,
            dateRange: {
              start,
              end,
            },
          })
        : [],
    [allDeals, filter, start, end]
  );

  return {
    offset: {
      deals: offsetDeals?.length || 0,
      investors: getInvestorsLength(offsetDeals),
      value: getDealsValue(offsetDeals),
      data: offsetDeals,
      start,
      end,
      label: `${formatDuration(offset ? compareOffset : { years: 0 })} ago`,
    },
    current: {
      deals: currentDeals?.length || 0,
      investors: getInvestorsLength(currentDeals),
      value: getDealsValue(currentDeals),
      data: currentDeals,
      start: filter.dateRange.start,
      end: filter.dateRange.end,
      label: "Current period",
    },
  };
};

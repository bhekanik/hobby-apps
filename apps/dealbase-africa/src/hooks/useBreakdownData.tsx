import { format, getYear } from "date-fns";
import { getDealsValue, getInvestorsLength } from "formatters";
import { useMemo } from "react";
import { useDeals } from "src/hooks";
import { useStore } from "src/stores/dealflow";
import { filterDeals } from "utils";
import shallow from "zustand/shallow";

export const useMonthlyBreakdownData = () => {
  const { deals: allDeals } = useDeals();

  const filter = useStore((state) => state.dealflow.filter, shallow);

  const filteredDeals = useMemo(
    () => (allDeals ? filterDeals(allDeals, filter) : []),
    [allDeals, filter]
  );

  const amountPerMonth = useMemo(
    () =>
      filteredDeals.reduce<
        Record<string, { monthNumber: number; Amount: number }>
      >((acc, curr) => {
        const currentMonth = format(
          new Date(curr.press_release.date),
          "MMM, yy"
        );

        const monthNumber = format(new Date(curr.press_release.date), "MM");

        const yearNumber = getYear(new Date(curr.press_release.date));

        if (acc[currentMonth]) {
          acc[currentMonth] = {
            ...acc[currentMonth],
            Amount: acc[currentMonth].Amount + curr.amount,
          };
        } else {
          acc[currentMonth] = {
            monthNumber: +`${yearNumber}${monthNumber}`,
            Amount: curr.amount,
          };
        }
        return acc;
      }, {}),
    [filteredDeals]
  );

  return {
    deals: filteredDeals?.length || 0,
    investors: getInvestorsLength(filteredDeals),
    value: getDealsValue(filteredDeals),
    data: Object.entries(amountPerMonth)
      .map(([key, value]) => {
        return {
          label: key,
          Amount: value.Amount,
          monthNumber: value.monthNumber,
        };
      })
      .sort((a, b) => (+a.monthNumber < +b.monthNumber ? -1 : 1)),
    start: filter.dateRange.start,
    end: filter.dateRange.end,
  };
};

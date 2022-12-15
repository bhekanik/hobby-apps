import { useEffect, useState } from "react";
import { useDeals } from "src/hooks";
import { Deal } from "types";

export const useDealsByInvestor = (investorName: string) => {
  const { deals: allDeals } = useDeals();

  const [deals, setDeals] = useState<Deal[]>([]);

  useEffect(() => {
    if (allDeals) {
      const filteredDeals =
        allDeals.filter((d) =>
          (d.investors as string[]).includes(investorName)
        ) || [];
      setDeals(filteredDeals);
    }
  }, [allDeals, investorName]);

  return deals;
};

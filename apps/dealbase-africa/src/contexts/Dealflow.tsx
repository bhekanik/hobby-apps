import { defaultDealflow } from "fixtures";
import { getDealsValue, getInvestorsLength } from "formatters";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";
import { Deal, IDealflow, IFilter } from "types";
import { filterDeals } from "utils";

interface DealflowContext {
  dealflow: IDealflow;
  setDealflow: (dealflow: IDealflow) => void;
}

const dealflowContext = createContext<DealflowContext | null>(null);

export const DealflowProvider = ({ children }: PropsWithChildren<unknown>) => {
  const [dealflow, setDealflow] = useState<DealflowContext>({
    dealflow: defaultDealflow,
    setDealflow: (newDealflow: IDealflow) => {
      setDealflow({ ...dealflow, dealflow: newDealflow });
    },
  });

  const value = useMemo(() => dealflow, [dealflow]);

  return (
    <dealflowContext.Provider value={value}>
      {children}
    </dealflowContext.Provider>
  );
};

export const useDealflow = () => {
  const context = useContext(dealflowContext);

  if (context === null) {
    throw new Error("useDealflow must be used within a DealflowProvider");
  }

  const { dealflow, setDealflow } = context;

  const resetFilter = () => {
    setDealflow({
      ...dealflow,
      filter: defaultDealflow.filter,
    });
  };

  const setSearchTerm = (searchTerm: string) => {
    setDealflow({
      ...dealflow,
      filter: defaultDealflow.filter,
      searchTerm,
    });
  };

  const calculateStats = (deals: Deal[]) => {
    if (dealflow) {
      const newDealflow = {
        ...dealflow,
        deals: deals.length || 0,
        investors: getInvestorsLength(deals),
        value: getDealsValue(deals),
      };
      setDealflow(newDealflow);
    }
  };

  const setFilter = (filter: Partial<IFilter>, deals: Deal[]) => {
    if (dealflow) {
      const newFilter = {
        ...dealflow.filter,
        ...filter,
      };

      const newDeals = filterDeals(deals, newFilter);

      setDealflow({
        ...dealflow,
        filter: newFilter,
        deals: newDeals?.length || 0,
        investors: getInvestorsLength(newDeals),
        value: getDealsValue(newDeals),
      });
    }
  };

  return {
    dealflow,
    setDealflow,
    setFilter,
    resetFilter,
    setSearchTerm,
    calculateStats,
  };
};

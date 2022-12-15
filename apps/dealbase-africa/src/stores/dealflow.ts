import { defaultDealflow } from "fixtures";
import { getDealsValue, getInvestorsLength } from "formatters";
import { Deal, IDealflow, IFilter } from "types";
import { filterDeals } from "utils";
import create from "zustand";
import { devtools } from "zustand/middleware";

export interface DealflowState {
  dealflow: IDealflow;
  compareOffset: Duration;
  setCompareOffset: (offset: Duration) => void;
  setDealflow: (newDealflow: IDealflow) => void;
  setFilter: (filter: Partial<IFilter>, deals: Deal[]) => void;
  calculateStats: (deals: Deal[]) => void;
  setSearchTerm: (searchTerm: string) => void;
  resetFilter: () => void;
}

export const useStore = create(
  devtools<DealflowState>((set) => ({
    dealflow: defaultDealflow,
    compareOffset: { years: 1 },
    setCompareOffset: (newCompareOffset: Duration) => {
      set((currentDealflow) => ({
        ...currentDealflow,
        compareOffset: newCompareOffset,
      }));
    },
    setDealflow: (newDealflow: IDealflow) => {
      set((currentDealflow) => ({
        ...currentDealflow,
        dealflow: {
          ...currentDealflow.dealflow,
          ...newDealflow,
        },
      }));
    },
    setFilter: (filter: Partial<IFilter>, deals: Deal[]) => {
      set((currentState) => {
        const newFilter = {
          ...currentState.dealflow.filter,
          ...filter,
        };

        const newDeals = filterDeals(deals, newFilter);

        return {
          ...currentState,
          dealflow: {
            ...currentState.dealflow,
            filter: newFilter,
            deals: newDeals?.length || 0,
            investors: getInvestorsLength(newDeals),
            value: getDealsValue(newDeals),
          },
        };
      });
    },
    calculateStats: (deals: Deal[]) => {
      set((currentDealflow) => ({
        ...currentDealflow,
        dealflow: {
          ...currentDealflow.dealflow,
          deals: deals.length || 0,
          investors: getInvestorsLength(deals),
          value: getDealsValue(deals),
        },
      }));
    },
    setSearchTerm: (searchTerm: string) => {
      set((currentDealflow) => ({
        ...currentDealflow,
        dealflow: {
          ...currentDealflow.dealflow,
          filter: defaultDealflow.filter,
          searchTerm,
        },
      }));
    },
    resetFilter: () => {
      set((currentDealflow) => ({
        ...currentDealflow,
        dealflow: {
          ...currentDealflow.dealflow,
          filter: defaultDealflow.filter,
        },
      }));
    },
  }))
);

import { getDealsValue, getInvestorsLength } from "formatters";
import { useMemo } from "react";
import { useDeals } from "src/hooks";
import { useStore } from "src/stores/dealflow";
import { filterDeals } from "utils";
import shallow from "zustand/shallow";

export const useDiversityData = () => {
  const { deals: allDeals } = useDeals();

  const filter = useStore((state) => state.dealflow.filter, shallow);

  const filteredDeals = useMemo(
    () => (allDeals ? filterDeals(allDeals, filter) : []),
    [allDeals, filter]
  );

  const diversityData = useMemo(
    () =>
      filteredDeals.reduce<{
        race: {
          label: string;
          "All-white founding team": number;
          "Non-white/Diverse founding team": number;
        };
        gender: {
          label: string;
          "Has Female Founder": number;
          "All Male Founders": number;
        };
      }>(
        (acc, curr) => {
          if (curr.company.diverse_founders) {
            acc.race["Non-white/Diverse founding team"] += 1;
          } else {
            acc.race["All-white founding team"] += 1;
          }

          if (curr.company.female_founder) {
            acc.gender["Has Female Founder"] += 1;
          } else {
            acc.gender["All Male Founders"] += 1;
          }

          return acc;
        },
        {
          race: {
            label: "Race",
            ["All-white founding team"]: 0,
            ["Non-white/Diverse founding team"]: 0,
          },
          gender: {
            label: "Gender",
            ["Has Female Founder"]: 0,
            ["All Male Founders"]: 0,
          },
        }
      ),
    [filteredDeals]
  );

  return {
    deals: filteredDeals?.length || 0,
    investors: getInvestorsLength(filteredDeals),
    value: getDealsValue(filteredDeals),
    race: [diversityData.race],
    gender: [diversityData.gender],
    raceSeparate: [
      {
        id: "All-white founding team",
        label: "All-white founding team",
        value: diversityData.race["All-white founding team"],
        color: "#D98F39",
      },
      {
        id: "Non-white/Diverse founding team",
        label: "Non-white/Diverse founding team",
        value: diversityData.race["Non-white/Diverse founding team"],
        color: "#31A078",
      },
    ],
    genderSeparate: [
      {
        id: "Has Female Founder",
        label: "Has Female Founder",
        value: diversityData.gender["Has Female Founder"],
        color: "#D98F39",
        total: filterDeals.length,
      },
      {
        id: "All Male Founders",
        label: "All Male Founders",
        value: diversityData.gender["All Male Founders"],
        color: "#31A078",
        total: filterDeals.length,
      },
    ],
    start: filter.dateRange.start,
    end: filter.dateRange.end,
  };
};

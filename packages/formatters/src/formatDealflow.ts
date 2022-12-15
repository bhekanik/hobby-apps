import { max, min, sub } from "date-fns";
import { countryList } from "fixtures";
import type { Deal, IDealflow } from "types";
import { getDealsValue } from "./getDealsValue";
import { getInvestorsLength } from "./getInvestorsLength";

export const formatDealflow = (deals: Deal[]): IDealflow => {
  const uniqueCountries = [
    ...new Set(deals.map((deal) => deal.company.country)),
  ];

  const sectors = deals
    .map((deal) => {
      return deal?.company.sector?.includes("[")
        ? JSON.parse(deal?.company.sector)
        : JSON.parse(`["${deal?.company.sector}"]`);
    })
    .flat()
    .filter(Boolean);

  const countryListMap = countryList.reduce<Record<string, string>>(
    (acc, country: { name: string; code: string }) => {
      acc[country.code] = country.name;
      return acc;
    },
    {}
  );

  const country =
    uniqueCountries.length > 1
      ? ["Africa"]
      : uniqueCountries.map((country) => {
          return countryListMap[country] ?? "";
        });

  return {
    filter: {
      country,
      sector: [...new Set(sectors)],
      dateRange:
        deals.length === 0
          ? {
              start: sub(new Date(), { days: 30 }),
              end: new Date(),
            }
          : {
              start: min([
                ...new Set(
                  deals.map((deal) => new Date(deal.press_release.date))
                ),
              ]),
              end: max([
                ...new Set(
                  deals.map((deal) => new Date(deal.press_release.date))
                ),
              ]),
            },
      stage: [...new Set(deals.map((deal) => deal.stage))],
    },
    searchTerm: "",
    deals: deals.length,
    investors: getInvestorsLength(deals),
    value: getDealsValue(deals),
  };
};

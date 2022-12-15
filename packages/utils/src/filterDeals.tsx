import { isWithinInterval } from "date-fns";
import { Deal, IFilter } from "types";

export const filterDeals = (deals: Deal[], filter: IFilter): Deal[] => {
  const { country, stage, sector, dateRange } = filter;

  const countriesFiltered = deals.filter((deal) => {
    if (country[0] === "All") return true;
    return country.includes(deal.company.country);
  });

  const sectorsFiltered = countriesFiltered.filter((deal) => {
    if (sector[0] === "All") return true;
    let found = false;

    (deal?.company.sector?.includes("[")
      ? JSON.parse(deal?.company.sector)
      : JSON.parse(`["${deal?.company.sector}"]`)
    ).forEach((s: string) => {
      if (sector.includes(s)) {
        found = true;
      }
    });

    return found;
  });

  const stagesFiltered = sectorsFiltered.filter((deal) => {
    if (stage[0] === "All") return true;
    return stage.includes(deal.stage);
  });

  const otherFiltered = stagesFiltered.filter((deal) => {
    return (
      dateRange === null ||
      isWithinInterval(new Date(deal.press_release?.date), {
        start:
          typeof dateRange.start === "string"
            ? new Date(dateRange.start)
            : dateRange.start,
        end:
          typeof dateRange.end === "string"
            ? new Date(dateRange.end)
            : dateRange.end,
      })
    );
  });

  return otherFiltered;
};

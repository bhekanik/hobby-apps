import { Deal } from "types";

export const getSectors = (deals: Deal[]): string[] => {
  const sectorsInDeals = deals
    .reduce<string[]>((acc, deal) => {
      const industries = deal.company.sector.includes("[")
        ? JSON.parse(deal.company.sector)
        : [deal.company.sector];
      return [...acc, ...industries];
    }, [])
    .filter((sector) => sector !== "");

  return [...new Set(sectorsInDeals)];
};

export const getSectorCounts = (deals: Deal[]): { [key: string]: number } => {
  const sectorsInDeals = deals
    .reduce<string[]>((acc, deal) => {
      const industries = deal.company.sector.includes("[")
        ? JSON.parse(deal.company.sector)
        : [deal.company.sector];
      return [...acc, ...industries];
    }, [])
    .filter((sector) => sector !== "");

  return sectorsInDeals.reduce<{ [key: string]: number }>((acc, sector) => {
    acc[sector] = (acc[sector] ?? 0) + 1;
    return acc;
  }, {});
};

export const getFormattedSectorCounts = (deals: Deal[]): string => {
  const sectorCounts = getSectorCounts(deals);

  if (Object.keys(sectorCounts).length === 0) {
    return "Unknown";
  }

  return Object.entries(sectorCounts)
    .sort((a, b) => (a[1] < b[1] ? 1 : -1))
    .reduce((acc, [sector, number]) => {
      if (number === 0) {
        return acc;
      }

      if (acc === "") {
        return `${sector}: ${number}`;
      }

      return acc + `, ${sector}: ${number}`;
    }, "");
};

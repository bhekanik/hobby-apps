import { countryList } from "fixtures";
import { Deal, FormatTopOptions } from "types";

const countryCodeMap = countryList.reduce<Record<string, string>>(
  (acc, country) => {
    acc[country.code] = country.name;
    return acc;
  },
  {}
);

export const formatTopCountries = (
  deals: Deal[],
  options: FormatTopOptions = {}
) => {
  const topCountriesMap = deals?.reduce<Record<string, number>>((acc, deal) => {
    const {
      company: { country: code },
    } = deal;

    const country = countryCodeMap[code];

    acc[country] = acc[country] ? acc[country] + 1 : 1;
    return acc;
  }, {});

  const topCountries = Object.entries(topCountriesMap || {})
    .sort((a, b) => b[1] - a[1])
    .slice(0, options.top || 5)
    .map((entry) => `${entry[0]} - ${entry[1]} deals`);

  return topCountries;
};

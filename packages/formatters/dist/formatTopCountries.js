import { countryList } from "fixtures";
const countryCodeMap = countryList.reduce((acc, country) => {
    acc[country.code] = country.name;
    return acc;
}, {});
export const formatTopCountries = (deals, options = {}) => {
    const topCountriesMap = deals?.reduce((acc, deal) => {
        const { company: { country: code }, } = deal;
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
//# sourceMappingURL=formatTopCountries.js.map
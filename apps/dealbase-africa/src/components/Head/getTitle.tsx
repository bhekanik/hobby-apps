import { Interval } from "date-fns";
import { formatInterval } from "formatters";
import { IDealflow } from "types";

export const getTitle = (dealflow: IDealflow | null, title?: string) => {
  if (title) return title;

  if (dealflow?.filter.country)
    return `${
      typeof dealflow.filter.country === "string"
        ? dealflow.filter.country
        : dealflow.filter.country.length > 1
        ? dealflow.filter.country.join(", ")
        : dealflow.filter.country[0] === "All"
        ? "All Countries"
        : dealflow.filter.country[0]
    } fundraising roundup for ${formatInterval(
      dealflow?.filter.dateRange as Interval
    )}`;
  return "African Startup Opportunity | Equipping Founders to Raise Capital and Investors to Optimize Dealflow";
};

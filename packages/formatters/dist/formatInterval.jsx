import { format } from "date-fns";
export const formatInterval = (interval) => {
    return interval
        ? `${format(typeof interval.start === "string"
            ? new Date(interval.start)
            : interval.start, "dd LLL, yyyy")} - ${format(typeof interval.end === "string"
            ? new Date(interval.end)
            : interval.end, "dd LLL, yyyy")}`
        : `01 Jan, 2021 - ${format(new Date(), "dd LLL, yyyy")}`;
};
//# sourceMappingURL=formatInterval.jsx.map
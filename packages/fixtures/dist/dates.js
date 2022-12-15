import { sub } from "date-fns";
export const dates = [
    {
        value: "7days",
        duration: { days: 7 },
        interval: {
            start: sub(new Date(), { days: 7 }),
            end: new Date(),
        },
        label: "Last 7 Days",
    },
    {
        value: "1months",
        duration: { days: 30 },
        interval: {
            start: sub(new Date(), { days: 30 }),
            end: new Date(),
        },
        label: "Last 30 Days",
    },
    {
        value: "3months",
        duration: { months: 3 },
        interval: {
            start: sub(new Date(), { months: 3 }),
            end: new Date(),
        },
        label: "Last 3 Months",
    },
    {
        value: "6months",
        duration: { months: 6 },
        interval: {
            start: sub(new Date(), { months: 6 }),
            end: new Date(),
        },
        label: "Last 6 Months",
    },
    {
        value: "1years",
        duration: { years: 1 },
        interval: {
            start: sub(new Date(), { years: 1 }),
            end: new Date(),
        },
        label: "Last 12 Months",
    },
    {
        value: "2021",
        interval: {
            start: new Date("2021-01-01"),
            end: new Date(),
        },
        label: "Since beginning of 2021",
    },
];
//# sourceMappingURL=dates.js.map
import { sub } from "date-fns";
import { deals } from "fixtures";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { formatDealflow } from "./formatDealflow";
describe("formatDealflow", () => {
    beforeEach(() => {
        // tell vitest we use mocked time
        vi.useFakeTimers();
    });
    afterEach(() => {
        // restoring date after each test run
        vi.useRealTimers();
    });
    it("should return the correct IDealflow for 0 deals", () => {
        expect(formatDealflow([])).toEqual({
            deals: 0,
            filter: {
                country: [],
                dateRange: {
                    start: sub(new Date(), { days: 30 }),
                    end: new Date(),
                },
                sector: [],
                stage: [],
            },
            investors: 0,
            searchTerm: "",
            value: 0,
        });
    });
    it("should return the correct IDealflow", () => {
        expect(formatDealflow(deals)).toEqual({
            deals: 44,
            filter: {
                country: ["Africa"],
                dateRange: {
                    end: new Date("2022-07-30T00:00:00.000Z"),
                    start: new Date("2022-07-05T00:00:00.000Z"),
                },
                sector: [
                    "Insuretech",
                    "E-Commerce",
                    "Agritech",
                    "Energy & Climatetech",
                    "Transport & Logistics",
                    "Web3 & Blockchain",
                    "Cleantech & Waste Management",
                ],
                stage: [
                    "Unnamed",
                    "Pre-seed",
                    "Series A",
                    "Seed",
                    "Acquisition",
                    "Pre-Seed",
                    "Series C",
                    "Pre-Series A",
                ],
            },
            investors: 99,
            searchTerm: "",
            value: 333846000,
        });
    });
});
//# sourceMappingURL=formatDealflow.test.js.map
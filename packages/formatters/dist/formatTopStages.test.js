import { deals } from "fixtures";
import { describe, expect, it } from "vitest";
import { formatTopStages } from "./formatTopStages";
describe("formatTopStages", () => {
    it("should return the expected formatted top deals when empty array is given", () => {
        expect(formatTopStages([])).toEqual([]);
    });
    it("should return the expected formated top deals", () => {
        expect(formatTopStages(deals)).toEqual([
            "Unnamed - 23",
            "Seed - 6",
            "Acquisition - 4",
            "Pre-seed - 3",
            "Series A - 3",
        ]);
    });
    it("should return the expected number of formated top deals when top option is specified", () => {
        expect(formatTopStages(deals, { top: 7 })).toEqual([
            "Unnamed - 23",
            "Seed - 6",
            "Acquisition - 4",
            "Pre-seed - 3",
            "Series A - 3",
            "Pre-Seed - 3",
            "Series C - 1",
        ]);
    });
});
//# sourceMappingURL=formatTopStages.test.js.map
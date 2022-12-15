import { deals } from "fixtures";
import { expect } from "vitest";
import { getFormattedStageCounts, getStageCounts } from "./getStagesCounts";
describe("getStageCounts", () => {
    it("should return the correct stage counts", () => {
        expect(getStageCounts(deals)).toEqual({
            Acquisition: 4,
            "Pre-Seed": 3,
            "Pre-Series A": 1,
            "Pre-seed": 3,
            Seed: 6,
            "Series A": 3,
            "Series C": 1,
            Unnamed: 23,
        });
        expect(getStageCounts([])).toEqual({});
    });
    it("should return the correct formatted stage counts", () => {
        expect(getFormattedStageCounts(deals)).toEqual("Unnamed: 23, Seed: 6, Acquisition: 4, Pre-Seed: 3, Series A: 3, Pre-seed: 3, Pre-Series A: 1, Series C: 1");
        expect(getFormattedStageCounts([])).toEqual("");
    });
});
//# sourceMappingURL=getStageCounts.test.js.map
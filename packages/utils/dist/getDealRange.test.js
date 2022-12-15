import { deals } from "fixtures";
import { expect } from "vitest";
import { getDealRange, getFormattedDealRange } from "./getDealRange";
describe("getDealRange", () => {
    it("should return the correct range", () => {
        expect(getDealRange(deals.slice(0, 10))).toEqual({
            min: 250000,
            max: 50000000,
        });
        expect(getDealRange(deals.slice(0, 1))).toEqual({
            min: 50000000,
            max: 50000000,
        });
        expect(getDealRange([])).toEqual({
            min: Infinity,
            max: -Infinity,
        });
    });
    it("should return the corrected formatted deal range", () => {
        expect(getFormattedDealRange(deals.slice(0, 10))).toEqual("$250K - $50M");
        expect(getFormattedDealRange(deals.slice(0, 1))).toEqual("$50M");
        expect(getFormattedDealRange([])).toEqual("Undisclosed");
    });
});
//# sourceMappingURL=getDealRange.test.js.map
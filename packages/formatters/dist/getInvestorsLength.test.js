import { deals } from "fixtures";
import { describe, expect, it } from "vitest";
import { getInvestorsLength } from "./getInvestorsLength";
describe("getInvestorsLength", () => {
    it("should return 0 when there are no deals", () => {
        expect(getInvestorsLength([])).toBe(0);
    });
    it("should return the expected number of investors", () => {
        expect(getInvestorsLength(deals)).toBe(99);
    });
});
//# sourceMappingURL=getInvestorsLength.test.js.map
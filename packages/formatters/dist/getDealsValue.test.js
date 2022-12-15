import { deals } from "fixtures";
import { describe, expect, it } from "vitest";
import { getDealsValue } from "./getDealsValue";
describe("getDealsValue", () => {
    it("should return 0 when there are no deals", () => {
        expect(getDealsValue([])).toBe(0);
    });
    it("should return the sum of the amounts of all deals", () => {
        expect(getDealsValue(deals)).toBe(333846000);
    });
});
//# sourceMappingURL=getDealsValue.test.js.map
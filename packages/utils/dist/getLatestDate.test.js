import { expect } from "vitest";
import { getLatestDate } from "./getLatestDate";
describe("getLatestDate", () => {
    it("should return the correct date", () => {
        expect(getLatestDate([new Date(2020, 0, 1), new Date(2020, 0, 2)])).toEqual(new Date(2020, 0, 2));
    });
});
//# sourceMappingURL=getLatestDate.test.js.map
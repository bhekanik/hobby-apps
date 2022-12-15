import { describe, expect, it } from "vitest";
import { formatInterval } from "./formatInterval";
describe("formatInterval", () => {
    it("should correctly format an interval", () => {
        expect(formatInterval({
            start: new Date("2020-01-01"),
            end: new Date("2020-01-02"),
        })).toBe("01 Jan, 2020 - 02 Jan, 2020");
    });
});
//# sourceMappingURL=formatInterval.test.js.map
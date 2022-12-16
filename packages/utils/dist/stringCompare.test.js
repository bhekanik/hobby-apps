import { describe, expect, it } from "vitest";
import { stringCompare } from "./stringCompare";
describe("stringCompare", () => {
    it("should return true when strings are equal", () => {
        expect(stringCompare("a", "a")).toBe(true);
        expect(stringCompare("aA", "aa", {
            caseSensitive: false,
        })).toBe(true);
        expect(stringCompare("a a", "aa", {
            ignoreWhitespace: true,
        })).toBe(true);
        expect(stringCompare("a-", "*a", {
            specialChars: ["-", "*"],
        })).toBe(true);
    });
    it("should return true when both of the strings are empty", () => {
        expect(stringCompare("", "")).toBe(true);
    });
    it("should return false when strings are not equal", () => {
        expect(stringCompare("a", "b")).toBe(false);
    });
    it("should return false when one of the strings is empty", () => {
        expect(stringCompare("a", "")).toBe(false);
        expect(stringCompare("", "b")).toBe(false);
    });
});
//# sourceMappingURL=stringCompare.test.js.map
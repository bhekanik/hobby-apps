import { describe, expect, it } from "vitest";
import { numberFormatter } from "./number";
describe("numberFormatter", () => {
    it("should return the correct strings", () => {
        expect(numberFormatter(12345678900000)).toEqual("12T");
        expect(numberFormatter(1234567890000)).toEqual("1.2T");
        expect(numberFormatter(123456789000)).toEqual("123B");
        expect(numberFormatter(12345678900)).toEqual("12B");
        expect(numberFormatter(1234567890)).toEqual("1.2B");
        expect(numberFormatter(123456789)).toEqual("123M");
        expect(numberFormatter(12345678)).toEqual("12M");
        expect(numberFormatter(1234567)).toEqual("1.2M");
        expect(numberFormatter(123456)).toEqual("123K");
        expect(numberFormatter(12345)).toEqual("12K");
        expect(numberFormatter(1234)).toEqual("1.2K");
        expect(numberFormatter(123)).toEqual("123");
        expect(numberFormatter(12)).toEqual("12");
        expect(numberFormatter(1)).toEqual("1");
    });
    it("should return the correct strings when options are provided", () => {
        const options = {
            notation: "standard",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        };
        expect(numberFormatter(12345678900000, options)).toEqual("12,345,678,900,000");
        expect(numberFormatter(1234567890000, options)).toEqual("1,234,567,890,000");
        expect(numberFormatter(123456789000, options)).toEqual("123,456,789,000");
        expect(numberFormatter(12345678900, options)).toEqual("12,345,678,900");
        expect(numberFormatter(1234567890, options)).toEqual("1,234,567,890");
        expect(numberFormatter(123456789, options)).toEqual("123,456,789");
        expect(numberFormatter(12345678, options)).toEqual("12,345,678");
        expect(numberFormatter(1234567, options)).toEqual("1,234,567");
        expect(numberFormatter(123456, options)).toEqual("123,456");
        expect(numberFormatter(12345, options)).toEqual("12,345");
        expect(numberFormatter(1234, options)).toEqual("1,234");
        expect(numberFormatter(123, options)).toEqual("123");
        expect(numberFormatter(12, options)).toEqual("12");
        expect(numberFormatter(1, options)).toEqual("1");
    });
});
//# sourceMappingURL=number.test.js.map
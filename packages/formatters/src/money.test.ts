import { describe, expect, it } from "vitest";
import { moneyFormatter } from "./money";

describe("moneyFormatter", () => {
  it("should return the correct strings", () => {
    expect(moneyFormatter(12345678900000)).toEqual("$12T");
    expect(moneyFormatter(1234567890000)).toEqual("$1.2T");
    expect(moneyFormatter(123456789000)).toEqual("$123B");
    expect(moneyFormatter(12345678900)).toEqual("$12B");
    expect(moneyFormatter(1234567890)).toEqual("$1.2B");
    expect(moneyFormatter(123456789)).toEqual("$123M");
    expect(moneyFormatter(12345678)).toEqual("$12M");
    expect(moneyFormatter(1234567)).toEqual("$1.2M");
    expect(moneyFormatter(123456)).toEqual("$123K");
    expect(moneyFormatter(12345)).toEqual("$12K");
    expect(moneyFormatter(1234)).toEqual("$1.2K");
    expect(moneyFormatter(123)).toEqual("$123");
    expect(moneyFormatter(12)).toEqual("$12");
    expect(moneyFormatter(1)).toEqual("$1");
  });

  it("should return the correct strings when options are provided", () => {
    const options: Intl.NumberFormatOptions = {
      notation: "standard",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    };

    expect(moneyFormatter(12345678900000, options)).toEqual(
      "$12,345,678,900,000"
    );
    expect(moneyFormatter(1234567890000, options)).toEqual(
      "$1,234,567,890,000"
    );
    expect(moneyFormatter(123456789000, options)).toEqual("$123,456,789,000");
    expect(moneyFormatter(12345678900, options)).toEqual("$12,345,678,900");
    expect(moneyFormatter(1234567890, options)).toEqual("$1,234,567,890");
    expect(moneyFormatter(123456789, options)).toEqual("$123,456,789");
    expect(moneyFormatter(12345678, options)).toEqual("$12,345,678");
    expect(moneyFormatter(1234567, options)).toEqual("$1,234,567");
    expect(moneyFormatter(123456, options)).toEqual("$123,456");
    expect(moneyFormatter(12345, options)).toEqual("$12,345");
    expect(moneyFormatter(1234, options)).toEqual("$1,234");
    expect(moneyFormatter(123, options)).toEqual("$123");
    expect(moneyFormatter(12, options)).toEqual("$12");
    expect(moneyFormatter(1, options)).toEqual("$1");
  });
});

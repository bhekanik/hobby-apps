import { deals } from "fixtures";
import { describe, expect, it } from "vitest";
import { formatTopCountries } from "./formatTopCountries";

describe("formatTopCountries", () => {
  it("should return the expected formatted top deals when empty array is given", () => {
    expect(formatTopCountries([])).toEqual([]);
  });

  it("should return the expected formated top deals", () => {
    expect(formatTopCountries(deals)).toEqual([
      "Nigeria - 13 deals",
      "Kenya - 6 deals",
      "South Africa - 5 deals",
      "Egypt - 4 deals",
      "Morocco - 4 deals",
    ]);
  });

  it("should return the expected number formated top deals when top option is specified", () => {
    expect(formatTopCountries(deals, { top: 7 })).toEqual([
      "Nigeria - 13 deals",
      "Kenya - 6 deals",
      "South Africa - 5 deals",
      "Egypt - 4 deals",
      "Morocco - 4 deals",
      "Senegal - 3 deals",
      "Zimbabwe - 2 deals",
    ]);
  });
});

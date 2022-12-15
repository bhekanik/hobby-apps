import { deals } from "fixtures";
import { expect } from "vitest";
import {
  getFormattedSectorCounts,
  getSectorCounts,
  getSectors,
} from "./getSectorCounts";

describe("getSectorCounts", () => {
  it("should return the correct sector counts", () => {
    expect(getSectorCounts(deals)).toEqual({
      Agritech: 3,
      "Cleantech & Waste Management": 1,
      "E-Commerce": 1,
      "Energy & Climatetech": 2,
      Insuretech: 2,
      "Transport & Logistics": 2,
      "Web3 & Blockchain": 2,
    });

    expect(getSectorCounts([])).toEqual({});
  });

  it("should return the correct sectors", () => {
    expect(getSectors(deals)).toEqual([
      "Insuretech",
      "E-Commerce",
      "Agritech",
      "Energy & Climatetech",
      "Transport & Logistics",
      "Web3 & Blockchain",
      "Cleantech & Waste Management",
    ]);

    expect(getSectors([])).toEqual([]);
  });

  it("should return the correct formatted sector counts", () => {
    expect(getFormattedSectorCounts(deals)).toEqual(
      "Agritech: 3, Web3 & Blockchain: 2, Transport & Logistics: 2, Energy & Climatetech: 2, Insuretech: 2, Cleantech & Waste Management: 1, E-Commerce: 1"
    );

    expect(getFormattedSectorCounts([])).toEqual("Unknown");
  });
});

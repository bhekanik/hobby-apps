import { describe, expect, it } from "vitest";
import { getTitle } from "./getTitle";

const dealflow = {
  filter: {
    country: ["All"],
    stage: "All",
    dateRange: {
      start: new Date("2022-05-07T00:46:34.126Z"),
      end: new Date("2022-06-06T00:46:34.126Z"),
    },
  },
  searchTerm: "",
  deals: 44,
  investors: 148,
  value: 441940000,
};

describe("getTitle", () => {
  it("should return the expected title for all countries", () => {
    expect(getTitle(dealflow)).toEqual(
      "All Countries fundraising roundup for 07 May, 2022 - 06 Jun, 2022"
    );
  });

  it("should return the expected title for South Africa", () => {
    const newDealflow = {
      ...dealflow,
      filter: {
        ...dealflow.filter,
        country: ["South Africa"],
      },
    };
    expect(getTitle(newDealflow)).toEqual(
      "South Africa fundraising roundup for 07 May, 2022 - 06 Jun, 2022"
    );
  });

  it("should return the expected title for many countries", () => {
    const newDealflow = {
      ...dealflow,
      filter: {
        ...dealflow.filter,
        country: ["South Africa", "Nigeria", "Ghana"],
      },
    };
    expect(getTitle(newDealflow)).toEqual(
      "South Africa, Nigeria, Ghana fundraising roundup for 07 May, 2022 - 06 Jun, 2022"
    );
  });

  it("should return second argument if it is provided", () => {
    const title = "title";
    expect(getTitle(dealflow, title)).toBe(title);
  });
});

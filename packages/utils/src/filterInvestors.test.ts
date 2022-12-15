import { deals, investors } from "fixtures";
import { expect } from "vitest";
import { filterInvestors } from "./filterInvestors";

describe("filterInvestors", () => {
  it("should return the correct investors for 0 deals when filtering", () => {
    const filteredDeals = filterInvestors([], investors);
    expect(filteredDeals).toEqual([]);
  });

  it("should return the correct deals when filtering", () => {
    const filteredInvestors = filterInvestors(deals.slice(0, 10), investors);

    expect(filteredInvestors).toEqual([
      {
        id: 45264,
        created_at: "2022-07-26T11:01:18.161507+00:00",
        name: "Global Ventures",
        website: "",
        logo_id: null,
        logo: null,
      },
      {
        id: 45291,
        created_at: "2022-07-26T11:01:21.397109+00:00",
        name: "Kepple Africa Ventures",
        website: "",
        logo_id: null,
        logo: null,
      },
      {
        id: 45315,
        created_at: "2022-07-26T11:01:29.864013+00:00",
        name: "Undisclosed",
        website: "",
        logo_id: null,
        logo: null,
      },
      {
        id: 45342,
        created_at: "2022-07-26T11:01:35.422853+00:00",
        name: "500 Global",
        website: "",
        logo_id: null,
        logo: null,
      },
      {
        id: 46609,
        created_at: "2022-07-26T11:08:15.361376+00:00",
        name: "Untapped Global",
        website: "",
        logo_id: null,
        logo: null,
      },
      {
        id: 46624,
        created_at: "2022-07-26T11:08:18.545151+00:00",
        name: "Next Chymia",
        website: "",
        logo_id: null,
        logo: null,
      },
      {
        id: 45372,
        created_at: "2022-07-26T11:01:41.303221+00:00",
        name: "International Finance Corporation",
        website: "",
        logo_id: null,
        logo: null,
      },
      {
        id: 45508,
        created_at: "2022-07-26T11:02:17.104024+00:00",
        name: "SunFunder",
        website: "",
        logo_id: null,
        logo: null,
      },
      {
        id: 45620,
        created_at: "2022-07-26T11:02:52.50035+00:00",
        name: "FMO",
        website: "",
        logo_id: null,
        logo: null,
      },
      {
        id: 45814,
        created_at: "2022-07-26T11:03:56.532016+00:00",
        name: "E4E Africa",
        website: "",
        logo_id: null,
        logo: null,
      },
      {
        id: 45955,
        created_at: "2022-07-26T11:04:34.983588+00:00",
        name: "Silicon Badia",
        website: "",
        logo_id: null,
        logo: null,
      },
      {
        id: 46891,
        created_at: "2022-08-02T15:34:19.672936+00:00",
        name: "Mercurial Advisory",
        website: "",
        logo_id: null,
        logo: null,
      },
      {
        id: 46892,
        created_at: "2022-08-02T15:34:19.865716+00:00",
        name: "Dinku Transnational",
        website: "",
        logo_id: null,
        logo: null,
      },
      {
        id: 46875,
        created_at: "2022-07-26T11:34:32.161638+00:00",
        name: "C5 Capital",
        website: "",
        logo_id: null,
        logo: null,
      },
    ]);
  });
});

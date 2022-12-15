import { deals } from "fixtures";
import { expect } from "vitest";
import { filterDeals } from "./filterDeals";
describe("filterDeals", () => {
    beforeEach(() => {
        // tell vitest we use mocked time
        vi.useFakeTimers();
    });
    afterEach(() => {
        // restoring date after each test run
        vi.useRealTimers();
    });
    it("should return the correct deals for 0 deals when filtering", () => {
        const filter = {
            country: ["All"],
            dateRange: {
                start: new Date("2022-05-06T20:00:10.822Z"),
                end: new Date("2022-05-13T20:00:10.822Z"),
            },
            stage: ["All"],
            sector: ["All"],
        };
        const filteredDeals = filterDeals([], filter);
        expect(filteredDeals).toEqual([]);
    });
    it("should return the correct deals when filtering", () => {
        const filter = {
            country: ["All"],
            dateRange: {
                start: new Date("2022-07-06T20:00:10.822Z"),
                end: new Date("2022-07-07T20:00:10.822Z"),
            },
            stage: ["All"],
            sector: ["All"],
        };
        const filteredDeals = filterDeals(deals, filter);
        expect(filteredDeals).toEqual([
            {
                id: 22245,
                created_at: "2022-07-26T11:08:09.396255+00:00",
                amount: 2000000,
                press_release_id: 22293,
                company_id: 17766,
                stage: "Seed",
                investors: ["CrossFund", "Roselake Ventures", "Techstars", "Mo Angels"],
                company: {
                    id: 17766,
                    created_at: "2022-07-26T11:04:52.645383+00:00",
                    name: "Duhqa",
                    country: "KE",
                    female_founder: false,
                    diverse_founders: false,
                    launch_year: "2021",
                    website: "https://www.duhqa.com/",
                    about: "Kenyan last-mile end-to-end supply chain and distribution platform.",
                    logo_id: 1155,
                    sector: "[]",
                    logo: {
                        id: 1155,
                        created_at: "2022-04-19T19:00:45.430038+00:00",
                        cloudinary_public_id: "logos/fbqz3ztgmebecoow83pk",
                        url: "https://res.cloudinary.com/dealbase-africa/image/upload/v1650394843/logos/fbqz3ztgmebecoow83pk.png",
                        format: "png",
                        original_filename: "Duhqa",
                    },
                },
                press_release: {
                    id: 22293,
                    created_at: "2022-07-26T11:08:09.018534+00:00",
                    title: null,
                    link: "https://disrupt-africa.com/2022/07/07/kenyan-b2b-retail-distribution-startup-duhqa-raises-2m-seed-round-to-scale-regionally/",
                    date: "2022-07-07",
                    company_id: 17766,
                },
            },
            {
                id: 22246,
                created_at: "2022-07-26T11:08:09.604953+00:00",
                amount: 0,
                press_release_id: 22294,
                company_id: 18090,
                stage: "Unnamed",
                investors: ["CFAO"],
                company: {
                    id: 18090,
                    created_at: "2022-07-26T11:08:09.405265+00:00",
                    name: "OFGEN",
                    country: "KE",
                    female_founder: false,
                    diverse_founders: false,
                    launch_year: "2014",
                    website: "https://ofgen.africa/",
                    about: "Leader of solar PV installation for commercial and industrial use in East Africa",
                    logo_id: 1993,
                    sector: "[]",
                    logo: {
                        id: 1993,
                        created_at: "2022-07-10T15:00:04.725146+00:00",
                        cloudinary_public_id: "logos/sbvfgvjnpo5auhegzv2w",
                        url: "https://res.cloudinary.com/dealbase-africa/image/upload/v1657465202/logos/sbvfgvjnpo5auhegzv2w.png",
                        format: "png",
                        original_filename: "OFGEN",
                    },
                },
                press_release: {
                    id: 22294,
                    created_at: "2022-07-26T11:08:09.461628+00:00",
                    title: null,
                    link: "https://media.getfundedafrica.com/2022/07/07/cfao-kenya-invests-in-ofgen-to-expand-use-of-renewable-energy-in-africa/",
                    date: "2022-07-07",
                    company_id: 18090,
                },
            },
            {
                id: 22247,
                created_at: "2022-07-26T11:08:09.878671+00:00",
                amount: 0,
                press_release_id: 22295,
                company_id: 18091,
                stage: "Unnamed",
                investors: ["P1 Ventures"],
                company: {
                    id: 18091,
                    created_at: "2022-07-26T11:08:09.72391+00:00",
                    name: "Paymee",
                    country: "TN",
                    female_founder: false,
                    diverse_founders: false,
                    launch_year: "2018",
                    website: "https://www.paymee.tn/",
                    about: "Paymee offers online payment acceptance solutions to online merchants.",
                    logo_id: 1994,
                    sector: "[]",
                    logo: {
                        id: 1994,
                        created_at: "2022-07-10T15:00:08.482134+00:00",
                        cloudinary_public_id: "logos/azeyicp7fxhxpwu0bvdf",
                        url: "https://res.cloudinary.com/dealbase-africa/image/upload/v1657465206/logos/azeyicp7fxhxpwu0bvdf.png",
                        format: "png",
                        original_filename: "Paymee",
                    },
                },
                press_release: {
                    id: 22295,
                    created_at: "2022-07-26T11:08:09.79218+00:00",
                    title: null,
                    link: "https://www.wamda.com/2022/07/tunisia-paymee-raises-figure-round-led-p1-ventures",
                    date: "2022-07-07",
                    company_id: 18091,
                },
            },
            {
                id: 22571,
                created_at: "2022-08-11T07:35:04.574157+00:00",
                amount: 5100000,
                press_release_id: 22621,
                company_id: 18261,
                stage: "Unnamed",
                investors: ["Symbiotics"],
                company: {
                    id: 18261,
                    created_at: "2022-08-11T07:35:03.571338+00:00",
                    name: "Baobab+",
                    country: "",
                    female_founder: false,
                    diverse_founders: false,
                    launch_year: "2015",
                    website: "https://www.baobabplus.com/",
                    about: "Baobab+ is a social enterprise that acts in the areas of access to PAYG solar energy and digital products.",
                    logo_id: 2123,
                    sector: '["Energy & Climatetech"]',
                    logo: {
                        id: 2123,
                        created_at: "2022-08-11T07:35:02.934542+00:00",
                        cloudinary_public_id: "kkmhjbiyacfakee3qtek",
                        url: "https://res.cloudinary.com/dealbase-africa/image/upload/v1660203249/kkmhjbiyacfakee3qtek.webp",
                        format: "webp",
                        original_filename: "Baobab",
                    },
                },
                press_release: {
                    id: 22621,
                    created_at: "2022-08-11T07:35:03.990545+00:00",
                    title: null,
                    link: "https://www.microcapital.org/microcapital-brief-baobab-borrows-5-1m-from-symbiotics-to-boost-solar-electrification-in-6-countries-in-africa/",
                    date: "2022-07-07",
                    company_id: 18261,
                },
            },
        ]);
    });
});
//# sourceMappingURL=filterDeals.test.js.map
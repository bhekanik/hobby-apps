import { expect } from "vitest";
import { createDateAsUTC } from "./createDateAsUTC";
describe("createDateAsUTC", () => {
    it("should return the provided date in UTC", () => {
        const utcDate = createDateAsUTC(new Date("17/05/2022"?.toString()?.trim().split("/").reverse().join("/")));
        expect(utcDate).toEqual(new Date("2022-05-17T00:00:00.000Z"));
    });
});
//# sourceMappingURL=createDateAsUTC.test.js.map
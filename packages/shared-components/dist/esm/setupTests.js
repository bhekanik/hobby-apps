/// <reference types="vitest/globals" />
import matchers from "@testing-library/jest-dom/matchers";
import { expect } from "vitest";
expect.extend(matchers);
// Throw if a console error matches the blacklist
const blacklist = [
    "Invalid prop",
    "Failed prop type",
    "Can't call setState (or forceUpdate) on an unmounted component",
    'Each child in an array or iterator should have a unique "key" prop',
];
const error = console.error;
console.error = (message, ...args) => {
    blacklist.forEach((item) => {
        var _a;
        if (((_a = message === null || message === void 0 ? void 0 : message.indexOf) === null || _a === void 0 ? void 0 : _a.call(message, item)) !== -1)
            throw new Error(message);
    });
    error.apply(console, [message, ...args]);
};
//# sourceMappingURL=setupTests.js.map
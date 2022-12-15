"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference types="vitest/globals" />
const matchers_1 = __importDefault(require("@testing-library/jest-dom/matchers"));
const vitest_1 = require("vitest");
vitest_1.expect.extend(matchers_1.default);
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
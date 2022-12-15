"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@testing-library/react");
const _1 = require(".");
Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
});
describe("ColorModeToggle", () => {
    it("should render as expected", () => {
        (0, react_1.render)((0, jsx_runtime_1.jsx)(_1.ColorModeToggle, {}));
    });
});
//# sourceMappingURL=ColorModeToggle.test.js.map
import { jsx as _jsx } from "react/jsx-runtime";
import { render } from "@testing-library/react";
import { ColorModeToggle } from ".";
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
        render(_jsx(ColorModeToggle, {}));
    });
});
//# sourceMappingURL=ColorModeToggle.test.js.map
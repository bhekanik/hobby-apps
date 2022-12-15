"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorModeToggle = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const icons_1 = require("@chakra-ui/icons");
const react_1 = require("@chakra-ui/react");
const ColorModeToggle = (_a) => {
    var { onClick, override = false } = _a, props = __rest(_a, ["onClick", "override"]);
    const { colorMode, toggleColorMode } = (0, react_1.useColorMode)();
    const [isLessThan768] = (0, react_1.useMediaQuery)("(max-width: 768px)");
    const handleClick = (e) => {
        onClick === null || onClick === void 0 ? void 0 : onClick(e);
        if (!override)
            toggleColorMode();
    };
    return ((0, jsx_runtime_1.jsx)(react_1.IconButton, Object.assign({}, props, { name: "color-mode-toggle", role: "button", size: isLessThan768 ? "lg" : "md", "aria-label": "Toggle Dark Mode", icon: colorMode === "dark" ? (0, jsx_runtime_1.jsx)(icons_1.SunIcon, {}) : (0, jsx_runtime_1.jsx)(icons_1.MoonIcon, {}), onClick: handleClick })));
};
exports.ColorModeToggle = ColorModeToggle;
//# sourceMappingURL=index.js.map
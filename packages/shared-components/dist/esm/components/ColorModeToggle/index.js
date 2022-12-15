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
import { jsx as _jsx } from "react/jsx-runtime";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { IconButton, useColorMode, useMediaQuery, } from "@chakra-ui/react";
export const ColorModeToggle = (_a) => {
    var { onClick, override = false } = _a, props = __rest(_a, ["onClick", "override"]);
    const { colorMode, toggleColorMode } = useColorMode();
    const [isLessThan768] = useMediaQuery("(max-width: 768px)");
    const handleClick = (e) => {
        onClick === null || onClick === void 0 ? void 0 : onClick(e);
        if (!override)
            toggleColorMode();
    };
    return (_jsx(IconButton, Object.assign({}, props, { name: "color-mode-toggle", role: "button", size: isLessThan768 ? "lg" : "md", "aria-label": "Toggle Dark Mode", icon: colorMode === "dark" ? _jsx(SunIcon, {}) : _jsx(MoonIcon, {}), onClick: handleClick })));
};
//# sourceMappingURL=index.js.map
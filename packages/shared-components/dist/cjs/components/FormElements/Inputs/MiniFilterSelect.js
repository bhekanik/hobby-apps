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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiniFilterSelect = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const image_1 = __importDefault(require("next/image"));
const MiniFilterSelect = (_a) => {
    var { helperText, errorMessage, label, children, noBorder, icon, flex } = _a, otherProps = __rest(_a, ["helperText", "errorMessage", "label", "children", "noBorder", "icon", "flex"]);
    const [isLessThan960] = (0, react_1.useMediaQuery)("(max-width: 960px)");
    return ((0, jsx_runtime_1.jsxs)(react_1.Flex, Object.assign({ alignItems: "top", w: "full", flex: flex }, (noBorder ? {} : { borderRight: "1px solid" }), { children: [icon && ((0, jsx_runtime_1.jsx)(react_1.Box, Object.assign({ mt: "-16px", w: "64px" }, { children: (0, jsx_runtime_1.jsx)(image_1.default, { alt: "icon", src: icon || "", width: 64, height: 64 }) }))), (0, jsx_runtime_1.jsxs)(react_1.FormControl, Object.assign({ w: "full", variant: "filter" }, { children: [(0, jsx_runtime_1.jsx)(react_1.Select, Object.assign({ _focus: {
                            outline: "none",
                        }, border: "none" }, otherProps, { size: "sm" }, { children: children })), label && ((0, jsx_runtime_1.jsx)(react_1.FormLabel, Object.assign({ fontSize: isLessThan960 ? 18 : 25, fontWeight: "bold", htmlFor: otherProps.id }, { children: label }))), helperText && (0, jsx_runtime_1.jsx)(react_1.FormHelperText, { children: helperText }), errorMessage && (0, jsx_runtime_1.jsx)(react_1.FormErrorMessage, { children: errorMessage })] }))] })));
};
exports.MiniFilterSelect = MiniFilterSelect;
//# sourceMappingURL=MiniFilterSelect.js.map
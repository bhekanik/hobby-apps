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
exports.FilterSelect = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const image_1 = __importDefault(require("next/image"));
const FilterSelect = (_a) => {
    var { helperText, errorMessage, label, children, noBorder, icon, flex } = _a, otherProps = __rest(_a, ["helperText", "errorMessage", "label", "children", "noBorder", "icon", "flex"]);
    return ((0, jsx_runtime_1.jsxs)(react_1.Flex, Object.assign({ alignItems: "top", w: "full", flex: flex }, (noBorder ? {} : { borderRight: "1px solid" }), { children: [icon && ((0, jsx_runtime_1.jsx)(react_1.Box, Object.assign({ mt: "-16px", w: "64px" }, { children: (0, jsx_runtime_1.jsx)(image_1.default, { alt: "icon", src: icon || "", width: 64, height: 64 }) }))), (0, jsx_runtime_1.jsxs)(react_1.FormControl, Object.assign({ variant: "filter" }, { children: [(0, jsx_runtime_1.jsx)(react_1.Select, Object.assign({ _focus: {
                            outline: "none",
                        }, w: "full", border: "none" }, otherProps, { size: "sm" }, { children: children })), label && ((0, jsx_runtime_1.jsx)(react_1.FormLabel, Object.assign({ fontSize: 25, fontWeight: "bold", htmlFor: otherProps.id }, { children: label }))), helperText && (0, jsx_runtime_1.jsx)(react_1.FormHelperText, { children: helperText }), errorMessage && (0, jsx_runtime_1.jsx)(react_1.FormErrorMessage, { children: errorMessage })] }))] })));
};
exports.FilterSelect = FilterSelect;
//# sourceMappingURL=FilterSelect.js.map
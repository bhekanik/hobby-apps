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
exports.MiniCheckPicker = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const image_1 = __importDefault(require("next/image"));
const rsuite_1 = require("rsuite");
const MiniCheckPicker = (_a) => {
    var { label, data, noBorder, icon, flex, value, defaultValue, onClean, onChange, placeholder, isGrouped = false } = _a, otherProps = __rest(_a, ["label", "data", "noBorder", "icon", "flex", "value", "defaultValue", "onClean", "onChange", "placeholder", "isGrouped"]);
    const [isLessThan960] = (0, react_1.useMediaQuery)("(max-width: 960px)");
    const { colorMode } = (0, react_1.useColorMode)();
    return ((0, jsx_runtime_1.jsxs)(react_1.Flex, Object.assign({ alignItems: "top", w: "full", flex: flex, gap: 2 }, (noBorder ? {} : { borderRight: "1px solid" }), { children: [icon && ((0, jsx_runtime_1.jsx)(react_1.Box, Object.assign({ mt: "-16px", w: "64px" }, { children: (0, jsx_runtime_1.jsx)(image_1.default, { alt: "icon", src: icon || "", width: 64, height: 64 }) }))), (0, jsx_runtime_1.jsxs)(react_1.Flex, Object.assign({ d: "column", w: "full" }, { children: [label && ((0, jsx_runtime_1.jsx)(react_1.FormLabel, Object.assign({ m: 0, mt: "-16px", fontSize: isLessThan960 ? 16 : 22, fontWeight: "bold", htmlFor: otherProps.id }, { children: label }))), (0, jsx_runtime_1.jsx)(rsuite_1.CustomProvider, Object.assign({ theme: colorMode }, { children: (0, jsx_runtime_1.jsx)(rsuite_1.CheckPicker, { sticky: true, appearance: "subtle", preventOverflow: true, onClean: onClean, disabledItemValues: value.length > 0 && value[0] !== "All" ? ["All"] : [], cleanable: true, placeholder: placeholder || "Select a value", data: data.map(({ label, value }) => {
                                var _a, _b;
                                return ({
                                    label,
                                    value,
                                    group: ((_b = (_a = label.at) === null || _a === void 0 ? void 0 : _a.call(label, 0)) === null || _b === void 0 ? void 0 : _b.toUpperCase()) || "",
                                });
                            }), groupBy: isGrouped ? "group" : undefined, value: value, size: "xs", onSelect: onChange, placement: isLessThan960 ? "bottom" : "leftStart", style: {
                                marginTop: "-16px",
                                marginLeft: "-7px",
                                maxWidth: isLessThan960 ? "initial" : 200,
                                width: "100%",
                            }, defaultValue: defaultValue }) }))] }))] })));
};
exports.MiniCheckPicker = MiniCheckPicker;
exports.default = exports.MiniCheckPicker;
//# sourceMappingURL=MiniCheckPicker.js.map
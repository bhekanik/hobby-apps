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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Flex, FormLabel, useColorMode, useMediaQuery, } from "@chakra-ui/react";
import Image from "next/image";
import { CheckPicker as RSCheckPicker, CustomProvider as RSuiteProvider, } from "rsuite";
export const CheckPicker = (_a) => {
    var { label, data, noBorder, icon, flex, value, defaultValue, onClean, onChange, placeholder, isGrouped = false } = _a, otherProps = __rest(_a, ["label", "data", "noBorder", "icon", "flex", "value", "defaultValue", "onClean", "onChange", "placeholder", "isGrouped"]);
    const [isLessThan960] = useMediaQuery("(max-width: 960px)");
    const { colorMode } = useColorMode();
    return (_jsxs(Flex, Object.assign({ alignItems: "top", w: "full", flex: flex, gap: 2 }, (noBorder ? {} : { borderRight: "1px solid" }), { children: [icon && (_jsx(Box, Object.assign({ mt: "-16px", w: "64px" }, { children: _jsx(Image, { alt: "icon", src: icon || "", width: 64, height: 64 }) }))), _jsxs(Flex, Object.assign({ d: "column", w: "full" }, { children: [label && (_jsx(FormLabel, Object.assign({ m: 0, mt: "-16px", fontSize: 22, fontWeight: "bold", htmlFor: otherProps.id }, { children: label }))), _jsx(RSuiteProvider, Object.assign({ theme: colorMode }, { children: _jsx(RSCheckPicker, { sticky: true, appearance: "subtle", preventOverflow: true, onClean: onClean, disabledItemValues: value.length > 0 && value[0] !== "All" ? ["All"] : [], cleanable: true, placeholder: placeholder || "Select a value", data: data.map(({ label, value }) => {
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
export default CheckPicker;
//# sourceMappingURL=CheckPicker.js.map
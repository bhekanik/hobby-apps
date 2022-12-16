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
import { Box, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Select as ChakraSelect, } from "@chakra-ui/react";
import Image from "next/image";
export const FilterSelect = (_a) => {
    var { helperText, errorMessage, label, children, noBorder, icon, flex } = _a, otherProps = __rest(_a, ["helperText", "errorMessage", "label", "children", "noBorder", "icon", "flex"]);
    return (_jsxs(Flex, Object.assign({ alignItems: "top", w: "full", flex: flex }, (noBorder ? {} : { borderRight: "1px solid" }), { children: [icon && (_jsx(Box, Object.assign({ mt: "-16px", w: "64px" }, { children: _jsx(Image, { alt: "icon", src: icon || "", width: 64, height: 64 }) }))), _jsxs(FormControl, Object.assign({ variant: "filter" }, { children: [_jsx(ChakraSelect, Object.assign({ _focus: {
                            outline: "none",
                        }, w: "full", border: "none" }, otherProps, { size: "sm" }, { children: children })), label && (_jsx(FormLabel, Object.assign({ fontSize: 25, fontWeight: "bold", htmlFor: otherProps.id }, { children: label }))), helperText && _jsx(FormHelperText, { children: helperText }), errorMessage && _jsx(FormErrorMessage, { children: errorMessage })] }))] })));
};
//# sourceMappingURL=FilterSelect.js.map
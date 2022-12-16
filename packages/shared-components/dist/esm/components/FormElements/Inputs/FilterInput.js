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
import { FormControl, FormErrorMessage, FormHelperText, FormLabel, Input as ChakraInput, } from "@chakra-ui/react";
export const FilterInput = (_a) => {
    var { helperText, errorMessage, label } = _a, otherProps = __rest(_a, ["helperText", "errorMessage", "label"]);
    return (_jsxs(FormControl, Object.assign({ variant: "floating" }, { children: [_jsx(ChakraInput, Object.assign({}, otherProps)), label && _jsx(FormLabel, Object.assign({ htmlFor: otherProps.id }, { children: label })), helperText && _jsx(FormHelperText, { children: helperText }), errorMessage && _jsx(FormErrorMessage, { children: errorMessage })] })));
};
//# sourceMappingURL=FilterInput.js.map
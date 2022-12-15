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
import { FormControl, FormErrorMessage, FormHelperText, FormLabel, Select as ChakraSelect, } from "@chakra-ui/react";
import { forwardRef } from "react";
import { useController } from "react-hook-form";
export const SelectBase = (_a) => {
    var { helperText, errorMessage, ariaLabel, placeholder, label, control, register = {}, name, children } = _a, otherProps = __rest(_a, ["helperText", "errorMessage", "ariaLabel", "placeholder", "label", "control", "register", "name", "children"]);
    const _b = useController({
        name,
        control,
        rules: register,
    }).field, { ref } = _b, inputProps = __rest(_b, ["ref"]);
    const fieldProps = {
        "aria-label": ariaLabel || label || "",
        placeholder: placeholder,
    };
    if (label) {
        fieldProps.placeholder = "";
    }
    return (_jsxs(FormControl, Object.assign({}, otherProps, { variant: "floating" }, { children: [_jsx(ChakraSelect, Object.assign({}, inputProps, fieldProps, { ref: ref }, { children: children })), label && _jsx(FormLabel, Object.assign({ htmlFor: otherProps.id }, { children: label })), helperText && _jsx(FormHelperText, { children: helperText }), errorMessage && _jsx(FormErrorMessage, { children: errorMessage })] })));
};
export const Select = forwardRef(SelectBase);
//# sourceMappingURL=Select.js.map
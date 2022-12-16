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
import { FormControl, FormErrorMessage, FormHelperText, FormLabel, forwardRef, Input as ChakraInput, } from "@chakra-ui/react";
import { useController } from "react-hook-form";
const InputBase = (_a) => {
    var { helperText, errorMessage, ariaLabel, placeholder, label, control, register = {}, name } = _a, otherProps = __rest(_a, ["helperText", "errorMessage", "ariaLabel", "placeholder", "label", "control", "register", "name"]);
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
    return (_jsxs(FormControl, Object.assign({}, otherProps, { variant: "floating" }, { children: [_jsx(ChakraInput, Object.assign({}, inputProps, fieldProps, { ref: ref })), label && _jsx(FormLabel, Object.assign({ htmlFor: otherProps.id }, { children: label })), helperText && _jsx(FormHelperText, { children: helperText }), errorMessage && _jsx(FormErrorMessage, { children: errorMessage })] })));
};
export const Input = forwardRef(InputBase);
//# sourceMappingURL=Input.js.map
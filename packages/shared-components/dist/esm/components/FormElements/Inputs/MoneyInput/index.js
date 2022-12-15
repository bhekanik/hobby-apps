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
import { FormControl } from "@chakra-ui/react";
import { useController } from "react-hook-form";
import MoneyInputBase from "./MoneyInputBase";
const MoneyInput = ({ defaultValue, name, control, ariaLabel, placeholder, label, register = {}, }) => {
    const _a = useController({
        name,
        control,
        rules: register,
        defaultValue: defaultValue || 0,
    }).field, { ref } = _a, inputProps = __rest(_a, ["ref"]);
    const fieldProps = {
        "aria-label": ariaLabel || label || "",
        placeholder: placeholder,
    };
    if (label) {
        fieldProps.placeholder = "";
    }
    return (_jsx(FormControl, { children: _jsx(MoneyInputBase, Object.assign({}, inputProps, fieldProps, { label: label, ref: ref })) }));
};
export default MoneyInput;
//# sourceMappingURL=index.js.map
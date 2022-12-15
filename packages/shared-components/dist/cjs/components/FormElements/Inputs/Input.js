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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Input = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const react_hook_form_1 = require("react-hook-form");
const InputBase = (_a) => {
    var { helperText, errorMessage, ariaLabel, placeholder, label, control, register = {}, name } = _a, otherProps = __rest(_a, ["helperText", "errorMessage", "ariaLabel", "placeholder", "label", "control", "register", "name"]);
    const _b = (0, react_hook_form_1.useController)({
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
    return ((0, jsx_runtime_1.jsxs)(react_1.FormControl, Object.assign({}, otherProps, { variant: "floating" }, { children: [(0, jsx_runtime_1.jsx)(react_1.Input, Object.assign({}, inputProps, fieldProps, { ref: ref })), label && (0, jsx_runtime_1.jsx)(react_1.FormLabel, Object.assign({ htmlFor: otherProps.id }, { children: label })), helperText && (0, jsx_runtime_1.jsx)(react_1.FormHelperText, { children: helperText }), errorMessage && (0, jsx_runtime_1.jsx)(react_1.FormErrorMessage, { children: errorMessage })] })));
};
exports.Input = (0, react_1.forwardRef)(InputBase);
//# sourceMappingURL=Input.js.map
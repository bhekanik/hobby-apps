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
import { Text, useColorMode } from "@chakra-ui/react";
const FormFieldLabel = (_a) => {
    var { children, w, width, minW, minWidth, color } = _a, rest = __rest(_a, ["children", "w", "width", "minW", "minWidth", "color"]);
    const { colorMode } = useColorMode();
    return (_jsx(Text, Object.assign({}, rest, { w: w || width || "30%", minW: minW || minWidth || "max-content", color: color || colorMode === "dark" ? "gray.400" : "gray.700" }, { children: children })));
};
export default FormFieldLabel;
//# sourceMappingURL=FormFieldLabel.js.map
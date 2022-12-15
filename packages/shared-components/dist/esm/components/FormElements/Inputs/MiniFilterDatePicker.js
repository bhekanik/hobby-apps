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
import { CustomProvider as RSuiteProvider, DateRangePicker } from "rsuite";
export const MiniDatePicker = (_a) => {
    var { noBorder, icon, flex, label, value, onOk } = _a, otherProps = __rest(_a, ["noBorder", "icon", "flex", "label", "value", "onOk"]);
    const { afterToday, combine, before } = DateRangePicker;
    const [isLessThan768] = useMediaQuery("(max-width: 768px)");
    const { colorMode } = useColorMode();
    return (_jsxs(Flex, Object.assign({ alignItems: "top", w: "full", flex: flex, gap: 2 }, (noBorder ? {} : { borderRight: "1px solid" }), { children: [icon && (_jsx(Box, Object.assign({ mt: "-12px", w: "64px" }, { children: _jsx(Image, { alt: "icon", src: icon || "", width: 64, height: 64 }) }))), _jsxs(Flex, Object.assign({ d: "column", w: "full" }, { children: [label && (_jsx(FormLabel, Object.assign({ m: 0, mt: "-16px", fontSize: isLessThan768 ? 16 : 22, fontWeight: "bold", htmlFor: otherProps.id }, { children: label }))), _jsx(RSuiteProvider, Object.assign({ theme: colorMode }, { children: _jsx(DateRangePicker, { id: otherProps.id, placeholder: "Select date", showOneCalendar: isLessThan768, preventOverflow: true, size: "xs", style: { marginTop: "-16px", marginLeft: "-7px", width: "100%" }, disabledDate: combine === null || combine === void 0 ? void 0 : combine(afterToday === null || afterToday === void 0 ? void 0 : afterToday(), before === null || before === void 0 ? void 0 : before(new Date("2021-01-01"))), value: [
                                typeof value[0] === "string" ? new Date(value[0]) : value[0],
                                typeof value[1] === "string" ? new Date(value[1]) : value[1],
                            ], onOk: onOk, ranges: [
                            // {
                            //   label: "Last 7 days",
                            //   value: [subDays(new Date(), 6), new Date()],
                            // },
                            // {
                            //   label: "Last month",
                            //   value: [subDays(new Date(), 30), new Date()],
                            // },
                            // {
                            //   label: "Last 3 months",
                            //   value: [subMonths(new Date(), 3), new Date()],
                            // },
                            // {
                            //   label: "Last 6 months",
                            //   value: [subMonths(new Date(), 6), new Date()],
                            // },
                            // {
                            //   label: "Last year",
                            //   value: [subMonths(new Date(), 12), new Date()],
                            // },
                            // {
                            //   label: "Since beginning of 2021",
                            //   value: [new Date("2021-01-01"), new Date()],
                            // },
                            ] }) }))] }))] })));
};
export default MiniDatePicker;
//# sourceMappingURL=MiniFilterDatePicker.js.map
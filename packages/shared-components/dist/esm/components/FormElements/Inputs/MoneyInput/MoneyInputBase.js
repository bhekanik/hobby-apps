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
import { Button, HStack, Input, InputGroup, InputLeftAddon, useNumberInput, } from "@chakra-ui/react";
import * as React from "react";
import FormFieldLabel from "../../FormFieldLabel";
const MoneyInputBase = (props, ref) => {
    const { onChange, value: inputValue, label } = props, rest = __rest(props, ["onChange", "value", "label"]);
    const handleChange = (valueAsString, valueAsNumber) => {
        let valueToSave = valueAsNumber || Number(valueAsString);
        if (isNaN(valueToSave))
            valueToSave = 0;
        setValue(valueToSave);
    };
    const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
        step: 1000.0,
        precision: 2,
        onChange: handleChange,
        value: inputValue,
        isReadOnly: false,
    });
    const inc = getIncrementButtonProps();
    const dec = getDecrementButtonProps();
    const input = getInputProps({});
    const [value, setValue] = React.useState(inputValue || 0);
    React.useEffect(() => {
        onChange && onChange(value);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);
    return (_jsxs(HStack, { children: [label && (_jsx(FormFieldLabel, Object.assign({ pl: "2", w: "30%" }, { children: label }))), _jsx(Button, Object.assign({}, dec, { children: "-" })), _jsxs(InputGroup, { children: [_jsx(InputLeftAddon, { children: "$" }), _jsx(Input, Object.assign({ ref: ref }, rest, input))] }), _jsx(Button, Object.assign({}, inc, { children: "+" }))] }));
};
export default React.forwardRef(MoneyInputBase);
//# sourceMappingURL=MoneyInputBase.js.map
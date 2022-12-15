"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const React = __importStar(require("react"));
const FormFieldLabel_1 = __importDefault(require("../../FormFieldLabel"));
const MoneyInputBase = (props, ref) => {
    const { onChange, value: inputValue, label } = props, rest = __rest(props, ["onChange", "value", "label"]);
    const handleChange = (valueAsString, valueAsNumber) => {
        let valueToSave = valueAsNumber || Number(valueAsString);
        if (isNaN(valueToSave))
            valueToSave = 0;
        setValue(valueToSave);
    };
    const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = (0, react_1.useNumberInput)({
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
    return ((0, jsx_runtime_1.jsxs)(react_1.HStack, { children: [label && ((0, jsx_runtime_1.jsx)(FormFieldLabel_1.default, Object.assign({ pl: "2", w: "30%" }, { children: label }))), (0, jsx_runtime_1.jsx)(react_1.Button, Object.assign({}, dec, { children: "-" })), (0, jsx_runtime_1.jsxs)(react_1.InputGroup, { children: [(0, jsx_runtime_1.jsx)(react_1.InputLeftAddon, { children: "$" }), (0, jsx_runtime_1.jsx)(react_1.Input, Object.assign({ ref: ref }, rest, input))] }), (0, jsx_runtime_1.jsx)(react_1.Button, Object.assign({}, inc, { children: "+" }))] }));
};
exports.default = React.forwardRef(MoneyInputBase);
//# sourceMappingURL=MoneyInputBase.js.map
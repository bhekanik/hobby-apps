/// <reference types="react" />
import { Control, RegisterOptions } from "react-hook-form";
interface OwnProps {
    defaultValue: number;
    name: string;
    ariaLabel?: string;
    placeholder?: string;
    label?: string;
    control: Control<any, any>;
    register?: RegisterOptions;
}
declare const MoneyInput: ({ defaultValue, name, control, ariaLabel, placeholder, label, register, }: OwnProps) => JSX.Element;
export default MoneyInput;

import { FormControlProps } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { Control, RegisterOptions } from "react-hook-form";
interface Props {
    helperText?: string;
    name: string;
    errorMessage?: string;
    ariaLabel?: string;
    placeholder?: string;
    control: Control<any, any>;
    register?: RegisterOptions;
}
type LabelProps = {
    label?: never;
    id?: string;
} | {
    label: string;
    id: string;
};
export declare const SelectBase: ({ helperText, errorMessage, ariaLabel, placeholder, label, control, register, name, children, ...otherProps }: PropsWithChildren<Props & Omit<FormControlProps, "label" | "id"> & LabelProps>) => JSX.Element;
export declare const Select: import("react").ForwardRefExoticComponent<(Props & Omit<FormControlProps, "label" | "id"> & LabelProps) & import("react").RefAttributes<unknown>>;
export {};

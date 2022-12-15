import { InputProps } from "@chakra-ui/react";
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
declare type LabelProps = {
    label?: never;
    id?: string;
} | {
    label: string;
    id: string;
};
export declare const Input: import("@chakra-ui/react").ComponentWithAs<import("@chakra-ui/react").As<any>, Props & Omit<InputProps, "label" | "id"> & LabelProps>;
export {};

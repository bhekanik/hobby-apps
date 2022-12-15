/// <reference types="react" />
import { InputProps } from "@chakra-ui/react";
interface Props {
    helperText?: string;
    errorMessage?: string;
}
type LabelProps = {
    label?: never;
    id?: string;
} | {
    label: string;
    id: string;
};
export declare const FilterInput: ({ helperText, errorMessage, label, ...otherProps }: Props & Omit<InputProps, "label" | "id"> & LabelProps) => JSX.Element;
export {};

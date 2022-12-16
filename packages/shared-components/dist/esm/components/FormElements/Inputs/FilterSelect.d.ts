import { SelectProps } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
interface Props {
    helperText?: string;
    errorMessage?: string;
    icon?: string;
    noBorder?: boolean;
    flex?: number;
}
type LabelProps = {
    label?: never;
    id?: string;
} | {
    label: string;
    id: string;
};
export declare const FilterSelect: ({ helperText, errorMessage, label, children, noBorder, icon, flex, ...otherProps }: PropsWithChildren<Props & Omit<SelectProps, "label" | "id" | "icon"> & LabelProps>) => JSX.Element;
export {};

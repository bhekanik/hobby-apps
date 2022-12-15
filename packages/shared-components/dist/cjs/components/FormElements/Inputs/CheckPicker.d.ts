import { PropsWithChildren, ReactNode, SyntheticEvent } from "react";
interface Props {
    helperText?: string;
    errorMessage?: string;
    icon?: string;
    noBorder?: boolean;
    flex?: number;
    data: {
        label: string;
        value: string;
    }[];
    value: string[];
    defaultValue?: string[];
    onChange: (value: string[], item: {
        label?: string | ReactNode;
        value?: string | number | undefined;
    }, event: SyntheticEvent<Element, Event>) => void;
    onClean?: (event: SyntheticEvent) => void;
    placeholder?: string;
    isGrouped?: boolean;
}
declare type LabelProps = {
    label?: never;
    id?: string;
} | {
    label: string;
    id: string;
};
export declare const CheckPicker: ({ label, data, noBorder, icon, flex, value, defaultValue, onClean, onChange, placeholder, isGrouped, ...otherProps }: PropsWithChildren<Props & LabelProps>) => JSX.Element;
export default CheckPicker;

import * as React from "react";
interface OwnProps {
    name?: string;
    onChange?: (value: number) => void;
    value?: number;
    placeholder?: string;
    label?: string;
}
declare const _default: React.ForwardRefExoticComponent<OwnProps & React.RefAttributes<HTMLInputElement>>;
export default _default;

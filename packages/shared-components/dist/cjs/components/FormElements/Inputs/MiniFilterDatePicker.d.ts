/// <reference types="react" />
interface Props {
    icon?: string;
    noBorder?: boolean;
    flex?: number;
    value: [Date, Date];
    onOk?: (value: [Date, Date]) => void;
}
type LabelProps = {
    label?: never;
    id?: string;
} | {
    label: string;
    id: string;
};
export declare const MiniDatePicker: ({ noBorder, icon, flex, label, value, onOk, ...otherProps }: Props & LabelProps) => JSX.Element;
export default MiniDatePicker;

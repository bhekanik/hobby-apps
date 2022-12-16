import { IconButtonProps } from "@chakra-ui/react";
import { MouseEventHandler } from "react";
interface Props {
    onClick?: MouseEventHandler<HTMLButtonElement>;
    override?: boolean;
}
export declare const ColorModeToggle: ({ onClick, override, ...props }: Props & Partial<IconButtonProps>) => JSX.Element;
export {};

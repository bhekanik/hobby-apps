/// <reference types="react" />
import { BoxProps } from "@chakra-ui/react";
interface Props {
    imageWidth: number;
    imageHeight?: number;
    publicId: string;
    alt: string;
    radius?: string;
    crop?: string;
}
export declare const CloudinaryImage: ({ publicId, imageWidth, alt, imageHeight, radius, crop, ...rest }: Props & Omit<BoxProps, "alt" | "radius">) => JSX.Element;
export {};

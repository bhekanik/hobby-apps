import { Box, BoxProps } from "@chakra-ui/react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Image } from "cloudinary-react";

interface Props {
  imageWidth: number;
  imageHeight?: number;
  publicId: string;
  alt: string;
  radius?: string;
  crop?: string;
}

export const CloudinaryImage = ({
  publicId,
  imageWidth,
  alt,
  imageHeight,
  radius,
  crop,
  ...rest
}: Props & Omit<BoxProps, "alt" | "radius">) => {
  return (
    <Box p={2} {...rest}>
      <Image
        cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
        alt={alt}
        publicId={publicId}
        width={imageWidth}
        height={imageHeight}
        crop={crop || "fill"}
        radius={radius}
      />
    </Box>
  );
};

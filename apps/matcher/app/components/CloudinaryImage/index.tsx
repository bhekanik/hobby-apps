// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Image } from "cloudinary-react";
import { AllHTMLAttributes } from "react";

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
}: Props & Omit<AllHTMLAttributes<HTMLDivElement>, "alt" | "radius">) => {
  return (
    <div className="p-2" {...rest}>
      <Image
        cloudName={process.env.CLOUDINARY_CLOUD_NAME}
        alt={alt}
        publicId={publicId}
        width={imageWidth}
        height={imageHeight}
        crop={crop || "fill"}
        radius={radius}
      />
    </div>
  );
};

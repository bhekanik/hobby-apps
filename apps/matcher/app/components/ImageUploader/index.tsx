import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Logo } from "types";
import { CloudinaryImage } from "~/components/CloudinaryImage";
import { uploadUrl } from "~/lib/cloudinary/config";
import { getSignature } from "~/lib/cloudinary/getSignature";

interface Props {
  value: Logo | null;
  onChange: (value: Logo) => void;
}

export const ImageUploader = ({ value, onChange }: Props) => {
  const [image, setImage] = useState<Logo | null>(() => value || null);

  useEffect(() => {
    if (image) {
      onChange(image);
    }
  }, [image, onChange]);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const { signature, timestamp } = await getSignature();

    const formData = new FormData();

    formData.append("file", acceptedFiles[0]);
    formData.append("signature", signature);
    formData.append("timestamp", timestamp);
    formData.append(
      "api_key",
      process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY as string
    );

    const res = await fetch(uploadUrl, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setImage({
      cloudinary_public_id: data.public_id,
      url: data.secure_url,
      format: data.format,
      original_filename: data.original_filename,
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { mimetype: ["image/*"] },
    multiple: false,
  });

  return (
    <div {...getRootProps()}>
      <input placeholder="upload image" {...getInputProps()} />
      {image ? (
        <CloudinaryImage
          publicId={image.url}
          imageWidth={64}
          imageHeight={64}
          alt="Uploaded Image"
        />
      ) : (
        <div className="p-4">+</div>
      )}
    </div>
  );
};

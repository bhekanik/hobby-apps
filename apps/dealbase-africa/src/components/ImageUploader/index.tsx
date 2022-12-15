import { AddIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { CloudinaryImage } from "shared-components";
import { useAuthHeaders } from "src/hooks/useAuthHeaders";
import { uploadUrl } from "src/lib/cloudinary/config";
import { getSignature } from "src/lib/cloudinary/getSignature";
import { Logo } from "types";

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

  const authHeaders = useAuthHeaders();
  const onDrop = useCallback(
    async (acceptedFiles) => {
      const { signature, timestamp } = await getSignature(
        authHeaders as { Authorization: string }
      );

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
    },
    [authHeaders]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: false,
  });

  return (
    <Box {...getRootProps()}>
      <input placeholder="upload image" {...getInputProps()} />
      {image ? (
        <CloudinaryImage
          publicId={image.url}
          imageWidth={64}
          imageHeight={64}
          alt="Uploaded Image"
        />
      ) : (
        <Box p={4}>
          <AddIcon fontSize={32} />
        </Box>
      )}
    </Box>
  );
};

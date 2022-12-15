import { Flex, Text } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useAuthHeaders } from "src/hooks/useAuthHeaders";
import { useLogos } from "src/hooks/useLogos";
import { useSaveLogos } from "src/hooks/useSaveLogos";
import { uploadUrl } from "src/lib/cloudinary/config";
import { getSignature } from "src/lib/cloudinary/getSignature";
import { Loader } from "../Loader";

export const BulkImageUploader = () => {
  const { logos } = useLogos();
  const [loading, setLoading] = useState(false);
  const { saveLogos } = useSaveLogos();

  const authHeaders = useAuthHeaders();

  const onDrop = useCallback(
    async (acceptedFiles) => {
      setLoading(true);
      const formData = new FormData();

      const filteredFiles = acceptedFiles
        .filter((file: File) => {
          return !logos?.find((logo) => {
            return (
              logo.original_filename === file.name.replace(/\.[^/.]+$/, "")
            );
          });
        })
        .reduce((acc: Record<string, File>, curr: File) => {
          if (acc[curr.name.replace(/\.[^/.]+$/, "")]) {
            return acc;
          } else {
            acc[curr.name.replace(/\.[^/.]+$/, "")] = curr;
            return acc;
          }
        }, {});

      const filteredFilesWithNoDuplicates = Object.values(filteredFiles);

      let promises: Promise<Response>[] = [];

      const { signature, timestamp } = await getSignature(
        authHeaders as { Authorization: string },
        { folder: "logos", eager: "c_pad,h_300,w_400|c_crop,h_200,w_260" }
      );
      // chunk
      const chunkSize = 10;
      const chunks = Math.ceil(
        filteredFilesWithNoDuplicates.length / chunkSize
      );

      for (let i = 0; i < chunks; i++) {
        const chunk = filteredFilesWithNoDuplicates.slice(
          i * chunkSize,
          (i + 1) * chunkSize
        );
        for (const file of chunk) {
          formData.append("file", file as File);
          formData.append("signature", signature);
          formData.append("timestamp", timestamp);
          formData.append(
            "api_key",
            process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY as string
          );
          formData.append("eager", "c_pad,h_300,w_400|c_crop,h_200,w_260");
          formData.append("folder", "logos");

          const promise = fetch(uploadUrl, {
            method: "POST",
            body: formData,
          });
          promises.push(promise);
        }

        const responseData = await Promise.all(promises).then((res) =>
          Promise.all(res.map((r) => r.json()))
        );

        promises = [];

        await saveLogos(
          responseData
            .filter((image) => !image.error)
            .map(
              (image: {
                public_id: string;
                secure_url: string;
                format: string;
                original_filename: string;
              }) => ({
                cloudinary_public_id: image.public_id,
                url: image.secure_url,
                format: image.format,
                original_filename: image.original_filename,
              })
            )
        );
      }

      setLoading(false);
    },
    [authHeaders, logos, saveLogos]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: true,
  });

  // const [files, setFiles] = useState<any[]>([]);

  return (
    <Flex position="relative" {...getRootProps()} flexDir="column" w="full">
      {loading && (
        <Loader
          position="absolute"
          opacity={0.8}
          top="0"
          bottom="0"
          right="0"
          left="0"
          zIndex="overlay"
        />
      )}
      {/* <FilePond
        files={files}
        onupdatefiles={(files) => {
          setFiles(files);
        }}
        server={{
          process: (
            fieldName,
            file,
            metadata,
            load,
            error,
            progress,
            abort,
            transfer,
            options
          ) => {
            onDrop([file]);
            load(file);
          },
        }}
        allowMultiple={true}
        // maxFiles={3}
        name="files"
        labelIdle='Drag and Drop your files or <span class="filepond--label-action">Browse</span>'
      /> */}
      <input placeholder="upload image" {...getInputProps()} />
      <Flex
        flex={1}
        bg={isDragActive ? "teal.50" : "teal.600"}
        color={isDragActive ? "gray.900" : "white"}
        transition={"all 0.2s ease-in-out"}
        border="1px dashed"
        borderRadius={8}
        w="full"
        p={4}
        mb={4}
        justifyContent="center"
        alignItems="center"
      >
        Drag and drop your images here or
        <Text as="span" ml={1} textDecor="underline">
          Browse
        </Text>
      </Flex>
    </Flex>
  );
};

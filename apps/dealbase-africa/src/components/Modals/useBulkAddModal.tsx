import {
  Box,
  Button,
  Flex,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { countryList } from "fixtures";
import Papa from "papaparse";
import { ComponentType, memo, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useLogos } from "src/hooks/useLogos";
import { DatabaseDealFromCSV, useSaveDeals } from "src/hooks/useSaveDeals";
import { createDateAsUTC, stringCompare } from "utils";
import { Loader } from "../Loader";

export interface BulkAddModalProps {
  onOpen: () => void;
  onClose: () => void;
  isOpen: boolean;
}

interface CSVDeal {
  amount: number;
  stage: string;
  "company/about": string;
  "company/country": string;
  "company/launch_year": number;
  "company/female_founder": false;
  "company/diverse_founders": false;
  "company/name": string;
  "company/website": string;
  "company/logo_filename": string;
  "investor/name": string;
  "press_release/date": string;
  "press_release/link": string;
}

export const BulkAddModalBase = ({ onClose, isOpen }: BulkAddModalProps) => {
  const handleClose = () => {
    onClose();
  };

  const { logos, isLoading } = useLogos();
  const { saveDeals, isLoading: saveDealsLoading } = useSaveDeals(onClose);

  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback(
    async (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setFile(acceptedFiles[0]);

        Papa.parse(acceptedFiles[0], {
          worker: true,
          header: true,
          dynamicTyping: true,
          complete: async function (results: Papa.ParseResult<CSVDeal>) {
            const newDeals = results.data.reduce<DatabaseDealFromCSV[]>(
              (acc, curr: CSVDeal) => {
                const newDeal = {
                  id: 0,
                  created_at: "",
                  amount: curr?.amount ?? 0,
                  company: {
                    id: 0,
                    about: curr["company/about"]?.trim(),
                    sector: "",
                    female_founder: curr["company/female_founder"] ?? false,
                    diverse_founders: curr["company/diverse_founders"] ?? false,
                    country:
                      countryList.find((country) =>
                        stringCompare(
                          country.name,
                          curr["company/country"] ?? "",
                          {
                            caseSensitive: false,
                            ignoreWhitespace: true,
                          }
                        )
                      )?.code || "",
                    launch_year: curr["company/launch_year"]?.toString().trim(),
                    logo_id:
                      logos?.find((logo) =>
                        stringCompare(
                          logo.original_filename ?? "",
                          curr["company/logo_filename"]?.replace(
                            /\.[^/.]+$/,
                            ""
                          ) ?? "",
                          {
                            caseSensitive: false,
                            ignoreWhitespace: true,
                          }
                        )
                      )?.id || null,
                    name: curr["company/name"]?.trim() ?? "",
                    website: curr["company/website"] ?? "",
                    created_at: "",
                  },
                  investors: JSON.stringify(
                    curr["investor/name"]?.split(",") || []
                  ),
                  press_release: {
                    date: curr["press_release/date"]
                      ? createDateAsUTC(
                          new Date(
                            curr["press_release/date"]
                              ?.toString()
                              ?.trim()
                              .split("/")
                              .reverse()
                              .join("/")
                          )
                        )
                      : null,
                    link: curr["press_release/link"]?.trim() ?? "",
                  },
                  stage: curr.stage?.trim(),
                };
                return [...acc, newDeal];
              },
              []
            );

            await saveDeals(newDeals);
          },
        });
      }
    },
    [logos, saveDeals]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "text/csv",
    multiple: false,
  });

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Bulk Upload Deals</ModalHeader>
        <ModalCloseButton />

        <Box px={6} {...getRootProps()} position="relative">
          {isLoading ? (
            <Loader
              position="absolute"
              opacity={0.8}
              top="0"
              bottom="0"
              right="0"
              left="0"
              zIndex="overlay"
            />
          ) : (
            <Flex
              p={6}
              justifyContent="center"
              alignItems="center"
              bg={isDragActive ? "teal.50" : "teal.600"}
              color={isDragActive ? "gray.900" : "white"}
              transition={"all 0.2s ease-in-out"}
              border="1px dashed"
              borderRadius={8}
              h="200px"
              position="relative"
            >
              {file ? (
                <>
                  {saveDealsLoading && (
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
                  <Text>
                    {file.name} - {file.size} bytes
                  </Text>
                </>
              ) : (
                <>
                  Drag and drop your CSV here or
                  <Text as="span" ml={1} textDecor="underline">
                    Browse
                  </Text>
                  <input placeholder="upload deals" {...getInputProps()} />
                </>
              )}
            </Flex>
          )}
        </Box>

        <ModalFooter>
          <Button
            loadingText="Submitting"
            type="submit"
            colorScheme="green"
            mr={3}
          >
            Upload
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const BulkAddModal = BulkAddModalBase;

export const useBulkAddModal = (): Pick<
  ReturnType<typeof useDisclosure>,
  "onOpen" | "onClose" | "isOpen"
> & { BulkAddModal: ComponentType<Partial<BulkAddModalProps>> } => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return {
    onOpen,
    isOpen,
    onClose,
    // eslint-disable-next-line react/display-name
    BulkAddModal: memo((props) => (
      <BulkAddModal
        {...props}
        onClose={onClose}
        onOpen={onOpen}
        isOpen={isOpen}
      />
    )),
  };
};

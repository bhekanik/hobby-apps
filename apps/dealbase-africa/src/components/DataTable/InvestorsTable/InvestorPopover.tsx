import { DeleteIcon, EditIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { CloudinaryImage } from "shared-components";
import { InvestorPopoverDealGrid } from "src/components/DataTable/InvestorsTable/InvestorPopoverDealGrid";
import { useUserPermissions } from "src/hooks/useUserPermissions";
import { Investor } from "types";

interface Props {
  investor: Investor;
  enableEdit?: boolean;
  onInvestorsModalOpen: () => void;
  onDeleteAlertOpen: () => void;
  trigger: React.ReactElement;
}

export const InvestorPopover = ({
  investor,
  enableEdit,
  onInvestorsModalOpen,
  onDeleteAlertOpen,
  trigger,
}: Props) => {
  const [selectedInvestor, setSelectedInvestor] = useState<
    Investor | undefined
  >();
  const [investorToDelete, setInvestorToDelete] = useState<
    Investor | undefined
  >();
  const { permissions } = useUserPermissions();

  useEffect(() => {
    if (selectedInvestor) {
      onInvestorsModalOpen();
    }
  }, [selectedInvestor, onInvestorsModalOpen]);

  useEffect(() => {
    if (investorToDelete) {
      onDeleteAlertOpen();
    }
  }, [investorToDelete, onDeleteAlertOpen]);

  return (
    <Popover placement="bottom" trigger="hover" isLazy>
      <PopoverTrigger>{trigger}</PopoverTrigger>
      <PopoverContent
        _dark={{ bg: "gray.600" }}
        w="fit-content"
        maxW={"80%"}
        boxShadow="xl"
        p={2}
        rounded={16}
      >
        <PopoverHeader fontWeight="semibold">
          <Flex gap={4} alignItems="center">
            {investor.logo?.cloudinary_public_id && (
              <CloudinaryImage
                publicId={investor.logo.cloudinary_public_id}
                imageWidth={64}
                alt={`${name} Logo`}
                borderRight="1px solid"
                pr={4}
                borderColor="gray.200"
                _dark={{
                  borderColor: "gray.600",
                }}
              />
            )}

            <Flex flexDir="column" justifyContent="center" h="full">
              <Flex gap={4} alignItems="center">
                {investor.logo?.cloudinary_public_id && (
                  <CloudinaryImage
                    publicId={investor.logo.cloudinary_public_id}
                    imageWidth={64}
                    alt={`${investor.name} Logo`}
                    borderRight="1px solid"
                    pr={4}
                    borderColor="gray.200"
                    _dark={{
                      borderColor: "gray.600",
                    }}
                  />
                )}

                <Flex flexDir="column" justifyContent="center" h="full">
                  <Heading size="md">{investor.name}</Heading>
                  {investor.website && (
                    <Text mt={2} d="flex" gap={2}>
                      <Text as="span" fontWeight="bold">
                        Website:
                      </Text>
                      <Link
                        display="flex"
                        gap={2}
                        alignItems="center"
                        color="teal.500"
                        _dark={{
                          color: "teal.100",
                        }}
                        target="_blank"
                        href={investor.website}
                      >
                        {`${investor.website}`}
                        <ExternalLinkIcon w={3} h={3} />
                      </Link>
                    </Text>
                  )}
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </PopoverHeader>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          <Flex>
            {permissions.includes("edit:investors") && enableEdit && (
              <Box
                borderRight="1px solid"
                maxW="lg"
                pr={4}
                borderColor="gray.200"
                _dark={{
                  borderColor: "gray.600",
                }}
              >
                <Flex gap={2} mt={4}>
                  <Button
                    colorScheme="green"
                    onClick={() => setSelectedInvestor(investor)}
                    leftIcon={<EditIcon />}
                  >
                    Edit
                  </Button>

                  {permissions.includes("delete:investors") && enableEdit && (
                    <Button
                      colorScheme="red"
                      onClick={() => setInvestorToDelete(investor)}
                      leftIcon={<DeleteIcon />}
                    >
                      Delete
                    </Button>
                  )}
                </Flex>
              </Box>
            )}
            <InvestorPopoverDealGrid investorName={investor.name} />
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

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
import { countryList } from "fixtures";
import { useEffect, useState } from "react";
import { CloudinaryImage } from "shared-components";
import { useUserPermissions } from "src/hooks/useUserPermissions";
import { Company } from "types";
import { CompanyPopoverDealsTable } from "./CompanyPopoverDealsTable";

interface Props {
  enableEdit?: boolean;
  onCompaniesModalOpen: () => void;
  onDeleteAlertOpen: () => void;
  company: Company;
}

export const CompanyPopover = ({
  onCompaniesModalOpen,
  company,
  enableEdit,
  onDeleteAlertOpen,
}: Props) => {
  const [selectedCompany, setSelectedCompany] = useState<Company | undefined>();
  const [companyToDelete, setCompanyToDelete] = useState<Company | undefined>();
  const { permissions } = useUserPermissions();

  useEffect(() => {
    if (selectedCompany) {
      onCompaniesModalOpen();
    }
  }, [selectedCompany, onCompaniesModalOpen]);

  useEffect(() => {
    if (companyToDelete) {
      onDeleteAlertOpen();
    }
  }, [companyToDelete, onDeleteAlertOpen]);

  return (
    <Popover trigger="hover" isLazy>
      <PopoverTrigger>
        <Flex alignItems="center">
          {company.logo?.cloudinary_public_id && (
            <CloudinaryImage
              publicId={company.logo.cloudinary_public_id}
              imageWidth={32}
              alt="Logo"
            />
          )}
          <Text
            color="teal.500"
            _dark={{
              color: "teal.100",
            }}
          >
            {company.name}
          </Text>
        </Flex>
      </PopoverTrigger>
      <PopoverContent
        _dark={{ bg: "gray.600" }}
        w="fit-content"
        boxShadow="xl"
        p={4}
        rounded={16}
      >
        <PopoverHeader mb={4} fontWeight="semibold">
          <Flex gap={4} alignItems="center">
            {company.logo?.cloudinary_public_id && (
              <CloudinaryImage
                publicId={company.logo.cloudinary_public_id}
                imageWidth={64}
                alt={`${company.name} Logo`}
                borderRight="1px solid"
                pr={4}
                borderColor="gray.200"
                _dark={{
                  borderColor: "gray.600",
                }}
              />
            )}

            <Flex flexDir="column" justifyContent="center" h="full">
              <Heading size="md">{company.name}</Heading>
              <Text>
                {
                  countryList.find((item) => item.code === company.country)
                    ?.name
                }
              </Text>
            </Flex>
          </Flex>
        </PopoverHeader>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          <Flex gap={4}>
            <Box
              borderRight="1px solid"
              maxW="lg"
              pr={4}
              borderColor="gray.200"
              _dark={{
                borderColor: "gray.600",
              }}
            >
              <Text mb={2}>
                <Text as="span" fontWeight="bold">
                  {`Founded: `}
                </Text>
                {`${company.launch_year}`}
              </Text>
              <Text mb={2} d="flex" gap={2}>
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
                  href={company.website}
                >
                  {`${company.website}`}
                  <ExternalLinkIcon w={3} h={3} />
                </Link>
              </Text>
              <Text mb={2}>
                <Text as="p" fontWeight="bold">
                  {`About: `}
                </Text>
                {`${company.about}`}
              </Text>

              {permissions.includes("edit:companies") && enableEdit && (
                <Flex gap={2} mt={4}>
                  <Button
                    colorScheme="green"
                    onClick={() => setSelectedCompany(company)}
                    leftIcon={<EditIcon />}
                  >
                    Edit
                  </Button>

                  {permissions.includes("delete:companies") && enableEdit && (
                    <Button
                      colorScheme="red"
                      onClick={() => setCompanyToDelete(company)}
                      leftIcon={<DeleteIcon />}
                    >
                      Delete
                    </Button>
                  )}
                </Flex>
              )}
            </Box>
            <CompanyPopoverDealsTable
              companyId={company.id}
              companyName={company.name}
            />
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

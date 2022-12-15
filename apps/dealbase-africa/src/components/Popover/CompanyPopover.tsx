import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Box,
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
  useMediaQuery,
} from "@chakra-ui/react";
import { countryList } from "fixtures";
import { CloudinaryImage } from "shared-components";
import { CompanyPopoverDealsTable } from "src/components/DataTable/CompaniesTable/CompanyPopoverDealsTable";
import { Company } from "types";

interface Props {
  company: Company;
  trigger: React.ReactNode;
  dealId: number;
}

export const CompanyPopover = ({ company, trigger, dealId }: Props) => {
  const [isLessThan768] = useMediaQuery("(max-width: 768px)");

  return (
    <Popover placement="bottom" trigger="hover" isLazy>
      <PopoverTrigger>{trigger}</PopoverTrigger>
      <PopoverContent
        w="fit-content"
        maxW={"80%"}
        _dark={{ bg: "gray.600" }}
        boxShadow="xl"
        p={4}
        rounded={16}
      >
        <PopoverHeader mb={4} fontWeight="semibold">
          <Flex gap={4} alignItems="center">
            {company.logo?.cloudinary_public_id && (
              <CloudinaryImage
                publicId={company.logo.cloudinary_public_id}
                d="flex"
                alignItems="center"
                justifyContent="center"
                imageWidth={isLessThan768 ? 96 : 72}
                // imageHeight={72}
                minW={isLessThan768 ? "100px" : "70px"}
                minH={isLessThan768 ? "100px" : "70px"}
                bg="white"
                p={0}
                alt={`${company.name} Logo`}
                border="1px solid"
                borderColor="gray.500"
                _dark={{
                  borderColor: "gray.300",
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
          <Flex
            gap={4}
            w={isLessThan768 ? "90vw" : "fit-content"}
            flexDir={isLessThan768 ? "column" : "row"}
          >
            <Box maxW="lg" alignItems="left">
              <Text align="left" mb={2}>
                <Text as="span" fontWeight="bold">
                  {`Founded: `}
                </Text>
                {`${company.launch_year}`}
              </Text>
              <Text align="left" d="flex" gap={2}>
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
                  <ExternalLinkIcon fontSize={12} />
                </Link>
              </Text>
              <Text align="left">
                <Text as="span" display="block" fontWeight="bold">
                  {`About: `}
                </Text>
                <Text
                  w="70%"
                  whiteSpace="break-spaces"
                  align="left"
                  as="span"
                >{`${company.about}`}</Text>
              </Text>
            </Box>
            <CompanyPopoverDealsTable dealId={dealId} companyId={company.id} />
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

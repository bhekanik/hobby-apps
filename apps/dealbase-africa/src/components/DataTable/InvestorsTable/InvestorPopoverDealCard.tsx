import {
  Flex,
  GridItem,
  GridItemProps,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { moneyFormatter } from "formatters";
import { CloudinaryImage } from "shared-components";
import { LinkText } from "src/components/LinkText";
import { Deal } from "types";

interface Props {
  deal: Deal;
}

export const InvestorPopoverDealCard = ({
  deal,
  ...gridItemProps
}: Props & GridItemProps) => {
  const [isLessThan768] = useMediaQuery("(max-width: 768px)");

  return (
    <GridItem
      d="flex"
      flexDir="column"
      w={isLessThan768 ? "78%" : "75%"}
      boxShadow="lg"
      p={2}
      _dark={{ bg: "gray.700" }}
      borderRadius={8}
      border="1px solid"
      {...gridItemProps}
    >
      <Flex gap={2}>
        {deal.company.logo?.cloudinary_public_id && (
          <CloudinaryImage
            publicId={deal.company.logo.cloudinary_public_id}
            d="flex"
            alignItems="center"
            justifyContent="center"
            imageWidth={48}
            // imageHeight={48}
            minW={"48px"}
            minH={"48px"}
            bg="white"
            p={0}
            alt={`${deal.company.name} Logo`}
            border="1px solid"
            borderColor="gray.500"
            _dark={{
              borderColor: "gray.300",
            }}
          />
        )}

        <Flex flexDir="column" w="full">
          <Flex
            w="full"
            justifyContent="space-between"
            alignItems="center"
            flexDir={isLessThan768 ? "column" : "row"}
          >
            <Text fontWeight="bold">{deal.company.name}</Text>
            <Text fontWeight="medium" p={0} m={0}>
              {deal.amount === 0 ? "-" : moneyFormatter(deal.amount)}
            </Text>
          </Flex>

          <Flex
            alignItems="end"
            justifyContent="space-between"
            w="full"
            m={0}
            p={0}
          >
            <Text w="fit-content">Stage</Text>
            <Text align="right" maxW="100px" m={0} p={0}>
              {deal.stage}
            </Text>
          </Flex>
        </Flex>
      </Flex>
      {deal.press_release?.link ? (
        <LinkText
          href={deal.press_release?.link}
          label={"Go to press release"}
          mt={2}
          justifyContent="center"
          paddingInlineEnd={2}
          paddingInlineStart={2}
          role="button"
          height={8}
          outline="2px solid"
          outlineColor="transparent"
          outlineOffset="2px"
          lineHeight="1.2"
          _hover={{
            textDecoration: "none",
            bg: "gray.100",
            color: "gray.800",
          }}
          color="gray.800"
          _dark={{
            _hover: {
              bg: "gray.600",
            },
            color: "white",
          }}
          borderColor="gray.300"
          border="1px solid"
          borderRadius="md"
          transitionProperty="common"
          transitionDuration="normal"
          fontSize="sm"
        />
      ) : (
        <Text>
          {deal.press_release?.date
            ? new Date(deal.press_release?.date).toLocaleDateString()
            : "Undisclosed"}
        </Text>
      )}
    </GridItem>
  );
};

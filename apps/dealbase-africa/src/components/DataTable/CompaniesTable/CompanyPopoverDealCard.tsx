import {
  Box,
  Flex,
  GridItem,
  GridItemProps,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { moneyFormatter } from "formatters";
import { Deal } from "types";

interface Props {
  deal: Deal;
}

export const CompanyPopoverDealsCard = ({
  deal,
  ...gridItemProps
}: Props & GridItemProps) => {
  const [isLessThan768] = useMediaQuery("(max-width: 768px)");

  return (
    <GridItem
      d="flex"
      flexDir="column"
      key={deal.id}
      w="100%"
      boxShadow="lg"
      p={4}
      position="relative"
      _dark={{ bg: "gray.700" }}
      borderRadius={16}
      border="1px solid"
      {...gridItemProps}
    >
      <Box>
        <Flex gap={4} alignItems="flex-start">
          <Flex w="full" flexDir={isLessThan768 ? "column" : "row"} gap={2}>
            <Flex flexDir="column" justifyContent="center" h="full" w="full">
              <Text m={0} mt={1}>
                {deal.press_release?.date
                  ? new Date(deal.press_release?.date).toLocaleDateString()
                  : "Undisclosed"}
              </Text>
            </Flex>

            <Text
              w="full"
              align={isLessThan768 ? "initial" : "right"}
              fontWeight="medium"
              fontSize={18}
            >
              {deal.amount === 0
                ? "Undisclosed"
                : moneyFormatter(deal.amount, {
                    notation: "standard",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}
            </Text>
          </Flex>
        </Flex>
      </Box>
      <Flex
        alignItems="end"
        justifyContent="space-between"
        gap={4}
        w="full"
        borderBottom="1px solid"
        _dark={{
          borderColor: "gray.600",
        }}
        borderColor="gray.300"
        mt={2}
        px={2}
      >
        <Text w="fit-content">Stage</Text>
        <Text align="right" maxW="100px">
          {deal.stage}
        </Text>
      </Flex>
      <Flex alignItems="flex-start" gap={4} w="full" mt={2} px={2}>
        <Text>Investors</Text>
        <Text align="right" w="full" mt={0}>
          {deal.investors.join(", ")}
        </Text>
      </Flex>
    </GridItem>
  );
};

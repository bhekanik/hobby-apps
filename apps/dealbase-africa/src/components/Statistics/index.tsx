import {
  Flex,
  FlexProps,
  Text,
  useColorMode,
  useMediaQuery,
} from "@chakra-ui/react";
import { moneyFormatter } from "formatters";
import { useCompareData } from "src/hooks/useCompareData";
import { StatisticsItem } from "./StatisticsItem";

interface Props {
  withTitle?: boolean;
  offset?: boolean;
}

export const Statistics = ({
  withTitle,
  offset = false,
  ...flexProps
}: Props & FlexProps) => {
  const [isLessThan768] = useMediaQuery("(max-width: 768px)");
  const { colorMode } = useColorMode();

  const {
    offset: { deals, investors, value, start, end },
  } = useCompareData(offset);

  return (
    <>
      {withTitle && (
        <Text>
          {start.toLocaleDateString()} - {end.toLocaleDateString()}
        </Text>
      )}
      <Flex
        justifyContent="space-around"
        alignItems="center"
        flexDir={isLessThan768 ? "row" : "column"}
        gap={isLessThan768 ? 2 : 6}
        w="300px"
        mt={isLessThan768 ? 2 : 4}
        {...flexProps}
      >
        <StatisticsItem
          icon={
            colorMode === "dark"
              ? "/icons/deals-dark.svg"
              : "/icons/deals-light.svg"
          }
          label="Deals"
          number={deals}
        />
        <StatisticsItem
          icon={
            colorMode === "dark"
              ? "/icons/investors-dark.svg"
              : "/icons/investors-light.svg"
          }
          label="Investors"
          number={investors}
        />
        <StatisticsItem
          icon={
            colorMode === "dark"
              ? "/icons/value-dark.svg"
              : "/icons/value-light.svg"
          }
          label="Value"
          number={`${moneyFormatter(value, {
            minimumFractionDigits: 0,
            // maximumFractionDigits: 0,
          })}`}
        />
      </Flex>
    </>
  );
};

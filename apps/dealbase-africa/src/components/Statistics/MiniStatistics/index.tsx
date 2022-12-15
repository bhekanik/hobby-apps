import { Flex, FlexProps } from "@chakra-ui/react";
import { moneyFormatter } from "formatters";
import { useCompareData } from "src/hooks/useCompareData";
import { MiniStatisticsItem } from "../MiniStatisticsItem";

interface Props {
  withTitle?: boolean;
  offset?: boolean;
}

export const MiniStatistics = ({
  withTitle,
  offset = false,
  ...flexProps
}: Props & FlexProps) => {
  const {
    offset: { deals, investors, value },
  } = useCompareData(offset);

  return (
    <Flex
      justifyContent="space-around"
      alignItems="center"
      w="300px"
      {...flexProps}
    >
      <MiniStatisticsItem label="Deals" number={deals} />
      <MiniStatisticsItem label="Investors" number={investors} />
      <MiniStatisticsItem label="Value" number={moneyFormatter(value)} />
    </Flex>
  );
};

import { useColorMode, useMediaQuery } from "@chakra-ui/react";
import { BarDatum, ComputedDatum, ResponsiveBar } from "@nivo/bar";
import { OrdinalColorScaleConfig } from "@nivo/colors";
import { moneyFormatter, numberFormatter } from "formatters";
import { useMonthlyBreakdownData } from "src/hooks/useBreakdownData";

interface Props {
  valueFormatter?: (value: number) => string;
  showLegend?: boolean;
  colors?: OrdinalColorScaleConfig<ComputedDatum<BarDatum>>;
}

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
export const MonthlyBreakdown = ({ showLegend = false, colors }: Props) => {
  const [isLessThan768] = useMediaQuery("(max-width: 768px)");

  const { data } = useMonthlyBreakdownData();

  const { colorMode } = useColorMode();

  const maxValue = data?.reduce(
    (max, d) => Math.max(max, (d.Amount as number) * 1.2),
    0
  );

  return (
    <ResponsiveBar
      theme={{
        textColor: colorMode === "dark" ? "silver" : "gray",
        fontSize: 14,
        tooltip: {
          container: {
            color: "black",
          },
        },
      }}
      maxValue={maxValue}
      data={data}
      keys={["Amount"]}
      // valueFormat={(value: number) =>
      //   `${moneyFormatter(value, {
      //     minimumFractionDigits: 0,
      //   })}`
      // }

      valueFormat={(value) => numberFormatter(value as number)}
      indexBy="label"
      margin={{
        right: isLessThan768 ? 10 : 50,
        bottom: 80,
        left: isLessThan768 ? 10 : 80,
      }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={colors ?? { scheme: "dark2" }}
      groupMode="grouped"
      borderColor={{
        from: "color",
        modifiers: [["darker", 2.6]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: -90,
        legend: "Month",
        legendPosition: "middle",
        legendOffset: 70,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Amount in USD",
        legendPosition: "middle",
        legendOffset: -70,
        format: (value: number) =>
          moneyFormatter(value, {
            minimumFractionDigits: 0,
          }),
      }}
      // enableLabel={false}
      labelSkipWidth={40}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["brighter", 3]],
      }}
      role="application"
      ariaLabel="Monthly Breakdown Chart"
    />
  );
};

export default MonthlyBreakdown;

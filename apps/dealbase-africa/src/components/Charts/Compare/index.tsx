import { useColorMode, useMediaQuery } from "@chakra-ui/react";
import { BarLegendProps, ResponsiveBar } from "@nivo/bar";
import { format } from "date-fns";
import { useCompareData } from "src/hooks/useCompareData";

const createLabel = (
  data: { start: Date; end: Date },
  options: { format?: string } = {}
): string => {
  const dateFormat = options.format ?? "dd MMM, yy";

  return `${format(data.start, dateFormat)} - ${format(data.end, dateFormat)}`;
};

interface Props {
  valueFormatter?: (value: number) => string;
  showLegend?: boolean;
  label: string;
  type: "deals" | "value";
}

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
export const Compare = ({
  showLegend = false,
  valueFormatter,
  label,
  type,
}: Props) => {
  const [isLessThan768] = useMediaQuery("(max-width: 768px)");

  const { offset, current } = useCompareData(true);

  const data = [
    {
      [createLabel(current)]: current[type],
      [createLabel(offset)]: offset[type],
      label,
    },
  ];

  const keys = Object.keys(data[0]).filter((key) => key !== "label");

  const legend: BarLegendProps[] = showLegend
    ? [
        {
          dataFrom: "keys",
          anchor: "top",
          direction: isLessThan768 ? "column" : "row",
          justify: false,
          // translateX: 120,
          translateY: isLessThan768 ? -70 : -60,
          itemsSpacing: 2,
          itemWidth: 180,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 15,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]
    : [];

  // const maxValue = data.reduce(
  //   (max, d) => Math.max(max, (d[keys[1]] as number) * 1.2),
  //   0
  // );

  const { colorMode } = useColorMode();

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
      valueFormat={valueFormatter}
      labelTextColor={({ data }) => {
        return data.id === createLabel(current) ? "black" : "white";
      }}
      // maxValue={maxValue}
      data={data}
      keys={keys}
      indexBy="label"
      margin={{
        top: isLessThan768 ? 80 : 60,
        right: isLessThan768 ? 10 : 50,
        bottom: 30,
        left: isLessThan768 ? 10 : 80,
      }}
      // padding={0.3}
      // maxValue={maxValue}
      layout="horizontal"
      groupMode="grouped"
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={({ id }) => {
        return id === createLabel(current) ? "#D98F39" : "#31A078";
      }}
      borderColor={{ from: "color", modifiers: [["darker", 2.6]] }}
      enableGridX
      enableGridY={false}
      axisTop={{
        format: "~s",
        tickValues: 4,
      }}
      axisBottom={{
        format: "~s",
        tickValues: 4,
      }}
      // axisLeft={null}
      // axisBottom={{
      //   tickSize: 5,
      //   tickPadding: 5,
      //   tickRotation: 0,
      //   legend: "Period",
      //   legendPosition: "middle",
      //   legendOffset: 32,
      // }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legendPosition: "middle",
        legendOffset: -40,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      // labelTextColor={{
      //   from: "color",
      //   modifiers: [["brighter", 3]],
      // }}
      // barComponent={(props) => {

      //   return (
      //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //     // @ts-ignore
      //     <BarComponent {...props} valueFormatter={valueFormatter} />
      //   )
      // }}
      legends={legend}
      role="application"
      ariaLabel="Compare Chart"
      barAriaLabel={function (e) {
        return e.id + ": " + e.formattedValue + " in country: " + e.indexValue;
      }}
    />
  );
};

export default Compare;

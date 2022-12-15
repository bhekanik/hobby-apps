import { useColorMode, useMediaQuery } from "@chakra-ui/react";
import { BarLegendProps, ResponsiveBar } from "@nivo/bar";
import { useDiversityData } from "src/hooks/useDiversityData";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
export const GenderHorizontal = () => {
  const [isLessThan768] = useMediaQuery("(max-width: 768px)");

  const legend: BarLegendProps[] = [
    {
      dataFrom: "keys",
      anchor: "top",
      direction: isLessThan768 ? "column" : "row",
      justify: false,
      // translateX: 120,
      translateY: isLessThan768 ? -80 : -50,
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
  ];
  const { gender } = useDiversityData();

  const { colorMode } = useColorMode();

  const maxValue =
    Math.max(gender[0]["All Male Founders"], gender[0]["Has Female Founder"]) *
    1.2;

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
      // valueFormat={valueFormatter}
      maxValue={maxValue}
      data={gender}
      keys={["All Male Founders", "Has Female Founder"]}
      indexBy="label"
      margin={{
        top: isLessThan768 ? 80 : 50,
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
        return id === "Has Female Founder" ? "#D98F39" : "#31A078";
      }}
      labelTextColor={({ data }) => {
        return data.id === "Has Female Founder" ? "black" : "white";
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
      ariaLabel="Gender Diversity Chart"
      barAriaLabel={function (e) {
        return e.id + ": " + e.formattedValue + " in country: " + e.indexValue;
      }}
    />
  );
};

export default GenderHorizontal;

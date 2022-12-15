import { useColorMode, useMediaQuery } from "@chakra-ui/react";
import { BarLegendProps } from "@nivo/bar";
import { ResponsivePie } from "@nivo/pie";
import { numberFormatter } from "formatters";
import { useDiversityData } from "src/hooks/useDiversityData";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
export const RacePie = () => {
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
  const { raceSeparate, deals } = useDiversityData();

  const { colorMode } = useColorMode();

  const maxValue = Math.max(raceSeparate[0].value, raceSeparate[1].value) * 1.2;

  return (
    <ResponsivePie
      theme={{
        textColor: colorMode === "dark" ? "silver" : "gray",
        fontSize: 14,
        tooltip: {
          container: {
            color: "black",
          },
        },
      }}
      data={raceSeparate}
      margin={{
        top: 10,
        right: 10,
        bottom: 80,
        left: 10,
      }}
      innerRadius={0.5}
      colors={({ label }) => {
        return label === "Non-white/Diverse founding team"
          ? "#D98F39"
          : "#31A078";
      }}
      padAngle={1}
      cornerRadius={6}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      enableArcLinkLabels={false}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={10}
      valueFormat={(value: number) =>
        `${numberFormatter(value, {
          minimumFractionDigits: 0,
          // maximumFractionDigits: 0,
        })} (${((value / deals) * 100).toFixed(2)}%)`
      }
      arcLabelsTextColor={({ data }) => {
        return data.id === "Non-white/Diverse founding team"
          ? "black"
          : "white";
      }}
      legends={[
        {
          anchor: "bottom",
          direction: "column",
          justify: false,
          translateX: -50,
          translateY: 0,
          itemsSpacing: 5,
          itemWidth: 100,
          itemHeight: 18,
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: "circle",
        },
      ]}
    />
  );
};

export default RacePie;

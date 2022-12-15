import { moneyFormatter } from "formatters";

interface BarComponentProps {
  bar: any;
  borderColor: string;
  valueFormatter?: (value: number) => string;
}

export const BarComponent = ({
  bar,
  borderColor,
  valueFormatter,
}: BarComponentProps) => {
  return (
    <g transform={`translate(${bar.x},${bar.y})`}>
      <rect
        x={-3}
        y={7}
        width={bar.width}
        height={bar.height}
        fill="rgba(0, 0, 0, .07)"
      />
      <rect width={bar.width} height={bar.height} fill={bar.color} />
      <rect
        x={bar.width - 5}
        width={5}
        height={bar.height}
        fill={borderColor}
        fillOpacity={0.2}
      />
      {/* <text
        x={bar.width - 16}
        y={bar.height / 2 - 8}
        textAnchor="end"
        dominantBaseline="central"
        fill="white"
        style={{
          fontWeight: 900,
          fontSize: 14,
        }}
      >
        {Case.sentence(bar.data.id)}
      </text> */}
      <text
        x={bar.width - 16}
        y={bar.height / 2 + 10}
        textAnchor="end"
        dominantBaseline="central"
        fill={bar.data.id === "Current Period" ? "black" : "white"}
        style={{
          fontWeight: 800,
          fontSize: 13,
        }}
      >
        {valueFormatter
          ? `${moneyFormatter(bar.data.value, {
              minimumFractionDigits: 0,
              // maximumFractionDigits: 0,
            })}`
          : bar.data.value}
      </text>
    </g>
  );
};

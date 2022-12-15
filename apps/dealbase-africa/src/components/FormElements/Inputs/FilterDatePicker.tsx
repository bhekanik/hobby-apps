import {
  Box,
  Flex,
  FormLabel,
  useColorMode,
  useMediaQuery,
} from "@chakra-ui/react";
import Image from "next/image";
import { CustomProvider as RSuiteProvider, DateRangePicker } from "rsuite";

interface Props {
  icon?: string;
  noBorder?: boolean;
  flex?: number;
  value: [Date, Date];
  onOk?: (value: [Date, Date]) => void;
}

type LabelProps =
  | {
      label?: never;
      id?: string;
    }
  | {
      label: string;
      id: string;
    };

export const DatePicker = ({
  noBorder,
  icon,
  flex,
  label,
  value,
  onOk,
  ...otherProps
}: Props & LabelProps) => {
  const { afterToday, combine, before } = DateRangePicker;

  const [isLessThan768] = useMediaQuery("(max-width: 768px)");
  const { colorMode } = useColorMode();

  return (
    <Flex
      alignItems="top"
      w="full"
      flex={flex}
      gap={2}
      {...(noBorder ? {} : { borderRight: "1px solid" })}
    >
      {icon && (
        <Box mt="-12px" w="64px">
          <Image alt="icon" src={icon || ""} width={64} height={64} />
        </Box>
      )}

      <Flex d="column" w="full">
        {label && (
          <FormLabel
            m={0}
            mt="-12px"
            fontSize={22}
            fontWeight="bold"
            htmlFor={otherProps.id}
          >
            {label}
          </FormLabel>
        )}

        <RSuiteProvider theme={colorMode}>
          <DateRangePicker
            id={otherProps.id}
            placeholder="Select date"
            showOneCalendar={isLessThan768}
            preventOverflow
            size="xs"
            style={{ marginTop: "-16px", marginLeft: "-7px", width: "100%" }}
            disabledDate={combine?.(
              afterToday?.(),
              before?.(new Date("2021-01-01"))
            )}
            value={[
              typeof value[0] === "string" ? new Date(value[0]) : value[0],
              typeof value[1] === "string" ? new Date(value[1]) : value[1],
            ]}
            onOk={onOk}
            ranges={
              [
                // {
                //   label: "Last 7 days",
                //   value: [subDays(new Date(), 6), new Date()],
                // },
                // {
                //   label: "Last month",
                //   value: [subDays(new Date(), 30), new Date()],
                // },
                // {
                //   label: "Last 3 months",
                //   value: [subMonths(new Date(), 3), new Date()],
                // },
                // {
                //   label: "Last 6 months",
                //   value: [subMonths(new Date(), 6), new Date()],
                // },
                // {
                //   label: "Last year",
                //   value: [subMonths(new Date(), 12), new Date()],
                // },
                // {
                //   label: "Since beginning of 2021",
                //   value: [new Date("2021-01-01"), new Date()],
                // },
              ]
            }
          />
        </RSuiteProvider>
      </Flex>
    </Flex>
  );
};

export default DatePicker;

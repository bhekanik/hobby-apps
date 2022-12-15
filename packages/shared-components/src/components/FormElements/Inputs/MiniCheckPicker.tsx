import {
  Box,
  Flex,
  FormLabel,
  useColorMode,
  useMediaQuery,
} from "@chakra-ui/react";
import Image from "next/image";
import { PropsWithChildren, ReactNode, SyntheticEvent } from "react";
import {
  CheckPicker as RSCheckPicker,
  CustomProvider as RSuiteProvider,
} from "rsuite";

interface Props {
  helperText?: string;
  errorMessage?: string;
  icon?: string;
  noBorder?: boolean;
  flex?: number;
  data: { label: string; value: string }[];
  value: string[];
  defaultValue?: string[];
  onChange: (
    value: string[],
    item: { label?: string | ReactNode; value?: string | number | undefined },
    event: SyntheticEvent<Element, Event>
  ) => void;
  onClean?: (event: SyntheticEvent) => void;
  placeholder?: string;
  isGrouped?: boolean;
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

export const MiniCheckPicker = ({
  label,
  data,
  noBorder,
  icon,
  flex,
  value,
  defaultValue,
  onClean,
  onChange,
  placeholder,
  isGrouped = false,
  ...otherProps
}: PropsWithChildren<Props & LabelProps>) => {
  const [isLessThan960] = useMediaQuery("(max-width: 960px)");

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
        <Box mt="-16px" w="64px">
          <Image alt="icon" src={icon || ""} width={64} height={64} />
        </Box>
      )}

      <Flex d="column" w="full">
        {label && (
          <FormLabel
            m={0}
            mt="-16px"
            fontSize={isLessThan960 ? 16 : 22}
            fontWeight="bold"
            htmlFor={otherProps.id}
          >
            {label}
          </FormLabel>
        )}

        <RSuiteProvider theme={colorMode}>
          <RSCheckPicker
            sticky
            appearance="subtle"
            preventOverflow
            onClean={onClean}
            disabledItemValues={
              value.length > 0 && value[0] !== "All" ? ["All"] : []
            }
            cleanable
            placeholder={placeholder || "Select a value"}
            data={data.map(({ label, value }) => ({
              label,
              value,
              group: label.at?.(0)?.toUpperCase() || "",
            }))}
            groupBy={isGrouped ? "group" : undefined}
            value={value}
            size="xs"
            onSelect={onChange}
            placement={isLessThan960 ? "bottom" : "leftStart"}
            style={{
              marginTop: "-16px",
              marginLeft: "-7px",
              maxWidth: isLessThan960 ? "initial" : 200,
              width: "100%",
            }}
            defaultValue={defaultValue}
          />
        </RSuiteProvider>
      </Flex>
    </Flex>
  );
};

export default MiniCheckPicker;

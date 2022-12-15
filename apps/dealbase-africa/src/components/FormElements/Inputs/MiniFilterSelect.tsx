import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Select as ChakraSelect,
  SelectProps,
  useMediaQuery,
} from "@chakra-ui/react";
import Image from "next/image";
import { PropsWithChildren } from "react";

interface Props {
  helperText?: string;
  errorMessage?: string;
  icon?: string;
  noBorder?: boolean;
  flex?: number;
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

export const MiniFilterSelect = ({
  helperText,
  errorMessage,
  label,
  children,
  noBorder,
  icon,
  flex,
  ...otherProps
}: PropsWithChildren<
  Props & Omit<SelectProps, "label" | "id" | "icon"> & LabelProps
>) => {
  const [isLessThan960] = useMediaQuery("(max-width: 960px)");
  return (
    <Flex
      alignItems="top"
      w="full"
      flex={flex}
      {...(noBorder ? {} : { borderRight: "1px solid" })}
    >
      {icon && (
        <Box mt="-16px" w="64px">
          <Image alt="icon" src={icon || ""} width={64} height={64} />
        </Box>
      )}

      <FormControl w="full" variant="filter">
        <ChakraSelect
          _focus={{
            outline: "none",
          }}
          border="none"
          {...otherProps}
          size="sm"
        >
          {children}
        </ChakraSelect>
        {/* It is important that the Label comes after the Control due to css selectors */}
        {label && (
          <FormLabel
            fontSize={isLessThan960 ? 18 : 25}
            fontWeight="bold"
            htmlFor={otherProps.id}
          >
            {label}
          </FormLabel>
        )}
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
        {errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
      </FormControl>
    </Flex>
  );
};

import { Text, TextProps, useColorMode } from "@chakra-ui/react";

const FormFieldLabel = ({
  children,
  w,
  width,
  minW,
  minWidth,
  color,
  ...rest
}: TextProps): JSX.Element => {
  const { colorMode } = useColorMode();

  return (
    <Text
      {...rest}
      w={w || width || "30%"}
      minW={minW || minWidth || "max-content"}
      color={color || colorMode === "dark" ? "gray.400" : "gray.700"}
    >
      {children}
    </Text>
  );
};

export default FormFieldLabel;

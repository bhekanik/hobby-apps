import { GridItem } from "@chakra-ui/react";
import { memo, PropsWithChildren } from "react";
import { TableRowProps } from "react-table";

const CardBase = ({
  children,
  rowProps,
}: PropsWithChildren<{
  rowProps: Omit<TableRowProps, "key">;
}>) => {
  return (
    <GridItem
      d="flex"
      flexDir="column"
      {...rowProps}
      w="100%"
      boxShadow="lg"
      p={4}
      position="relative"
      _dark={{ bg: "gray.700" }}
      bg="white"
      borderRadius={16}
    >
      {children}
    </GridItem>
  );
};

export const Card = memo(CardBase);

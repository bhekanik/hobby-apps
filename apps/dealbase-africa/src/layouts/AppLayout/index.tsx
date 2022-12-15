import { Grid, GridItem, useMediaQuery } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { Header } from "src/components/Header";

interface Props {
  withSignIn?: boolean;
}

export const AppLayout = ({
  children,
  withSignIn,
}: PropsWithChildren<Props>) => {
  const [isLessThan768] = useMediaQuery("(max-width: 768px)");
  return (
    <Grid h="100vh" templateRows="60px 1fr">
      <GridItem
        as="header"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        px={isLessThan768 ? 4 : 8}
        w="100vw"
        rowSpan={1}
        boxShadow="lg"
        zIndex={999}
      >
        <Header withSignIn={withSignIn} />
      </GridItem>
      <GridItem
        overflow="auto"
        w="100vw"
        colSpan={1}
        _dark={{ bg: "gray.700" }}
        className="scrollbar"
      >
        {children}
      </GridItem>
    </Grid>
  );
};

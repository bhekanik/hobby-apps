import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Grid,
  GridItem,
  IconButton,
  Link as ChakraLink,
  useMediaQuery,
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { DashboardNav } from "src/components/DashboardNav";
import { useProtected } from "src/hooks/useProtected";
import { AppLayout } from "../AppLayout";

interface Props {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: Props) => {
  useProtected();
  const [isLessThan768] = useMediaQuery("(max-width: 768px)");
  const [sideBarOpen, setSideBarOpen] = useState(() => !isLessThan768);

  return (
    <AppLayout>
      <AnimatePresence>
        <Grid
          as={motion.div}
          h="full"
          templateColumns={sideBarOpen ? "minmax(100px, 220px) 1fr" : "0px 1fr"}
          initial={{
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            gridTemplateColumns: sideBarOpen
              ? "minmax(100px, 220px) 1fr"
              : "0px 1fr",
          }}
          animate={{
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            gridTemplateColumns: sideBarOpen
              ? "minmax(100px, 220px) 1fr"
              : "0px 1fr",
          }}
          exit={{
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            gridTemplateColumns: sideBarOpen
              ? "0px 1fr"
              : "minmax(100px, 220px) 1fr",
          }}
        >
          <GridItem
            w={sideBarOpen ? "full" : "0px"}
            rowSpan={1}
            colSpan={1}
            display="flex"
            flexDir="column"
            justifyContent="space-between"
            overflow="auto"
            fontSize="lg"
            fontWeight="bold"
            py={8}
            bg="white"
            _dark={{ bg: "gray.900" }}
          >
            <DashboardNav />
            <Link passHref href="/dashboard/settings" as="/dashboard/settings">
              <ChakraLink
                transition="background-color 250ms ease-in-out"
                _hover={{
                  bg: "gray.100",
                  _dark: {
                    bg: "gray.700",
                  },
                  transition: "background-color 250ms ease-in-out",
                }}
                px={8}
                py={2}
              >
                Settings
              </ChakraLink>
            </Link>
          </GridItem>
          <GridItem
            position="relative"
            w="full"
            overflow="auto"
            colSpan={1}
            _dark={{ bg: "gray.500" }}
            bg="gray.200"
            p={8}
          >
            <IconButton
              position="sticky"
              bg="white"
              _dark={{ bg: "gray.900" }}
              top={0}
              borderRadius="0"
              borderTopEndRadius={6}
              borderBottomEndRadius={6}
              left={-12}
              transform={
                isLessThan768 ? "translateX(-90%)" : "translateX(-110%)"
              }
              zIndex="modal"
              role="button"
              size={isLessThan768 ? "md" : "sm"}
              aria-label="Toggle Dark Mode Switch"
              icon={sideBarOpen ? <ArrowLeftIcon /> : <ArrowRightIcon />}
              onClick={() => {
                setSideBarOpen(!sideBarOpen);
              }}
            />
            <Box
              position="absolute"
              opacity={0.8}
              bg="gray.900"
              zIndex="banner"
              top={0}
              bottom={0}
              left={0}
              right={0}
              visibility={sideBarOpen && isLessThan768 ? "visible" : "hidden"}
              backdropBlur
            />

            {children}
          </GridItem>
        </Grid>
      </AnimatePresence>
    </AppLayout>
  );
};

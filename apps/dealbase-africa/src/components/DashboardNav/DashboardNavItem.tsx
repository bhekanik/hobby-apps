import { Link as ChakraLink } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
  href: string;
  as: string;
  label: string;
}

export const DashboardNavItem = ({ href, as, label }: Props) => {
  const router = useRouter();
  return (
    <Link passHref href={href} as={as}>
      <ChakraLink
        transition="background-color 250ms ease-in-out"
        bg={router.pathname === href ? "gray.100" : ""}
        _dark={{
          bg: router.pathname === href ? "gray.700" : "",
        }}
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
        {label}
      </ChakraLink>
    </Link>
  );
};

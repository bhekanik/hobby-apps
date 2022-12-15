import { Badge, Link as ChakraLink } from "@chakra-ui/react";
import Link from "next/link";
import { isProdDeployEnv } from "src/lib/config";
import { HeaderMenu } from "../HeaderMenu";
import { Logo } from "./Logo";

interface Props {
  withSignIn?: boolean;
}

export const Header = ({ withSignIn }: Props) => {
  return (
    <>
      <Link href="/" as="/" passHref>
        <>
          <ChakraLink w={36} overflow="none">
            <Logo />
          </ChakraLink>
          {!isProdDeployEnv && (
            <Badge size="xs" variant="outline" colorScheme="green">
              {process.env.NEXT_PUBLIC_DEPLOYMENT_ENV}
            </Badge>
          )}
        </>
      </Link>

      <HeaderMenu withSignIn={withSignIn} />
    </>
  );
};

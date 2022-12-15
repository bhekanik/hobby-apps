import { useAuth0 } from "@auth0/auth0-react";
import { ExternalLinkIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Code,
  Icon,
  IconButton,
  Link as ChakraLink,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useMediaQuery,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { SiLinkedin } from "react-icons/si";
import { VscTwitter } from "react-icons/vsc";
import { Type } from "src/components/Modals/useSubscribeModal";
import { isProd } from "src/lib/config";
import * as ga from "src/lib/googleAnalytics";

interface Props {
  withSignIn?: boolean;
  onOpen: () => void;
  setType: (type: Type) => void;
}

export const MobileMenu = ({ withSignIn, onOpen, setType }: Props) => {
  const [isLessThan768] = useMediaQuery("(max-width: 768px)");

  const { user, logout, isAuthenticated, loginWithPopup } = useAuth0();
  const { pathname } = useRouter();

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        name="menu"
        role="button"
        aria-label="Options"
        size={isLessThan768 ? "lg" : "md"}
        icon={<HamburgerIcon />}
        variant="outline"
      />
      <MenuList>
        {isAuthenticated && (
          <>
            {!pathname.match(/^\/dashboard.*/) ? (
              <MenuItem>
                <Link
                  passHref
                  href="/dashboard/dashboard"
                  as="/dashboard/dashboard"
                >
                  <ChakraLink>Dashboard</ChakraLink>
                </Link>
              </MenuItem>
            ) : (
              <MenuItem>
                <Link passHref href="/" as="/">
                  <ChakraLink>Home</ChakraLink>
                </Link>
              </MenuItem>
            )}
          </>
        )}
        <MenuItem
          onClick={() => {
            setType("investor");
            onOpen();
          }}
        >
          Investors
        </MenuItem>
        <MenuItem
          onClick={() => {
            setType("founder");
            onOpen();
          }}
        >
          Founders
        </MenuItem>
        <MenuDivider />
        <MenuItem>
          <ChakraLink
            href="https://www.linkedin.com/company/dealbase-africa"
            d="flex"
            alignItems="center"
            justifyContent="center"
            gap={2}
            target="_blank"
            onClick={() => {
              if (isProd) {
                ga.event({
                  action: "follow",
                  params: {
                    network: "linkedin",
                  },
                });
              }
            }}
          >
            <Icon as={SiLinkedin} fontSize={24} />
            LinkedIn
            <ExternalLinkIcon w={3} h={3} />
          </ChakraLink>
        </MenuItem>
        <MenuItem>
          <ChakraLink
            href="https://twitter.com/dealbase_africa"
            d="flex"
            alignItems="center"
            justifyContent="center"
            gap={2}
            target="_blank"
            onClick={() => {
              if (isProd) {
                ga.event({
                  action: "follow",
                  params: {
                    network: "twitter",
                  },
                });
              }
            }}
          >
            <Icon as={VscTwitter} fontSize={24} />
            Twitter
            <ExternalLinkIcon w={3} h={3} />
          </ChakraLink>
        </MenuItem>
        <MenuDivider />
        {isAuthenticated ? (
          <>
            <MenuItem>
              <Code>{user?.email}</Code>
            </MenuItem>
            <MenuItem onClick={() => logout()}>Sign Out</MenuItem>
          </>
        ) : (
          <>
            {withSignIn && (
              <MenuItem onClick={() => loginWithPopup()}>Sign In</MenuItem>
            )}
          </>
        )}
      </MenuList>
    </Menu>
  );
};

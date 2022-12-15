import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Icon,
  Link as ChakraLink,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { SiLinkedin } from "react-icons/si";
import { VscTwitter } from "react-icons/vsc";
import { isProd } from "src/lib/config";
import * as ga from "src/lib/googleAnalytics";

export const SocialsMenu = () => {
  return (
    <Menu>
      <ChakraLink>
        <MenuButton>Follow Us</MenuButton>
      </ChakraLink>
      <MenuList>
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
      </MenuList>
    </Menu>
  );
};

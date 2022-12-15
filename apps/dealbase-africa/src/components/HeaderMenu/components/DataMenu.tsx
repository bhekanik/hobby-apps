import {
  Link as ChakraLink,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import Link from "next/link";
import { Type } from "src/components/Modals/useSubscribeModal";
import { useFeatureFlag } from "src/contexts/FeatureFlags";
import { isProd } from "src/lib/config";
import * as ga from "src/lib/googleAnalytics";

interface Props {
  onOpen: () => void;
  setType: (type: Type) => void;
}

export const DataMenu = ({ onOpen, setType }: Props) => {
  const dataFlag = useFeatureFlag("data");

  return dataFlag ? (
    <Menu>
      <ChakraLink>
        <MenuButton>Data</MenuButton>
      </ChakraLink>
      <MenuList>
        <MenuItem>
          <Link passHref href="/" as="/">
            <ChakraLink
              onClick={() => {
                if (isProd) {
                  ga.event({
                    action: "analytics",
                    params: {
                      network: "investors",
                    },
                  });
                }
              }}
            >
              Deals
            </ChakraLink>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link passHref href="/investors" as="/investors">
            <ChakraLink
              onClick={() => {
                if (isProd) {
                  ga.event({
                    action: "analytics",
                    params: {
                      network: "investors",
                    },
                  });
                }
              }}
            >
              Investors
            </ChakraLink>
          </Link>
        </MenuItem>
      </MenuList>
    </Menu>
  ) : null;
};

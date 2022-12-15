import {
  Link as ChakraLink,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import Link from "next/link";
import { useFeatureFlag } from "src/contexts/FeatureFlags";
import { isProd } from "src/lib/config";
import * as ga from "src/lib/googleAnalytics";

export const AnalyticsMenu = () => {
  const analyticsFlag = useFeatureFlag("analytics");

  return analyticsFlag ? (
    <Menu>
      <ChakraLink>
        <MenuButton>Analytics</MenuButton>
      </ChakraLink>
      <MenuList>
        <MenuItem>
          <Link passHref href="/analytics/investors" as="/analytics/investors">
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

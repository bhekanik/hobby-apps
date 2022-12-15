import {
  Link as ChakraLink,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { Type } from "src/components/Modals/useSubscribeModal";
import { useFeatureFlag } from "src/contexts/FeatureFlags";
import { isProd } from "src/lib/config";
import * as ga from "src/lib/googleAnalytics";

interface Props {
  onOpen: () => void;
  setType: (type: Type) => void;
}

export const SubscribeMenu = ({ onOpen, setType }: Props) => {
  const dataFlag = useFeatureFlag("data");

  return dataFlag ? (
    <Menu>
      <ChakraLink>
        <MenuButton>Subscribe</MenuButton>
      </ChakraLink>
      <MenuList>
        <MenuItem>
          <ChakraLink
            onClick={() => {
              setType("investor");
              if (isProd) {
                ga.event({
                  action: "subscribe",
                  params: {
                    subscriber_type: "investor",
                  },
                });
              }
              onOpen();
            }}
          >
            Investors
          </ChakraLink>
        </MenuItem>
        <MenuItem>
          <ChakraLink
            onClick={() => {
              setType("founder");

              if (isProd) {
                ga.event({
                  action: "subscribe",
                  params: {
                    subscriber_type: "founder",
                  },
                });
              }
              onOpen();
            }}
          >
            Founders
          </ChakraLink>
        </MenuItem>
      </MenuList>
    </Menu>
  ) : (
    <>
      <ChakraLink
        onClick={() => {
          setType("investor");
          if (isProd) {
            ga.event({
              action: "subscribe",
              params: {
                subscriber_type: "investor",
              },
            });
          }
          onOpen();
        }}
      >
        Investors
      </ChakraLink>
      <ChakraLink
        onClick={() => {
          setType("founder");

          if (isProd) {
            ga.event({
              action: "subscribe",
              params: {
                subscriber_type: "founder",
              },
            });
          }
          onOpen();
        }}
      >
        Founders
      </ChakraLink>
    </>
  );
};

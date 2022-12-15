import {
  BoxProps,
  Flex,
  useColorMode,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import { countryList } from "fixtures";
import { moneyFormatter } from "formatters";
import Image from "next/image";
import { useRouter } from "next/router";
import { memo, useEffect, useMemo, useState } from "react";
import { baseUrl, isProd } from "src/lib/config";
import * as ga from "src/lib/googleAnalytics";
import { useStore } from "src/stores/dealflow";
import shallow from "zustand/shallow";
import { Loader } from "../Loader";
import { useShareModal } from "../Modals/useShareModal";

interface Props {
  isDisabled?: boolean;
}

const ShareBase = ({ isDisabled, ...otherProps }: Props & BoxProps) => {
  const toast = useToast();
  const dealflow = useStore((state) => state.dealflow, shallow);
  const [isLessThan768] = useMediaQuery("(max-width: 768px)");

  const { colorMode } = useColorMode();

  const { ShareModal, onOpen, isOpen } = useShareModal();
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const [shareProps, setShareProps] = useState({
    imageUrl: "",
    shareUrl: "",
    shortShareUrl: "",
  });

  useEffect(() => {
    if (!isOpen) {
      setShareProps({
        imageUrl: "",
        shareUrl: "",
        shortShareUrl: "",
      });
    }
  }, [isOpen]);

  const countryListMap = useMemo(
    () =>
      countryList.reduce<Record<string, string>>(
        (acc, country: { name: string; code: string }) => {
          acc[country.code] = country.name;
          return acc;
        },
        {}
      ),
    [countryList]
  );

  const handleShareClick = async () => {
    setLoading(true);
    try {
      if (isProd) {
        ga.event({
          action: "share_button_click",
          params: {
            dealflow,
          },
        });
      }

      const res = await fetch("/api/share", {
        method: "POST",
        body: JSON.stringify({
          ...dealflow,
          filter: {
            ...dealflow.filter,
            country:
              dealflow.filter.country[0] === "All"
                ? ["Africa"]
                : dealflow.filter.country.map((country) => {
                    return countryListMap[country] ?? "";
                  }),
          },
          value: moneyFormatter(dealflow.value),
        }),
        headers: {
          "x-trace-id": new Date().getTime().toString(36),
        },
      });

      const data = await res.json();

      const shareUrl = `${baseUrl}${router.pathname}?dealflow=${JSON.stringify(
        dealflow
      )}&url=${data.imageUrl || ""}`;

      if (
        window.sessionStorage.getItem(JSON.stringify({ destination: shareUrl }))
      ) {
        setShareProps({
          imageUrl: data.imageUrl,
          shareUrl,
          shortShareUrl:
            window.sessionStorage.getItem(
              JSON.stringify({ destination: shareUrl })
            ) || "",
        });
      } else {
        const shortenRes = await fetch("/api/shorten", {
          method: "POST",
          body: JSON.stringify({ destination: shareUrl }),
          headers: {
            "x-trace-id": new Date().getTime().toString(36),
          },
        });

        const { link } = await shortenRes.json();

        if (link) {
          window.sessionStorage.setItem(
            JSON.stringify({ destination: shareUrl }),
            `https://${link.shortUrl}`
          );

          setShareProps({
            imageUrl: data.imageUrl,
            shortShareUrl: `https://${link.shortUrl}`,
            shareUrl,
          });
        }
      }
    } catch (error) {
      toast({
        title: "Failed to generate share link.",
        description: `An error occurred while generating the share link. Please try again.`,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (shareProps.shortShareUrl) {
      onOpen();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shareProps.shortShareUrl]);

  return (
    <>
      {loading && (
        <Loader
          position="absolute"
          top="0"
          opacity={0.5}
          bottom="0"
          right="0"
          left="0"
          zIndex="overlay"
        />
      )}
      {isOpen && <ShareModal {...shareProps} />}

      <Flex
        onClick={handleShareClick}
        alignItems="center"
        opacity={isDisabled ? 0.5 : 1}
        justifyContent="center"
        bgColor="transparent"
        position="relative"
        aria-roledescription="button"
        h="100px"
        cursor={isDisabled ? "not-allowed" : "pointer"}
        p={0}
        w={isLessThan768 ? "100%" : "full"}
        {...otherProps}
      >
        <Image
          objectFit="cover"
          alt="icon"
          src={
            colorMode === "dark"
              ? "/icons/share-button-dark.svg"
              : "/icons/share-button-light.svg"
          }
          layout="fill"
        />
      </Flex>
    </>
  );
};

export const Share = memo(ShareBase);

import { Flex, Link, Text, useMediaQuery, useToast } from "@chakra-ui/react";
import {
  FeatureCollection,
  Geometry,
  GeometryCollection,
  Position,
  Properties,
} from "@turf/helpers";
import { moneyFormatter } from "formatters";
import "mapbox-gl/dist/mapbox-gl.css";
import { ComponentType, useEffect, useState } from "react";
import { Popup as RMapGLPopup } from "react-map-gl";
import { useStore } from "src/stores/dealflow";
import shallow from "zustand/shallow";

export interface PopupState {
  loading: boolean;
  data: {
    value: number;
    source: string;
    population: number;
  };
  isOpen: boolean;
}

interface Props {
  selectedFeatures: FeatureCollection<
    Geometry | GeometryCollection,
    Properties
  > | null;
  center: Position;
}

export const usePopup = ({
  selectedFeatures,
  center,
}: Props): {
  popupState: PopupState;
  Popup: ComponentType;
  resetPopup: () => void;
} => {
  const filter = useStore((state) => state.dealflow.filter, shallow);

  const resetPopup = () => {
    setPopupState((currentModalState) => ({
      ...currentModalState,
      loading: false,
      isOpen: false,
      data: {
        value: 0,
        source: "",
        population: 0,
      },
    }));
  };

  useEffect(() => {
    if (filter.country[0] === "All") {
      resetPopup();
    }
  }, [filter]);

  const [popupState, setPopupState] = useState<PopupState>({
    loading: false,
    data: {
      value: 0,
      source: "",
      population: 0,
    },
    isOpen: false,
  });

  const toast = useToast();

  const Popup = () => {
    const [isLessThan768] = useMediaQuery("(max-width: 768px)");
    return (
      <RMapGLPopup
        longitude={center[0]}
        latitude={center[1]}
        anchor="bottom"
        onClose={() =>
          setPopupState((currentModalState) => ({
            ...currentModalState,
            loading: false,
            isOpen: false,
            data: {
              value: 0,
              source: "",
              population: 0,
            },
          }))
        }
      >
        <Flex
          color="black"
          flexDir="column"
          w="fit-content"
          gap={2}
          p={2}
          px={3}
        >
          <Text fontSize={18} fontWeight="bold">
            {`${selectedFeatures?.features[0].properties?.name} (${
              selectedFeatures?.features[0].properties?.ISO2 || ""
            })`}
          </Text>
          <Text fontSize={14}>
            Total population:{" "}
            <Text as="span" fontWeight="bold">
              {new Intl.NumberFormat(navigator.language).format(
                popupState.data.population
              )}
            </Text>
          </Text>
          {isLessThan768 && (
            <Text fontSize={14}>
              Deals:{" "}
              <Text as="span" fontWeight="bold">
                {selectedFeatures?.features[0].properties?.deals}
              </Text>
            </Text>
          )}
          <Text fontSize={14}>
            GDP (2021):{" "}
            <Text as="span" fontWeight="bold">
              {popupState.data
                ? moneyFormatter(popupState.data.value)
                : "No data available"}
            </Text>
          </Text>
          <Link
            href={`https://datatopics.worldbank.org/world-development-indicators/`}
            target="_blank"
            rel="noreferrer noopener"
            color="teal"
            _focus={{ outline: "none" }}
          >
            <Text fontSize={10} lineHeight={1}>
              Source: {popupState.data.source}
            </Text>
          </Link>
        </Flex>
      </RMapGLPopup>
    );
  };

  useEffect(() => {
    if (
      selectedFeatures?.features?.length &&
      selectedFeatures?.features?.length === 1
    ) {
      (async () => {
        try {
          setPopupState((currentModalState) => ({
            ...currentModalState,
            loading: true,
            isOpen: false,
            data: {
              value: 0,
              source: "",
              population: 0,
            },
          }));
          const response = await fetch(
            `https://api.worldbank.org/v2/country/${selectedFeatures?.features[0].properties?.ISO2}/indicator/NY.GDP.MKTP.CD;SP.POP.TOTL?format=json&date=2020&source=2`
          );
          const gdpData = await response.json();

          setPopupState((currentModalState) => ({
            ...currentModalState,
            loading: false,
            data: {
              value: gdpData[1]?.[0]?.value || 0,
              source: `${
                gdpData[0]?.sourcename || "World Bank"
              } (last updated: ${gdpData[0]?.lastupdated})`,
              population: gdpData[1]?.[1]?.value || 0,
            },
            isOpen: true,
          }));
        } catch (error) {
          setPopupState((currentModalState) => ({
            ...currentModalState,
            loading: false,
            isOpen: false,
            data: {
              value: 0,
              source: "",
              population: 0,
            },
          }));
          toast({
            title: "Failed to get data.",
            description: `An error occurred fetching popup data.`,
            status: "error",
            duration: 9000,
            isClosable: true,
            position: "top",
          });
        }
      })();
    } else {
      setPopupState((currentModalState) => ({
        ...currentModalState,
        loading: false,
        isOpen: false,
        data: {
          value: 0,
          source: "",
          population: 0,
        },
      }));
    }
  }, [selectedFeatures, toast]);

  return { popupState, Popup, resetPopup };
};

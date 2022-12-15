import bbox from "@turf/bbox";
import getCenter from "@turf/center";
import {
  FeatureCollection,
  Geometry,
  GeometryCollection,
  Position,
  Properties,
} from "@turf/helpers";
import africaGeoJson from "fixtures/json/africa.geo.json";
import "mapbox-gl/dist/mapbox-gl.css";
import {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import { MapLayerMouseEvent, MapRef } from "react-map-gl";
import { isProd } from "src/lib/config";
import * as ga from "src/lib/googleAnalytics";
import { useStore } from "src/stores/dealflow";
import { Deal } from "types";
import shallow from "zustand/shallow";

export interface LayerStyle {
  id: string;
  type: string;
  filter: string[];
  paint: {
    "fill-color": string;
    "fill-opacity": number;
    "fill-outline-color": string;
  };
}

interface Props {
  mapRef: RefObject<MapRef>;
  setCenter: Dispatch<SetStateAction<Position>>;
  featuresToRender: FeatureCollection<
    Geometry | GeometryCollection,
    Properties
  >;
  deals: Deal[];
}

export const useSelectedFeatures = ({
  mapRef,
  setCenter,
  featuresToRender,
  deals,
}: Props): {
  selectedLayerStyle: LayerStyle;
  selectedFeatures: FeatureCollection<
    Geometry | GeometryCollection,
    Properties
  > | null;
  resetSelectedFeatures: () => void;
  onFeatureSelection: (event: MapLayerMouseEvent) => void;
} => {
  const filter = useStore((state) => state.dealflow.filter, shallow);
  const setFilter = useStore((state) => state.setFilter);

  const [selectedCountries, setSelectedCountries] = useState<string[]>([""]);
  const [selectedFeatures, setSelectedFeatures] =
    useState<FeatureCollection | null>(null);

  const resetSelectedFeatures = () => {
    setSelectedCountries([""]);
    setSelectedFeatures(null);
  };

  const onFeatureSelection = (event: MapLayerMouseEvent) => {
    const feature = event.features?.[0];

    if (isProd) {
      ga.event({
        action: "map_click",
        params: {
          country: feature?.properties?.ISO2,
        },
      });
    }
    setSelectedCountries([feature?.properties?.ISO2 as string]);
    setSelectedFeatures({
      ...featuresToRender,
      features: feature ? [feature] : [],
    } as FeatureCollection);

    setFilter({ country: [feature?.properties?.ISO2] }, deals || []);

    if (feature) {
      // calculate the bounding box of the feature
      const [minLng, minLat, maxLng, maxLat] = bbox(feature);

      if (mapRef.current) {
        mapRef.current.fitBounds(
          [
            [minLng, minLat],
            [maxLng, maxLat],
          ],
          { padding: 40, duration: 1000 }
        );
      }
    }
  };

  useEffect(() => {
    if (filter.country[0] === "All") {
      resetSelectedFeatures();
      if (mapRef?.current) {
        const centerCoords = getCenter(africaGeoJson as FeatureCollection);
        setCenter(centerCoords.geometry.coordinates);
        const [minLng, minLat, maxLng, maxLat] = bbox(
          africaGeoJson as FeatureCollection
        );

        mapRef.current.fitBounds(
          [
            [minLng, minLat],
            [maxLng, maxLat],
          ],
          { padding: 40, duration: 1000 }
        );
      }
      return;
    }

    setSelectedCountries(filter.country);
    const newSelectedFeatures = featuresToRender.features.filter((feature) =>
      filter.country.includes(feature.properties?.ISO2)
    );
    const newFeaturesToRender = {
      ...featuresToRender,
      features:
        newSelectedFeatures.length > 0
          ? newSelectedFeatures
          : (africaGeoJson as FeatureCollection).features,
    };
    setSelectedFeatures(newFeaturesToRender);

    if (newFeaturesToRender) {
      const [minLng, minLat, maxLng, maxLat] = bbox(
        newFeaturesToRender as FeatureCollection
      );
      const centerCoords = getCenter(newFeaturesToRender as FeatureCollection);

      setCenter(centerCoords.geometry.coordinates);

      mapRef.current?.fitBounds(
        [
          [minLng, minLat],
          [maxLng, maxLat],
        ],
        { padding: 40, duration: 1000 }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, mapRef.current]);

  const selectedLayerStyle = useMemo(
    () => ({
      id: "selected-country",
      type: "fill",
      filter: ["in", "ISO2", ...selectedCountries],
      paint: {
        "fill-color": "#D98F39",
        "fill-opacity": 1,
        "fill-outline-color": "#fff",
      },
    }),
    [selectedCountries]
  );

  return {
    selectedLayerStyle,
    selectedFeatures,
    resetSelectedFeatures,
    onFeatureSelection,
  };
};

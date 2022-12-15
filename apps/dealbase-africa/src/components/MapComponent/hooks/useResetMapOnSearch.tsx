import bbox from "@turf/bbox";
import getCenter from "@turf/center";
import { FeatureCollection, Position } from "@turf/helpers";
import africaGeoJson from "fixtures/json/africa.geo.json";
import "mapbox-gl/dist/mapbox-gl.css";
import { Dispatch, RefObject, SetStateAction, useEffect } from "react";
import { MapRef } from "react-map-gl";
import { useStore } from "src/stores/dealflow";

interface Props {
  resetSelectedFeatures: () => void;
  setCenter: Dispatch<SetStateAction<Position>>;
  mapRef: RefObject<MapRef>;
  resetPopup: () => void;
}

export const useResetMapOnSearch = ({
  resetSelectedFeatures,
  setCenter,
  mapRef,
  resetPopup,
}: Props) => {
  const searchTerm = useStore((state) => state.dealflow.searchTerm);

  useEffect(() => {
    if (searchTerm !== "") {
      resetSelectedFeatures();
      if (mapRef?.current) {
        const centerCoords = getCenter(africaGeoJson as FeatureCollection);
        setCenter(centerCoords.geometry.coordinates);
        resetPopup();
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
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);
};

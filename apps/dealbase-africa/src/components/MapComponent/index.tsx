/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useMediaQuery } from "@chakra-ui/react";
import bbox from "@turf/bbox";
import bboxPolygon from "@turf/bbox-polygon";
import booleanPointInPolygon from "@turf/boolean-point-in-polygon";
import { FeatureCollection, Position } from "@turf/helpers";
import africaGeoJson from "fixtures/json/africa.geo.json";
import "mapbox-gl/dist/mapbox-gl.css";
import { memo, useCallback, useRef, useState } from "react";
import Map, { Layer, MapRef, Source, ViewStateChangeEvent } from "react-map-gl";
import { Deal } from "types";
import { useChloroplethLayerStyle } from "./hooks/useChloroplethLayerStyle";
import { usePopup } from "./hooks/usePopup";
import { useResetMapOnSearch } from "./hooks/useResetMapOnSearch";
import { useSelectedFeatures } from "./hooks/useSelectedFeatures";

interface Props {
  deals: Deal[];
  style?: Record<string, unknown>;
}

export const MapComponentBase = ({ deals, style }: Props) => {
  const mapRef = useRef<MapRef>(null);

  const [isLessThan768] = useMediaQuery("(max-width: 768px)");
  const [featuresToRender, setFeaturesToRender] = useState<FeatureCollection>(
    () => africaGeoJson as FeatureCollection
  );

  const [viewState, setViewState] = useState(() => ({
    latitude: 1.3633919998092203,
    longitude: 19.07195085883347,
    zoom: isLessThan768 ? 1.4 : 2,
  }));

  const [center, setCenter] = useState<Position>([
    24.671093750000008, -22.320898437500006,
  ]);

  const {
    selectedLayerStyle,
    selectedFeatures,
    resetSelectedFeatures,
    onFeatureSelection,
  } = useSelectedFeatures({
    mapRef,
    setCenter,
    featuresToRender,
    deals,
  });

  const { popupState, Popup, resetPopup } = usePopup({
    selectedFeatures,
    center,
  });

  useResetMapOnSearch({
    mapRef,
    resetSelectedFeatures,
    setCenter,
    resetPopup,
  });

  const layerStyle = useChloroplethLayerStyle({
    mapRef,
    deals,
    setFeaturesToRender,
  });

  const handleMove = useCallback((e: ViewStateChangeEvent) => {
    const newCenter = [e.viewState.longitude, e.viewState.latitude];

    // Only update the view state if the center is inside the geofence
    if (
      booleanPointInPolygon(
        newCenter,
        bboxPolygon(bbox(africaGeoJson as FeatureCollection))
      )
    ) {
      setViewState(e.viewState);
    }
  }, []);

  return (
    <Map
      {...viewState}
      onMove={handleMove}
      style={
        style ?? {
          position: "relative",
          width: isLessThan768 ? 350 : 550,
          height: isLessThan768 ? 400 : 475,
        }
      }
      ref={mapRef}
      // mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      reuseMaps
      attributionControl={false}
      onClick={onFeatureSelection}
      interactiveLayerIds={["africa-countries"]}
      preserveDrawingBuffer
    >
      <Source
        id="africa-countries"
        type="geojson"
        // @ts-ignore
        data={featuresToRender as FeatureCollection}
      >
        {/* @ts-ignore */}
        <Layer {...layerStyle} />
        {/* @ts-ignore */}
        <Layer {...selectedLayerStyle} />
      </Source>
      {popupState.isOpen && <Popup />}
    </Map>
  );
};

export const MapComponent = memo(MapComponentBase);

export default MapComponent;

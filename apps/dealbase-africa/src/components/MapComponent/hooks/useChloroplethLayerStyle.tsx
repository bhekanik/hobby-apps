import {
  FeatureCollection,
  Geometry,
  GeometryCollection,
  Properties,
} from "@turf/helpers";
import africaGeoJson from "fixtures/json/africa.geo.json";
import "mapbox-gl/dist/mapbox-gl.css";
import React, { Dispatch, RefObject, useEffect, useMemo } from "react";
import { MapRef } from "react-map-gl";
import { Deal } from "types";

interface Props {
  deals: Deal[];
  mapRef: RefObject<MapRef>;
  setFeaturesToRender: Dispatch<
    React.SetStateAction<
      FeatureCollection<Geometry | GeometryCollection, Properties>
    >
  >;
}

export const useChloroplethLayerStyle = ({
  mapRef,
  deals,
  setFeaturesToRender,
}: Props) => {
  const topValue = useMemo(() => {
    return (
      (Math.max(
        ...Object.values(
          deals.reduce<Record<string, number>>((acc, deal) => {
            if (acc[deal.company.country]) {
              acc[deal.company.country] += 1;
            } else {
              acc[deal.company.country] = 1;
            }
            return acc;
          }, {})
        ),
        0
      ) /
        10) *
      10
    );
  }, [deals]);

  const layerStyle = useMemo(
    () => ({
      id: "africa-countries",
      type: "fill",
      paint: {
        "fill-color": {
          property: "deals",
          stops: [
            [0, "#31A078"],
            [topValue, "#D98F39"],
          ],
        },
        "fill-opacity": 0.8,
        "fill-outline-color": "#fff",
      },
    }),
    [topValue]
  );

  const dealsPerCountry = useMemo(
    () =>
      deals.reduce<Record<string, number>>((acc, deal) => {
        if (acc[deal.company.country]) {
          acc[deal.company.country] += 1;
        } else {
          acc[deal.company.country] = 1;
        }
        return acc;
      }, {}),
    [deals]
  );

  useEffect(() => {
    const newAfricaGeoJson = {
      ...(africaGeoJson as FeatureCollection),
    };

    newAfricaGeoJson.features.forEach((feature) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      feature.properties.deals = dealsPerCountry[feature.properties?.ISO2] ?? 0;
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    mapRef.current?.getSource("africa-countries")?.setData(newAfricaGeoJson);
    setFeaturesToRender(newAfricaGeoJson as FeatureCollection);
  }, [deals, mapRef]);

  return layerStyle;
};

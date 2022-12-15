import { useContext, useEffect, useRef, useState } from "react";
import { ApiContext } from "./ApiContext";
import { FeatureFlagChangedEventListener, FeatureFlagValue } from "./types";

/**
 * The `useFeatureFlagValue` hook returns the value of a feature flag
 * If the flag is not set, then null is returned.
 * @param feature The name of the feature
 */
export default function useFeatureFlagValue(
  feature: string
): FeatureFlagValue | null {
  const { addListener, removeListener, getFeatureValue } =
    useContext(ApiContext);

  const onChangeRef = useRef<FeatureFlagChangedEventListener | null>(null);

  const [value, setValue] = useState<FeatureFlagValue | null>(() => {
    onChangeRef.current = (event) => {
      setValue(event.newValue);
    };
    addListener(feature, onChangeRef.current);
    return getFeatureValue(feature);
  });

  useEffect(() => {
    return () => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      removeListener(feature, onChangeRef.current!);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return value;
}

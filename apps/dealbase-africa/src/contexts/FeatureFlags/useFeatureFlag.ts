import { useContext, useEffect, useRef, useState } from "react";
import { ApiContext } from "./ApiContext";
import { FeatureFlagChangedEventListener, FeatureFlagValue } from "./types";

/**
 * The `useFeatureFlag` hook will return whether a flag is enabled or disabled.
 * If the flag is not set, then null is returned.
 * If the hook is used used outside of a `FeatureFlagsProvider`, the `defaultValue` is returned.
 *
 * @param feature The name of the feature that is enabled/disabled.
 * @param defaultValue The value to return when the feature is not set. (defaults to false)
 */
export function useFeatureFlag(feature: string): FeatureFlagValue | null {
  const { addListener, removeListener, isFeatureEnabled } =
    useContext(ApiContext);

  const onChangeRef = useRef<FeatureFlagChangedEventListener | null>(null);

  const [value, setValue] = useState<boolean | null>(() => {
    onChangeRef.current = (event) => {
      setValue(event.newValue);
    };
    addListener(feature, onChangeRef.current);
    return isFeatureEnabled(feature);
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

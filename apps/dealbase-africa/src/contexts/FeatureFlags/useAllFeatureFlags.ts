import { useContext } from "react";
import FlagsContext from "./FlagsContext";
import FeatureFlags from "./types";

/**
 * The `useAllFeatureFlags` hook will return all of the feature flags currently configured.
 * This will return an empty object if the hook is used outside of a `FeatureFlagsProvider`.
 */
export default function useAllFeatureFlags(): FeatureFlags {
  const flags = useContext(FlagsContext);
  return flags;
}

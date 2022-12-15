import FeatureFlagsSource from "../FeatureFlagsSource";
import FeatureFlags, { FeatureFlagValue } from "../types";
import { isFlagSet, isValidFeatureFlagValue } from "./isValidFeatureFlagValue";

export const getFeatureFlagsFromSources = (
  sources: FeatureFlagsSource[]
): FeatureFlags => {
  const featureFlags: FeatureFlags = {};
  for (const source of sources) {
    for (const [feature, value] of Object.entries(source)) {
      if (!isFlagSet(featureFlags, feature)) {
        if (isValidFeatureFlagValue(value)) {
          featureFlags[feature] = value as FeatureFlagValue;
        }
      }
    }
  }
  return featureFlags;
};

import { useEffect, useState } from "react";
import { sessionStorageAdapter } from "./StorageAdapter";
import FeatureFlags, { FeatureFlagValue } from "./types";

export const FEATURE_OVERRIDES = "featureOverrides";

/**
 * The `useLocalFlags` hook will return the features enabled/disabled via sessionStorage.
 * It will also listen for changes to sessionStorage and return the updated features.
 */
export default function useLocalFlags() {
  const [flags, setFlags] = useState<FeatureFlags>(() => {
    return getFeatures();
  });
  useEffect(() => {
    function handler(event: StorageEvent) {
      if (
        event.storageArea === window.sessionStorage &&
        event.key === FEATURE_OVERRIDES
      ) {
        setFlags(getFeatures());
      }
    }
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("storage", handler);
    };
  });
  return flags;
}

/**
 * Enables a feature in sessionStorage.
 * Designed to be attached to the window object so it can be called inside your browser's devtools.
 * @param feature The feature or features to enable
 */
export function enableFeature(feature: string | string[]): FeatureFlags {
  if (typeof feature === "string") {
    return setFeature(feature, true);
  }
  return feature.reduce<FeatureFlags>(
    (acc, featureFlag) => Object.assign(acc, setFeature(featureFlag, true)),
    {}
  );
}

/**
 * Set a feature value in sessionStorage
 * If the feature flag is not currently set then it will be created
 * Designed to be attached to the window object so it can be called inside your browser's devtools.
 * @param feature The feature or features to enable
 * @param value A value to set for the feature (string, boolean or number)
 * @returns feature flags object
 */
export function changeFeatureValue(
  feature: string,
  value: FeatureFlagValue
): FeatureFlags {
  if (
    typeof value !== "string" &&
    typeof value !== "number" &&
    typeof value !== "boolean"
  )
    throw new Error(
      "Feature flag values must be of type string, number or boolean."
    );

  return setFeature(feature, value);
}

/**
 * Disables a feature in sessionStorage.
 * Designed to be attached to the window object so it can be called inside your browser's devtools.
 * @param feature The feature to disable
 */
export function disableFeature(feature: string): FeatureFlags {
  return setFeature(feature, false);
}

/**
 * Returns a full set of enabled/disabled features in sessionStorage
 * Designed to be attached to the window object so it can be called inside your browser's devtools.
 */
export function getFeatures(): FeatureFlags {
  try {
    const value = sessionStorageAdapter.getItem(FEATURE_OVERRIDES);
    if (!value) {
      return {};
    }
    return JSON.parse(value);
  } catch (err) {
    return {};
  }
}

/**
 * Clears all enabled/disabled features in sessionStorage
 * Designed to be attached to the window object so it can be called inside your browser's devtools.
 */
export function clearFeatures() {
  sessionStorageAdapter.removeItem(FEATURE_OVERRIDES);
}

function setFeature(feature: string, value: FeatureFlagValue): FeatureFlags {
  const flags = getFeatures();
  flags[feature] = value;
  sessionStorageAdapter.setItem(FEATURE_OVERRIDES, JSON.stringify(flags));
  return flags;
}

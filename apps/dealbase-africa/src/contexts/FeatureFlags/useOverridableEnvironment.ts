import { useEffect, useState } from "react";
import { sessionStorageAdapter } from "./StorageAdapter";
import FeatureFlags from "./types";

export const RELEASE = "release";
export const DEVELOPMENT = "development";
export type Environment = "development" | "release";

export const ENVIRONMENT_OVERRIDE = "environmentOverride";

export default function useOverridableEnvironment(
  defaultEnvironment: Environment | null,
  development: FeatureFlags,
  release: FeatureFlags
) {
  const [environment, setEnvironment] = useState<Environment | null>(() => {
    return getEnvironment() || defaultEnvironment;
  });

  useEffect(() => {
    function handler(event: StorageEvent) {
      if (
        event.storageArea === window.sessionStorage &&
        event.key === ENVIRONMENT_OVERRIDE
      ) {
        const newValue = parseEnvironment(event.newValue) || defaultEnvironment;
        setEnvironment(newValue);
      }
    }
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("storage", handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return environment === DEVELOPMENT ? development : release;
}

/**
 * Returns the feature environment override set with sessionStorage. Returns null if no override is set.
 * Designed to be attached to the window object so it can be called inside your browsers devtools.
 */
export function getEnvironment(): Environment | null {
  return parseEnvironment(sessionStorageAdapter.getItem(ENVIRONMENT_OVERRIDE));
}

/**
 * Overrides the feature environment via sessionStorage.
 * Designed to be attached to the window object so it can be called inside your browsers devtools.
 */
export function setEnvironment(environment: Environment) {
  sessionStorageAdapter.setItem(ENVIRONMENT_OVERRIDE, environment);
}

/**
 * Clears the current feature environment override set in sessionStorage.
 * Designed to be attached to the window object so it can be called inside your browsers devtools.
 */
export function clearEnvironment() {
  sessionStorageAdapter.removeItem(ENVIRONMENT_OVERRIDE);
}

export function parseEnvironment(value: string | null): Environment | null {
  switch (value) {
    case DEVELOPMENT:
      return DEVELOPMENT;
    case RELEASE:
      return RELEASE;
    default:
      return null;
  }
}

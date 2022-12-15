import { createContext } from "react";
import { FeatureFlagsBroker } from "./types";

export const ApiContext = createContext<FeatureFlagsBroker>({
  addListener: () => {
    return;
  },
  removeListener: () => {
    return;
  },
  isFeatureEnabled() {
    return null;
  },
  getFeatureValue() {
    return null;
  },
});

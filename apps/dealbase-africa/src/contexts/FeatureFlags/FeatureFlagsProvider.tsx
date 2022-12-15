import { PropsWithChildren, useEffect, useMemo, useRef } from "react";
import { ApiContext } from "./ApiContext";
import FeatureFlagBroker from "./FeatureFlagsBroker";
import FeatureFlagsSource from "./FeatureFlagsSource";
import FlagsContext from "./FlagsContext";
import FeatureFlags from "./types";
import useLocalFlags, {
  changeFeatureValue,
  clearFeatures,
  disableFeature,
  enableFeature,
  getFeatures,
} from "./useLocalFlags";
import useOverridableEnvironment, {
  clearEnvironment,
  getEnvironment,
  parseEnvironment,
  setEnvironment,
} from "./useOverridableEnvironment";
import useRemoteFlags from "./useRemoteFlags";
import { getFeatureFlagsFromSources } from "./utils/getFeatureFlagsFromSources";

export type FeatureFlagsProviderProps = PropsWithChildren<{
  defaultEnvironment: string;
  development: FeatureFlags;
  remote?: Promise<FeatureFlagsSource | FeatureFlagsSource[]>;
  release: FeatureFlags;
  applyDevTools?: object;
}>;

/**
 * The `FeatureFlagsProvider` must be created near the root of your React application to be able to provide feature
 * flags to its descendants. This component hooks into sessionStorage so that features can be enabled/disabled on the fly or
 * the feature environment can be toggled between development/release. A Promise<FeatureFlagsSource | FeatureFlagsSource[]> can also be passed to
 * the optional remote prop, this allows you to add flags from a remote source which override the environment flags, but not
 * the local flags.
 *
 * @example
 * <FeatureFlagsProvider
 *      defaultEnvironment="release"
 *      development={{ experimental: true }}
 *      release={{ experimental: false }}
 *      remote={Promise.resolve({ experimental: true })}>
 *      applyDevTools={window}
 *   <MyApp />
 * </FeatureFlagsProvider>
 *
 *
 * @example with multiple remote flag sources
 * <FeatureFlagsProvider
 *      defaultEnvironment="release"
 *      development={{ experimental: true }}
 *      release={{ experimental: false }}
 *      remote={Promise.all([Promise.resolve({ experimental: true }), Promise.resolve({ otherProjectFlag: true })])}>
 *      applyDevTools={window}
 *   <MyApp />
 * </FeatureFlagsProvider>
 */
export default function FeatureFlagsProvider({
  defaultEnvironment,
  development,
  release,
  remote,
  applyDevTools,
  children,
}: FeatureFlagsProviderProps) {
  const localFlags = useLocalFlags();
  const remoteFlags = useRemoteFlags(remote);
  const defaultFlags = useOverridableEnvironment(
    parseEnvironment(defaultEnvironment),
    development,
    release
  );
  const sources = [localFlags, remoteFlags, defaultFlags];
  const brokerRef = useRef<FeatureFlagBroker | null>(null);
  if (brokerRef.current === null) {
    brokerRef.current = new FeatureFlagBroker();
  }
  // NOTE: `sources` is used as the depsList to ensure that flags is only recalculated if the values inside the array change.
  const flags = useMemo(() => {
    const flags = getFeatureFlagsFromSources(sources);
    brokerRef.current?.setFlags(flags);

    return flags;
  }, sources);

  useEffect(() => {
    if (applyDevTools) {
      Object.assign(applyDevTools, {
        isFeatureEnabled: brokerRef.current?.isFeatureEnabled,
        getFeatureValue: brokerRef.current?.getFeatureValue,
        enableFeature,
        disableFeature,
        getFeatures,
        clearFeatures,
        getEnvironment,
        setEnvironment,
        clearEnvironment,
        changeFeatureValue,
      });
    }
  }, [applyDevTools]);

  return (
    <ApiContext.Provider value={brokerRef.current}>
      <FlagsContext.Provider value={flags}>{children}</FlagsContext.Provider>
    </ApiContext.Provider>
  );
}

import { Fragment, PropsWithChildren, useEffect } from "react";
import FeatureFlags from "./types";
import useAllFeatureFlags from "./useAllFeatureFlags";

export type FeatureFlagsBridgeProps = PropsWithChildren<{
  target: FeatureFlags;
}>;

/**
 * `FeatureFlagsBridge` allows you to link the feature-flags lib to an existing global mutable object.
 * It allows you to more incrementally migrate to using this library.
 *
 * @example
 * const featureConfig = {}; // Will have features set to it as soon as they are updated by the `FeatureFlagsProvider`
 *
 * <FeatureFlagsProvider {...providerProps}>
 *  <FeatureFlagsBridge target={featureConfig}>{children}</FeatureFlagsBridge>
 * </FeatureFlagsProvider>
 */
export default function FeatureFlagsBridge({
  children,
  target,
}: FeatureFlagsBridgeProps) {
  const flags = useAllFeatureFlags();

  useEffect(() => {
    Object.assign(target, flags);
  }, [flags, target]);
  return <Fragment>{children}</Fragment>;
}

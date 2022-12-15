import { Fragment, PropsWithChildren } from "react";
import { useFeatureFlag } from "./useFeatureFlag";

export type FeatureToggleProps = PropsWithChildren<{
  feature: string;
  defaultValue?: boolean;
}>;

/**
 * The `FeatureToggle` component will conditionally render it's children if the `feature` is
 * set to true. If it is not set, then the `defaultValue` is used.
 *
 * @example
 * <FeatureToggle feature="experimental">
 *  <TotalsPositionButton />
 * </FeatureToggle>
 */
export default function FeatureToggle({
  children,
  feature,
  defaultValue,
}: FeatureToggleProps) {
  const isEnabled = useFeatureFlag(feature) ?? defaultValue;

  if (!isEnabled) {
    return null;
  }
  return <Fragment>{children}</Fragment>;
}

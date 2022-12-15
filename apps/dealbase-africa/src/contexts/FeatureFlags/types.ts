export type FeatureFlagValue = boolean | number | string;

export default interface FeatureFlags {
  [feature: string]: FeatureFlagValue;
}

export interface FeatureFlagChangedEvent {
  feature: string;
  oldValue: boolean | null;
  newValue: boolean | null;
}

export type FeatureFlagChangedEventListener = (
  event: FeatureFlagChangedEvent
) => void;

export interface FeatureFlagsBroker {
  addListener(feature: string, listener: FeatureFlagChangedEventListener): void;
  removeListener(
    feature: string,
    listener: FeatureFlagChangedEventListener
  ): void;
  isFeatureEnabled(feature: string): boolean | null;
  getFeatureValue(feature: string): FeatureFlagValue | null;
}

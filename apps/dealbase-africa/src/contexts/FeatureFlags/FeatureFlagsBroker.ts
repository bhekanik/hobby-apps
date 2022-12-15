import EventEmitter from "event-emitter";
import FeatureFlags, {
  FeatureFlagChangedEventListener,
  FeatureFlagsBroker,
  FeatureFlagValue,
} from "./types";

/**
 * `FeatureFlagsBrokerImpl` coordinates the requesting/listening to `FeatureFlags` and
 * allows them to be updated by `FeatureFlagsBroker`.
 */
export default class FeatureFlagsBrokerImpl implements FeatureFlagsBroker {
  private readonly emitter = EventEmitter();
  private flags: FeatureFlags = {};

  /**
   * Add a listener for changes to a specific feature flag.
   * `removeListener` should be called to stop listening to changess.
   *
   * @param feature The feature to listen to changes for
   * @param listener The function which will be called when the flag changes, this receives a `FeatureFlagChangedEvent`
   *                  containing the feature, oldValue and newValue.
   */
  addListener = (
    feature: string,
    listener: FeatureFlagChangedEventListener
  ): void => {
    this.emitter.on(feature, listener);
  };

  /**
   * Removes an existing listener for changes to a specific feature flag.
   *
   * @param feature The feature that this listener was added for
   * @param listener The function which is already listening for changes
   */
  removeListener = (
    feature: string,
    listener: FeatureFlagChangedEventListener
  ): void => {
    this.emitter.off(feature, listener);
  };

  /**
   * Returns the current state of a given feature. (or `null` if it is not set)
   *
   * @param feature `true`/`false` if this feature is enabled/disabled or `null` if it is not set.
   */
  isFeatureEnabled = (feature: string): boolean | null => {
    if (this.flags[feature] != null) return this.flags[feature] !== false;
    return null;
  };

  /**
   * Returns the value from a given feature flag if it exists, or null if it is not set
   * @param feature the name / id of the feature flag
   * @returns the value of the feature flag
   */
  getFeatureValue = (feature: string): FeatureFlagValue | null => {
    return this.flags[feature] ?? null;
  };

  /**
   * Replaces all existing feature flags with a new set of feature flags.
   * For any flags which are added/removed/updated, listeners for those flags will be called..
   *
   * @param newFlags a new set of `FeatureFlags`
   */
  setFlags = (newFlags: FeatureFlags) => {
    const features = new Set([
      ...Object.keys(this.flags),
      ...Object.keys(newFlags),
    ]);

    features.forEach((feature) => {
      const oldValue = this.flags[feature] ?? null;
      const newValue = newFlags[feature] ?? null;
      if (oldValue !== newValue) {
        this.emitter.emit(feature, {
          feature,
          oldValue,
          newValue,
        });
      }
    });

    this.flags = newFlags;
  };
}

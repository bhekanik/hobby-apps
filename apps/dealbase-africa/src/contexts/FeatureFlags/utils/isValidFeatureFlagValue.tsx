import FeatureFlagsSource from "../FeatureFlagsSource";

export const isValidFeatureFlagValue = (value: unknown): boolean => {
  return (
    typeof value === "boolean" ||
    typeof value === "number" ||
    typeof value === "string"
  );
};

export const isFlagSet = (
  flags: FeatureFlagsSource,
  feature: string
): boolean => {
  return isValidFeatureFlagValue(flags[feature]);
};

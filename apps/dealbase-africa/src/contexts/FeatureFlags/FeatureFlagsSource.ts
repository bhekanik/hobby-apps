export default interface FeatureFlagsSource {
  [feature: string]: boolean | null | number | string;
}

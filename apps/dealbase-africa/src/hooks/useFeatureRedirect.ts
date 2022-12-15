import { useRouter } from "next/router";
import { useFeatureFlag } from "src/contexts/FeatureFlags";

export const useFeatureRedirect = (feature: string) => {
  const { push } = useRouter();
  const featureFlag = useFeatureFlag(feature);

  if (!featureFlag) {
    push("/");
  }
};

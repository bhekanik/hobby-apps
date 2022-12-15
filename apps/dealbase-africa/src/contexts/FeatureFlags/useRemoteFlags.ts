import { useEffect, useState } from "react";
import FeatureFlagsSource from "./FeatureFlagsSource";

const DEFAULT_STATE = {};

export default function useRemoteFlags(
  remote?: Promise<FeatureFlagsSource | FeatureFlagsSource[]>
) {
  const [flags, setFlags] = useState(DEFAULT_STATE);

  useEffect(() => {
    let isLatest = true;

    if (remote) {
      (async () => {
        try {
          const remoteFlags = await remote;
          const flags = Array.isArray(remoteFlags)
            ? remoteFlags.reduce(
                (acc, projectFlags) => ({ ...acc, ...projectFlags }),
                {}
              )
            : remoteFlags;
          if (isLatest) {
            setFlags(flags);
          }
        } catch {
          return;
        }
      })();
    }

    return () => {
      isLatest = false;
    };
  }, [remote]);

  return flags;
}

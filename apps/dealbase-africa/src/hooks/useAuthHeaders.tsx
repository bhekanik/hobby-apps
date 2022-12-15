import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useMemo, useState } from "react";

export function useAuthHeaders(): {
  Authorization: string;
} | null {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated)
      getAccessTokenSilently().then((newToken) => {
        setToken(newToken);
      });
  }, [getAccessTokenSilently, isAuthenticated]);

  return useMemo(() => {
    if (token) {
      return {
        Authorization: `Bearer ${token}`,
      };
    }

    return null;
  }, [token]);
}

import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const useProtected = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const { push } = useRouter();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      push("/");
    }
  }, [isAuthenticated, push, isLoading]);
};

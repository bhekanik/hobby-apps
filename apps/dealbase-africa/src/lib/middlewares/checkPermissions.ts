import { jwtAuthz } from "./jwtAuthz";

export const createCheckPermissionsMiddleware = (permissions: string[]) =>
  jwtAuthz(permissions, {
    customScopeKey: "permissions",
  });

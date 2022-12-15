import { ComponentType } from "react";

export function getDisplayName(Component: ComponentType<unknown>): string {
  return Component.displayName || Component.name || "Component";
}

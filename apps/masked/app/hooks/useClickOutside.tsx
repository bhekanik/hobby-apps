import { RefObject, useEffect, useRef } from "react";

export const useClickOutside = <T extends HTMLElement>(
  cb: () => void
): [RefObject<T>] => {
  const refOne = useRef<T>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!refOne.current?.contains(e.target as Node)) {
        cb();
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return [refOne];
};

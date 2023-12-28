import { RefObject, useEffect } from "react";
import { detectOnClickOutside } from "@/share/helpers/detectOnClickOutside";

export const useClickOutside = (clickOutside: () => void, elementRef: RefObject<HTMLInputElement>) => {
  useEffect(() => {
    if (elementRef.current == null) return;

    const destroy = detectOnClickOutside(elementRef.current, () => {
      clickOutside();
    });

    return () => {
      destroy();
    };
  });
};

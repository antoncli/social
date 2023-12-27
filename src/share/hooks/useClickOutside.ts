import { RefObject, useEffect } from "react";
import { hideOnClickOutside } from "../helpers/hideOnClickOutside";

export const useClickOutside = (clickOutside: () => void, elementRef: RefObject<HTMLInputElement>) => {
  useEffect(() => {
    if (elementRef.current == null) return;

    const destroy = hideOnClickOutside(elementRef.current, () => {
      clickOutside();
    });

    return () => {
      destroy();
    };
  });
};

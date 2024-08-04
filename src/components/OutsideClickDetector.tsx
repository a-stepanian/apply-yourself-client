import React, { useRef, useEffect, ReactNode } from "react";
import { useAppContext } from "../context/AppContext";

function useOutsideClickDetector(ref?: React.RefObject<HTMLDivElement>) {
  const { toggleUserDropdown } = useAppContext();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (event.target instanceof HTMLElement && event.target.classList.contains("exclude-click-detection")) {
        return;
      } else if (ref?.current && !ref.current.contains(event.target as Node)) {
        toggleUserDropdown();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

export const OutsideClickDetector: React.FC<{ activated: boolean; children: ReactNode }> = props => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  useOutsideClickDetector(props.activated ? wrapperRef : undefined);

  return <div ref={wrapperRef}>{props.children}</div>;
};

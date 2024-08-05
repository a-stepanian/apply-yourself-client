import React, { useRef, useEffect, ReactNode } from "react";

function useOutsideClickDetector(onOutsideClick: () => void, ref: React.RefObject<HTMLDivElement> | undefined) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (event.target instanceof HTMLElement && event.target.classList.contains("exclude-click-detection")) {
        return;
      }
      if (ref?.current && !ref.current.contains(event.target as Node)) {
        onOutsideClick();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onOutsideClick, ref]); // Added `onOutsideClick` to the dependency array
}

export const OutsideClickDetector: React.FC<{
  onOutsideClick: () => void;
  activated: boolean;
  children: ReactNode;
}> = ({ onOutsideClick, activated, children }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useOutsideClickDetector(onOutsideClick, activated ? wrapperRef : undefined);

  return <div ref={wrapperRef}>{children}</div>;
};

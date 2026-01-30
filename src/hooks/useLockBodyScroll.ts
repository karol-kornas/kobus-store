import { useEffect } from "react";

export function useLockBodyScroll(active: boolean) {
  useEffect(() => {
    if (!active) return;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [active]);
}

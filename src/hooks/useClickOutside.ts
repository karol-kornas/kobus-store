import { useEffect } from "react";

export function useClickOutside<T extends HTMLElement>(ref: React.RefObject<T | null>, handler: () => void) {
  useEffect(() => {
    function listener(event: PointerEvent) {
      if (!ref.current) return;
      if (ref.current.contains(event.target as Node)) return;

      handler();
    }

    document.addEventListener("pointerdown", listener, true); // 👈 capture

    return () => {
      document.removeEventListener("pointerdown", listener, true);
    };
  }, [ref, handler]);
}

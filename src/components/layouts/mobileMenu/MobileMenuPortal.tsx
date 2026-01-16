"use client";

import { createPortal } from "react-dom";

export function MobileMenuPortal({ children }: { children: React.ReactNode }) {
  const el = typeof window !== "undefined" ? document.getElementById("mobile-menu-portal-root") : null;

  if (!el) return null;

  return createPortal(children, el);
}

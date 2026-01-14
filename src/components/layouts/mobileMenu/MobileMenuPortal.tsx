"use client";

import { createPortal } from "react-dom";

export function MobileMenuPortal({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const el = document.getElementById("mobile-menu-portal-root");
  if (!el) return null;

  return createPortal(children, el);
}

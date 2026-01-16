"use client";

import { QueryProvider } from "./QueryProvider";
import { AuthProvider } from "../context/AuthProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <AuthProvider>{children}</AuthProvider>
    </QueryProvider>
  );
}

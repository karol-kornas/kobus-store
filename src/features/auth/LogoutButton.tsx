"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      setLoading(true);
      await logout();

      router.replace("/login");
      router.refresh();
    } catch (err) {
      console.error("Logout error", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleLogout} disabled={loading} className="bg-foreground text-background p-3">
      {loading ? "Wylogowywanie..." : "Wyloguj się"}
    </button>
  );
}

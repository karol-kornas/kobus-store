"use client";

import { apiClient } from "@/lib/apiClient";

export function AuthCheckButton() {
  const checkAuth = async () => {
    try {
      const res = await apiClient.get("/api/auth/me");

      console.log("ZALOGOWANY", res.data);
      alert("Zalogowany ✅");
    } catch (err) {
      alert("Niezalogowany ❌");
    }
  };

  return <button onClick={checkAuth}>Czy zalogowany?</button>;
}

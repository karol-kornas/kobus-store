"use client";

import { useAuth } from "@/context/AuthContext";

export default function NeedPasswordReset() {
  const { user } = useAuth();
  return (
    user?.needsPasswordReset && (
      <div
        style={{
          padding: "12px 16px",
          marginBottom: 16,
          borderRadius: 6,
          background: "#fff3cd",
          border: "1px solid #ffeeba",
          color: "#856404",
        }}
      >
        <strong>Uwaga:</strong> Twoje konto używa tymczasowego hasła.
        <br />
        Sprawdź e-mail i ustaw własne hasło.
      </div>
    )
  );
}

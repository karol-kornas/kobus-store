"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function OrderCompletePage() {
  const searchParams = useSearchParams();

  const [orderId, setOrderId] = useState<string | null>(null);
  const [orderKey, setOrderKey] = useState<string | null>(null);

  useEffect(() => {
    // Pobieramy parametry z URL
    setOrderId(searchParams.get("order_id"));
    setOrderKey(searchParams.get("order_key"));
  }, [searchParams]);

  return (
    <div className="container max-w-5xl py-10">
      <h1>Dziękujemy za złożenie zamówienia</h1>

      {orderId && orderKey ? (
        <p>
          Twoje zamówienie nr <strong>{orderId}</strong> zostało przyjęte. <br />
          Klucz zamówienia: <strong>{orderKey}</strong>
        </p>
      ) : (
        <p>Ładowanie szczegółów zamówienia…</p>
      )}
    </div>
  );
}

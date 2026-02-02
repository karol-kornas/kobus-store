export type PaymentMethodConfig = {
  id: string;
  label: string;
  description?: string;
  type: "online" | "offline" | "cod";
};

export const PAYMENT_METHODS_MAP: Record<string, PaymentMethodConfig> = {
  przelewy24: {
    id: "przelewy24",
    label: "Przelewy24",
    description: "BLIK, szybkie przelewy, karty",
    type: "online",
  },

  "ppcp-gateway": {
    id: "ppcp-gateway",
    label: "PayPal",
    description: "PayPal, karta, Pay Later",
    type: "online",
  },

  bacs: {
    id: "bacs",
    label: "Przelew tradycyjny",
    description: "Dane do przelewu po złożeniu zamówienia",
    type: "offline",
  },

  cod: {
    id: "cod",
    label: "Płatność przy odbiorze",
    description: "Gotówką lub kartą u kuriera",
    type: "cod",
  },
};

export function normalizePaymentMethod(id: string): PaymentMethodConfig {
  if (id.startsWith("przelewy24")) {
    return PAYMENT_METHODS_MAP["przelewy24"];
  }

  return (
    PAYMENT_METHODS_MAP[id] ?? {
      id,
      label: "Inna metoda płatności",
      type: "online",
    }
  );
}

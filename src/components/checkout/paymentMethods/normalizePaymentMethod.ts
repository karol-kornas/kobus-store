export type PaymentMethodConfig = {
  id: string;
  label: string;
  description?: string;
  type: "online" | "offline" | "cod";
  logo: {
    src: string;
    alt: string;
  };
};

export const PAYMENT_METHODS_MAP: Record<string, PaymentMethodConfig> = {
  przelewy24: {
    id: "przelewy24",
    label: "Przelewy24",
    description: "Po przejściu do bramki płatniczej wybierz swój bank z listy i opłać zamówienie ",
    type: "online",
    logo: {
      src: "/payment/przelewy24.svg",
      alt: "Przelewy24",
    },
  },

  "ppcp-gateway": {
    id: "ppcp-gateway",
    label: "PayPal",
    description: "PayPal, karta, Pay Later",
    type: "online",
    logo: {
      src: "/payment/paypal.svg",
      alt: "PayPal",
    },
  },

  bacs: {
    id: "bacs",
    label: "Przelew tradycyjny",
    description: "Dane do przelewu po złożeniu zamówienia",
    type: "offline",
    logo: {
      src: "/payment/przelew-tradycyjny.jpg",
      alt: "Przelewy24",
    },
  },

  cod: {
    id: "cod",
    label: "Płatność przy odbiorze",
    description: "Gotówką lub kartą u kuriera",
    type: "cod",
    logo: {
      src: "/payment/pobranie.svg",
      alt: "Przelewy24",
    },
  },

  przelewy24_extra_154: {
    id: "przelewy24",
    label: "Blik",
    description: "Kod BLIK to jednorazowy, 6-cyfrowy kod, który znajdziesz w aplikacji swojego banku.",
    type: "online",
    logo: {
      src: "/payment/blik.svg",
      alt: "Blik",
    },
  },
};

export function normalizePaymentMethod(id: string): PaymentMethodConfig {
  return (
    PAYMENT_METHODS_MAP[id] ?? {
      id,
      label: "Inna metoda płatności",
      type: "online",
    }
  );
}

export const SHIPPING_LOGOS: Record<string, { src: string; alt: string }> = {
  inpost_paczkomat: {
    src: "/shipping/inpost-paczkomat.svg",
    alt: "InPost Paczkomat",
  },
  inpost_kurier: {
    src: "/shipping/inpost-kurier.svg",
    alt: "InPost Kurier",
  },
  inpost_kurier_pobranie: {
    src: "/shipping/inpost-kurier.svg",
    alt: "InPost Kurier pobranie",
  },
  global_simple: {
    src: "/shipping/global.svg",
    alt: "Wysyłka zagraniczna",
  },
  global: {
    src: "/shipping/global.svg",
    alt: "Wysyłka zagraniczna (globalna)",
  },
  default: {
    src: "/shipping/inpost-kurier.svg",
    alt: "Dostawa",
  },
};

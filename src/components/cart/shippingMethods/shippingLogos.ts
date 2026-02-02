import InpostPaczkomatLogo from "../../../../public/shipping/inpost-paczkomat.svg";
import InpostKurierLogo from "../../../../public/shipping/inpost-kurier.svg";

export const SHIPPING_LOGOS: Record<string, { src: string; alt: string }> = {
  inpost_paczkomat: {
    src: InpostPaczkomatLogo,
    alt: "InPost Paczkomat",
  },
  inpost_kurier: {
    src: InpostKurierLogo,
    alt: "InPost Kurier",
  },
  default: {
    src: InpostKurierLogo,
    alt: "Dostawa",
  },
};

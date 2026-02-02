import Image from "next/image";
import { SHIPPING_LOGOS } from "./shippingLogos";

type Props = {
  provider: string;
};

export function ShippingLogo({ provider }: Props) {
  const logo = SHIPPING_LOGOS[provider] ?? SHIPPING_LOGOS.default;

  return <Image src={logo.src} alt={logo.alt} width={78} height={78} className="object-contain" />;
}

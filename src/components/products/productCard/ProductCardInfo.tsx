import { formatPrice } from "@/utils/formatPrice";
import Link from "next/link";

type Props = {
  href: string;
  name: string;
  price: number | null;
  isOnSale: boolean;
  regularPrice?: number | null;
};

export function ProductCardInfo({ href, name, price, isOnSale, regularPrice }: Props) {
  return (
    <Link href={href}>
      <h3 className="hover:opacity-85 font-medium h-12 line-clamp-2">{name}</h3>

      <div className="flex gap-2 font-semibold">
        {formatPrice(price)}
        {isOnSale && regularPrice && (
          <span className="text-sm font-normal line-through">{formatPrice(regularPrice)} zł</span>
        )}
      </div>
    </Link>
  );
}

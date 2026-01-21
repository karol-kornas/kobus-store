import { Hot } from "@/components/icons/hot";
import { Product } from "@/types/product";
import { formatPrice } from "@/utils/formatPrice";

type Props = {
  product: Product;
};

export function ProductPrice({ product }: Props) {
  let lowest = product.lowest_price_30_days;

  if (!lowest && product.on_sale) {
    lowest = product.regular_price;
  }

  return (
    <div className="mt-4">
      <div className="flex text-2xl gap-2 font-semibold">
        {formatPrice(product.price)}
        {product.on_sale && product.regular_price && (
          <span className="text-lg font-normal line-through text-neutral-400">
            {formatPrice(product.regular_price)}
          </span>
        )}
      </div>
      {product.on_sale && lowest && (
        <p className="text-sm text-neutral-400">Najniższa cena w okresie 30 dni: {formatPrice(lowest)}.</p>
      )}
      {product.featured && (
        <div className="mt-4">
          <div className="inline-flex items-center gap-2 border border-neutral-100 py-2 px-4 text-black rounded-lg font-bold text-xs uppercase">
            <Hot />
            Szybko się sprzedaje
          </div>
        </div>
      )}
    </div>
  );
}

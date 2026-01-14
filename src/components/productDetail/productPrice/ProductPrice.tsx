import { Product } from "@/types/product";

type Props = {
  product: Product;
};

export function ProductPrice({ product }: Props) {
  let lowest = product.lowest_price_30_days;

  if (!lowest && product.on_sale) {
    lowest = product.regular_price;
  }

  return (
    <>
      <div className="flex text-2xl gap-2 font-semibold mt-4">
        {product.price} zł
        {product.on_sale && product.regular_price && (
          <span className="text-lg font-normal line-through text-neutral-400">
            {product.regular_price} zł
          </span>
        )}
      </div>
      {product.on_sale && lowest && (
        <p className="text-sm text-neutral-400">Najniższa cena w okresie 30 dni: {lowest} zł.</p>
      )}
    </>
  );
}

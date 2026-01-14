import { Product } from "@/types/product";
import { ProductCard } from "../productCard/ProductCard";

type Props = {
  products: Product[];
  categorySlug?: string;
};

export function ProductsGrid({ products, categorySlug }: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} categorySlug={categorySlug} />
      ))}
    </div>
  );
}

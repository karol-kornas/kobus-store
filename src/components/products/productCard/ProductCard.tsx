import { Product } from "@/types/product";
import { ProductCardImage } from "./ProductCardImage";
import { ProductCardInfo } from "./ProductCardInfo";
import Link from "next/link";
import { getProductLabels } from "@/features/products/getProductsLabels";
import { ProductLabels } from "@/components/ui/productLabels/ProductLabels";

type Props = {
  product: Product;
  categorySlug?: string;
};

export function ProductCard({ product, categorySlug }: Props) {
  const image = product.images[0];
  const labels = getProductLabels(product);
  const href = categorySlug ? `/product/${product.slug}?cat=${categorySlug}` : `/product/${product.slug}`;
  return (
    <article className="relative">
      <Link href={href} className="flex flex-col gap-3">
        <ProductCardImage src={image?.src} alt={image?.alt || product.name}>
          <ProductLabels className="absolute bottom-0 left-0" labels={labels} />
        </ProductCardImage>

        <ProductCardInfo
          name={product.name}
          price={product.price}
          regularPrice={product.regular_price}
          isOnSale={product.on_sale}
        />
      </Link>
    </article>
  );
}

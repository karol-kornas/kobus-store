import { Product } from "@/types/product";
import { ProductCardImage } from "./ProductCardImage";
import { ProductCardInfo } from "./ProductCardInfo";
import Link from "next/link";
import { ProductLabels } from "../productLabels/ProductLabels";
import { getProductLabels } from "@/features/products/getProductsLabels";

type Props = {
  product: Product;
};

export function ProductCard({ product }: Props) {
  const image = product.images[0];
  const labels = getProductLabels(product);
  return (
    <article className="relative">
      <Link href={`/produkt/${product.slug}`} className="flex flex-col gap-3">
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

import { ProductLabels } from "@/components/ui/productLabels/ProductLabels";
import { getProductLabels } from "@/features/products/getProductsLabels";
import { Product } from "@/types/product";

type Props = {
  product: Product;
};

export function ProductHeader({ product }: Props) {
  const labels = getProductLabels(product);

  return (
    <>
      <ProductLabels labels={labels} />
      <h1 className="mt-3 font-display font-semibold text-3xl">{product.name}</h1>
    </>
  );
}

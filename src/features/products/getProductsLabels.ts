import { Product } from "@/types/product";
import { ProductLabel } from "@/types/productLabel";

export function getProductLabels(product: Product): ProductLabel[] {
  const labels: ProductLabel[] = [];

  if (product.on_sale) {
    labels.push({
      type: "sale",
      label: "Promocja",
    });
  }

  const categorySlugs = product.categories.map((c) => c.slug);

  if (categorySlugs.includes("nowosci")) {
    labels.push({
      type: "new",
      label: "Nowość",
    });
  }

  if (categorySlugs.includes("bestsellery")) {
    labels.push({
      type: "bestseller",
      label: "Bestseller",
    });
  }

  return labels;
}

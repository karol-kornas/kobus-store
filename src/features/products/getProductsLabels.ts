import { Product } from "@/types/product";
import { ProductLabel } from "@/types/productLabel";

export function getProductLabels(product: Product): ProductLabel[] {
  const availability = product.availability;

  if (!availability.can_add_to_cart) {
    return [
      {
        type: "outofstock",
        label: "Chwilowo niedostępny",
      },
    ];
  }

  // if (availability.status === "onbackorder") {
  //   return [
  //     {
  //       type: "backorder",
  //       label: "Na zamówienie",
  //     },
  //   ];
  // }

  // 2️⃣ NORMALNE LABELKI (tylko gdy produkt dostępny)
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

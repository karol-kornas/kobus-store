import { wooFetch } from "@/lib/wooFetch";
import { ProductCategory } from "@/types/productCategory";
import { cache } from "react";

export const getCategoryBySlug = cache(async (slug: string) => {
  const { data } = await wooFetch<ProductCategory[]>("/products/categories", { slug }, { revalidate: 300 });
  return data[0] ?? null;
});

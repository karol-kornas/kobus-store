import { wooFetch } from "@/lib/wooFetch";
import { ProductCategory } from "@/types/productCategory";

export async function getCategoryBySlug(slug: string) {
  const { data } = await wooFetch<ProductCategory[]>("/products/categories", { slug }, { revalidate: 300 });

  return data[0] || null;
}

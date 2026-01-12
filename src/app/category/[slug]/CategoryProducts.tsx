import { ProductCard } from "@/components/ui/productCard/ProductCard";
import { getProductsByCategory } from "@/features/products/products.server";
import { Product } from "@/types/product";

import { Pagination } from "@/components/ui/pagination/Pagination";
import { ProductCategory } from "@/types/productCategory";

type Props = {
  categorySlug: string;
  searchParams: {
    page?: string;
    orderby?: string;
    min_price?: string;
    max_price?: string;
  };
  categoryPromise: Promise<ProductCategory>;
};

export async function CategoryProducts({ categorySlug, searchParams, categoryPromise }: Props) {
  const { page, orderby, min_price, max_price } = await searchParams;
  const currentPage = Number(page) || 1;

  const category = await categoryPromise;

  const products = await getProductsByCategory(category.id, {
    page: currentPage,
    orderby,
    min_price,
    max_price,
  });

  return (
    <>
      <div className="text-neutral-400 text-sm font-sans mt-1 mb-2">
        Liczba produktów: {products.totalItems}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
        {products.items.map((product: Product) => (
          <ProductCard key={product.id} product={product} categorySlug={category.slug} />
        ))}
      </div>

      <Pagination
        currentPage={products.page}
        totalPages={products.totalPages}
        basePath={`/category/${categorySlug}`}
        searchParams={{ page, orderby, min_price, max_price }}
      />
    </>
  );
}

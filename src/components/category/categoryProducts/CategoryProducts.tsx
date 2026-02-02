import { getProductsByCategory } from "@/features/products/products.server";
import { ProductCategory } from "@/types/productCategory";
import { ProductsListing } from "@/components/products/productsListing/ProductsListing";
import { ProductsGrid } from "@/components/products/productsGrid/ProductsGrid";

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

export async function CategoryProducts({ categoryPromise, searchParams }: Props) {
  const { page, orderby, min_price, max_price } = searchParams;
  const currentPage = Number(page) || 1;

  const category = await categoryPromise;

  const products = await getProductsByCategory(category.id, {
    page: currentPage,
    orderby,
    min_price,
    max_price,
  });

  return (
    <ProductsListing
      totalItems={products.totalItems}
      currentPage={products.page}
      totalPages={products.totalPages}
      basePath={`/category/${category.slug}`}
      searchParams={{ page, orderby, min_price, max_price }}
    >
      <ProductsGrid products={products.items} categorySlug={category.slug} />
    </ProductsListing>
  );
}

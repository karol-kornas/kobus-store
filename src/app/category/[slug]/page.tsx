import { notFound } from "next/navigation";
import { getCategoryBySlug } from "@/features/categories/categories.server";
import { getProductsByCategory } from "@/features/products/products.server";
import { ProductCard } from "@/components/ui/productCard/ProductCard";
import { Product } from "@/types/product";
import { Breadcrumbs } from "@/components/ui/breadcrumb/Breadcrumbs";
import { getMenu } from "@/features/menu/menu.server";
import { MenuItem } from "@/components/layout/navigation/navigation.types";
import { CategorySidebar } from "./CategorySidebar";
import { Pagination } from "@/components/ui/pagination/Pagination";
import { SortSelect } from "@/components/ui/sortSelect/SortSelect";

type PageProps = {
  params: {
    slug: string;
  };
  searchParams: {
    page?: string;
    orderby?: string;
    min_price?: string;
    max_price?: string;
  };
};

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { page, orderby, min_price, max_price } = await searchParams;
  const menu = await getMenu("headless_header");
  const categoriesTree = extractCategoriesTree(menu);

  const currentPage = Number(page) || 1;

  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const products = await getProductsByCategory(category.id, {
    page: currentPage,
    orderby,
    min_price,
    max_price,
  });

  return (
    <div className="container py-8">
      <Breadcrumbs items={[{ label: "Strona główna", href: "/" }, { label: category.name }]} />

      <div className="grid xl:grid-cols-[18.625rem_1fr] 2xl:grid-cols-[22.625rem_1fr] gap-4 md:gap-10 mt-8">
        <div className="hidden xl:block">
          <CategorySidebar categories={categoriesTree} />
        </div>
        <div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
            <h1 className="font-display text-2xl font-medium">
              {category.name}{" "}
              <span className="text-neutral-400 text-sm uppercase font-sans">
                ({products.totalItems}&nbsp;produktów)
              </span>
            </h1>
            <SortSelect />
          </div>

          {category.description && <div dangerouslySetInnerHTML={{ __html: category.description }} />}

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            {products.items.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <Pagination
            currentPage={products.page}
            totalPages={products.totalPages}
            basePath={`/category/${slug}`}
            searchParams={{ page, orderby, min_price, max_price }}
          />
        </div>
      </div>
    </div>
  );
}

function extractCategoriesTree(menu: MenuItem[]) {
  const productsItem = menu.find((item) => item.title === "Produkty");
  return productsItem?.children ?? [];
}

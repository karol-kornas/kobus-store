import { getCategoryBySlug } from "@/features/categories/categories.server";
import { getMenu } from "@/features/menu/menu.server";
import { Suspense } from "react";
import { BreadcrumbsSkeleton } from "@/components/ui/breadcrumb/BreadcrumbsSkeleton";
import { CategoryValidator } from "./CategoryValidator";
import { getSeo } from "@/features/seo/seo.server";
import { mapSeoToMetadata } from "@/features/seo/seo.helpers";
import { CategorySidebarSkeleton } from "@/components/category/categorySidebar/CategorySidebarSkeleton";
import { CategorySidebar } from "@/components/category/categorySidebar/CategorySidebar";
import { SidebarLayout } from "@/components/layouts/sidebarLayout/SidebarLayout";
import { extractCategoriesTree } from "@/features/menu/menu.helpers";
import { CategoryHeader } from "@/components/category/categoryHeader/CategoryHeader";
import { CategoryHeaderSkeleton } from "@/components/category/categoryHeader/CategoryHeaderSkeleton";
import { ProductsListingSkeleton } from "@/components/products/productsListing/ProductsListingSkeleton";
import { CategoryBreadcrumbs } from "@/components/category/categoryBreadcrumbs/CategoryBreadcrumbs";
import { CategoryProducts } from "@/components/category/categoryProducts/CategoryProducts";

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

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return {
      title: "Nie znaleziono kategorii",
      robots: "noindex",
    };
  }

  const seo = await getSeo({
    type: "product_category",
    id: category.id,
  });

  return mapSeoToMetadata(seo);
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const searchParamsOpt = await searchParams;

  const menu = await getMenu("headless_header");
  const categoriesTree = extractCategoriesTree(menu);

  const category = getCategoryBySlug(slug);

  return (
    <div className="container">
      <Suspense fallback={null}>
        <CategoryValidator categoryPromise={category} />
      </Suspense>

      <Suspense fallback={<BreadcrumbsSkeleton />}>
        <CategoryBreadcrumbs categoryPromise={category} />
      </Suspense>

      <SidebarLayout
        sidebar={
          <Suspense fallback={<CategorySidebarSkeleton />}>
            <CategorySidebar categories={categoriesTree} />
          </Suspense>
        }
        content={
          <>
            <Suspense fallback={<CategoryHeaderSkeleton />}>
              <CategoryHeader categoryPromise={category} />
            </Suspense>

            <Suspense
              key={`${searchParamsOpt.page}-${searchParamsOpt.orderby}-${searchParamsOpt.min_price}-${searchParamsOpt.max_price}`}
              fallback={<ProductsListingSkeleton />}
            >
              <CategoryProducts
                categorySlug={slug}
                categoryPromise={category}
                searchParams={searchParamsOpt}
              />
            </Suspense>
          </>
        }
      />
    </div>
  );
}

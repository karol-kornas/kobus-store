import { notFound } from "next/navigation";
import { getCategoryBySlug } from "@/features/categories/categories.server";
import { getMenu } from "@/features/menu/menu.server";
import { MenuItem } from "@/components/layout/navigation/navigation.types";
import { CategorySidebar } from "./CategorySidebar";

import { CategoryProducts } from "./CategoryProducts";
import { Suspense } from "react";
import { ProductsSkeleton } from "./ProductsSkeleton";
import { CategoryBreadcrumbs } from "./CategoryBreadcrumbs";
import { BreadcrumbsSkeleton } from "@/components/ui/breadcrumb/BreadcrumbsSkeleton";
import { CategoryHeader } from "./CategoryHeader";
import { CategoryHeaderSkeleton } from "./CategoryHeaderSkeleton";
import { CategoryValidator } from "./CategoryValidator";
import { getSeo } from "@/lib/wp/seo";

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

  if (!category) return {};

  const seo = await getSeo({
    type: "product_category",
    id: category.id,
  });

  return {
    title: seo.title,
    description: seo.description,
    openGraph: {
      title: seo.og_title,
      description: seo.og_description,
      images: seo.og_image ? [seo.og_image] : [],
    },
  };
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const searchParamsOpt = await searchParams;

  const menu = await getMenu("headless_header");
  const categoriesTree = extractCategoriesTree(menu);

  const category = getCategoryBySlug(slug);

  return (
    <div className="container py-8">
      <Suspense fallback={null}>
        <CategoryValidator categoryPromise={category} />
      </Suspense>

      <Suspense fallback={<BreadcrumbsSkeleton />}>
        <CategoryBreadcrumbs categoryPromise={category} />
      </Suspense>

      <div className="grid xl:grid-cols-[18.625rem_1fr] 2xl:grid-cols-[22.625rem_1fr] gap-4 md:gap-10 mt-6 lg:mt-8">
        <div className="hidden xl:block">
          <CategorySidebar categories={categoriesTree} />
        </div>
        <div>
          <Suspense fallback={<CategoryHeaderSkeleton />}>
            <CategoryHeader categoryPromise={category} />
          </Suspense>

          <Suspense
            key={`${searchParamsOpt.page}-${searchParamsOpt.orderby}-${searchParamsOpt.min_price}-${searchParamsOpt.max_price}`}
            fallback={<ProductsSkeleton />}
          >
            <CategoryProducts categorySlug={slug} categoryPromise={category} searchParams={searchParamsOpt} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

function extractCategoriesTree(menu: MenuItem[]) {
  const productsItem = menu.find((item) => item.title === "Produkty");
  return productsItem?.children ?? [];
}

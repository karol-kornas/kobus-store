import { getProductBySlug } from "@/features/products/products.server";
import { mapSeoToMetadata } from "@/features/seo/seo.helpers";
import { getSeo } from "@/features/seo/seo.server";
import { notFound } from "next/navigation";

import { ProductGallery } from "@/components/productDetail/productGallery/ProductGallery";
import { ProductBreadcrumbs } from "@/components/productDetail/productBreadcrumbs/ProductBreadcrumbs";
import { ProductVariants } from "@/components/productDetail/productVariants/ProductVariants";
import { ProductAdditionalServices } from "@/components/productDetail/productAdditionalServices/ProductAdditionalServices";
import { ProductLayout } from "@/components/layouts/productLayout/ProductLayout";
import { ProductHeader } from "@/components/productDetail/productHeader/ProductHeader";
import { ProductPrice } from "@/components/productDetail/productPrice/ProductPrice";
import { ProductShortDescription } from "@/components/productDetail/productShortDescription/ProductShortDescription";
import { ProductActions } from "@/components/productDetail/productActions/ProductActions";
import { ProductDescription } from "@/components/productDetail/productDescription/ProductDescription";
import { BenefitsSection } from "@/components/sections/benefitsSection/BenefitsSection";
import { ProductUpsell } from "@/components/productDetail/productUpsell/ProductUpsell";
import { ProductCrossSell } from "@/components/productDetail/productCrossSell/ProductCrossSell";

type PageProps = {
  params: {
    slug: string;
  };
  searchParams: {
    cat?: string;
  };
};

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  if (!product) return {};

  const seo = await getSeo({
    type: "product",
    id: product.id,
  });

  return mapSeoToMetadata(seo);
}

export default async function ProductPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { cat } = await searchParams;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  return (
    <>
      <ProductLayout
        breadcrumbs={
          <ProductBreadcrumbs
            categorySlug={cat}
            productName={product.name}
            productCategories={product.categories}
          />
        }
        gallery={<ProductGallery images={product.images} productName={product.name} />}
        summary={
          <div className="sticky top-6 z-1">
            <ProductHeader product={product} />
            <ProductPrice product={product} />
            <ProductVariants product={product} />
            <ProductShortDescription product={product} />
            <ProductAdditionalServices additionalServices={product.additional_services} />
            <ProductActions product={product} />
          </div>
        }
        description={
          <>
            <ProductDescription product={product} />
          </>
        }
      />
      <div className="flex flex-col gap-5">
        <BenefitsSection />
        <ProductUpsell productIds={product.upsell_ids} />
        <ProductCrossSell productIds={product.cross_sell_ids} />
      </div>
    </>
  );
}

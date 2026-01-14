import { ProductLayout } from "@/components/layouts/productLayout/ProductLayout";
import { ProductActionsSkeleton } from "@/components/productDetail/productActions/ProductActionsSkeleton";
import { ProductAdditionalServicesSkeleton } from "@/components/productDetail/productAdditionalServices/ProductAdditionalServicesSkeleton";
import { ProductDescriptionSkeleton } from "@/components/productDetail/productDescription/ProductDescriptionSkeleton";
import { ProductGallerySkeleton } from "@/components/productDetail/productGallery/ProductGallerySkeleton";
import { ProductHeaderSkeleton } from "@/components/productDetail/productHeader/ProductHeaderSkeleton";
import { ProductPriceSkeleton } from "@/components/productDetail/productPrice/ProductPriceSkeleton";
import { ProductShortDescriptionSkeleton } from "@/components/productDetail/productShortDescription/ProductShortDescriptionSkeleton";
import { ProductVariantsSkeleton } from "@/components/productDetail/productVariants/ProductVariantsSkeleton";
import { BreadcrumbsSkeleton } from "@/components/ui/breadcrumb/BreadcrumbsSkeleton";

export default function Loading() {
  return (
    <ProductLayout
      breadcrumbs={<BreadcrumbsSkeleton />}
      gallery={<ProductGallerySkeleton />}
      summary={
        <>
          <ProductHeaderSkeleton />
          <ProductPriceSkeleton />
          <ProductVariantsSkeleton />
          <ProductShortDescriptionSkeleton />
          <ProductAdditionalServicesSkeleton />
          <ProductActionsSkeleton />
        </>
      }
      description={<ProductDescriptionSkeleton />}
    />
  );
}

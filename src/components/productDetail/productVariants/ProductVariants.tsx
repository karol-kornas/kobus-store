import { ImageWithSkeleton } from "@/components/ui/imageWithSkeleton/ImageWithSkeleton";
import { SmartImage } from "@/components/ui/smartImage/SmartImage";
import { Product, ProductVariant } from "@/types/product";
import Link from "next/link";

type Props = {
  product: Product;
};

export function ProductVariants({ product }: Props) {
  const variants = product.product_variants;

  if (!variants || !variants.length) return null;

  const currentVariant: ProductVariant = {
    id: product.id,
    name: product.name,
    slug: product.slug,
    price: product.price,
    thumbnail: {
      src: product.images[0].src,
      srcset: product.images[0].srcset,
      width: product.images[0].width,
      height: product.images[0].height,
    },
  };

  const allVariants = [currentVariant, ...product.product_variants];

  return (
    <div className="mt-6">
      <p className="font-bold uppercase text-sm">Inne warianty produktu:</p>

      <div className="grid grid-cols-4 gap-2 mt-3">
        {allVariants.map((variant) => {
          const isActive = variant.id === currentVariant.id;

          return (
            <VariantWrapper
              key={variant.id}
              isCurrent={isActive}
              href={`/product/${variant.slug}`}
              title={variant.name}
              className={`
                relative border-b group overflow-hidden
                ${isActive ? "border-black" : "border-transparent hover:border-black"}
                transition-colors focus:outline-none focus:ring-2 focus:ring-primary
                flex items-center
              `}
            >
              <SmartImage
                src={variant.thumbnail.src}
                srcSet={variant.thumbnail.srcset}
                sizes="160px"
                alt={variant.name}
                wrapClassName="w-full aspect-3/4"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </VariantWrapper>
          );
        })}
      </div>
    </div>
  );
}

type VariantWrapperProps = {
  isCurrent: boolean;
  href: string;
  children: React.ReactNode;
  className?: string;
  title: string;
};

function VariantWrapper({ isCurrent, href, children, className, title }: VariantWrapperProps) {
  if (isCurrent) {
    return (
      <div className={className} aria-current="true">
        {children}
      </div>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
      <span className="sr-only">{title}</span>
    </Link>
  );
}

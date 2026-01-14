import { ImageWithSkeleton } from "@/components/ui/imageWithSkeleton/ImageWithSkeleton";
import { Product, ProductVariant } from "@/types/product";
import Link from "next/link";

type Props = {
  product: Product;
};

export function ProductVariants({ product }: Props) {
  const variants = product.product_variants;

  if (!variants.length) return null;

  const currentVariant: ProductVariant = {
    id: product.id,
    name: product.name,
    slug: product.slug,
    price: product.price,
    thumbnail: product.images[0].src,
    thumbnail_width: product.images[0].width,
    thumbnail_height: product.images[0].height,
  };

  const allVariants = [currentVariant, ...product.product_variants];

  return (
    <section className="pt-6">
      <p className="pb-3 text-xs uppercase font-bold">Inne warianty produktu:</p>

      <div className="grid grid-cols-4 gap-2">
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
              <ImageWithSkeleton
                src={variant.thumbnail}
                alt={variant.name}
                width={variant.thumbnail_width ?? 200}
                height={variant.thumbnail_height ?? 200}
                sizes="160px"
                className="object-contain"
                wrapClassName="relative flex items-center justify-center overflow-hidden aspect-3/4"
              />
            </VariantWrapper>
          );
        })}
      </div>
    </section>
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
      <span className="absolute bottom-0 text-center left-0 transition duration-250 translate-y-full group-hover:translate-y-0 bg-neutral-800 text-white p-1 leading-none text-xs">
        {title}
      </span>
    </Link>
  );
}

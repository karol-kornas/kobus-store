"use client";

import { SmartImage } from "@/components/ui/smartImage/SmartImage";
import clsx from "clsx";
import Link from "next/link";

type Props = {
  href: string;
  src: string;
  srcset?: string;
  loading?: "lazy" | "eager" | undefined;
  alt: string;
  canAddToCart: boolean;
  children?: React.ReactNode;
};

export function ProductCardImage({ href, src, srcset, loading, alt, children, canAddToCart = true }: Props) {
  return (
    <div key={src} className="group relative aspect-3/4 dark:overflow-hidden">
      <Link href={href}>
        <SmartImage
          src={src}
          srcSet={srcset}
          alt={alt}
          sizes="(max-width: 768px) 50vw, 360px"
          wrapClassName="group relative aspect-3/4 dark:overflow-hidden"
          className={clsx(
            "text-transparent absolute top-0 left-0 size-full object-contain transition-opacity ",
            !canAddToCart ? "opacity-60 group-hover:opacity-50" : "group-hover:opacity-90",
          )}
        />
      </Link>
      {children && children}
    </div>
  );
}

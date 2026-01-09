"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  src: string;
  alt: string;
  children?: React.ReactNode;
};

export function ProductCardImage({ src, alt, children }: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="group relative aspect-3/4 dark:overflow-hidden bg-white">
      {/* Skeleton */}
      <div
        className={`
          absolute inset-0
          bg-neutral-200
          dark:bg-neutral-700
          animate-pulse
          transition-opacity duration-300
          ${loaded ? "opacity-0!" : "opacity-100"}
        `}
      />

      {/* Image */}
      <Image
        src={src}
        alt={alt}
        fill
        className={`
          object-contain group-hover:opacity-90
          transition-all duration-300
          ${loaded ? "opacity-100" : "opacity-0"}
        `}
        onLoad={() => setLoaded(true)}
      />

      {children && children}
    </div>
  );
}

"use client";

import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";

type Props = {
  src: string;
  srcset?: string;
  alt: string;
  children?: React.ReactNode;
};

export function ProductCardImage({ src, srcset, alt, children }: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div key={src} className="group relative aspect-3/4 dark:overflow-hidden bg-white">
      {!loaded && (
        <div
          className={`
          absolute inset-0
          bg-neutral-200
          dark:bg-neutral-700
          animate-pulse
        `}
        />
      )}

      {src && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          srcSet={srcset || undefined}
          sizes="(max-width: 768px) 50vw, 360px"
          alt={alt}
          className={clsx(
            "absolute top-0 left-0 size-full object-contain group-hover:opacity-90 transition-opacity",
            !loaded && "opacity-0",
          )}
          loading="lazy"
          onLoad={() => setLoaded(true)}
        />
        // <Image
        //   src={src}
        //   alt={alt}
        //   fill
        //   className={`
        //   object-contain group-hover:opacity-90
        // `}
        //   onLoad={() => setLoaded(true)}
        // />
      )}

      {children && children}
    </div>
  );
}

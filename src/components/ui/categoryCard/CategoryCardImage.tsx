"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  src: string;
  srcset?: string;
  alt: string;
};

export function CategoryCardImage({ src, srcset, alt }: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="group relative aspect-480/420 overflow-hidden">
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

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        srcSet={srcset || undefined}
        sizes="(max-width: 640px) 74vw, (max-width: 1024px) 50vw, 480px"
        alt={alt}
        className="absolute top-0 left-0 size-full object-cover group-hover:scale-105
          transition-all duration-300"
        loading="lazy"
        onLoad={() => setLoaded(true)}
      />
      {/* <Image
        src={src}
        alt=""
        fill
        className={`
          object-cover group-hover:scale-105
          transition-all duration-300
          ${loaded ? "opacity-100" : "opacity-0"}
        `}
        onLoad={() => setLoaded(true)}
      /> */}
    </div>
  );
}

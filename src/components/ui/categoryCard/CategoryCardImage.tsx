"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  src: string;
  srcset?: string;
  alt: string;
};

export function CategoryCardImage({ src, srcset, alt }: Props) {
  return (
    <div className="group relative aspect-480/420 overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        srcSet={srcset || undefined}
        sizes="(max-width: 640px) 74vw, (max-width: 1024px) 50vw, 480px"
        alt={alt}
        className="text-transparent absolute top-0 left-0 size-full object-cover group-hover:scale-105
          transition-all duration-300"
        loading="lazy"
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

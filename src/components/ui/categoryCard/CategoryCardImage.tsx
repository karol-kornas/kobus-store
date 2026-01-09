"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  src: string;
};

export function CategoryCardImage({ src }: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="group relative aspect-480/420 overflow-hidden">
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
        alt=""
        fill
        className={`
          object-cover group-hover:scale-105
          transition-all duration-300
          ${loaded ? "opacity-100" : "opacity-0"}
        `}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

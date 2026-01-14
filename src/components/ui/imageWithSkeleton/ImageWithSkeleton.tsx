"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";
import clsx from "clsx";

type Props = Omit<ImageProps, "alt" | "src"> & {
  src?: string | null;
  alt: string;
  skeletonClassName?: string;
  wrapClassName?: string;
  fallback?: React.ReactNode;
};

export function ImageWithSkeleton({
  src,
  alt,
  skeletonClassName,
  wrapClassName,
  className,
  fallback,
  ...props
}: Props) {
  const [loaded, setLoaded] = useState(false);

  if (!src) {
    return (
      <div
        className={clsx("bg-gray-200 flex items-center justify-center text-xs text-gray-400", wrapClassName)}
      >
        {fallback ?? "Brak zdjęcia"}
      </div>
    );
  }

  return (
    <div className={clsx("relative", wrapClassName)}>
      {!loaded && (
        <div className={clsx("absolute inset-0 bg-gray-200 animate-pulse z-[-1]", skeletonClassName)} />
      )}

      <Image {...props} src={src} alt={alt} onLoad={() => setLoaded(true)} className={className} />
    </div>
  );
}

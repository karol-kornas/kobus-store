"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";
import clsx from "clsx";

type Props = Omit<ImageProps, "alt"> & {
  alt: string;
  skeletonClassName?: string;
  wrapClassName?: string;
};

export function ImageWithSkeleton({ alt, skeletonClassName, wrapClassName, className, ...props }: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={clsx("relative", wrapClassName)}>
      {!loaded && (
        <div className={clsx("absolute inset-0 bg-gray-200 animate-pulse z-[-1]", skeletonClassName)} />
      )}

      <Image {...props} alt={alt} onLoad={() => setLoaded(true)} className={className} />
    </div>
  );
}

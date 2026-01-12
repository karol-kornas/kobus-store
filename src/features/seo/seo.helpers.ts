import type { Metadata } from "next";
import { SeoResponse } from "./seo.types";

export function mapSeoToMetadata(seo: SeoResponse): Metadata {
  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: seo.canonical,
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      images: seo.og?.image
        ? [
            {
              url: seo.og.image,
              width: seo.og.width,
              height: seo.og.height,
            },
          ]
        : [],
    },
  };
}

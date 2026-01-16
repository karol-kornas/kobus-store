import { wooFetch } from "@/lib/wooFetch";
import { wpFetch } from "@/lib/wpFetch";
import { Product } from "@/types/product";
import { cache } from "react";

type GetProductsByCategoryLiteParams = {
  categoryId: number;
  limit: number;
};

export async function getProductsByCategoryLite({ categoryId, limit }: GetProductsByCategoryLiteParams) {
  const data = await wpFetch("/headless/v1/products", {
    categoryId,
    limit,
  }, {
    revalidate: 300,
  });

  return data;
}

type GetProductsByIdsLiteParams = {
  ids: number[];
  limit: number;
};

export async function getProductsByIdsLite({ ids, limit }: GetProductsByIdsLiteParams) {
  if (!ids.length) {
    return { products: [] };
  }

  const data = await wpFetch("/headless/v1/products/by-ids", {
    ids: ids.join(","),
    limit,
  }, {
    revalidate: 300,
  });

  return data;
}

const sortMap: Record<string, { orderby?: string; order?: "asc" | "desc" }> = {
  default: {},
  latest: { orderby: "date", order: "desc" },
  price_asc: { orderby: "price", order: "asc" },
  price_desc: { orderby: "price", order: "desc" },
  popularity: { orderby: "popularity", order: "desc" },
};

export type GetProductsOptions = {
  page?: number;
  orderby?: string;
  min_price?: string;
  max_price?: string;
};

export async function getProductsByCategory(categoryId: number, options: GetProductsOptions = {}) {
  const sort = sortMap[options.orderby ?? "default"] ?? {};
  const { data, headers } = await wooFetch<Product[]>(
    "/products",
    {
      category: categoryId,
      per_page: 12,
      page: options.page || 1,
      min_price: options.min_price,
      max_price: options.max_price,
      ...sort,
    },
    { revalidate: 60 }
  );

  return {
    items: data,
    totalPages: Number(headers.get("x-wp-totalpages")) || 1,
    totalItems: Number(headers.get("x-wp-total")) || 0,
    page: options.page || 1,
  };
}

export const getProductBySlug = cache(async (slug: string) => {
  const { data } = await wooFetch<Product[]>("/products", { slug }, { revalidate: 60 });
  return data[0] ?? null;
});

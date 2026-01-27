"use client";

import { apiClient } from "@/lib/apiClient";
import { Product } from "@/types/product";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

interface UseProductsByCategoryLiteParams {
  categoryId: number;
  limit?: number;
}

type QueryData = {
  products: Product[];
};

type Options = Omit<UseQueryOptions<QueryData, Error, QueryData, readonly unknown[]>, "queryKey" | "queryFn">;

export function useProductsByCategoryLite(
  { categoryId, limit = 8 }: UseProductsByCategoryLiteParams,
  options?: Options,
) {
  return useQuery<QueryData>({
    queryKey: ["products", "category", categoryId, limit],
    queryFn: async () => {
      const { data } = await apiClient.get("/api/products/lite", {
        params: { categoryId, limit },
      });
      return data;
    },
    enabled: !!categoryId,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    ...options,
  });
}

interface UseProductsByIdsLiteParams {
  ids: number[];
  limit?: number;
}

export function useProductsByIdsLite({ ids, limit = 8 }: UseProductsByIdsLiteParams, options?: Options) {
  const idsKey = [...ids].sort((a, b) => a - b).join(",");
  return useQuery<QueryData>({
    queryKey: ["products", "ids", idsKey, limit],
    queryFn: async () => {
      const { data } = await apiClient.get("/api/products/lite", {
        params: { ids: ids.join(","), limit },
      });
      return data;
    },
    enabled: ids.length > 0,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    ...options,
  });
}

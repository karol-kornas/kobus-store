import { MenuItem } from "@/components/layout/navigation/navigation.types";
import { wpFetch } from "@/lib/wpFetch";
import { cache } from "react";

export const getMenu = cache(async (location: string) => {
  return await wpFetch<MenuItem[]>("/headless/v1/menu", { location }, { revalidate: 300 });
});

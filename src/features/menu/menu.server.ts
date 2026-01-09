import { MenuItem } from "@/components/layout/navigation/navigation.types";
import { wpFetch } from "@/lib/wpFetch";

export async function getMenu(location: string) {
  return await wpFetch<MenuItem[]>(
    "/headless/v1/menu",
    { location },
    { revalidate: 300 } // 5 min
  );
}

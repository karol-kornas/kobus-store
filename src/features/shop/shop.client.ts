export async function getShopConfigClient() {
  const res = await fetch("/api/shop/config");

  if (!res.ok) {
    throw new Error("Failed to fetch shop config");
  }

  return res.json() as Promise<{
    free_shipping_threshold: number;
  }>;
}

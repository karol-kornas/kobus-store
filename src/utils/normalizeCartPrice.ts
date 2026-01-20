export function normalizeCartPrice(price: string | number | null) {
  if (price == null) return null;
  return Number(price) / 100;
}

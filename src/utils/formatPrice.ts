export function formatPrice(price: number | null, currency = "PLN") {
  if (price === null) return null;

  return new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency,
  }).format(price);
}

export function getShippingProvider(rateId: string) {
  if (rateId.startsWith("flexible_shipping_single:9")) return "inpost_paczkomat";
  if (rateId.startsWith("flexible_shipping_single:10")) return "inpost_kurier";
  if (rateId.startsWith("flexible_shipping_single:8")) return "inpost_kurier";
  if (rateId.startsWith("flexible_shipping_single:13")) return "fedex";

  return "default";
}

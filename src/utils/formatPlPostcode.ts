export function formatPlPostcode(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 5);

  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}-${digits.slice(2)}`;
}

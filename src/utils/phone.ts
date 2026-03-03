import { PHONE_COUNTRY_CODES } from "@/constants/phoneCodes";

const KNOWN_PREFIXES = PHONE_COUNTRY_CODES.map((el) => el.value);

export function splitPhoneNumber(fullPhone?: string) {
  if (!fullPhone) {
    return { phonePrefix: undefined, phone: undefined };
  }

  const normalized = fullPhone.replace(/\s+/g, "");

  const prefix = KNOWN_PREFIXES.sort((a, b) => b.length - a.length) // ważne!
    .find((p) => normalized.startsWith(p));

  if (!prefix) {
    return { phonePrefix: undefined, phone: normalized };
  }

  return {
    phonePrefix: prefix,
    phone: normalized.slice(prefix.length),
  };
}

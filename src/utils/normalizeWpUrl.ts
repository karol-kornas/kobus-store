export function normalizeWpUrl(url: string) {
  if (!url) return "/";

  try {
    const wpOrigin = process.env.NEXT_PUBLIC_WP_ORIGIN;
    const parsed = new URL(url);

    if (parsed.origin === wpOrigin) {
      let pathname = parsed.pathname;

      // 🔁 Zamiana ścieżek WordPress → Next.js
      pathname = pathname.replace("/kategoria-produktu/", "/category/");
      pathname = pathname.replace("/produkt/", "/product/"); // jeśli masz
      pathname = pathname.replace("/koszyk/", "/cart/"); // przykłady
      pathname = pathname.replace("/konto/", "/account/");

      return pathname.replace(/\/$/, "");
    }

    return url;
  } catch {
    return url;
  }
}

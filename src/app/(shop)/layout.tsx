import { Header } from "@/components/layouts/header/Header";
import { getMenu } from "@/features/menu/menu.server";

import { AddToCartDrawer } from "@/components/cart/addToCartDrawer/AddToCartDrawer";

export default async function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const menu = await getMenu("headless_header");
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 bg-background p-2 z-50"
      >
        Przejdź do treści
      </a>
      <Header menu={menu} />
      <div id="mobile-menu-portal-root"></div>

      <main id="main-content">{children}</main>

      <AddToCartDrawer />
    </>
  );
}

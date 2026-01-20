import type { Metadata } from "next";
import { Mulish, Playfair_Display } from "next/font/google";
import "./globals.css";

import { Header } from "@/components/layouts/header/Header";
import { getMenu } from "@/features/menu/menu.server";
import { getCartServer } from "@/features/cart/cart.server";
import { CartStoreProvider } from "@/stores/CartStoreProvider";
import { getMeServer } from "@/features/auth/auth.server";
import { QueryProvider } from "@/providers/QueryProvider";
import { AuthProvider } from "@/context/AuthProvider";
import { AddToCartDrawer } from "@/components/cart/addToCartDrawer/AddToCartDrawer";
import { mapCart } from "@/features/cart/cart.mapper";

const mulish = Mulish({
  variable: "--font-mulish",
  weight: ["400", "500", "700"],
  subsets: ["latin", "latin-ext"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfairDisplay",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: {
    default: "Oficjalny sklep Pana Kobusa - zadbaj o miłość i związki",
    template: "%s - Oficjalny sklep Pana Kobusa",
  },
  description:
    "Ciekawe pomysły na prezenty! W sklepie znajdziesz autorskie książki Kobusa, audiobooki, ebooki, gry karciane, quizy, ubrania i wiele innych...",
  openGraph: {
    title: {
      default: "Oficjalny sklep Pana Kobusa - zadbaj o miłość i związki",
      template: "%s - Oficjalny sklep Pana Kobusa",
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const menu = await getMenu("headless_header");
  const cart = await getCartServer();
  const user = await getMeServer();

  return (
    <html lang="pl">
      <body className={`${mulish.variable} ${playfairDisplay.variable} antialiased font-sans`}>
        <QueryProvider>
          <CartStoreProvider initialCart={mapCart(cart)}>
            <AuthProvider initialUser={user}>
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
            </AuthProvider>
          </CartStoreProvider>
        </QueryProvider>
      </body>
    </html>
  );
}

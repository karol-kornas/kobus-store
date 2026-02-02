import type { Metadata } from "next";
import { Mulish, Playfair_Display } from "next/font/google";
import "./globals.css";

import { getMeServer } from "@/features/auth/auth.server";
import { QueryProvider } from "@/providers/QueryProvider";
import { AuthProvider } from "@/context/AuthProvider";
import { AddToCartDrawer } from "@/components/cart/addToCartDrawer/AddToCartDrawer";

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
  const user = await getMeServer();

  return (
    <html lang="pl">
      <body className={`${mulish.variable} ${playfairDisplay.variable} antialiased font-sans`}>
        <QueryProvider>
          <AuthProvider initialUser={user}>
            {children}
            <AddToCartDrawer />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}

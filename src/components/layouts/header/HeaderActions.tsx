"use client";
import { useAuth } from "@/providers/AuthContext";
import { Heart, Search, ShoppingBag, UserRound } from "lucide-react";
import Link from "next/link";

export function HeaderActions() {
  const { isAuthenticated, isLoading } = useAuth();
  const userLink = isLoading || isAuthenticated ? "/account" : "/login";

  return (
    <div className="flex items-center gap-2 sm:gap-4">
      <button
        type="button"
        className="flex text-sm uppercase size-10 lg:w-auto lg:px-4 lg:h-10 items-center justify-center gap-4 dark:bg-neutral-800 bg-cream rounded-full transition-opacity hover:opacity-60 cursor-pointer"
      >
        <span className="hidden lg:block">Czego szukasz?</span>
        <Search width={20} height={20} />
      </button>
      <Link
        href={userLink}
        title="Moje konto"
        className="size-10 flex items-center justify-center dark:bg-neutral-800 bg-cream rounded-full transition-opacity hover:opacity-60"
      >
        <UserRound width={22} height={22} />
        <span className="sr-only">Moje konto</span>
      </Link>
      <Link
        href="/ulubione"
        title="Ulubione"
        className="flex items-center justify-center transition-opacity hover:opacity-60"
      >
        <Heart width={26} height={26} />
        <span className="sr-only">Ulubione</span>
      </Link>
      <Link
        href="/koszyk"
        title="Koszyk"
        className="flex items-center justify-center transition-opacity hover:opacity-60"
      >
        <ShoppingBag width={26} height={26} />
        <span className="sr-only">Koszyk</span>
      </Link>
    </div>
  );
}

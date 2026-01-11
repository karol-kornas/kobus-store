"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Spinner } from "../spinner/Spinner";

interface Props {
  currentPage: number;
  totalPages: number;
  basePath: string;
  searchParams?: Record<string, string | undefined>;
}

export function Pagination({ currentPage, totalPages, basePath, searchParams = {} }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  if (totalPages <= 1) return null;

  const createPageLink = (page: number) => {
    const params = new URLSearchParams();

    Object.entries(searchParams).forEach(([key, value]) => {
      if (value && key !== "page") {
        params.set(key, value);
      }
    });

    params.set("page", String(page));
    return `${basePath}?${params.toString()}`;
  };

  const goTo = (href: string) => {
    startTransition(() => {
      router.push(href);
    });
  };

  const getPages = () => {
    const delta = 1;
    const range: number[] = [];
    const rangeWithDots: (number | "...")[] = [];
    let last: number | undefined;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        range.push(i);
      }
    }

    for (const page of range) {
      if (last) {
        if (page - last === 2) {
          rangeWithDots.push(last + 1);
        } else if (page - last > 2) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(page);
      last = page;
    }

    return rangeWithDots;
  };

  const pages = getPages();

  const linkClass = "px-3 py-2 border transition-colors focus:outline-none focus:ring-1 focus:ring-black/30";

  return (
    <nav className="relative flex items-center justify-center gap-2 mt-12 flex-wrap">
      {currentPage > 1 && (
        <a
          href={createPageLink(currentPage - 1)}
          role="link"
          aria-label="Poprzednia strona"
          aria-disabled={isPending}
          onClick={(e) => {
            e.preventDefault();
            if (!isPending) goTo(createPageLink(currentPage - 1));
          }}
          className={`${linkClass} border-neutral-100 hover:border-black`}
        >
          ←
        </a>
      )}

      {pages.map((page, index) =>
        page === "..." ? (
          <span key={`dots-${index}`} className="px-3 py-2 text-neutral-400">
            …
          </span>
        ) : (
          <a
            key={page}
            href={createPageLink(page)}
            role="link"
            aria-current={page === currentPage ? "page" : undefined}
            aria-disabled={isPending}
            onClick={(e) => {
              e.preventDefault();
              if (!isPending) goTo(createPageLink(page));
            }}
            className={`${linkClass} ${
              page === currentPage ? "border-black font-medium" : "border-neutral-100 hover:border-black"
            }`}
          >
            {page}
          </a>
        )
      )}

      {currentPage < totalPages && (
        <a
          href={createPageLink(currentPage + 1)}
          role="link"
          aria-label="Następna strona"
          aria-disabled={isPending}
          onClick={(e) => {
            e.preventDefault();
            if (!isPending) goTo(createPageLink(currentPage + 1));
          }}
          className={`${linkClass} border-neutral-100 hover:border-black`}
        >
          →
        </a>
      )}

      {isPending && (
        <div className="absolute inset-0 bg-background/75 flex items-center justify-center pointer-events-none">
          <Spinner />
        </div>
      )}
    </nav>
  );
}

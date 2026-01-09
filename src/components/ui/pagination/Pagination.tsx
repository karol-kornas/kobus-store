import Link from "next/link";

interface Props {
  currentPage: number;
  totalPages: number;
  basePath: string;
  searchParams?: Record<string, string | undefined>;
}

export function Pagination({ currentPage, totalPages, basePath, searchParams = {} }: Props) {
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

  const getPages = () => {
    const delta = 1; // ile stron po bokach aktualnej
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

  return (
    <nav className="flex items-center justify-center gap-2 mt-12 flex-wrap">
      {currentPage > 1 && (
        <Link href={createPageLink(currentPage - 1)} className="px-3 py-2 border rounded">
          ←
        </Link>
      )}

      {pages.map((page, index) =>
        page === "..." ? (
          <span key={`dots-${index}`} className="px-3 py-2 text-neutral-400">
            …
          </span>
        ) : (
          <Link
            key={page}
            href={createPageLink(page)}
            className={`px-3 py-2 border rounded ${
              page === currentPage ? "bg-black text-white" : "hover:bg-neutral-100"
            }`}
          >
            {page}
          </Link>
        )
      )}

      {currentPage < totalPages && (
        <Link href={createPageLink(currentPage + 1)} className="px-3 py-2 border rounded">
          →
        </Link>
      )}
    </nav>
  );
}

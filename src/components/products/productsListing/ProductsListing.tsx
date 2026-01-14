import { Pagination } from "@/components/ui/pagination/Pagination";

type Props = {
  totalItems: number;
  currentPage: number;
  totalPages: number;
  basePath: string;
  searchParams?: Record<string, string | undefined>;
  children: React.ReactNode;
};

export function ProductsListing({
  totalItems,
  currentPage,
  totalPages,
  basePath,
  searchParams,
  children,
}: Props) {
  return (
    <div className="space-y-4 mt-1">
      <div className="text-neutral-400 text-sm">Liczba produktów: {totalItems}</div>

      {children}

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          basePath={basePath}
          searchParams={searchParams}
        />
      )}
    </div>
  );
}

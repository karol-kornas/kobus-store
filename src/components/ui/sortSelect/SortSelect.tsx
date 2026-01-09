"use client";

import { useRouter, useSearchParams } from "next/navigation";

type SortOption = "default" | "price_asc" | "price_desc" | "latest" | "popularity";

const options: { value: SortOption; label: string }[] = [
  { value: "default", label: "Domyślne" },
  { value: "price_asc", label: "Cena: od najniższej" },
  { value: "price_desc", label: "Cena: od najwyższej" },
  { value: "latest", label: "Najnowsze" },
  { value: "popularity", label: "Popularność" },
];

export function SortSelect() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentOrderby = searchParams.get("orderby") ?? "default";

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "default") {
      params.delete("orderby");
    } else {
      params.set("orderby", value);
    }

    params.delete("page"); // reset paginacji przy zmianie sortowania

    router.push(`?${params.toString()}`);
  };

  return (
    <select
      value={currentOrderby}
      onChange={(e) => handleChange(e.target.value)}
      className="border border-neutral-400 px-3 py-2 rounded text-sm"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

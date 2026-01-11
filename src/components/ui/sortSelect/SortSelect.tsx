"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition, useState, useRef, useEffect } from "react";
import { Spinner } from "../spinner/Spinner";
import { ChevronDown } from "lucide-react";

type SortOption = "default" | "price_asc" | "price_desc" | "latest" | "popularity";

const options: { value: SortOption; label: string }[] = [
  { value: "default", label: "Nowości" },
  { value: "price_asc", label: "Najniższa cena" },
  { value: "price_desc", label: "Najwyższa cena" },
  { value: "popularity", label: "Popularność" },
];

export function SortSelect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const currentOrderby = (searchParams.get("orderby") ?? "default") as SortOption;
  const currentLabel = options.find((o) => o.value === currentOrderby)?.label;

  const handleChange = (value: SortOption) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "default") {
      params.delete("orderby");
    } else {
      params.set("orderby", value);
    }

    params.delete("page");

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });

    setOpen(false);
    buttonRef.current?.focus();
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center lg:gap-3 border lg:border-0">
      <div className="font-bold px-3 lg:px-0 flex-none">Sortuj wg:</div>
      <div ref={wrapperRef} className="relative inline-block w-full lg:w-auto">
        <button
          ref={buttonRef}
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          disabled={isPending}
          className="flex w-full justify-between items-center border-l lg:border-0 gap-2 px-3 lg:px-0 py-3 lg:py-2 bg-white cursor-pointer hover:opacity-85 transition-opacity"
        >
          <span>{currentLabel}</span>
          <ChevronDown size={20} className={`transition ${open ? "rotate-180" : ""}`} />
        </button>

        {open && (
          <ul
            ref={listRef}
            role="listbox"
            aria-label="Sortowanie"
            className="absolute min-w-40 z-20 mt-2 w-full bg-white border shadow-lg overflow-hidden lg:text-sm right-0"
          >
            {options.map((opt) => {
              const selected = opt.value === currentOrderby;

              return (
                <li
                  key={opt.value}
                  role="option"
                  aria-selected={selected}
                  tabIndex={0}
                  onClick={() => handleChange(opt.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleChange(opt.value);
                    }
                  }}
                  className={`px-3 py-2 cursor-pointer focus:outline-none focus:bg-neutral-100 ${
                    selected ? "bg-neutral-100 font-medium" : "hover:bg-neutral-50"
                  }`}
                >
                  {opt.label}
                </li>
              );
            })}
          </ul>
        )}

        {isPending && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/60 pointer-events-none rounded">
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
}

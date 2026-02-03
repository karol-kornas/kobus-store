// lib/inpost.ts
const API_BASE = "https://api-pl-points.easypack24.net/v1";

export async function fetchParcelLockers(params?: { city?: string }) {
  const searchParams = new URLSearchParams();

  if (params?.city) {
    searchParams.append("city", params.city);
  }

  searchParams.append("per_page", "3000");

  const res = await fetch(`${API_BASE}/points?${searchParams.toString()}`, {
    headers: {
      Authorization: `Bearer ${process.env.INPOST_API_TOKEN}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Nie udało się pobrać paczkomatów");
  }

  return res.json(); // { items, meta, links }
}

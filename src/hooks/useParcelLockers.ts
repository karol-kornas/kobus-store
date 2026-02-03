import { useState, useEffect } from "react";
import { fetchParcelLockers } from "@/lib/inpost";

export function useParcelLockers(city?: string) {
  const [lockers, setLockers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetchParcelLockers(city ? { city } : undefined)
      .then((data) => setLockers(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [city]);

  return { lockers, loading, error };
}

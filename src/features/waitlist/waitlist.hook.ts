import { useEffect, useState, useCallback } from "react";
import { joinWaitlist, removeWaitlist, getWaitlistStatus } from "./waitlist.client";
import { useAuth } from "@/context/AuthContext";

type UseWaitlistOptions = {
  productId: number;
  enabled?: boolean;
};

export function useWaitlist({ productId, enabled = true }: UseWaitlistOptions) {
  const [registered, setRegistered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [info, setInfo] = useState<string | undefined>(undefined);
  const [statusLoading, setStatusLoading] = useState(enabled);
  const { user } = useAuth();

  useEffect(() => {
    setStatusLoading(true);
    if (!enabled || !user) {
      setStatusLoading(false);
      return;
    }
    let cancelled = false;

    getWaitlistStatus({ productId, email: user.email })
      .then((res) => {
        if (!cancelled) setRegistered(res.registered);
      })
      .finally(() => {
        if (!cancelled) {
          setStatusLoading(false);
          setError(undefined);
          setInfo(undefined);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [productId, enabled, user]);

  const join = useCallback(
    async (overrideEmail?: string) => {
      const email = user ? user.email : overrideEmail;

      if (!email) {
        setError("Podaj adres e-mail.");
        return;
      }

      try {
        setLoading(true);
        setError(undefined);
        setInfo(undefined);

        const res = await joinWaitlist({
          productId,
          email,
        });

        if (res.status === "already_registered") {
          setInfo("Ten adres e-mail jest już zapisany na liście.");
        } else {
          setInfo("Zapisano na listę oczekujących.");
        }

        setRegistered(true);
      } catch {
        setError("Nie udało się zapisać na listę oczekujących.");
      } finally {
        setLoading(false);
      }
    },
    [productId, user],
  );

  const remove = useCallback(async () => {
    if (!user?.email) {
      setError("Brak adresu e-mail.");
      return;
    }
    try {
      setLoading(true);
      setError(undefined);
      setInfo(undefined);

      await removeWaitlist({ productId, email: user.email });
      setRegistered(false);
      setInfo("Wypisano z listy oczekujących.");
    } catch {
      setError("Nie udało się wypisać z listy oczekujących.");
    } finally {
      setLoading(false);
    }
  }, [productId, user]);

  return {
    registered,
    statusLoading,
    loading,
    error,
    info,
    join,
    remove,
  };
}

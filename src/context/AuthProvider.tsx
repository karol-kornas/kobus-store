"use client";

import { useCallback, useEffect, useState } from "react";
import {
  getMe,
  login as loginApi,
  logout as logoutApi,
  registerUser as registerUserApi,
  setPassword as setPasswordApi,
} from "@/features/auth/auth.client";
import { AuthContext } from "./AuthContext";
import { LoginFormValues } from "@/features/auth/schemas/login.schema";
import { RegisterFormValues } from "@/features/auth/schemas/register.schema";
import { SetPasswordFormValues } from "@/features/auth/schemas/setPassword.schema";
import { useCart, useCartItems } from "@/features/cart/hooks/cart.hooks";
import { getCart, mergeCartApi } from "@/features/cart/cart.client";
import { getGuestCartSnapshot } from "@/features/cart/cart.helpers";
import { AuthUser } from "@/features/auth/auth.types";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { fetchCart } = useCart();
  const cartItems = useCartItems();

  const fetchUser = useCallback(async () => {
    try {
      const me = await getMe();
      setUser(me);
      return me;
    } catch {
      setUser(null);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
    fetchCart();
  }, [fetchUser, fetchCart]);

  const login = async (data: LoginFormValues) => {
    const guestSnapshot = getGuestCartSnapshot(cartItems);
    const hadGuestItems = guestSnapshot.length > 0;

    await loginApi(data);
    const user = await fetchUser();

    if (hadGuestItems) {
      await getCart();
      await mergeCartApi(guestSnapshot);
    }

    await fetchCart();
    return user;
  };

  const logout = async () => {
    await logoutApi();
    setUser(null);
    await fetchCart();
  };

  const registerUser = async (data: RegisterFormValues) => {
    await registerUserApi(data);
    await fetchUser();
    await fetchCart();
  };

  const setPassword = async (data: SetPasswordFormValues) => {
    await setPasswordApi(data);
    await fetchUser();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        registerUser,
        setPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

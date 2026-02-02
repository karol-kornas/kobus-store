"use client";

import { useCallback, useEffect, useState } from "react";
import { AuthUser } from "@/features/auth/auth.types";
import {
  getMe,
  login as loginApi,
  logout as logoutApi,
  registerUser as registerUserApi,
  setPassword as setPasswordApi,
} from "@/features/auth/auth.client";
import { AuthContext } from "./AuthContext";
import { SetPasswordFormValues } from "@/features/auth/schemas/setPassword.schema";
import { RegisterFormValues } from "@/features/auth/schemas/register.schema";
import { LoginFormValues } from "@/features/auth/schemas/login.schema";
import { useCart, useCartItems } from "@/features/cart/hooks/cart.hooks";

import { getCart, mergeCartApi } from "@/features/cart/cart.client";
import { getGuestCartSnapshot } from "@/features/cart/cart.helpers";

export function AuthProvider({
  children,
  initialUser,
}: {
  children: React.ReactNode;
  initialUser: AuthUser | null;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(initialUser);
  const { fetchCart } = useCart();
  const cartItems = useCartItems();

  const fetchUser = useCallback(async () => {
    setIsLoading(true);
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
    // 🔥 przy starcie aplikacji
    fetchCart();
  }, [fetchCart]);

  const login = async (data: LoginFormValues) => {
    const guestSnapshot = getGuestCartSnapshot(cartItems);
    const guestHadItems = guestSnapshot.length > 0;

    await loginApi(data);
    const user = await fetchUser();

    if (!guestHadItems) {
      await fetchCart();
    } else {
      await getCart();
      await mergeCartApi(guestSnapshot);
      await fetchCart();
    }

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

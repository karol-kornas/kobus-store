"use client";

import { useEffect, useState, useCallback } from "react";
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

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    try {
      const me = await getMe();
      setUser(me);
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const login = async (data: LoginFormValues) => {
    await loginApi(data);
    await fetchUser();
  };

  const logout = async () => {
    await logoutApi();
    setUser(null);
  };

  const registerUser = async (data: RegisterFormValues) => {
    await registerUserApi(data);
    await fetchUser();
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

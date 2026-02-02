"use client";

import { AuthUser } from "@/features/auth/auth.types";
import { LoginFormValues } from "@/features/auth/schemas/login.schema";
import { RegisterFormValues } from "@/features/auth/schemas/register.schema";
import { SetPasswordFormValues } from "@/features/auth/schemas/setPassword.schema";
import { createContext, useContext } from "react";

type AuthContextValue = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: LoginFormValues) => Promise<AuthUser | null>;
  logout: () => Promise<void>;
  registerUser: (data: RegisterFormValues) => Promise<void>;
  setPassword: (data: SetPasswordFormValues) => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}

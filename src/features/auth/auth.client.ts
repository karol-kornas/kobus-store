import { apiClient } from "@/lib/apiClient";
import { LoginFormValues } from "./schemas/login.schema";
import { AuthUser } from "./auth.types";
import { RegisterFormValues } from "./schemas/register.schema";
import { SetPasswordFormValues } from "./schemas/setPassword.schema";
import { handleAuthError } from "./auth.helpers";
import { ForgotPasswordFormValues } from "./schemas/forgotPassword.schema";

export async function login(data: LoginFormValues) {
  try {
    const res = await apiClient.post("/api/auth/login", data);
    return res.data;
  } catch (err) {
    handleAuthError(err);
  }
}

export async function logout() {
  const { data } = await apiClient.post("/api/auth/logout");

  return data;
}

export async function getMe(): Promise<AuthUser> {
  const res = await apiClient.get("/api/auth/me");
  return res.data;
}

export async function registerUser(data: RegisterFormValues) {
  try {
    const res = await apiClient.post("/api/auth/register", data);
    return res.data;
  } catch (err) {
    handleAuthError(err);
  }
}

export async function setPassword(data: SetPasswordFormValues) {
  try {
    const res = await apiClient.post("/api/auth/set-password", data);
    return res.data;
  } catch (err) {
    handleAuthError(err);
  }
}

export async function forgotPassword(data: ForgotPasswordFormValues) {
  try {
    const res = await apiClient.post("/api/auth/forgot-password", data);
    return res.data;
  } catch (err) {
    handleAuthError(err);
  }
}

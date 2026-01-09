import { AxiosError } from "axios";
import { AUTH_ERROR_MESSAGES } from "./auth.errors";

export function handleAuthError(err: unknown) {
  const axiosError = err as AxiosError<{ code?: string }>;
  const code = axiosError.response?.data?.code;

  throw new Error(
    AUTH_ERROR_MESSAGES[code as keyof typeof AUTH_ERROR_MESSAGES] ?? AUTH_ERROR_MESSAGES.default
  );
}

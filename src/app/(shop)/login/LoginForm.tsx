"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button/Button";
import { Input } from "@/components/ui/input/Input";
import { Checkbox } from "@/components/ui/checkbox/Checkbox";
import Link from "next/link";
import { FormField } from "@/components/ui/formField/FormField";
import { FormError } from "@/components/ui/form/formError/FormError";
import { LoginFormValues, loginSchema } from "@/features/auth/schemas/login.schema";
import { AuthUser } from "@/features/auth/auth.types";

interface Props {
  onSuccess?: (user: AuthUser | null) => void;
  redirectTo?: string;
}
export function LoginForm({ onSuccess, redirectTo }: Props) {
  const router = useRouter();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const user = await login({ ...data, remember: data.remember ?? false });
      if (onSuccess) {
        onSuccess(user);
        return;
      }
      if (redirectTo) {
        router.push(redirectTo);
      }
    } catch (err) {
      setError("root", {
        message: (err as Error).message,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <FormField
        label="Nazwa użytkownika lub adres e-mail"
        htmlFor="login"
        required
        error={errors.login?.message}
      >
        <Input id="login" type="text" required {...register("login")} />
      </FormField>

      <FormField label="Hasło" htmlFor="password" required error={errors.password?.message}>
        <Input id="password" type="password" {...register("password")} />
      </FormField>

      <div className="py-2">
        <Checkbox id="remember" label="Zapamiętaj mnie" {...register("remember")} />
      </div>

      <FormError message={errors.root?.message} variant="auth" />

      <Button type="submit" isLoading={isSubmitting}>
        Zaloguj się
      </Button>

      <div>
        <Link href="/forgot-password" className="hover:opacity-85 transition-opacity">
          Nie pamiętasz hasła?
        </Link>
      </div>
    </form>
  );
}

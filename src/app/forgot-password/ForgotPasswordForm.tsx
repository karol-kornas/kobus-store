"use client";

import { Button } from "@/components/ui/button/Button";
import { FormError } from "@/components/ui/form/formError/FormError";
import { FormField } from "@/components/ui/formField/FormField";
import { Input } from "@/components/ui/input/Input";
import { forgotPassword } from "@/features/auth/auth.client";
import {
  ForgotPasswordFormValues,
  forgotPasswordSchema,
} from "@/features/auth/schemas/forgotPassword.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export function ForgotPasswordForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    try {
      await forgotPassword(data);
      router.push("/forgot-password/success");
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

      <FormError message={errors.root?.message} variant="auth" />

      <Button isLoading={isSubmitting}>Zresetuj hasło</Button>
    </form>
  );
}

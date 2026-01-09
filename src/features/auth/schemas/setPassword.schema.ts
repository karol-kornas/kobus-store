import { z } from "zod";

export const setPasswordSchema = z
  .object({
    login: z.string().min(1),
    key: z.string().min(1),
    password: z.string().min(8, "Hasło musi mieć min. 8 znaków"),
    confirmPassword: z.string().min(8, "Hasło musi mieć min. 8 znaków"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Hasła muszą być takie same",
    path: ["confirmPassword"],
  });

export type SetPasswordFormValues = z.infer<typeof setPasswordSchema>;

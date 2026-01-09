import { z } from "zod";

export const forgotPasswordSchema = z.object({
  login: z.string().trim().min(1),
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

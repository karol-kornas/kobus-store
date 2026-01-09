import { z } from "zod";

export const loginSchema = z.object({
  login: z.string().trim().min(1, "To pole jest wymagane"),
  password: z.string().trim().min(1, "To pole jest wymagane"),
  remember: z.boolean().optional(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

import { z } from "zod";

export const EmailHeaderSchema = z.object({
  user: z.string().min(1, { message: "Username is required" }),
  password: z.string(),
});

export const EmailBodySchema = z.object({
  to: z.string().email({ message: "Invalid email" }),
  subject: z.string(),
  template: z.string(),
});

export const EmailSchema = z.object({
  headers: EmailHeaderSchema,
  body: EmailBodySchema,
});

export type Email = z.infer<typeof EmailSchema>;

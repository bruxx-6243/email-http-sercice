import { config } from "dotenv";
import { expand } from "dotenv-expand";
import { z } from "zod";

expand(config());

const EnvSchema = z.object({
  PORT: z.coerce.number().default(3000),

  // For GMAIL
  GMAIL_PORT: z.coerce.number().optional(),
  GMAIL_HOST: z.string().optional(),
  GMAIL_SERVICE: z.string().optional(),

  // For MAILRU
  MAILRU_PORT: z.coerce.number().optional(),
  MAILRU_HOST: z.string().optional(),
  MAILRU_SERVICE: z.string().optional(),

  // For YANDEX
  YANDEX_PORT: z.coerce.number().optional(),
  YANDEX_HOST: z.string().optional(),
  YANDEX_SERVICE: z.string().optional(),

  // For testing
  EMAIL_USER: z.string().optional(),
  EMAIL_PASSWORD: z.string().optional(),
});

type Env = z.infer<typeof EnvSchema>;

// eslint-disable-next-line import/no-mutable-exports
let env: Env;

try {
  // eslint-disable-next-line node/no-process-env
  env = EnvSchema.parse(process.env);
} catch (e) {
  const error = e as z.ZodError;
  console.error("❌ Invalid environment variables:");
  console.error(error.flatten().fieldErrors);
  process.exit(1);
}

export { env };

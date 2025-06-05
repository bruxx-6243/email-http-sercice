import { HTTPException } from "@/lib/api/errors/http-exception";
import { zValidator as zv } from "@hono/zod-validator";
import type { ValidationTargets } from "hono";
import { ZodSchema } from "zod";

export const zValidator = <
  T extends ZodSchema,
  Target extends keyof ValidationTargets
>(
  target: Target,
  schema: T
) =>
  zv(target, schema, (result, c) => {
    if (!result.success) {
      throw new HTTPException(500, "Validation failed", {
        cause: result.error,
      });
    }
  });

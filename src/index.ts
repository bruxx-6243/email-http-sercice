import { env } from "@/env";
import { HTTPException } from "@/lib/api/errors/http-exception";
import routers from "@/lib/api/routers";
import { readFileContent } from "@/lib/utils";
import { serve, type HttpBindings } from "@hono/node-server";
import { Hono } from "hono";

type Bindings = HttpBindings;

const app = new Hono<{ Bindings: Bindings }>();

app.get("/", (c) => {
  try {
    const content = readFileContent("message.txt");
    return c.json(content);
  } catch (error) {
    return c.json(
      {
        success: false,
        message: "Failed to read the file",
        error: (error as Error).message,
      },
      500
    );
  }
});

routers.forEach((router) => {
  app.route(router.path, router.router);
});

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return c.json({ error: err.message, cause: err.cause });
  }
  console.error(
    "Error:",
    err instanceof Error ? err.message : JSON.stringify(err, null, 2)
  );
  return c.json({ error: "Internal Server Error" }, 500);
});

if (process.env.NODE_ENV !== "test") {
  serve(
    {
      fetch: app.fetch,
      port: env.PORT,
    },
    (info) => {
      console.log(`Server is running on http://localhost:${info.port}`);
    }
  );
}

export default app;

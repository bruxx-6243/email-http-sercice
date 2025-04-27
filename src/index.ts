import { renderName } from "@/lib/utils";
import { serve } from "@hono/node-server";
import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  const name = renderName("Fariol");

  return c.json(`Hello ${name} welcome to your first hono app`);
});

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);

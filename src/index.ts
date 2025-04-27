import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { readFileContent } from "./lib/utils";

const app = new Hono();

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

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);

import { renderName } from "./lib/utils.js";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
const app = new Hono().basePath("/api");
app.get("/", (c) => {
    const name = renderName("Fariol");
    return c.json({ name: name, message: "Hello Hono!", array: [1, 2, 3, 4, 5] });
});
serve({
    fetch: app.fetch,
    port: 3000,
}, (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
});

import { env } from "./env.js";
import { HTTPException } from "./lib/api/errors/http-exception.js";
import routers from "./lib/api/routers/index.js";
import { readFileContent } from "./lib/utils.js";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
const app = new Hono();
app.get("/", (c) => {
    try {
        const content = readFileContent("message.txt");
        return c.json(content);
    }
    catch (error) {
        return c.json({
            success: false,
            message: "Failed to read the file",
            error: error.message,
        }, 500);
    }
});
routers.forEach((router) => {
    app.route(router.path, router.router);
});
app.onError((err, c) => {
    if (err instanceof HTTPException) {
        return c.json({ error: err.message, cause: err.cause });
    }
    console.error("Error:", err instanceof Error ? err.message : JSON.stringify(err, null, 2));
    return c.json({ error: "Internal Server Error" }, 500);
});
serve({
    fetch: app.fetch,
    port: env.PORT,
}, (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
});

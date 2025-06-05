import { describe, expect, test } from "vitest";
import app from "../src/index";

describe("Ensure that the API works perfectly", () => {
  test("GET index", async () => {
    const res = await app.request("/", {
      method: "GET",
    });

    expect(res.status).toBe(200);

    const body = await res.json();

    expect(body).toHaveProperty("content");
    expect(body.content).toBeInstanceOf(Array);

    expect(body).toHaveProperty("lineCount");
    expect(body.lineCount).toBe(5);
    expect(body).toHaveProperty("timestamp");
    expect(typeof body.timestamp).toBe("string");
    expect(body.content.length).toBe(5);
  });
});

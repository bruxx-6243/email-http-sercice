import { describe, expect, test } from "vitest";
import { env } from "../src/env";
import app from "../src/index";

const TIMEOUT: number = 30000;

describe("Ensure that the API works perfectly", () => {
  test.todo(
    "can send an email if data are valid",
    async () => {
      const response = await app.request("/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          user: env.EMAIL_USER!,
          password: env.EMAIL_PASSWORD!,
        },
        body: JSON.stringify({
          to: "blondeau.nbif@gmail.com",
          subject: "Test Notification",
          template: "test",
        }),
      });

      expect(response.status).toBe(200);

      const body = await response.json();

      expect(body).toHaveProperty("messageId");
      expect(body.messageId).toBeTypeOf("string");
      expect(body.messageId).not.toBe("");
      expect(body).toHaveProperty("success");
      expect(body.success).toBe(true);
      expect(body).toHaveProperty("message");
      expect(body.message).toBe("Email sent successfully");
      expect(body).not.toHaveProperty("error");
    },
    TIMEOUT
  );

  test(
    "cannot send an email if body is invalid",
    async () => {
      const response = await app.request("/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          user: env.EMAIL_USER!,
          password: env.EMAIL_PASSWORD!,
        },
        body: JSON.stringify({
          to: "invalid email",
          subject: "This test will failed",
          template: "test",
        }),
      });

      const body = await response.json();
      expect(body).toHaveProperty("error");
    },
    TIMEOUT
  );

  test(
    "cannot send an email if headers are invalid",
    async () => {
      const response = await app.request("/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          user: "invalid",
          password: "invalid",
        },
        body: JSON.stringify({
          to: "fariol@akieni.tech",
          subject: "Test New Test",
          template: "test",
        }),
      });

      expect(response.status).toBe(500);
    },
    TIMEOUT
  );
});

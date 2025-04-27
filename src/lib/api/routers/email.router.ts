import { emailServices } from "@/lib/api/services/email.services";
import { EmailBodySchema, EmailHeaderSchema } from "@/types";
import { zValidator } from "@/types/validator-wrapper";
import { Hono } from "hono";

const emailRouter = new Hono().basePath("/email");

emailRouter.post("/", zValidator("json", EmailBodySchema), async (c) => {
  const headersReq = c.req.header();
  const body = c.req.valid("json");

  const headers = {
    user: headersReq["user"],
    password: headersReq["password"],
  };

  const validateHeaders = EmailHeaderSchema.safeParse(headers);

  if (!validateHeaders.success) {
    return c.json(
      {
        success: false,
        message: "Failed to validate headers the data",
        error: validateHeaders.error,
      },
      500
    );
  }

  const { user, password } = validateHeaders.data;

  const response = (await emailServices.nodemailer({
    headers: {
      user,
      password,
    },
    body,
  })) as { messageId: string };

  if (!response) {
    return c.json(
      {
        success: false,
        message: "Failed to send the email",
      },
      500
    );
  }

  return c.json(
    {
      success: true,
      message: "Email sent successfully",
      messageId: response.messageId,
    },
    200
  );
});

export { emailRouter };

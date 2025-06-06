import {
  emailServices,
  supportedProviders,
} from "@/lib/api/services/email.services";
import { createLog } from "@/lib/utils";
import { EmailBodySchema, EmailHeaderSchema } from "@/types";
import { zValidator } from "@/types/validator-wrapper";
import { Hono } from "hono";

const emailRouter = new Hono().basePath("/");

emailRouter.post("/", zValidator("json", EmailBodySchema), async (c) => {
  const headersReq = c.req.header();
  const body = c.req.valid("json");
  const provider = c.req.query("provider");

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

  if (!provider || !supportedProviders.includes(provider)) {
    return c.json(
      {
        success: false,
        message: "Provider not supported",
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
    provider,
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

  await createLog(
    JSON.stringify({
      receiver: body.to,
      subject: body.subject,
      messageId: response.messageId,
    })
  );

  return c.json(
    {
      success: true,
      messageId: response.messageId,
      message: "Email sent successfully",
    },
    200
  );
});

export { emailRouter };

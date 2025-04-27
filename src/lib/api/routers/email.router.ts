import { EmailBodySchema, EmailHeaderSchema } from "@/types";
import { zValidator } from "@/types/validator-wrapper";
import { Hono } from "hono";
import { emailServices } from "../services/email.services";

const emailRouter = new Hono().basePath("/email");

emailRouter.post("/", zValidator("json", EmailBodySchema), async (c) => {
  const headers = c.req.header();
  const body = c.req.valid("json");

  const data = {
    user: headers["user"],
    password: headers["password"],
  };

  const validateData = EmailHeaderSchema.safeParse(data);

  if (!validateData.success) {
    return c.json(
      {
        success: false,
        message: "Failed to validate headers the data",
        error: validateData.error,
      },
      500
    );
  }

  const { user, password } = validateData.data;

  const response = await emailServices.nodemailer({
    headers: {
      user,
      password,
    },
    body,
  });

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
    },
    200
  );
});

export { emailRouter };

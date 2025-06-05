import { env } from "@/env";
import type { Email } from "@/types";
import nodemailer from "nodemailer";

export const emailServices = {
  nodemailer: async ({ headers, body }: Email) => {
    const transporter = nodemailer.createTransport({
      port: env.EMAIL_PORT,
      secure: true,
      service: env.EMAIL_SERVICE,
      host: env.EMAIL_HOST,
      auth: {
        user: headers.user,
        pass: headers.password,
      },
    });

    return await transporter.sendMail({
      to: body.to,
      from: headers.user,
      html: body.template,
      subject: body.subject,
    });
  },
};

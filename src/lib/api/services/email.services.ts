import { env } from "@/env";
import type { Email } from "@/types";
import nodemailer from "nodemailer";

const emailProviders = {
  mailru: {
    host: env.MAILRU_HOST,
    port: env.MAILRU_PORT,
    service: env.MAILRU_SERVICE,
  },
  gmail: {
    host: env.GMAIL_HOST,
    port: env.GMAIL_PORT,
    service: env.GMAIL_SERVICE,
  },
};

export const emailServices = {
  nodemailer: async ({
    body,
    headers,
    provider,
  }: Email & { provider?: string }) => {
    const transporter = nodemailer.createTransport({
      secure: true,
      port: provider
        ? emailProviders[provider as keyof typeof emailProviders].port
        : env.GMAIL_PORT,
      host: provider
        ? emailProviders[provider as keyof typeof emailProviders].host
        : env.GMAIL_HOST,
      service: provider
        ? emailProviders[provider as keyof typeof emailProviders].service
        : env.GMAIL_SERVICE,
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

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
  yandex: {
    host: env.YANDEX_HOST,
    port: env.YANDEX_PORT,
    service: env.YANDEX_SERVICE,
  },
};

export const supportedProviders = Object.keys(emailProviders);

export const emailServices = {
  nodemailer: async ({
    body,
    headers,
    provider,
  }: Email & { provider?: string }) => {
    const transporter = nodemailer.createTransport({
      secure: true,
      port: emailProviders[provider as keyof typeof emailProviders].port,
      host: emailProviders[provider as keyof typeof emailProviders].host,
      service: emailProviders[provider as keyof typeof emailProviders].service,
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

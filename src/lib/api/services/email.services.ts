import type { Email } from "@/types";
import nodemailer from "nodemailer";

export const emailServices = {
  nodemailer: async ({ headers, body }: Email) => {
    const transporter = nodemailer.createTransport({
      port: 587,
      secure: false,
      service: "gmail",
      host: "smtp.gmail.com",
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

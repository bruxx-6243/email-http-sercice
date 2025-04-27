import type { Email } from "@/types";
import nodemailer from "nodemailer";

export const emailServices = {
  nodemailer: async ({ headers, body }: Email) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: headers.user,
        pass: headers.password,
      },
    });

    return await transporter.sendMail({
      to: body.to,
      from: headers.user,
      subject: body.subject,
      html: body.template,
    });
  },
};

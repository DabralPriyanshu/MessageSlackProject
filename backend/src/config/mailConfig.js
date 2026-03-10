import nodemailer from "nodemailer";
import ENV from "./serverConfig.js";
export const transport = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: ENV.MAIL_ID,
    pass: ENV.MAIL_PASSWORD,
  },
});


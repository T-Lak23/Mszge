import { resend, sender } from "../lib/resend.js";
import { createWelcomeEmailTemplate } from "./email.template.js";

export const sendWelcomeEmail = async (email, name, clientURL) => {
  const { data, error } = await resend.emails.send({
    from: `${sender.name} <${sender.email}>`,
    to: email,
    subject: "Welcome to Mszge",
    html: `${createWelcomeEmailTemplate(name, clientURL)}`,
  });
  if (error) {
    console.log(error);
    throw new Error("Failed to send email");
  }
  console.log("Email sent successful", data);
};

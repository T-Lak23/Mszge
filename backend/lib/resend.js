import { Resend } from "resend";
import { ENV } from "./env.js";

const { RESEND, NAME, EMAIL } = ENV;
export const resend = new Resend(RESEND);

export const sender = {
  name: NAME,
  email: EMAIL,
};

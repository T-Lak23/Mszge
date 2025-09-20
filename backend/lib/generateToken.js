import jwt from "jsonwebtoken";
import { ENV } from "./env.js";

export const generateToken = (userId, res) => {
  const { JWT, NODE_ENV } = ENV;
  const token = jwt.sign({ userId }, ENV.JWT, {
    expiresIn: "7d",
  });
  // console.log("RAW TOKEN:", token);

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "none",
    secure: NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000, //7 DAYS
  });

  return token;
};

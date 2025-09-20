import jwt from "jsonwebtoken";
import { ENV } from "../lib/env.js";
import { User } from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    // console.log("RAW TOKEN:", token);

    if (!token)
      return res.status(400).json({ messge: "Unauthorized, No Token Found" });
    const decoded = jwt.verify(token, ENV.JWT);
    if (!decoded)
      return res.status(400).json({ messge: "Unauthorized, Invalid Token" });
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    req.user = user;
    next();
  } catch (error) {
    // res.clearCookie("token");
    console.log(error);
    res.status(500).json({ messge: "Server error cannot authorized" });
  }
};

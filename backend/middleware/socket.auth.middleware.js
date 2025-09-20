import jwt from "jsonwebtoken";
import { ENV } from "../lib/env.js";
import { User } from "../models/user.model.js";

// export const socketAuthMiddleware = async (socket, next) => {
//   try {
//     socket.handshake.headers?.cookie
//       ?.split("; ")
//       .find((row) => row.startsWith("jwt="))
//       ?.split("=")[1];
//     if (!token) return next(new Error("Unauthorized, No Token Found"));
//     const decoded = jwt.verify(token, ENV.JWT);
//     if (!decoded) return next(new Error("Unauthorized, Invalid Token"));
//     const user = await User.findById(decoded.userId).select("-password");
//     if (!user) return next(new Error("User not found"));

//     socket.user = user;
//     socket.userId = user._id;
//     next();
//   } catch (error) {
//     console.log(error);
//     next(new Error("Unauthorized, No Token Found"));
//   }
// };

// export const socketAuthMiddleware = async (socket, next) => {
//   try {
//     const cookieHeader = socket.handshake.headers?.cookie;
//     if (!cookieHeader) return next(new Error("Unauthorized, No Cookie Found"));

//     const token = cookieHeader
//       .split("; ")
//       .find((row) => row.startsWith("jwt="))
//       ?.split("=")[1];

//     if (!token) return next(new Error("Unauthorized, No Token Found"));

//     const decoded = jwt.verify(token, ENV.JWT);
//     if (!decoded) return next(new Error("Unauthorized, Invalid Token"));

//     const user = await User.findById(decoded.userId).select("-password");
//     if (!user) return next(new Error("User not found"));

//     socket.user = user;
//     socket.userId = user._id;
//     next();
//   } catch (error) {
//     console.log("Socket auth error:", error);
//     next(new Error("Unauthorized"));
//   }
// };
export const socketAuthMiddleware = async (socket, next) => {
  try {
    // console.log("Socket handshake headers:", socket.handshake.headers);
    // extract token from http-only cookies
    const token = socket.handshake.headers.cookie
      ?.split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      console.log("Socket connection rejected: No token provided");
      return next(new Error("Unauthorized - No Token Provided"));
    }

    // verify the token
    const decoded = jwt.verify(token, ENV.JWT);
    if (!decoded) {
      console.log("Socket connection rejected: Invalid token");
      return next(new Error("Unauthorized - Invalid Token"));
    }

    // find the user fromdb
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      console.log("Socket connection rejected: User not found");
      return next(new Error("User not found"));
    }

    // attach user info to socket
    socket.user = user;
    socket.userId = user._id.toString();

    console.log(
      `Socket authenticated for user: ${user.fullName} (${user._id})`
    );

    next();
  } catch (error) {
    console.log("Error in socket authentication:", error.message);
    next(new Error("Unauthorized - Authentication failed"));
  }
};

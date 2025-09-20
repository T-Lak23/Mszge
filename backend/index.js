import express from "express";
import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
// const app = express();
import authRoute from "./routes/auth.routes.js";
import messageRoute from "./routes/message.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./lib/socket.js";

app.use(
  cors({
    origin: ENV.URL,
    credentials: true,
  })
);
app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());
app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute);

const PORT = ENV.PORT;

connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log("Listening to Port, ", PORT);
      console.log(ENV.URL);
      // console.log(ENV.JWT);
    });
  })
  .catch((error) => console.log("Connection failed", error));

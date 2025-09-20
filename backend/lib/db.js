import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
  try {
    const MONGOURI = ENV.MONGO;
    if (!MONGOURI) throw new Error("MONGO_URI missing!");
    const db = await mongoose.connect(MONGOURI);
    if (db) console.log("DB connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

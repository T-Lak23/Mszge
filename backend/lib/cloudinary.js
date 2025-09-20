import { v2 as cloudinary } from "cloudinary";
import { ENV } from "./env.js";
const { CLOUDINARY_KEY, CLOUDINARY_SECRET, CLOUDINARY_NAME } = ENV;
cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRET,
});
export default cloudinary;

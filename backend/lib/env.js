import "dotenv/config";

export const ENV = {
  PORT: process.env.PORT,
  MONGO: process.env.MONGO_URI,
  JWT: process.env.JWT_SECRET,
  NODE_ENV: process.env.NODE_ENV,
  RESEND: process.env.RESEND_API,
  NAME: process.env.RESEND_FROM_NAME,
  EMAIL: process.env.RESEND_FROM_EMAIL,
  URL: process.env.CLIENT_URL,
  CLOUDINARY_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_SECRET: process.env.CLOUDINARY_API_SECRET,
  CLOUDINARY_NAME: process.env.CLOUDINARY_KEY_NAME,
  ARCJET_KEY: process.env.ARCJET_KEY,
  ARCJET_ENV: process.env.ARCJET_ENV,
};

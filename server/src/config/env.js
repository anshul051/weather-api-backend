import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: process.env.PORT,
  OPENWEATHER_API_KEY: process.env.OPENWEATHER_API_KEY,
  REDIS_URL: process.env.REDIS_URL,
};
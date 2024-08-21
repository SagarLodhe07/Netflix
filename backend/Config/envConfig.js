import dotenv from "dotenv";
dotenv.config();

export const Config = {
  DB_URL: process.env.DB_URL,
  PORT: process.env.PORT,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  NODE_ENV: process.env.NODE_ENV,
  TMDB_API_KEY:process.env.TMDB
};

import jwt from "jsonwebtoken";
import { Config } from "../Config/envConfig.js";

export async function generateTokenAndCookie(userId, res) {
  const token =  jwt.sign({ userId }, Config.JWT_SECRET_KEY, {
    expiresIn: "15d",
  });
  res.cookie("jwt_token", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: Config.NODE_ENV !== "development",
  });
  return token
}

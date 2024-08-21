import jwt from "jsonwebtoken";
import { Config } from "../Config/envConfig.js";
import { User } from "../Models/usermodel.js";

export async function protectRoute(req, res, next) {
  try {
    const token = req.cookies["jwt_token"];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - Not Token Provided ",
      });
    }
    const decode = jwt.verify(token, Config.JWT_SECRET_KEY);
    if (!decode) {
      return res.status(404).json({
        success: false,
        message: "Unauthorized - Invalid Token",
      });
    }

    const user = await User.findById(decode.userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

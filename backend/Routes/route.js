import express from "express";
import { authCheck, login, logout, signup } from "../Controller/controller.js";
import { protectRoute } from "../middelware/authvalidate.js";
const authRouter = express.Router();

authRouter.post("/sign", signup);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.get("/authcheck", protectRoute, authCheck);
export default authRouter;

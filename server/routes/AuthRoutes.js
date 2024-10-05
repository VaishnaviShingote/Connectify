import { Router } from "express";
import { signup,login,getUserInfo } from "../controller/authController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const authRoutes = Router();

authRoutes.post("/signup", signup);
authRoutes.post("/login", login);
authRoutes.get("/user-info",verifyToken,getUserInfo); //multiple middleware
export default authRoutes;
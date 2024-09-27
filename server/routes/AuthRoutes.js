import { Router } from "express";
import { signup } from "../controller/authController.js";

const authRoutes = Router();

authRoutes.post("/signup", signup);

export default authRoutes;
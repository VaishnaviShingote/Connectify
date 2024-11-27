import { Router } from "express";
import { signup,login,getUserInfo,updateProfile,addProfileImage,removeProfileImage} from "../controller/authController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import multer from "multer";

const authRoutes = Router();

const upload=multer({dest:"uploads/profiles/"});

authRoutes.post("/signup", signup);
authRoutes.post("/login", login);
authRoutes.get("/user-info",verifyToken,getUserInfo); //multiple middleware
authRoutes.post('/update-profile',verifyToken,updateProfile);
authRoutes.post(
    "/add-profile-image",
    verifyToken,
    upload.single("profile-image"),
    addProfileImage);
authRoutes.delete("/remove-profile-image",verifyToken,removeProfileImage);
export default authRoutes;
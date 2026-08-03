import express from "express";
import { register , Login ,logout,updateProfile,updateRecruiterProfile , forgotPassword,verifyOTP,resetPassword} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthentication.js";
import { singleUpload } from "../middlewares/multer.js";

const router =express.Router();


router.post("/register",singleUpload, register);
router.post("/login", Login);
router.post("/logout", logout);
router.post("/profile/update",  isAuthenticated,singleUpload, updateProfile);
router.post("/profile/recruiter/update",  isAuthenticated,singleUpload,updateRecruiterProfile);
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOTP);
router.post("/reset-password", resetPassword);
export default router; 



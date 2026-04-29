import express from "express";
import { register , Login ,logout,updateProfile } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthentication.js";
import { singleUpload } from "../middlewares/multer.js";

const router =express.Router();


router.post("/register",singleUpload, register);
router.post("/login", Login);
router.post("/logout", logout);
router.post("/profile/update", isAuthenticated, updateProfile);

export default router; 



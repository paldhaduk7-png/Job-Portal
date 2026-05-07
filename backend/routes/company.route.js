import express from "express";
import {registerCompany, getCompany, getComapnyById, updateCompany } from "../controllers/company.controoller.js";
import isAuthenticated from "../middlewares/isAuthentication.js";
import { singleUpload } from "../middlewares/multer.js";

const router =express.Router();


router.post("/register",isAuthenticated, registerCompany);
router.get("/get",isAuthenticated, getCompany);
router.get("/get/:id", isAuthenticated,getComapnyById);
router.put("/update/:id", isAuthenticated,singleUpload ,updateCompany);

export default router; 




import express from "express";
import {registerCompany, getCompany, getComapnyById, updateCompany, DeletCompny } from "../controllers/company.controoller.js";
import isAuthenticated from "../middlewares/isAuthentication.js";
import { singleUpload } from "../middlewares/multer.js";

const router =express.Router();


router.post("/register",isAuthenticated, registerCompany);
router.get("/get",isAuthenticated, getCompany);
router.get("/get/:id", isAuthenticated,getComapnyById);
router.put("/update/:id", isAuthenticated,singleUpload ,updateCompany);
router.delete("/delete/:id", isAuthenticated,DeletCompny);

export default router; 




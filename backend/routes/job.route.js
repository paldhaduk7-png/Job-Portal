import express from "express";
import {  postJob , getAllJobs ,findJobId,getAdminJob } from "../controllers/job.controller.js";
import isAuthenticated from "../middlewares/isAuthentication.js";

const router =express.Router();


router.post("/post", isAuthenticated,postJob);
router.get("/get",isAuthenticated, getAllJobs);
router.get("/get/:id", isAuthenticated, findJobId);
router.get("/getadminjobs", isAuthenticated, getAdminJob);

export default router; 



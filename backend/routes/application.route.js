import express from "express";
import { applyJob, getAppliedJobs,getApplicent,updateStatus } from "../controllers/application.controllers.js";
import isAuthenticated from "../middlewares/isAuthentication.js";
import { singleUpload } from "../middlewares/multer.js";

const router =express.Router();


router.post("/apply/:id", isAuthenticated, singleUpload, applyJob);
router.get("/get",isAuthenticated, getAppliedJobs);
router.get("/:id/applicants", isAuthenticated,getApplicent);
router.post("/status/:id/update", isAuthenticated,updateStatus);

export default router;

import express from "express";
import { saveJob,getSavedJobs,removeSavedJob } from "../controllers/savedJob.controller.js"; 
import isAuthenticated from "../middlewares/isAuthentication.js";

const router =express.Router();

router.post("/post/:id",isAuthenticated,saveJob);
router.get("/get",isAuthenticated,getSavedJobs);
router.delete("/delete/:id",isAuthenticated,removeSavedJob);

export default router;
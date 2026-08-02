import express from "express";
import {  postJob , getAllJobs ,findJobId,getAdminJob ,updateJob,deletJob} from "../controllers/job.controller.js";
import isAuthenticated from "../middlewares/isAuthentication.js";

const router =express.Router();


router.post("/post", isAuthenticated,postJob);
router.get("/get", getAllJobs);
router.get("/get/:id", isAuthenticated, findJobId);
router.get("/getadminjobs", isAuthenticated, getAdminJob);
router.put("/update/:id", isAuthenticated, updateJob);
router.delete("/delete/:id", isAuthenticated, deletJob);

export default router; 



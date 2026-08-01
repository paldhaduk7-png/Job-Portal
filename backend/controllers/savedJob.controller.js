import { Save } from "../models/savedJob.model.js";
import { Job } from "../models/job.model.js";

export const saveJob= async(req,res)=>{

    try {
         //from midellwae userid
        const userId=req.id;
        const jobId=req.params.id;
    const job= await Job.findById(jobId);
     if(!job){
         return res.status(404).json({
        Message: "Job not found",
        success: false
    });
     }
const exist = await Save.findOne({
    user: userId,
    job: jobId
});

   if(exist){
    return res.status(200).json({
        message:"Job already saved.",
        success:false
    })
   }

    const savedjob= await  Save.create({
      user:userId,
      job:jobId
    })

     return res.status(200).json({
    message: "Job saved successfully.",
    success: true
});
    
    } catch (error) {
             console.log(error);
        return res.status(500).json({
    message: "Internal server error",
    success: false
});
    }
}

export const getSavedJobs = async (req, res) => {
  try {
    const userId = req.id;

    const savedJobs = await Save.find({ user: userId }).populate("job");

    if (savedJobs.length === 0) {
      return res.status(404).json({
        message: "No saved jobs found.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Saved jobs fetched successfully.",
      success: true,
      savedJobs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
}

export const removeSavedJob= async(req,res)=>{
try{
     const userId = req.id;
     const jobId=req.params.id;

     const savedjob = await Save.findOne({
  user: userId,
  job: jobId,
});

     if(!savedjob){
        return res.status(404).json({
            message:"Saved job not found.",
            success:false
        })
     }

     await Save.findByIdAndDelete(savedjob._id);

      return res.status(200).json({
        message:"Saved job removed successfully.",
        success:true
      })
}catch(error){
          console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
      }

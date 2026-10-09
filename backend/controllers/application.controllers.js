import { Application } from "../models/application.model.js";
import {Job} from "../models/job.model.js";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/clodinary.js";
import { User } from "../models/user.model.js";


export const applyJob= async (req,res) =>{
    try {
        const userId=req.id;
const jobId=req.params.id;
   if(!jobId){
    return res.status(400).json({
        message: "job id is reqired",
        success: false
    });
   };

   //check if the user alerdy applyed this job
   //but in create logivc like one time user can applye then dutton is disable 
   //given logic is just for inforamtion
 const existingApplication = await Application.findOne({job: jobId, applicant: userId});
       if(existingApplication){
        return res.status(400).json({
            message: "You have alerdy apply for this job",
            success:false
        });
       };

       //check if the jobs exist
       const job= await Job.findById(jobId);
       if(!job){
return res.status(404).json({
    message: "Job not found",
    success: false
});
       };



// Handle resume upload
let resumeUrl = "";
let resumeName = "";
const resumeFile = req.files?.resume?.[0];

if (resumeFile) {
    const fileUri = getDataUri(resumeFile);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
        resource_type: "image",
        format: "pdf",
        use_filename: true,
        unique_filename: true
    });
    resumeUrl = cloudResponse.secure_url;
    resumeName = resumeFile.originalname;
} else {
    // Check if user has resume in profile
    const user = await User.findById(userId);
    if (user && user.profile && user.profile.resume) {
        resumeUrl = user.profile.resume;
        resumeName = user.profile.resumeOriginalName;
    } else {
        return res.status(400).json({
            message: "Please upload a resume to apply, or add one to your profile first.",
            success: false
        });
    }
}

//create new application
const newApplication = await Application.create({
      job: jobId,
      applicant:userId,
      resume: resumeUrl,
      resumeOriginalName: resumeName
});


job.applications.push(newApplication._id);
await job.save();

// Populate applications with applicant details
const updatedJob = await Job.findById(jobId).populate({
    path: 'applications',
    populate: {
        path: 'applicant'
    }
}).populate('company');

return res.status(200).json({
    message: "Job applyed successfully",
    success: true,
    job: updatedJob
});

    } catch (error) {
        console.log(error);
    }
};


//how many job user can applied
export const getAppliedJobs= async(req,res)=>{
    try {
        const userId=req.id;
     
        const application =await Application.find({applicant: userId}).sort({createdAt:-1}).populate({
            path: 'job',
            options:{sort:{createdAt:-1}},
            populate:{
                path: 'company',
              options:{sort:{createdAt:-1}},
            }
        });


       
//  .find() returns:[] (empty array) if no data
if (application.length === 0){
    return res.status(404).json({
        message: "No Application",
    success: false
    });
};

return res.status(200).json({
 application,
 success:true
});

    } catch (error) {
        console.log(error);
    }
}

//admin check how many user can apply my job
export const getApplicent=async (req,res)=>{
    try {
        const jobId=req.params.id;

        const job=await Job.findById(jobId).populate({
            path: 'applications',
             options:{sort:{createdAt:-1}},
             populate:{
                path:'applicant',
              options:{sort:{createdAt:-1}},
             }
        });

        if(!job){
            return res.status(404).json({
                message:"Job not found",
                success:false
            });
        };


        return res.status(200).json({
            job,
            success:true
        })

    } catch (error) {
        console.log(error);
    }
}


//for selection->reject,accept,pending
export const updateStatus= async(req,res)=>{
    try {
        const status =req.body.status;
        const applicationId=req.params.id;

        if(!status){
            return res.status(400).json({
                message:"status is required",
                success: false
            })
        };

        //find application by application id
 const application=await Application.findOne({_id:applicationId});
          if(!application){
              return res.status(404).json({
                message:"application not found",
                success: false
            });
          };


          //update status
          application.status=status.toLowerCase();
          await application.save();

//if sattus is invalid
          const allowed = ["accepted", "rejected", "pending"];
if (!allowed.includes(status.toLowerCase())) {
  return res.status(400).json({
    message: "Invalid status",
    success: false
  });
}

          return res.status(200).json({
            message: "status updated successfully",
            success: true
          })
    } catch (error) {
        console.log(error);
    }
}
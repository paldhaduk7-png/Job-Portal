import {Job} from "../models/job.model.js";



//creating job(by admin)
export const postJob= async (req ,res)=>{
    try {
    
        const {title,description, requirements, salary,location, jobType,experinence, position, companyId}=req.body;

        //from midellwae userid
        const userId=req.id;

        if(!title || !description || !requirements || !salary || !location || !jobType || !experinence || !position || !companyId ){
            return res.status(400).json({
                Message: "Some thing is missing",
                success: false
            });
        }

        const job=await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary,
            location,
            jobType,
            experienceLevel: experinence,
            position,
            company: companyId,
            created_by: userId
        });


        return res.status(200).json({
            message: "New Job created Successfully",
            job,
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


//find  jobs(it is for user)
export const getAllJobs= async(req,res)=>{
    try {
    const keyword=req.query.keyword || "";

    const query = keyword
    ? {
        $or:[
        {title : {$regex:keyword , $options:"i"}},
        {description : {$regex:keyword , $options:"i"}},
         { location: { $regex: keyword, $options: "i" } },
        ]
    }
    : {};

    const jobs =await Job.find(query).populate({
        path:"company"
    }).sort({createdAt :-1 });

if(!jobs){
    return res.status(404).json({
        Message: "Job not found",
        success: false
    });
}
 
return res.status(200).json({
      job: jobs,
    success: true,
})
    } catch (error) {
        console.log(error);
    }
}


//find job by id(it is for user)
export const findJobId= async (req,res)=>{
    try {
        const jobId=req.params.id;

        const job=await Job.findById(jobId).populate({
            path:"applications",
        });

        if(!job){
         return res.status(404).json({
        Message: "Job not found",
        success: false
    });
        }
        return res.status(200).json({
       job ,
       success: true,
})

    } catch (error) {
        console.log(error);
    }
} 


//admin  ketali job create kari che  tena mate
//here admin is also say user
export const getAdminJob=async (req,res)=>{
    try {
        const adminId=req.id;

        const jobs= await Job.find({created_by : adminId}).populate({
            path:"company"
        });

        if(!jobs){
          return res.status(404).json({
        Message: "Job not found",
        success: false
           }) ;
        }

return res.status(200).json({
      job: jobs,
    success: true,
})
    
    } catch (error) {
        console.log(error);
    }
}


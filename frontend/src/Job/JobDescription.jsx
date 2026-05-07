import React, { useEffect, useState } from 'react'
import { Badge } from "@/components/ui/badge"
import { Button } from '@/components/ui/button'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant'
import { setSingleJob } from '@/redux/jobSlice'
import { toast } from 'sonner'

const JobDescription = () => {

 
   const params = useParams();
const jobId = params.id;
 const{singleJob}=useSelector(store=>store.job);
 const{user}=useSelector(store=>store.auth);
    const dispatch=useDispatch();  

    
    const isIntiallyApplyed = singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;
    const [isApplied ,setIsApplied]=useState(isIntiallyApplyed);
    

 const  applyjobHandeler= async()=>{
try {
  const res= await axios.post(`${APPLICATION_API_END_POINT}/apply/${jobId}`,{}, {withCredentials:true});
  if(res.data.success){
   setIsApplied(true); //update the local state
   const updateSingleJob={...singleJob ,applications:[...singleJob.applications , {applicant : user?._id}] }
   dispatch(setSingleJob(updateSingleJob));// helps us to real time UI updated
    toast.success(res.data.message);
  }
} catch (error) {
  console.log(error);
  toast.error(error.response?.data?.message);
}
 } 



      

useEffect(() => {
  const fetchSingleJobs= async () => {
    try {
        const res=await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {withCredentials:true});
      console.log(res.data.job);
        if(res.data.success){
            dispatch(setSingleJob(res.data.job));
            setIsApplied(res?.data?.job?.applications.some(application => application.applicant ===user?._id)) //ensure the satae is sync with fetched data
        }

    } catch (error) {
        console.log(error)
    }
  }
 fetchSingleJobs();
}, [jobId ,dispatch, user?._id]);




  return (
    <div className=' max-w-7xl mx-auto my-10'>

      <h1 className='font-bold text-xl my-1'>
  Company:
  <span className='pl-4 font-normal text-gray-800'>
    {singleJob?.company?.name}
  </span>
</h1>

    <h1 className='font-bol text-0.5xl '>{singleJob?.title}</h1>
   
   <div className='flex items-center justify-between'>

<div className='flex items-center gap-2 mt-4'> 
  <Badge className='text-blue-700 font-bold' variant="ghost">
      {singleJob?.position} &nbsp;Positions
    </Badge>
    <Badge className='text-[#F83002] font-bold' variant="ghost">
      {singleJob?.jobType}
    </Badge>
    <Badge className='text-[#7209b7] font-bold' variant="ghost">
      {singleJob?.salary}LPA
    </Badge>
</div>

{
  isApplied? (
    <Button  className=" rounded-lg w-24 h-10  px-3 py-1 rounded-md bg-green-500 text-white text-sm cursor-not-allowed"
      disabled>
      Applied
    </Button>
  ) : (
    <Button onClick={applyjobHandeler} className=" rounded-lg px-3 py-1 w-24 h-10 rounded-md bg-purple-600 text-white text-sm hover:bg-purple-700"   >
      Apply Now
    </Button>
  )
}

   </div>

<h1 className='border-b-2 border-b-gray-300 font-medium py-2'>Job Description</h1>

<h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
<h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
<h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'> {singleJob?.description}</span></h1>
<h1 className='font-bold my-1'>Experirnce: <span className='pl-4 font-normal text-gray-800'>{singleJob?.experienceLevel}</span></h1>
<h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary}LPA</span></h1>
<h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>{singleJob?.applications?.length}</span></h1>
<h1 className='font-bold my-1'>Post Date: <span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt?.split("T")[0]}</span></h1>

</div>
  )
}

export default JobDescription

import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllAdminJobs } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constant";

const JobDelete = ({jobId}) => {

  const dispatch = useDispatch();
  const navigate=useNavigate();
  const {  allAdminJobs } = useSelector(store => store.job);

  const handleDelete = async (id) => {

    try {
        const res= await axios.delete(`${JOB_API_END_POINT}/delete/${id}`,{ withCredentials: true});

    if(res.data.success){

      const updatedjobs=allAdminJobs.filter(
        (job)=> job._id !== id
      )
      // console.log(allAdminJobs);
      dispatch(setAllAdminJobs(updatedjobs));
      navigate("/admin/jobs");
     toast.success(res?.data?.message);
        }
    } catch(error){
       toast.error(error?.response?.data?.message);
            console.log(error);
    }
  
  };

  return (
    <div>
   <AlertDialog>
   
         <AlertDialogTrigger asChild>
           <div className="flex items-center gap-2 w-fit cursor-pointer">
             <Trash2 />
             <span>Delete</span>
           </div>
         </AlertDialogTrigger>
   
         <AlertDialogContent>
   
           <AlertDialogHeader>
             <AlertDialogTitle>
               Are you sure?
             </AlertDialogTitle>
   
             <AlertDialogDescription>
               This action cannot be undone. This will permanently delete
               the job.
             </AlertDialogDescription>
           </AlertDialogHeader>
   
           <AlertDialogFooter>
   
             <AlertDialogCancel>
               Cancel
             </AlertDialogCancel>
   
             <AlertDialogAction className='cursor-pointer' onClick={() => handleDelete(jobId)}>
               Delete
             </AlertDialogAction>
   
           </AlertDialogFooter>
   
         </AlertDialogContent>
   
       </AlertDialog>
       </div>
  )
}


export default JobDelete

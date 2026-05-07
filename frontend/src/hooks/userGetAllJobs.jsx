import React,{useEffect} from 'react';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';
import { useDispatch } from 'react-redux';
import { setAllJobs } from '@/redux/jobSlice';


const userGetAllJobs = () => {
const dispatch=useDispatch();  
      
useEffect(() => {
  const fetchAllJobs= async () => {
    try {
       
        const res=await axios.get(`${JOB_API_END_POINT}/get`, {withCredentials:true});
        
        console.log("Response:", res.data);
        console.log("Success:", res.data.success);
        console.log("Jobs:", res.data.job);
     
        if(res.data.success){
            dispatch(setAllJobs(res.data.job));
            console.log("Jobs dispatched to Redux");
        }

    } catch (error) {
        console.error("Error fetching jobs:", error.response?.data || error.message);
    }
  }
 fetchAllJobs();
}, [])


   
}

export default userGetAllJobs

import React,{useEffect} from 'react';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setAllJobs } from '@/redux/jobSlice';


const useGetAllJobs = () => {
const dispatch=useDispatch();  
const {searchQuery}= useSelector(store=>store.job);

useEffect(() => {
  const fetchAllJobs= async () => {
    try {
       
        const isSalary = ["0-5LPA", "5-10LPA", "10-20LPA"].includes(searchQuery);
        
        const res=await axios.get(`${JOB_API_END_POINT}/get?keyword=${isSalary ? "" : searchQuery || ""}`, {withCredentials:true});
        
        console.log("Response:", res.data);
        console.log("Success:", res.data.success);
        console.log("Jobs:", res.data.job);
     
        if(res.data.success){
          dispatch(setAllJobs(res.data.job));
            // console.log("Jobs dispatched to Redux");
        }

    } catch (error) {
        console.error("Error fetching jobs:", error.response?.data || error.message);
    }
  }
 fetchAllJobs();
}, [searchQuery , dispatch])


   
}

export default useGetAllJobs

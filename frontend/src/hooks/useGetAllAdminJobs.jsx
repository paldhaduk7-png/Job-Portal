import { useEffect } from 'react';
import { JOB_API_END_POINT } from '@/utils/constant';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setAllAdminJobs } from '@/redux/jobSlice';


const useGetAllAdminJobs = () => {
  const dispatch=useDispatch();  
      
useEffect(() => {
  const fetchAllAdminJobs= async () => {
    try {
       
        const res=await axios.get(`${JOB_API_END_POINT}/getadminjobs`, {withCredentials:true});
     
        if(res.data.success){
            dispatch(setAllAdminJobs(res.data.job));
        }

    } catch (error) {
        console.error("Error fetching jobs:", error.response?.data || error.message);
    }
  }
 fetchAllAdminJobs();
}, [])
}

export default useGetAllAdminJobs

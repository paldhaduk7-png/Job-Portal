import { useEffect } from 'react';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { useDispatch } from 'react-redux'; 
import axios from 'axios';
import { setAllAppliedJob } from '@/redux/jobSlice';


const useGetAppliedJob = () => {
  const dispatch=useDispatch();

    useEffect(()=>{
        const fetchApplicationJobs= async ()=>{
try {
    const res=await  axios.get(`${APPLICATION_API_END_POINT}/get`, {withCredentials:true}); 

    if(res.data.success){
        dispatch(setAllAppliedJob(res.data.application));
    }
} catch (error) {
    console.log(error);
}
        }
        fetchApplicationJobs();
    } , [])
}

export default useGetAppliedJob

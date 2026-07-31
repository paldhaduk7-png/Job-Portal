import React,{useEffect} from 'react';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setAllJobs } from '@/redux/jobSlice';



const useGetAllHomeJobs = () => {
  const dispatch = useDispatch();
  console.log("HOOK CALLED");
  useEffect(() => {
    console.log("USE EFFECT RUNNING");

    const fetchAllJobs = async () => {
      try {
        console.log("REQUEST URL:", `${JOB_API_END_POINT}/get?keyword=""`);
        const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=`,{ withCredentials: true });

        if (res.data.success) {
          dispatch(setAllJobs(res.data.job));
        }

      } catch (error) {
        console.error(error);
      }
    };

    fetchAllJobs();
  }, [dispatch]);
};

export default useGetAllHomeJobs

import { useEffect } from 'react';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '@/redux/companySlice';
import axios from 'axios';


const useGetComapnyById = (comapnyId) => {
  const dispatch=useDispatch();  
      
useEffect(() => {
  const fetchSingleCompany= async () => {
    try {
       
        const res=await axios.get(`${COMPANY_API_END_POINT}/get/${comapnyId}`, {withCredentials:true});
          console.log(res.data)
        if(res.data.success){
            dispatch(setSingleCompany(res.data.company));
            console.log("Jobs dispatched to Redux");
        }

    } catch (error) {
        console.error("Error fetching jobs:", error.response?.data || error.message);
    }
  }
 fetchSingleCompany();
}, [comapnyId , dispatch]);

}

export default useGetComapnyById

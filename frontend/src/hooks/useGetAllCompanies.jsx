import { useEffect } from 'react';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { useDispatch } from 'react-redux';
import { setAllCompany } from '@/redux/companySlice';
import axios from 'axios';


const useGetAllCompanies = () => {
  const dispatch=useDispatch();  
      
useEffect(() => {
  const fetchAllCompany= async () => {
    try {
       
        const res=await axios.get(`${COMPANY_API_END_POINT}/get`, {withCredentials:true});
     
        if(res.data.success){
            dispatch(setAllCompany(res.data.company));
        }

    } catch (error) {
        console.error("Error fetching jobs:", error.response?.data || error.message);
    }
  }
 fetchAllCompany();
}, [])

}

export default useGetAllCompanies

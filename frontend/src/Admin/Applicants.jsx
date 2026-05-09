import React, {useEffect} from 'react'
import ApplicantsTabel from './ApplicantsTabel'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAllApplicants } from '@/redux/application'

const Applicants = () => {


  const parmas=useParams();
  const dispatch=useDispatch();
const {allApplicants} =useSelector(store=>store.application);


  useEffect(() => {
 
    const fetchAllAplicants= async ()=>{
      try {
        const res= await axios.get(`${APPLICATION_API_END_POINT}/${parmas.id}/applicants`, {withCredentials:true});
if(res.data.success){
dispatch(setAllApplicants(res.data.job));
}

      } catch (error) {
        console.log(error);
      }
    }
       fetchAllAplicants();
  }, [])
  

  return (
    <div className='max-w-7xl mx-auto '>
      <h1 className='text-xl font-bold my-3'>Applicants ({allApplicants?.applications?.length})</h1>
      <hr /> 
       <ApplicantsTabel  />
    </div>
  )
}

export default Applicants

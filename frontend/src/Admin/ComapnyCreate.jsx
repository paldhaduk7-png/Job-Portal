import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { setAllCompany, setSingleCompany } from '@/redux/companySlice'

import { COMPANY_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const ComapnyCreate = () => {

  const dispatch=useDispatch();
const navigate=useNavigate();


const [companyName , setComapnyName]=useState("");

const registerComapny =async ()=>{
  try {
    const res= await axios.post(`${COMPANY_API_END_POINT}/register`, {companyName}, {
      headers:{
        'Content-Type': "application/json"
      },
      withCredentials:true
    });

    if(res?.data?.success){
     dispatch(setSingleCompany(res.data.company));
     dispatch(setAllCompany(res.data.company))
const companyId = res?.data?.company?._id;
navigate(`/admin/companies/${companyId}`);
      toast.success(res.data.message);
    }

  } catch (error) {
        toast.error(error?.response?.data?.message  || "Something went wrong");
    console.log(error);
  }
}


  return (
    <div className='  max-w-4xl mx-auto'>

      <div className='my-10'>
      <h1 className='font-bold text-2xl'>Your Comapny Name</h1>
      <p className='text-gray-500'>What you like to Give Comapny name? you can change this later</p>
      </div>


      <Label> Comapny Name </Label>
      <Input 
      type='text'
      placeholder='JobHunt '
      onChange= {(e)=> setComapnyName(e.target.value)}
      className='my-2'
      />


      <div className='flex items-center gap-2 my-10'>
        <Button onClick={ ()=> navigate("/admin/companies")} className='cursor-pointer' variant='outline'>Cancle</Button>
        <Button onClick={registerComapny}  className='cursor-pointer'>Continue</Button>
        </div>
    </div>
  )
}

export default ComapnyCreate

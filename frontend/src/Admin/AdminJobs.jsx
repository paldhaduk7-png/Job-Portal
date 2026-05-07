import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSearchJobsByText } from '@/redux/jobSlice'
import AdminJobsTabel from './AdminJobsTabel'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'

const AdminJobs = () => {
  useGetAllAdminJobs();
  const navigate=useNavigate();
  const dispatch=useDispatch();
  //for filter job
  const [serach, setSearch]=useState("");

  //input jyare change thay tyre useefeect call thay
  useEffect(()=>{
      dispatch(setSearchJobsByText(serach));
  }, [serach])

  return (
    <div className=' max-w-6xl mx-auto my-10'>
      <div className='flex items-center justify-between my-5'>
         <Input 
className='w-fit'
onChange={(e)=> setSearch(e.target.value)}
placeholder="Filter by name,role"
      />

      <Button onClick={()=>navigate("/admin/jobs/create")} className='cursor-pointer'>New Jobs</Button>
      

      </div>

      <AdminJobsTabel />
 
    </div>
  )
}

export default AdminJobs

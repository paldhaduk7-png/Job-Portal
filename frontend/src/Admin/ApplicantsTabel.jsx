import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Table, TableCaption,TableBody, TableCell, TableHead, TableRow, TableHeader } from '@/components/ui/table'
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { MoreHorizontal } from 'lucide-react';
import React from 'react'
import { toast } from 'sonner';
import {  useSelector } from 'react-redux'
const sortListing= ["Accepted", "Rejected"];

const ApplicantsTabel = () => {

const {allApplicants} =useSelector(store=>store.application);

const statusHandler = async (status , id) => {
  //  console.log(status);
  try {
     const res= await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, {status}, {withCredentials: true});

   if(res.data.success){
    toast.success(res?.data?.message)
   }
  } catch (error) {
    console.log(error);

     toast.error(
          error.response?.data?.message || "Something went wrong"
        );
  }
  
}

  return (
    <div>
      <Table>
        <TableCaption>A list of recent applied user</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead>FullName</TableHead>
                <TableHead >Email</TableHead>
                <TableHead >Contect</TableHead>
                <TableHead >Resume</TableHead>
                <TableHead >Date</TableHead>
                <TableHead className='text-right'>Action</TableHead>
            </TableRow>
            </TableHeader>

<TableBody>
{
  allApplicants && allApplicants.applications?.map((item)=>(
        <TableRow key={item._id}>
    <TableCell>{item?.applicant?.fullname}</TableCell>
    <TableCell>{item?.applicant?.email}</TableCell>
    <TableCell>{item?.applicant?.phoneNumber}</TableCell>
    <TableCell>
       {
    item?.applicant?.profile?.resume ?
     <a 
      className='text-blue-600 cursor-pointer' 
      href={`https://docs.google.com/viewer?url=${encodeURIComponent(item?.applicant?.profile?.resume)}&embedded=true`}
      target='_blank' 
      rel='noopener noreferrer'
    >
      {item?.applicant?.profile?.resumeOriginalName || 'View Resume'} 
     </a> :
    <span className='text-blue-600'>NA</span>
  }
     </TableCell>
    <TableCell>{item?.applicant?.createdAt.split("T")[0]}</TableCell>

    <TableCell className='text-right cursor-pointer'>
      <Popover>
        <PopoverTrigger>
          <MoreHorizontal />
        </PopoverTrigger>

        <PopoverContent className='w-32'>
          {
            sortListing.map((status,index)=>(
              <div
                key={index}
                className='flex w-fit items-center my-2 cursor-pointer'
              >
                <span onClick={() => statusHandler(status ,item._id)}>
                  {status}
                </span>
              </div>
            ))
          }
        </PopoverContent>
      </Popover>
    </TableCell>
  </TableRow>
  ))
}


</TableBody>
      </Table>
    </div>
  )
}

export default ApplicantsTabel

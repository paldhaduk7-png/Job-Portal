import React from 'react'
import { Button } from '@/components/ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Badge } from "@/components/ui/badge"
import { useNavigate } from 'react-router-dom'


const job = ({job}) => {
// const jobId="1"
  const navigate=useNavigate();

  
const daysAgoFunction = (mongoTime) => {
  // Convert MongoDB date string into Date object
  const createdAt = new Date(mongoTime);

  // Get current date & time
  const currentDate = new Date();

  // Difference in milliseconds
  const timeDiff = currentDate - createdAt;

  // Convert milliseconds → days
  return Math.floor(timeDiff / (1000 * 60 * 60 * 24));
};


  return (
   
    <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
{console.log(job)}
      <div className="flex items-center justify-between">
    <p>
  {daysAgoFunction(job?.createdAt) === 0 
    ? "Today" 
    : `${daysAgoFunction(job?.createdAt)} days ago`}
</p>
     <Button variant='outline' className="rounded-full " size='icon'><Bookmark/></Button>
</div>

<div className="flex items-center gap-2 my-2">
 <Button  className="p-6" variant='outline' size='icon'>
        <Avatar>
        <AvatarImage src="https://imgs.search.brave.com/9ginb_ySEb5b12oGlUjrTfTJZtgHsSUz_jd5KDDV7u4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/YWFiaGlzaGVrLmNv/bS93cC1jb250ZW50/L3VwbG9hZHMvMjAx/Ni8wNS9NZW50b3It/TG9nby1EZXNpZ24t/TWVudG9yLUxvZ28t/TWVudG9yLUdyYXBo/aWNzLUxvZ28tTWVu/dG9yaW5nLUxvZ29z/LmpwZw" alt="logo" />
        </Avatar>
     </Button>

<div>
      <h1 className='font-bold text-lg'>{job?.company?.name}</h1>
      <p className='text-sm text-gray-600'>India</p>
     </div>
</div>


     

<div>
  <h1 className='font-bold text-xl my-2'>{job?.title}</h1>
  <p className="text-sm text-gray-600">{job?.description}</p>
</div>

<div className='flex items-center gap-2 mt-4'>
  <Badge className='text-blue-700 font-bold' variant="ghost">
      {job?.position} &nbsp; Positions
    </Badge>
    <Badge className='text-[#F83002] font-bold' variant="ghost">
      {job?.jobType}
    </Badge>
    <Badge className='text-[#7209b7] font-bold' variant="ghost">
      {job?.salary}LPA
    </Badge>
</div>

<div className='flex items-center justify-between'>
<Button onClick={()=>navigate(`/description/${job._id}`)} variant='outline'>Detail</Button>
<Button className='bg-[#7209b7]' >Save for later</Button>
</div>

    </div>
  )
}

export default job;

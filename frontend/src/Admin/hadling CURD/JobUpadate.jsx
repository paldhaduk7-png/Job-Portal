import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

const JobUpadate = () => {
const navigate=useNavigate();


const {id}=useParams();
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        experinence: "",
        location: "",
        jobType: "",
        position: 0,
        companyId: ""
    });

    const [loading, setLoading]=useState(false);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

   const submitHandler = async (e)=>{
    e.preventDefault();

try {
    setLoading(true);

    
    const res= await axios.put(`${JOB_API_END_POINT}/update/${id}`,input, {withCredentials:true})
    if(res.data.success){
        toast.success(res?.data?.message);
        navigate("/admin/jobs")
    }

} catch (error) {
toast.error(error?.response?.data?.message);
    console.log(error);
}finally{
    setLoading(false);
}

   }


  useEffect(() => {
  const getJobData = async () => {
    try {
      const res = await axios.get(`${JOB_API_END_POINT}/get/${id}`, {withCredentials:true});
           
      if (res.data.success) {
        //  console.log(res.data);
        setInput({
            title:res.data.job.title,
        description: res.data.job.description,
        requirements:res.data.job.requirements?.join(", ") || "",
        salary:res.data.job.salary,
        experinence: res.data.job.experienceLevel,
        location:res.data.job.location ,
        jobType:res.data.job.jobType,
        position:res.data.job.position,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load data");
    }
  };

  if (id) {
    getJobData();
  }
}, [id]);

  return (
     <div className='w-full max-w-4xl mx-auto my-12 px-6'>


<form onSubmit={submitHandler}> 
            {/* Header */}
            <div className='mb-8'>
                <h1 className='text-2xl font-semibold text-gray-900'>Update Job</h1>
                <p className='text-sm text-gray-500 mt-1'>Fill in the details below to update a job listing.</p>
            </div>

            {/* Form Card */}
            <div className='bg-white border border-gray-200 rounded-2xl shadow-sm p-8'>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>

                    {/* Title */}
                    <div className='flex flex-col gap-1.5'>
                        <Label className='text-sm font-medium text-gray-700'>Job Title</Label>
                        <Input
                            type='text'
                            placeholder="e.g. Frontend Developer"
                            name='title'
                            value={input.title}
                            onChange={changeEventHandler}
                            className='h-10 rounded-lg border-gray-300 focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-0 focus-visible:border-transparent text-sm'
                        />
                    </div>

                    {/* Location */}
                    <div className='flex flex-col gap-1.5'>
                        <Label className='text-sm font-medium text-gray-700'>Location</Label>
                        <Input
                            type='text'
                            placeholder="e.g. Remote, New York"
                            name='location'
                            value={input.location}
                            onChange={changeEventHandler}
                            className='h-10 rounded-lg border-gray-300 focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-0 focus-visible:border-transparent text-sm'
                        />
                    </div>

                    {/* Description — full width */}
                    <div className='flex flex-col gap-1.5 md:col-span-2'>
                        <Label className='text-sm font-medium text-gray-700'>Description</Label>
                        <Input
                            type='text'
                            placeholder="Brief overview of the role"
                            name='description'
                            value={input.description}
                            onChange={changeEventHandler}
                            className='h-10 rounded-lg border-gray-300 focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-0 focus-visible:border-transparent text-sm'
                        />
                    </div>

                    {/* Requirements — full width */}
                    <div className='flex flex-col gap-1.5 md:col-span-2'>
                        <Label className='text-sm font-medium text-gray-700'>Requirements</Label>
                        <Input
                            type='text'
                            placeholder="e.g. React, Node.js"
                            name='requirements'
                            value={input.requirements}
                            onChange={changeEventHandler}
                            className='h-10 rounded-lg border-gray-300 focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-0 focus-visible:border-transparent text-sm'
                        />
                    </div>

                    {/* Salary */}
                    <div className='flex flex-col gap-1.5'>
                        <Label className='text-sm font-medium text-gray-700'>Salary</Label>
                        <div className='relative'>
                            <span className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm'>₹</span>
                            <Input
                                type='text'
                                placeholder="e.g. 8(LPA)"
                                name='salary'
                                value={input.salary}
                                onChange={changeEventHandler}
                                className='h-10 pl-7 rounded-lg border-gray-300 focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-0 focus-visible:border-transparent text-sm'
                            />
                        </div>
                    </div>

                    {/* Experience Level */}
                    <div className='flex flex-col gap-1.5'>
                        <Label className='text-sm font-medium text-gray-700'>Experience Level</Label>
                        <Input
                            type='text'
                            placeholder="e.g. Mid-level, Senior"
                            name='experinence'
                            value={input.experinence}
                            onChange={changeEventHandler}
                            className='h-10 rounded-lg border-gray-300 focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-0 focus-visible:border-transparent text-sm'
                        />
                    </div>

                    {/* Job Type */}
                    <div className='flex flex-col gap-1.5'>
                        <Label className='text-sm font-medium text-gray-700'>Job Type</Label>
                        <Input
                            type='text'
                            placeholder="e.g. Full-time, Contract"
                            name='jobType'
                            value={input.jobType}
                            onChange={changeEventHandler}
                            className='h-10 rounded-lg border-gray-300 focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-0 focus-visible:border-transparent text-sm'
                        />
                    </div>

                    {/* Position */}
                    <div className='flex flex-col gap-1.5'>
                        <Label className='text-sm font-medium text-gray-700'>No. of Positions</Label>
                        <Input
                           type='number'
                            placeholder="1"
                            name='position'
                            value={input.position}
                            onChange={changeEventHandler}
                            className='h-10 rounded-lg border-gray-300 focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-0 focus-visible:border-transparent text-sm'
                        />
                    </div>
          </div>

                {/* Divider + Submit */}
                <div className='mt-8 pt-6 border-t border-gray-100 flex justify-end gap-3'>
                    <Button onClick ={()=> navigate("/admin/jobs")} variant='outline' className='rounded-lg px-6 text-sm h-10 border-gray-300 text-gray-600 hover:bg-gray-50 cursor-pointer'>
                        Cancel
                    </Button>
                   
                        {/* Submit */}
       {
  loading? <Button className="w-full mt-4" > <Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please Wait</Button>:
     <Button type="submit" className='rounded-lg px-6 text-sm h-10 bg-orange-500 hover:bg-orange-600 text-white font-medium d cursor-pointer'>
                        Update Job
                    </Button>
}
                </div>
           
            </div>

            </form>
        </div>
  )
}

export default JobUpadate

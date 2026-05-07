import React, {useEffect} from 'react'
import Job from '@/Job/job';
import {  useSelector } from 'react-redux';
import userGetAllJobs from '@/hooks/userGetAllJobs';
// const randomJobs=[1,2,3, 4 ,5 ,6 ,7];

const Browse = () => {

useEffect(() => {
    userGetAllJobs();
  }, []);

  const {allJobs}=useSelector(store=>store.job);

console.log(allJobs);
  return (
    <div className="max-w-7xl mx-auto my-10">
     <h1 className='font-bold text-xl my-10'>Search Results ({allJobs?.length || 0})</h1>

     <div className='grid grid-cols-3 gap-4 '> 
          {
allJobs?.length > 0 ?
       allJobs?.map((job)=>(
             <Job key={job._id} job={job} />
        )) :
        <span>No job found</span>
     }
     </div>
    
    </div>
  )
}

export default Browse

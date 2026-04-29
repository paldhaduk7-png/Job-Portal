import React from 'react'
import LatestJobCards from './LatestJobCards'


const rendomJobs=[1,2,3,4,5,6,7,8];
const LatestJobs = () => {
  return (
    <div className='max-w-7xl mx-auto my-28'> 
     <h1 className='text-4xl font-bold'> <span className='text-[#6A38C2]'>Latest & Top</span>Job Opening</h1>

{/* multiple job cards*/}
<div className='grid grid-cols-3 gap-4 my-5'>
      {
        // slice means give item from o to 6
        rendomJobs.slice(0,6).map((item,index)=>(
           <LatestJobCards />
        ))
      }
      </div>

    </div>
  )
}

export default LatestJobs

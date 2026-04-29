import { Badge } from "@/components/ui/badge"


import React from 'react'


const LatestJobCards = () => {
  return (
    <div className='p-5 rounded-md shadow-xl  bg-white border-greay-100 cursor-pointer'> 

    <div>
<h1 className="font-medium text-lg">Comapny Name</h1>
    <p className="text-sm text-gray-500">India</p>
    </div>

    <div>
       <h1 className="font-bold text-lg my-2" > Job Title</h1>
       <p className="text-sm text-gray-600">Lorem ttotam!</p>
    </div>

    <div className="flex items-center mt-4 gap-2">
  <Badge className='text-blue-700 font-bold' variant="ghost">
    12 Positions
  </Badge>
  <Badge className='text-[#F83002] font-bold' variant="ghost">
    Part Time
  </Badge>
  <Badge className='text-[#7209b7] font-bold' variant="ghost">
    24LPA
  </Badge>
</div>


    </div> 
  )
}

export default LatestJobCards

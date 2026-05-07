import React from 'react'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from '@/components/ui/label'


const filterData=[
  {
     filterType:"Loaction",
     array:[ "Ahmedabad","Delhi NCR", "Bangalore", "Pune", "Rajkot"]
  },
 
  {
     filterType:"Industry",
     array:[ "Frontend Developer","Backend Developer", "FullStack Developer"]
  },
 
  {
     filterType:"Salary",
     array:[ "0-42k","42-1lakh", "1lakh to 5lakh"]
  }
 
]

const FilterCard = () => {
  return (
    <div className='w-full bg-white p-3 rounded-md '>
   
   <h1>Filter Jobs</h1>
   <hr  className='mt-3'/>

   <RadioGroup>
    {
      filterData.map((data,index)=>(
      <div key={index}>
              <h1  className='font-bold text-lg'>{data.filterType}</h1>
              {
                data.array.map((item,index)=>(
                <div key={index}className='flex items-center space-x-2 my-2'>
                    <RadioGroupItem value={item} />
                    <Label>{item}</Label>
                  </div>
                ))
              }
      </div>
      ))
    }
   </RadioGroup>
    </div>
  )
}

export default FilterCard

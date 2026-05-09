import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from '@/components/ui/label'
import { useDispatch } from 'react-redux'
import { setSearchQuery } from '@/redux/jobSlice'


const filterData=[
  {
     filterType:"Loaction",
     array:[ "Ahmedabad","Delhi NCR", "Bangalore", "Pune", "Rajkot", "Paneli Moti"]
  },
 
  {
     filterType:"Industry",
     array:[ "Frontend Developer","Backend Developer", "FullStack Developer"]
  },
 
  {
     filterType:"Salary",
array:["0-5LPA","5-10LPA","10-20LPA"]
  }
 
]

const FilterCard = () => {

  const [selectedValue , setSelectedValue]=useState("");
const dispatch=useDispatch();

  const changeHandeler =(value)=>{
      setSelectedValue(value);
  }

  useEffect(()=>{
 console.log(selectedValue);
 dispatch(setSearchQuery(selectedValue));
  }, [selectedValue ,dispatch]);

  return (
    <div className='w-full bg-white p-3 rounded-md '>
   
   <h1>Filter Jobs</h1>
   <hr  className='mt-3'/>

   <RadioGroup value={selectedValue} onValueChange={changeHandeler}>
    {
      filterData.map((data,index)=>(
      <div key={index}>
              <h1  className='font-bold text-lg'>{data.filterType}</h1>
              {
                data.array.map((item,inx)=>{
                  const itemId=`pd${index} - ${inx}`;
                  return (
                <div key={inx}className='flex items-center space-x-2 my-2'>
                  {/* in redio group item gives unique value */}
                    <RadioGroupItem value={item} id={itemId} />
                    {/* label ma pan html for lagadvu */}
                    <Label htmlFor={itemId}>{item}</Label>
                  </div>
                  );
})
              }
      </div>
      ))
    }
   </RadioGroup>
    </div>
  )
}

export default FilterCard

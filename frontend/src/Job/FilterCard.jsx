import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from '@/components/ui/label'
import { useDispatch } from 'react-redux'
import { setSearchQuery } from '@/redux/jobSlice'
import { Filter, ChevronDown } from 'lucide-react'

const filterData = [
  {
    filterType: "Location",
    array: ["Ahmedabad", "Delhi NCR", "Bangalore", "Pune", "Rajkot", "Paneli Moti"]
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
  },
  {
    filterType: "Salary",
    array: ["0-5LPA", "5-10LPA", "10-20LPA"]
  }
]

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  const changeHandeler = (value) => {
    setSelectedValue(value);
  }

  useEffect(() => {
    dispatch(setSearchQuery(selectedValue));
  }, [selectedValue, dispatch]);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6">
      
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-purple-600" />
        <h1 className="text-xl font-bold text-slate-800">Filter Jobs</h1>
      </div>
      
      <hr className="mb-4 border-slate-200" />

      <RadioGroup value={selectedValue} onValueChange={changeHandeler} className="space-y-5">
        {filterData.map((data, index) => (
          <div key={index}>
            <h2 className="font-semibold text-slate-700 mb-2 flex items-center gap-2">
              <span className="w-1 h-4 bg-purple-600 rounded-full"></span>
              {data.filterType}
            </h2>
            <div className="space-y-2 pl-2">
              {data.array.map((item, inx) => {
                const itemId = `pd${index}-${inx}`;
                return (
                  <div key={inx} className="flex items-center space-x-2 group">
                    <RadioGroupItem 
                      value={item} 
                      id={itemId} 
                      className="text-purple-600 border-slate-300 data-[state=checked]:border-purple-600"
                    />
                    <Label 
                      htmlFor={itemId} 
                      className="text-sm text-slate-600 group-hover:text-purple-600 transition-colors cursor-pointer"
                    >
                      {item}
                    </Label>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </RadioGroup>

      {/* Clear Filter */}
      {selectedValue && (
        <button 
          onClick={() => setSelectedValue("")}
          className="mt-4 text-sm text-purple-600 hover:text-purple-700 font-medium transition-colors"
        >
          Clear all filters
        </button>
      )}
    </div>
  )
}

export default FilterCard
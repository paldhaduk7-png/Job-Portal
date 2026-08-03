import React from 'react'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from '@/components/ui/label'
import { useDispatch, useSelector } from 'react-redux'
import {
  setLocationFilter,
  setIndustryFilter,
  setSalaryFilter,
  clearFilters,
} from "@/redux/jobSlice";
import { Filter } from 'lucide-react'

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
  const dispatch = useDispatch();
  const filters = useSelector((store) => store.job?.filters) || { location: "", industry: "", salary: "" };

  const changeHandeler = (value, filterType) => {
    const key = filterType.toLowerCase();
    const currentValue = filters[key] || "";
    // Toggle deselect if same value is selected again
    const newValue = currentValue === value ? "" : value;

    if (filterType === "Location") {
      dispatch(setLocationFilter(newValue));
    } else if (filterType === "Industry") {
      dispatch(setIndustryFilter(newValue));
    } else if (filterType === "Salary") {
      dispatch(setSalaryFilter(newValue));
    }
  };

  const hasActiveFilters = Boolean(filters?.location || filters?.industry || filters?.salary);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6">
      
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-purple-600" />
        <h1 className="text-xl font-bold text-slate-800">Filter Jobs</h1>
      </div>
      
      <hr className="mb-4 border-slate-200" />

      {filterData.map((data, index) => {
        const filterKey = data.filterType.toLowerCase();
        const selectedValue = filters[filterKey] || "";

        return (
          <div key={index} className="space-y-5 mb-5">
            <h2 className="font-semibold text-slate-700 mb-2 flex items-center gap-2">
              <span className="w-1 h-4 bg-purple-600 rounded-full"></span>
              {data.filterType}
            </h2>

            <RadioGroup
              value={selectedValue}
              onValueChange={(value) => changeHandeler(value, data.filterType)}
              className="space-y-2 pl-2"
            >
              {data.array.map((item, inx) => {
                const itemId = `pd${index}-${inx}`;
                return (
                  <div key={inx} className="flex items-center space-x-2 group">
                    <RadioGroupItem 
                      value={item} 
                      id={itemId} 
                      onClick={() => {
                        if (selectedValue === item) {
                          changeHandeler(item, data.filterType);
                        }
                      }}
                      className="text-purple-600 border-slate-300 data-[state=checked]:border-purple-600 cursor-pointer"
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
            </RadioGroup>
          </div>
        );
      })}

      {/* Clear Filter */}
      {hasActiveFilters && (
        <button 
          onClick={() => dispatch(clearFilters())}
          className="mt-4 text-sm text-purple-600 hover:text-purple-700 font-medium transition-colors cursor-pointer"
        >
          Clear all filters
        </button>
      )}
    </div>
  )
}

export default FilterCard
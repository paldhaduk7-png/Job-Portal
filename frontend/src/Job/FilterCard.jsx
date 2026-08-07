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
import { Filter, MapPin, Briefcase, DollarSign, X, RotateCcw } from 'lucide-react'

const filterData = [
  {
    filterType: "Location",
    icon: MapPin,
    array: ["Ahmedabad", "Delhi NCR", "Bangalore", "Pune", "Rajkot", "Paneli Moti"]
  },
  {
    filterType: "Industry",
    icon: Briefcase,
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
  },
  {
    filterType: "Salary",
    icon: DollarSign,
    array: ["0-5LPA", "5-10LPA", "10-20LPA"]
  }
]

const FilterCard = () => {
  const dispatch = useDispatch();
  const filters = useSelector((store) => store.job?.filters) || { location: "", industry: "", salary: "" };

  const changeHandeler = (value, filterType) => {
    const key = filterType.toLowerCase();
    const currentValue = filters[key] || "";
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
  const getActiveCount = () => {
    let count = 0;
    if (filters?.location) count++;
    if (filters?.industry) count++;
    if (filters?.salary) count++;
    return count;
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/60 shadow-lg hover:shadow-xl transition-shadow duration-300 p-6">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-xl">
            <Filter className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-800">Filter Jobs</h1>
            {hasActiveFilters && (
              <p className="text-xs text-purple-600 font-medium">
                {getActiveCount()} filter{getActiveCount() > 1 ? 's' : ''} active
              </p>
            )}
          </div>
        </div>
        {hasActiveFilters && (
          <button 
            onClick={() => dispatch(clearFilters())}
            className="flex items-center gap-1.5 text-xs font-semibold text-purple-600 hover:text-purple-700 bg-purple-50 hover:bg-purple-100 px-3 py-1.5 rounded-full transition-all duration-200"
          >
            <RotateCcw className="w-3 h-3" />
            Clear All
          </button>
        )}
      </div>
      
      <hr className="mb-5 border-slate-200" />

      {filterData.map((data, index) => {
        const filterKey = data.filterType.toLowerCase();
        const selectedValue = filters[filterKey] || "";
        const Icon = data.icon;

        return (
          <div key={index} className="mb-6 last:mb-0">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 bg-slate-100 rounded-lg">
                <Icon className="w-3.5 h-3.5 text-slate-500" />
              </div>
              <h2 className="font-semibold text-slate-700 text-sm">
                {data.filterType}
              </h2>
              {selectedValue && (
                <span className="ml-auto flex items-center gap-1 text-xs bg-purple-50 text-purple-600 px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                  {selectedValue}
                </span>
              )}
            </div>

            <RadioGroup
              value={selectedValue}
              onValueChange={(value) => changeHandeler(value, data.filterType)}
              className="space-y-1.5 pl-1"
            >
              {data.array.map((item, inx) => {
                const itemId = `pd${index}-${inx}`;
                const isSelected = selectedValue === item;
                return (
                  <div key={inx} className="flex items-center space-x-2.5 group">
                    <RadioGroupItem 
                      value={item} 
                      id={itemId} 
                      onClick={() => {
                        if (selectedValue === item) {
                          changeHandeler(item, data.filterType);
                        }
                      }}
                      className={`text-purple-600 border-slate-300 data-[state=checked]:border-purple-600 data-[state=checked]:bg-purple-600 cursor-pointer transition-all duration-200 ${isSelected ? 'ring-2 ring-purple-200' : ''}`}
                    />
                    <Label 
                      htmlFor={itemId} 
                      className={`text-sm cursor-pointer transition-all duration-200 ${
                        isSelected 
                          ? 'text-purple-700 font-semibold' 
                          : 'text-slate-600 group-hover:text-purple-600'
                      }`}
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

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="mt-5 pt-4 border-t border-slate-200">
          <div className="flex flex-wrap gap-1.5">
            {filters?.location && (
              <span className="inline-flex items-center gap-1 text-xs bg-purple-50 text-purple-700 px-2.5 py-1 rounded-full">
                📍 {filters.location}
                <button 
                  onClick={() => dispatch(setLocationFilter(""))}
                  className="hover:text-purple-900 ml-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters?.industry && (
              <span className="inline-flex items-center gap-1 text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full">
                💼 {filters.industry}
                <button 
                  onClick={() => dispatch(setIndustryFilter(""))}
                  className="hover:text-blue-900 ml-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters?.salary && (
              <span className="inline-flex items-center gap-1 text-xs bg-green-50 text-green-700 px-2.5 py-1 rounded-full">
                💰 {filters.salary}
                <button 
                  onClick={() => dispatch(setSalaryFilter(""))}
                  className="hover:text-green-900 ml-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default FilterCard
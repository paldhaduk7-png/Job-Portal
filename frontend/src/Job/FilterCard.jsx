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
import { Filter, MapPin, Briefcase, DollarSign, X, RotateCcw, Sparkles } from 'lucide-react'

const filterData = [
  {
    filterType: "Location",
    icon: MapPin,
    color: "from-blue-500 to-indigo-600",
    bgColor: "bg-indigo-50 text-indigo-600",
    array: ["Ahmedabad", "Delhi NCR", "Bangalore", "Pune", "Rajkot", "Paneli Moti"]
  },
  {
    filterType: "Industry",
    icon: Briefcase,
    color: "from-purple-500 to-pink-600",
    bgColor: "bg-purple-50 text-purple-600",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
  },
  {
    filterType: "Salary",
    icon: DollarSign,
    color: "from-emerald-500 to-teal-600",
    bgColor: "bg-emerald-50 text-emerald-600",
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
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-300 p-6 overflow-hidden">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md shadow-indigo-500/20 text-white">
            <Filter className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-800 tracking-tight">Filter Jobs</h1>
            <p className="text-xs text-slate-400 font-medium">
              {hasActiveFilters ? (
                <span className="text-indigo-600 font-semibold inline-flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  {getActiveCount()} active {getActiveCount() === 1 ? 'filter' : 'filters'}
                </span>
              ) : (
                'Refine your search'
              )}
            </p>
          </div>
        </div>

        {hasActiveFilters && (
          <button 
            onClick={() => dispatch(clearFilters())}
            className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100/80 px-3 py-1.5 rounded-full transition-all duration-200 shadow-sm hover:scale-105 active:scale-95"
            title="Reset all filters"
          >
            <RotateCcw className="w-3 h-3" />
            Clear
          </button>
        )}
      </div>

      {/* Filter Sections */}
      <div className="divide-y divide-slate-100">
        {filterData.map((data, index) => {
          const filterKey = data.filterType.toLowerCase();
          const selectedValue = filters[filterKey] || "";
          const Icon = data.icon;

          return (
            <div key={index} className="py-5 first:pt-4 last:pb-0">
              
              {/* Category Header */}
              <div className="flex items-center justify-between mb-3.5">
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-lg ${data.bgColor}`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <h2 className="font-semibold text-slate-700 text-sm">
                    {data.filterType}
                  </h2>
                </div>

                {selectedValue && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-full ring-1 ring-indigo-200/70 animate-in fade-in zoom-in duration-200">
                    <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-pulse"></span>
                    {selectedValue}
                  </span>
                )}
              </div>

              {/* Radio Group Options */}
              <RadioGroup
                value={selectedValue}
                onValueChange={(value) => changeHandeler(value, data.filterType)}
                className="space-y-1"
              >
                {data.array.map((item, inx) => {
                  const itemId = `pd${index}-${inx}`;
                  const isSelected = selectedValue === item;
                  return (
                    <div 
                      key={inx} 
                      onClick={() => changeHandeler(item, data.filterType)}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-xl cursor-pointer transition-all duration-200 ${
                        isSelected 
                          ? 'bg-indigo-50/80 ring-1 ring-indigo-200/80 shadow-xs' 
                          : 'hover:bg-slate-50 text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <RadioGroupItem 
                        value={item} 
                        id={itemId} 
                        onClick={(e) => {
                          e.stopPropagation();
                          if (selectedValue === item) {
                            changeHandeler(item, data.filterType);
                          }
                        }}
                        className={`text-indigo-600 border-slate-300 data-[state=checked]:border-indigo-600 data-[state=checked]:bg-indigo-600 transition-all duration-200 ${
                          isSelected ? 'ring-2 ring-indigo-200' : ''
                        }`}
                      />
                      <Label 
                        htmlFor={itemId} 
                        onClick={(e) => e.stopPropagation()}
                        className={`text-xs sm:text-sm cursor-pointer select-none transition-all duration-200 flex-1 ${
                          isSelected 
                            ? 'text-indigo-950 font-semibold' 
                            : 'text-slate-600 font-normal hover:text-slate-900'
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
      </div>

      {/* Active Filters Summary Pills */}
      {hasActiveFilters && (
        <div className="mt-5 pt-4 border-t border-slate-100">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2.5">
            Active Tags
          </p>
          <div className="flex flex-wrap gap-1.5">
            {filters?.location && (
              <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-indigo-50/90 text-indigo-700 border border-indigo-200/60 px-2.5 py-1 rounded-full shadow-2xs group">
                <MapPin className="w-3 h-3 text-indigo-500" />
                <span>{filters.location}</span>
                <button 
                  onClick={() => dispatch(setLocationFilter(""))}
                  className="text-indigo-400 hover:text-indigo-700 hover:bg-indigo-100 rounded-full p-0.5 transition-colors"
                  title="Remove location filter"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters?.industry && (
              <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-purple-50/90 text-purple-700 border border-purple-200/60 px-2.5 py-1 rounded-full shadow-2xs group">
                <Briefcase className="w-3 h-3 text-purple-500" />
                <span>{filters.industry}</span>
                <button 
                  onClick={() => dispatch(setIndustryFilter(""))}
                  className="text-purple-400 hover:text-purple-700 hover:bg-purple-100 rounded-full p-0.5 transition-colors"
                  title="Remove industry filter"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters?.salary && (
              <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-emerald-50/90 text-emerald-700 border border-emerald-200/60 px-2.5 py-1 rounded-full shadow-2xs group">
                <DollarSign className="w-3 h-3 text-emerald-500" />
                <span>{filters.salary}</span>
                <button 
                  onClick={() => dispatch(setSalaryFilter(""))}
                  className="text-emerald-400 hover:text-emerald-700 hover:bg-emerald-100 rounded-full p-0.5 transition-colors"
                  title="Remove salary filter"
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
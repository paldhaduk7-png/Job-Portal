import React, { useEffect, useState } from "react";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import useGetAllJobs from '@/hooks/useGetAllJobs';
import LoginToViewMore from "@/components/shared/LoginToViewMore";
import { Briefcase, Search, X, RotateCcw } from "lucide-react";
import { setSearchQuery, clearFilters } from "@/redux/jobSlice";
import { Button } from "@/components/ui/button";

const parseSalaryNumber = (salary) => {
  if (typeof salary === "number") return salary;
  if (!salary) return null;

  const match = String(salary).match(/(\d+(?:\.\d+)?)/);
  return match ? Number(match[1]) : null;
};

const Jobs = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(store => store.auth);
  const { allJobs, searchQuery, filters } = useSelector(store => store.job);
  const [filterJob, setFiltterJob] = useState(allJobs);
  useGetAllJobs();

  const handleClearAllFilters = () => {
    dispatch(setSearchQuery(""));
    dispatch(clearFilters());
  };

  useEffect(() => {
    let filtered = [...(allJobs || [])];
    const normalizedQuery = String(searchQuery || "").trim().toLowerCase();

    if (normalizedQuery) {
      filtered = filtered.filter((job) => {
        const searchText = [
          job?.title,
          job?.location,
          job?.company?.name,
          job?.description,
          job?.jobType,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return searchText.includes(normalizedQuery);
      });
    }

    if (filters?.location) {
      const targetLoc = String(filters.location).trim().toLowerCase();
      filtered = filtered.filter((job) =>
        String(job?.location || "")
          .toLowerCase()
          .includes(targetLoc)
      );
    }

    if (filters?.industry) {
      const targetInd = String(filters.industry).trim().toLowerCase();
      filtered = filtered.filter((job) => {
        const title = String(job?.title || "").toLowerCase();
        const description = String(job?.description || "").toLowerCase();
        const requirements = Array.isArray(job?.requirements)
          ? job.requirements.join(" ").toLowerCase()
          : String(job?.requirements || "").toLowerCase();

        const combinedText = `${title} ${description} ${requirements}`;

        if (targetInd.includes("frontend")) {
          return combinedText.includes("frontend") || combinedText.includes("react") || combinedText.includes("web");
        }
        if (targetInd.includes("backend")) {
          return combinedText.includes("backend") || combinedText.includes("node") || combinedText.includes("express") || combinedText.includes("java") || combinedText.includes("python");
        }
        if (targetInd.includes("fullstack")) {
          return combinedText.includes("fullstack") || combinedText.includes("full stack") || combinedText.includes("full-stack");
        }

        return combinedText.includes(targetInd);
      });
    }

    if (filters?.salary) {
      const salaryRange = {
        "0-5LPA": [0, 5],
        "5-10LPA": [5, 10],
        "10-20LPA": [10, 20],
      }[filters.salary];

      if (salaryRange) {
        filtered = filtered.filter((job) => {
          let salaryValue = parseSalaryNumber(job?.salary);
          if (salaryValue === null) return false;

          if (salaryValue >= 1000) {
            salaryValue = salaryValue / 100000;
          }

          return salaryValue >= salaryRange[0] && salaryValue <= salaryRange[1];
        });
      }
    }

    setFiltterJob(filtered);

  }, [allJobs, searchQuery, filters]);

  const visibleJobs = !user ? filterJob?.slice(0, 5) : filterJob;
  const isFiltered = Boolean(searchQuery || filters?.location || filters?.industry || filters?.salary);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Jobs</h1>
          <p className="text-slate-500 mt-1">
            {!user 
              ? `Showing ${visibleJobs?.length || 0} of ${filterJob?.length || 0} job opportunities (Guest Preview)`
              : `${filterJob?.length || 0} opportunities found`}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {isFiltered && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearAllFilters}
              className="rounded-full text-xs font-semibold text-purple-700 hover:text-purple-800 hover:bg-purple-50 border-purple-200 flex items-center gap-1.5 shadow-sm"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Show All Jobs ({allJobs?.length || 0})</span>
            </Button>
          )}
          <div className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
            <Briefcase className="w-4 h-4" />
            {visibleJobs?.length || 0} Jobs
          </div>
        </div>
      </div>

      {/* Active Search Filter Banner */}
      {searchQuery && (
        <div className="flex items-center justify-between bg-purple-50/80 border border-purple-200/80 rounded-2xl px-5 py-3 mb-6 shadow-sm">
          <div className="flex items-center gap-2 text-purple-900 text-sm font-medium">
            <Search className="w-4 h-4 text-purple-600" />
            <span>
              Search query active: <strong className="text-purple-700 font-bold">"{searchQuery}"</strong>
            </span>
          </div>
          <button
            onClick={handleClearAllFilters}
            className="text-xs font-bold text-purple-700 hover:text-purple-900 hover:underline flex items-center gap-1 bg-white px-3 py-1.5 rounded-xl border border-purple-200 shadow-sm transition-all"
          >
            <X className="w-3.5 h-3.5" />
            View All Jobs
          </button>
        </div>
      )}

      {/* Filter + Jobs */}
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Filter Sidebar */}
        <div className="lg:w-72 flex-shrink-0">
          <div className="sticky top-24">
            <FilterCard />
          </div>
        </div>

        {/* Jobs Grid */}
        <div className="flex-1">
          {visibleJobs?.length > 0 ? (
            <>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                {visibleJobs.map((job) => (
                  <motion.div 
                    key={job?._id} 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>

              {/* Always show lock section for unauthenticated guests */}
              {!user && (
                <LoginToViewMore 
                  totalCount={filterJob?.length || 0} 
                  remainingCount={Math.max(0, (filterJob?.length || 0) - 5)} 
                />
              )}
            </>
          ) : (
            <div className="text-center py-16 bg-slate-50/80 rounded-3xl border-2 border-dashed border-slate-200 p-6">
              <div className="flex flex-col items-center gap-3 max-w-sm mx-auto">
                <Briefcase className="w-16 h-16 text-slate-300" />
                <h3 className="text-xl font-semibold text-slate-600">No jobs found</h3>
                <p className="text-slate-400 text-sm">
                  {isFiltered
                    ? `No jobs match "${searchQuery || 'your filters'}". Click below to view all available jobs.`
                    : "No jobs available at this moment. Check back later."}
                </p>
                {isFiltered && (
                  <Button
                    onClick={handleClearAllFilters}
                    className="mt-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl text-sm"
                  >
                    Clear Filter & Show All Jobs
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
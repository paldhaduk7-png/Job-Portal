import React, { useEffect, useState } from "react";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import useGetAllJobs from '@/hooks/useGetAllJobs';
import LoginToViewMore from "@/components/shared/LoginToViewMore";
import { Briefcase, Search, X, RotateCcw, Sparkles, Layers, SlidersHorizontal } from "lucide-react";
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
  const { user } = useSelector((store) => store.auth);
  const { allJobs, searchQuery, filters } = useSelector((store) => store.job);
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
    <div className="relative min-h-screen bg-[#fafbff] py-8 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Dynamic Ambient Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top-Left Indigo Glow Orb */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-br from-indigo-400/25 to-purple-400/20 rounded-full blur-3xl" />
        
        {/* Top-Right Violet Glow Orb */}
        <div className="absolute top-1/4 -right-20 w-[30rem] h-[30rem] bg-gradient-to-bl from-purple-400/20 via-pink-300/15 to-transparent rounded-full blur-3xl" />
        
        {/* Center-Bottom Soft Cyan/Blue Orb */}
        <div className="absolute -bottom-28 left-1/3 w-[36rem] h-[36rem] bg-gradient-to-tr from-blue-300/20 to-indigo-200/20 rounded-full blur-3xl" />

        {/* Subtle Modern Dot-Matrix Grid Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.35]" 
          style={{
            backgroundImage: `radial-gradient(circle, #6366f1 1px, transparent 1px)`,
            backgroundSize: '32px 32px'
          }}
        />
        
        {/* Radial vignette mask to fade grid smoothly */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#fafbff]/80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Top Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200/70">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Explore Jobs
              </h1>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50/90 text-indigo-700 border border-indigo-200/80 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse"></span>
                {visibleJobs?.length || 0} {visibleJobs?.length === 1 ? 'Job' : 'Jobs'}
              </span>
            </div>
            <p className="text-slate-500 text-sm mt-1.5 font-normal">
              {!user 
                ? `Showing ${visibleJobs?.length || 0} of ${filterJob?.length || 0} job opportunities (Guest Preview)`
                : `Found ${filterJob?.length || 0} available opportunities matching your profile`}
            </p>
          </div>

          {/* Action Controls */}
          <div className="flex items-center gap-3 self-start sm:self-auto">
            {isFiltered && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearAllFilters}
                className="rounded-xl text-xs font-semibold text-indigo-700 hover:text-indigo-800 bg-white hover:bg-indigo-50 border-indigo-200/80 flex items-center gap-1.5 shadow-2xs h-9 px-3.5 transition-all active:scale-95"
              >
                <RotateCcw className="w-3.5 h-3.5 text-indigo-600" />
                <span>Reset Filters</span>
              </Button>
            )}
            <div className="hidden sm:flex items-center gap-2 bg-white text-indigo-700 border border-indigo-100/90 px-4 py-2 rounded-xl text-xs font-semibold shadow-xs">
              <Briefcase className="w-4 h-4 text-indigo-600" />
              <span>{allJobs?.length || 0} Total Job Listings</span>
            </div>
          </div>
        </div>

        {/* Active Search Filter Banner */}
        {searchQuery && (
          <div className="flex items-center justify-between bg-gradient-to-r from-indigo-50/90 via-purple-50/80 to-indigo-50/90 border border-indigo-200/80 rounded-2xl px-5 py-3.5 mb-8 shadow-xs backdrop-blur-md">
            <div className="flex items-center gap-2.5 text-slate-700 text-sm">
              <div className="p-1.5 bg-indigo-600 text-white rounded-lg shadow-2xs">
                <Search className="w-3.5 h-3.5" />
              </div>
              <span>
                Searching for: <strong className="text-indigo-900 font-bold">"{searchQuery}"</strong>
              </span>
            </div>
            <button
              onClick={handleClearAllFilters}
              className="text-xs font-semibold text-indigo-700 hover:text-indigo-900 flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-indigo-200/80 shadow-2xs hover:shadow-xs transition-all active:scale-95"
            >
              <X className="w-3.5 h-3.5" />
              <span>Clear Search</span>
            </button>
          </div>
        )}

        {/* Layout: Sticky Filter Sidebar + Jobs Grid */}
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Filter Sidebar */}
          <div className="lg:w-72 xl:w-80 flex-shrink-0">
            <div className="sticky top-24">
              <FilterCard />
            </div>
          </div>

          {/* Jobs Main Content */}
          <div className="flex-1 min-w-0">
            {visibleJobs?.length > 0 ? (
              <>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 sm:gap-6">
                  <AnimatePresence mode="popLayout">
                    {visibleJobs.map((job) => (
                      <motion.div 
                        key={job?._id} 
                        layout
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.25 }}
                      >
                        <Job job={job} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Lock card for unauthenticated guest users */}
                {!user && (
                  <div className="mt-8">
                    <LoginToViewMore 
                      totalCount={filterJob?.length || 0} 
                      remainingCount={Math.max(0, (filterJob?.length || 0) - 5)} 
                    />
                  </div>
                )}
              </>
            ) : (
              /* Empty State */
              <div className="text-center py-20 px-6 bg-white/90 rounded-3xl border-2 border-dashed border-slate-200 shadow-xs backdrop-blur-sm">
                <div className="flex flex-col items-center gap-4 max-w-md mx-auto">
                  <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center ring-8 ring-indigo-50/50">
                    <Briefcase className="w-8 h-8 stroke-[1.5]" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 tracking-tight">No Jobs Found</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {isFiltered
                      ? `No job positions match your current search or filter criteria. Try adjusting or clearing filters to see all available opportunities.`
                      : "No jobs are currently available at this moment. Please check back soon."}
                  </p>
                  {isFiltered && (
                    <Button
                      onClick={handleClearAllFilters}
                      className="mt-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl text-sm font-semibold px-6 shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Reset All Filters
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
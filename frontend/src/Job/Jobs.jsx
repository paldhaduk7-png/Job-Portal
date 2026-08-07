import React, { useEffect, useState } from "react";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import useGetAllJobs from '@/hooks/useGetAllJobs';
import LoginToViewMore from "@/components/shared/LoginToViewMore";
import { Briefcase } from "lucide-react";

const parseSalaryNumber = (salary) => {
  if (typeof salary === "number") return salary;
  if (!salary) return null;

  const match = String(salary).match(/(\d+(?:\.\d+)?)/);
  return match ? Number(match[1]) : null;
};

const Jobs = () => {
  const { user } = useSelector(store => store.auth);
  const { allJobs, searchQuery, filters } = useSelector(store => store.job);
  const [filterJob, setFiltterJob] = useState(allJobs);
  useGetAllJobs();

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Jobs</h1>
          <p className="text-slate-500 mt-1">
            {!user 
              ? `Showing ${visibleJobs?.length || 0} of ${filterJob?.length || 0} job opportunities (Guest Preview)`
              : `${filterJob?.length || 0} opportunities found`}
          </p>
        </div>
        <div className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
          <Briefcase className="w-4 h-4" />
          {visibleJobs?.length || 0} Jobs
        </div>
      </div>

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
            <div className="text-center py-16 bg-slate-50/80 rounded-3xl border-2 border-dashed border-slate-200">
              <div className="flex flex-col items-center gap-3">
                <Briefcase className="w-16 h-16 text-slate-300" />
                <h3 className="text-xl font-semibold text-slate-600">No jobs found</h3>
                <p className="text-slate-400">Try adjusting your filters</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
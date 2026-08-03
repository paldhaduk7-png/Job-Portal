import React, { useEffect, useState } from "react";
import FilterCard from "./FilterCard";
import Job from "./job";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { Briefcase } from "lucide-react";

const Jobs = () => {
  const { allJobs, searchQuery } = useSelector(store => store.job);
  const [filterJob, setFiltterJob] = useState(allJobs);
  useGetAllJobs();
// console.log(allJobs[0]);
  useEffect(() => {
    if (searchQuery) {
      console.log("Search Query:", searchQuery);
      const filtered = allJobs.filter(job => {
        if (searchQuery === "0-5LPA") return job.salary >= 0 && job.salary <= 5;
        if (searchQuery === "5-10LPA") return job.salary >= 5 && job.salary <= 10;
        if (searchQuery === "10-20LPA") return job.salary >= 10 && job.salary <= 20;
     return (
  job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
  job.company?.name?.toLowerCase().includes(searchQuery.toLowerCase())
);
      });
      setFiltterJob(filtered);
    } else {
      setFiltterJob(allJobs);
    }
  }, [allJobs, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Jobs</h1>
          <p className="text-slate-500 mt-1">{filterJob?.length || 0} opportunities found</p>
        </div>
        <div className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
          <Briefcase className="w-4 h-4" />
          {filterJob?.length || 0} Jobs
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
          {filterJob?.length > 0 ? (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
              {filterJob.map((job) => (
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
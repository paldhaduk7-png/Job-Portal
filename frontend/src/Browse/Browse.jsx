import React from 'react';
import Job from '@/Job/Job';
import { useDispatch, useSelector } from 'react-redux';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { setSearchQuery } from '@/redux/jobSlice';
import { Briefcase } from 'lucide-react';
import LoginToViewMore from "@/components/shared/LoginToViewMore";

const Browse = () => {
  useGetAllJobs();
  const { user } = useSelector(store => store.auth);
  const { allJobs } = useSelector(store => store.job);
  const dispatch = useDispatch();

  const visibleJobs = !user ? allJobs?.slice(0, 5) : allJobs;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header with better styling */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Search Results
          </h1>
          <p className="text-slate-500 mt-1">
            {!user && (allJobs?.length || 0) > 5
              ? `Showing 5 of ${allJobs?.length || 0} search results`
              : `${allJobs?.length || 0} jobs found`}
          </p>
        </div>
        <div className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
          <Briefcase className="w-4 h-4" />
          {visibleJobs?.length || 0} Jobs
        </div>
      </div>

      {/* Job Grid */}
      {visibleJobs?.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {visibleJobs.map((job) => (
              <Job key={job._id} job={job} />
            ))}
          </div>

          {/* Show premium login banner if user is unauthenticated and there are more than 5 jobs */}
          {!user && (allJobs?.length || 0) > 5 && (
            <LoginToViewMore 
              totalCount={allJobs?.length || 0} 
              remainingCount={(allJobs?.length || 0) - 5} 
            />
          )}
        </>
      ) : (
        <div className="text-center py-16 bg-slate-50/80 rounded-3xl border-2 border-dashed border-slate-200">
          <div className="flex flex-col items-center gap-3">
            <Briefcase className="w-16 h-16 text-slate-300" />
            <h3 className="text-xl font-semibold text-slate-600">No jobs found</h3>
            <p className="text-slate-400">Check back later for new opportunities</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Browse;
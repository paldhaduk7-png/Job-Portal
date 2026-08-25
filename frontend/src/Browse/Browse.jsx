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
        {/* Header with better styling */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200/70">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-800 bg-clip-text text-transparent">
                Browse Jobs
              </h1>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50/90 text-indigo-700 border border-indigo-200/80 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
                {visibleJobs?.length || 0} {visibleJobs?.length === 1 ? 'Opportunity' : 'Opportunities'}
              </span>
            </div>
            <p className="text-slate-500 text-sm mt-1.5">
              {!user
                ? `Showing ${visibleJobs?.length || 0} of ${allJobs?.length || 0} search results (Guest Preview)`
                : `Showing ${allJobs?.length || 0} available career opportunities`}
            </p>
          </div>
          <div className="bg-white/80 backdrop-blur-md text-indigo-700 px-4 py-2 rounded-xl text-xs font-semibold border border-indigo-100/80 shadow-xs flex items-center gap-2 self-start sm:self-auto">
            <Briefcase className="w-4 h-4 text-indigo-600" />
            <span>{allJobs?.length || 0} Total Active Listings</span>
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

            {/* Always show lock section for unauthenticated guests */}
            {!user && (
              <LoginToViewMore 
                totalCount={allJobs?.length || 0} 
                remainingCount={Math.max(0, (allJobs?.length || 0) - 5)} 
              />
            )}
          </>
        ) : (
          <div className="text-center py-16 bg-white/70 backdrop-blur-xl rounded-3xl border-2 border-dashed border-slate-200 shadow-sm">
            <div className="flex flex-col items-center gap-3">
              <Briefcase className="w-16 h-16 text-slate-300" />
              <h3 className="text-xl font-semibold text-slate-600">No jobs found</h3>
              <p className="text-slate-400 text-sm">Check back later for new opportunities</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
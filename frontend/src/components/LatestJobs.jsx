import React from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';
import { Briefcase, TrendingUp, ArrowRight, Sparkles, Zap, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import useGetAllHomeJobs from '@/hooks/useGetAllHomeJobs';

const LatestJobs = () => {
  useGetAllHomeJobs();
  const { allJobs } = useSelector(store => store.job);

  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Background Decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <div className="relative">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-full border border-purple-100/60 mb-4">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-700">Hot Opportunities 🔥</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                Latest & Top
              </span>
              <br className="sm:hidden" />
              <span className="text-slate-800">Job Openings</span>
            </h2>
            <p className="text-slate-500 mt-3 text-lg max-w-2xl">
              Discover the most recent job opportunities from top companies
            </p>
          </div>
          <Link 
            to="/jobs" 
            className="mt-4 lg:mt-0 inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 group hover:scale-105"
          >
            View All Jobs
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Job Cards Grid */}
      {allJobs?.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {allJobs.slice(0, 6).map((job, index) => (
              <div 
                key={job._id}
                style={{ animationDelay: `${index * 100}ms` }}
                className="animate-fadeInUp"
              >
                <LatestJobCards job={job} />
              </div>
            ))}
          </div>

          {/* View More Button */}
          {allJobs?.length > 6 && (
            <div className="text-center mt-12">
              <Link to="/browse">
                <button className="group relative px-10 py-4 bg-white border-2 border-purple-200 text-purple-600 font-semibold rounded-2xl hover:border-purple-400 transition-all duration-300 shadow-sm hover:shadow-xl overflow-hidden">
                  <span className="relative z-10 flex items-center gap-2">
                    Browse All Jobs
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </Link>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-20 bg-gradient-to-br from-slate-50 to-purple-50/30 rounded-3xl border-2 border-dashed border-purple-200">
          <div className="relative inline-block">
            <Briefcase className="w-20 h-20 text-purple-300 mx-auto mb-4" />
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-500 rounded-full animate-ping"></div>
          </div>
          <h3 className="text-2xl font-bold text-slate-700">No Jobs Available</h3>
          <p className="text-slate-400 mt-2">Check back later for new opportunities</p>
          <Link to="/jobs" className="inline-block mt-6 px-8 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors">
            Browse All Jobs
          </Link>
        </div>
      )}
    </section>
  );
};

export default LatestJobs;
import React from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';
import { Briefcase, TrendingUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const LatestJobs = () => {
  const { allJobs } = useSelector(store => store.job);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-6 h-6 text-purple-600" />
            <span className="text-sm font-medium text-purple-600 uppercase tracking-wider">Latest Openings</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold">
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Latest & Top
            </span>{" "}
            Job Openings
          </h2>
          <p className="text-slate-500 mt-2">
            Discover the most recent job opportunities from top companies
          </p>
        </div>
        <Link 
          to="/browse" 
          className="mt-4 sm:mt-0 inline-flex items-center gap-2 text-purple-600 font-semibold hover:text-purple-700 transition-colors group"
        >
          View All Jobs
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Job Cards Grid */}
      {allJobs?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allJobs.slice(0, 6).map((job) => (
            <LatestJobCards key={job._id} job={job} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
          <Briefcase className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-600">No Jobs Available</h3>
          <p className="text-slate-400 mt-2">Check back later for new opportunities</p>
        </div>
      )}

      {/* View More Button (if more than 6 jobs) */}
      {allJobs?.length > 6 && (
        <div className="text-center mt-10">
          <Link to="/browse">
            <button className="px-8 py-3 bg-white border-2 border-purple-200 text-purple-600 font-semibold rounded-xl hover:bg-purple-50 hover:border-purple-300 transition-all duration-300 shadow-sm hover:shadow-md">
              Browse All Jobs
            </button>
          </Link>
        </div>
      )}
    </section>
  );
};

export default LatestJobs;
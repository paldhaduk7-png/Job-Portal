import React from "react";
import Job from "@/Job/Job";
import { useSelector } from "react-redux";
import { FileText, Sparkles, ArrowRight, Briefcase } from "lucide-react";
import useGetAppliedJob from "@/hooks/useGetAppliedJob";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AppliedJob = () => {
  useGetAppliedJob();
  const { allAppliedJob } = useSelector((store) => store.job);

  return (
    <div className="relative min-h-screen bg-[#fafbff] py-8 px-4 sm:px-6 lg:px-8 overflow-hidden pb-16">
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
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200/70">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Applied Jobs
              </h1>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50/90 text-blue-700 border border-blue-200/80 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
                {allAppliedJob?.length || 0} {allAppliedJob?.length === 1 ? 'Job' : 'Jobs'} Applied
              </span>
            </div>
            <p className="text-slate-500 text-sm mt-1.5 font-normal">
              Review and monitor the status of all your submitted job applications.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            <Link to="/jobs">
              <Button
                variant="outline"
                size="sm"
                className="rounded-xl text-xs font-semibold text-indigo-700 hover:text-indigo-800 bg-white hover:bg-indigo-50 border-indigo-200/80 flex items-center gap-1.5 shadow-2xs h-9 px-3.5 transition-all"
              >
                <Briefcase className="w-3.5 h-3.5 text-indigo-600" />
                <span>Explore More Jobs</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Applied Jobs Grid */}
        {allAppliedJob?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {allAppliedJob.map((application) => (
                <motion.div
                  key={application._id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                >
                  <Job job={application.job} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20 px-6 bg-white/90 rounded-3xl border-2 border-dashed border-slate-200 shadow-xs backdrop-blur-sm">
            <div className="flex flex-col items-center gap-4 max-w-md mx-auto">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center ring-8 ring-blue-50/50">
                <FileText className="w-8 h-8 stroke-[1.5]" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 tracking-tight">No Applied Jobs Yet</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                You haven't submitted any job applications yet. Browse the latest job openings and apply with 1-click.
              </p>
              <Link to="/jobs">
                <Button
                  className="mt-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl text-sm font-semibold px-6 shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all flex items-center gap-2"
                >
                  <span>Browse Jobs Now</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AppliedJob;
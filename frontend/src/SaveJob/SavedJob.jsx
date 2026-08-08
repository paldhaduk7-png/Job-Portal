import React from "react";
import { useSelector } from "react-redux";
import Job from "../Job/Job";
import { motion, AnimatePresence } from "framer-motion";
import { Bookmark, Sparkles, ArrowRight, Briefcase } from "lucide-react";
import useGetSavedJobs from "@/hooks/useGetSavedJobs";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const SavedJob = () => {
  useGetSavedJobs();
  const { savedJobs } = useSelector((store) => store.savedJob);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50/90 via-indigo-50/20 to-slate-50/80 relative overflow-hidden pb-16">
      
      {/* Background Ambient Glows & Mesh Lighting */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[600px] h-[380px] bg-gradient-to-tr from-indigo-500/12 via-purple-500/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-32 right-10 w-[500px] h-[400px] bg-gradient-to-bl from-pink-500/10 via-indigo-400/8 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200/70">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Saved Jobs
              </h1>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50/90 text-indigo-700 border border-indigo-200/80 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse"></span>
                {savedJobs?.length || 0} {savedJobs?.length === 1 ? 'Job' : 'Jobs'} Saved
              </span>
            </div>
            <p className="text-slate-500 text-sm mt-1.5 font-normal">
              Quickly access and review all the opportunities you've bookmarked for later.
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

        {/* Saved Jobs Grid (Standard 3-Column Grid Matching Browse & Job Cards) */}
        {savedJobs?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {savedJobs.map((job) => (
                <motion.div
                  key={job._id}
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
        ) : (
          /* Empty State */
          <div className="text-center py-20 px-6 bg-white/90 rounded-3xl border-2 border-dashed border-slate-200 shadow-xs backdrop-blur-sm">
            <div className="flex flex-col items-center gap-4 max-w-md mx-auto">
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center ring-8 ring-indigo-50/50">
                <Bookmark className="w-8 h-8 stroke-[1.5]" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 tracking-tight">No Saved Jobs Yet</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Save jobs while exploring and they'll appear here so you can easily review and apply to them later.
              </p>
              <Link to="/jobs">
                <Button
                  className="mt-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl text-sm font-semibold px-6 shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all flex items-center gap-2"
                >
                  <span>Browse Available Jobs</span>
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

export default SavedJob;
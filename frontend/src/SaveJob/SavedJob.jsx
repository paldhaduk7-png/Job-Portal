import React from "react";
import { useSelector } from "react-redux";
import Job from "../Job/job";
import { motion } from "framer-motion";
import { Bookmark } from "lucide-react";
const SavedJob = () => {
  const { savedJobs } = useSelector((store) => store.savedJob);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Saved Jobs
          </h1>
          <p className="text-slate-500 mt-1">
            {savedJobs?.length || 0} saved jobs
          </p>
        </div>

        <div className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
          <Bookmark className="w-4 h-4 fill-current" />
          {savedJobs?.length || 0} Saved
        </div>
      </div>

      {/* Jobs */}
      {savedJobs?.length > 0 ? (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          {savedJobs.map((job) => (
            <motion.div
              key={job._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Job job={job} />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
          <div className="flex flex-col items-center gap-4">
            <Bookmark className="w-16 h-16 text-slate-300" />

            <h2 className="text-2xl font-semibold text-slate-700">
              No Saved Jobs
            </h2>

            <p className="text-slate-500 max-w-md">
              Save jobs while browsing and they'll appear here for easy access later.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedJob;
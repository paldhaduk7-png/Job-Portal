import React from "react";
import Job from "@/Job/job";
import { useSelector } from "react-redux";
import { FileText } from "lucide-react";
import useGetAppliedJob from "@/hooks/useGetAppliedJob";
const AppliedJob = () => {
useGetAppliedJob();

const { allAppliedJob } = useSelector((store) => store.job);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Applied Jobs
          </h1>
          <p className="text-slate-500 mt-1">
            {allAppliedJob?.length || 0} applied jobs
          </p>
        </div>

        <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
          <FileText className="w-4 h-4" />
          {allAppliedJob?.length || 0} Applied
        </div>
      </div>

      {/* Applied Jobs */}
      {allAppliedJob?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {allAppliedJob.map((application) => (
            <Job
              key={application._id}
              job={application.job}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-slate-50/80 rounded-3xl border-2 border-dashed border-slate-200">
          <div className="flex flex-col items-center gap-3">
            <FileText className="w-16 h-16 text-slate-300" />
            <h3 className="text-xl font-semibold text-slate-600">
              No Applied Jobs
            </h3>
            <p className="text-slate-400">
              You haven't applied for any jobs yet.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppliedJob;
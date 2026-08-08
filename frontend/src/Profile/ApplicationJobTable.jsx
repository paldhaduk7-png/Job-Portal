import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useSelector } from "react-redux";
import { 
  Briefcase, 
  Building2, 
  Calendar, 
  ArrowUpRight, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Sparkles,
  MapPin
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ApplicationJobTable = () => {
  const { allAppliedJob } = useSelector((store) => store.job);
  const navigate = useNavigate();

  const getStatusConfig = (status) => {
    const s = String(status || "pending").toLowerCase();
    const config = {
      pending: {
        badgeClass: "bg-amber-50 text-amber-700 border-amber-200/80 ring-amber-100",
        dotColor: "bg-amber-500",
        label: "Pending",
        icon: Clock,
      },
      accepted: {
        badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200/80 ring-emerald-100",
        dotColor: "bg-emerald-500",
        label: "Accepted",
        icon: CheckCircle2,
      },
      rejected: {
        badgeClass: "bg-rose-50 text-rose-700 border-rose-200/80 ring-rose-100",
        dotColor: "bg-rose-500",
        label: "Rejected",
        icon: XCircle,
      },
      interview: {
        badgeClass: "bg-blue-50 text-blue-700 border-blue-200/80 ring-blue-100",
        dotColor: "bg-blue-500",
        label: "Interview Scheduled",
        icon: Sparkles,
      },
    };
    return config[s] || config.pending;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Recent";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateString.split("T")[0] || "Recent";
    }
  };

  return (
    <div className="w-full bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50/80 border-b border-slate-200/70 hover:bg-slate-50/80">
              <TableHead className="py-4 pl-6 font-bold text-slate-700 text-xs uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-indigo-600" />
                  <span>Applied Date</span>
                </div>
              </TableHead>
              <TableHead className="py-4 font-bold text-slate-700 text-xs uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-indigo-600" />
                  <span>Job Role</span>
                </div>
              </TableHead>
              <TableHead className="py-4 font-bold text-slate-700 text-xs uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-indigo-600" />
                  <span>Company & Location</span>
                </div>
              </TableHead>
              <TableHead className="py-4 font-bold text-slate-700 text-xs uppercase tracking-wider text-center">
                <span>Application Status</span>
              </TableHead>
              <TableHead className="py-4 pr-6 font-bold text-slate-700 text-xs uppercase tracking-wider text-right">
                <span>Action</span>
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-slate-100">
            {allAppliedJob?.length > 0 ? (
              allAppliedJob.map((appliedJob) => {
                const statusConfig = getStatusConfig(appliedJob?.status);
                const StatusIcon = statusConfig.icon;
                const job = appliedJob?.job;

                return (
                  <TableRow
                    key={appliedJob?._id}
                    onClick={() => {
                      if (job?._id) {
                        navigate(`/description/${job._id}`);
                      }
                    }}
                    className="hover:bg-indigo-50/40 transition-all duration-200 cursor-pointer group"
                  >
                    {/* Date */}
                    <TableCell className="py-4 pl-6 text-xs sm:text-sm font-medium text-slate-500">
                      <div className="inline-flex items-center gap-1.5 bg-slate-100/80 px-2.5 py-1 rounded-lg text-slate-600">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{formatDate(appliedJob?.createdAt)}</span>
                      </div>
                    </TableCell>

                    {/* Job Role Title */}
                    <TableCell className="py-4">
                      <div>
                        <p className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors text-sm sm:text-base">
                          {job?.title || "Role Title"}
                        </p>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {job?.jobType || "Full-Time"} • {job?.salary ? `${job.salary} LPA` : "Negotiable"}
                        </p>
                      </div>
                    </TableCell>

                    {/* Company & Location */}
                    <TableCell className="py-4 text-sm text-slate-600">
                      <div>
                        <p className="font-semibold text-slate-800 text-xs sm:text-sm">
                          {job?.company?.name || "Company"}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-slate-400 mt-0.5">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          <span>{job?.location || "Remote"}</span>
                        </div>
                      </div>
                    </TableCell>

                    {/* Application Status Badge */}
                    <TableCell className="py-4 text-center">
                      <Badge
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border shadow-2xs ${statusConfig.badgeClass}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${statusConfig.dotColor} animate-pulse`}></span>
                        <StatusIcon className="w-3.5 h-3.5" />
                        <span>{statusConfig.label}</span>
                      </Badge>
                    </TableCell>

                    {/* Action */}
                    <TableCell className="py-4 pr-6 text-right">
                      <button 
                        className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50/80 hover:bg-indigo-100 px-3 py-1.5 rounded-xl border border-indigo-200/60 transition-all shadow-2xs group-hover:translate-x-0.5"
                      >
                        <span>Details</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-16">
                  <div className="flex flex-col items-center gap-3 max-w-sm mx-auto">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center ring-8 ring-indigo-50/50">
                      <Briefcase className="w-7 h-7" />
                    </div>
                    <p className="text-base font-bold text-slate-800">No Job Applications Yet</p>
                    <p className="text-xs sm:text-sm text-slate-400">
                      When you apply to jobs across the portal, your application records and status will be updated here in real-time.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ApplicationJobTable;
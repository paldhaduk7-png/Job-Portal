import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useSelector } from "react-redux";
import { Briefcase, Building2, Calendar, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ApplicationJobTable = () => {
  const { allAppliedJob } = useSelector(store => store.job);
  const navigate = useNavigate();

  const getStatusConfig = (status) => {
    const config = {
      'pending': { 
        color: 'bg-yellow-100 text-yellow-700 border-yellow-200',
        label: 'Pending',
        icon: '⏳'
      },
      'accepted': { 
        color: 'bg-green-100 text-green-700 border-green-200',
        label: 'Accepted',
        icon: '✅'
      },
      'rejected': { 
        color: 'bg-red-100 text-red-700 border-red-200',
        label: 'Rejected',
        icon: '❌'
      },
      'interview': { 
        color: 'bg-blue-100 text-blue-700 border-blue-200',
        label: 'Interview',
        icon: '🎯'
      }
    };
    return config[status?.toLowerCase()] || config['pending'];
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
      <div className="p-6">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-slate-50 to-purple-50/50 hover:bg-transparent">
                <TableHead className="font-semibold text-slate-700">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-purple-600" />
                    Date
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-slate-700">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-purple-600" />
                    Job Role
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-slate-700">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-purple-600" />
                    Company
                  </div>
                </TableHead>
                <TableHead className="text-right font-semibold text-slate-700">Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {allAppliedJob?.length > 0 ? (
                allAppliedJob.map((appliedJob) => {
                  const statusConfig = getStatusConfig(appliedJob?.status);
                  return (
                    <TableRow 
                      key={appliedJob._id} 
                      className="hover:bg-purple-50/30 transition-colors cursor-pointer group"
                      onClick={() => navigate(`/description/${appliedJob?.job?._id}`)}
                    >
                      <TableCell className="py-4 text-sm text-slate-600">
                        {formatDate(appliedJob?.createdAt)}
                      </TableCell>
                      <TableCell className="py-4">
                        <span className="font-medium text-slate-800 group-hover:text-purple-600 transition-colors">
                          {appliedJob?.job?.title || 'N/A'}
                        </span>
                      </TableCell>
                      <TableCell className="py-4 text-sm text-slate-600">
                        {appliedJob?.job?.company?.name || 'N/A'}
                      </TableCell>
                      <TableCell className="text-right py-4">
                        <Badge 
                          className={`${statusConfig.color} border px-4 py-1.5 rounded-full text-xs font-medium flex items-center justify-end gap-1.5 w-fit ml-auto`}
                        >
                          <span>{statusConfig.icon}</span>
                          {statusConfig.label}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-12">
                    <div className="flex flex-col items-center gap-3">
                      <Briefcase className="w-12 h-12 text-slate-300" />
                      <div>
                        <p className="text-slate-600 font-medium">No applications yet</p>
                        <p className="text-sm text-slate-400">Start applying to jobs to see them here</p>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>

            <TableCaption className="text-slate-400">
              {allAppliedJob?.length > 0 ? 'A list of your applied jobs' : 'Start your job search today'}
            </TableCaption>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ApplicationJobTable;
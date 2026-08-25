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
import { Briefcase, Users, Eye, Edit2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const RecruiterPostedJobs = () => {
  const { allAdminJobs } = useSelector(store => store.job);
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    const colors = {
      'active': 'bg-green-100 text-green-700',
      'inactive': 'bg-gray-100 text-gray-700',
      'closed': 'bg-red-100 text-red-700',
      'draft': 'bg-yellow-100 text-yellow-700'
    };
    return colors[status?.toLowerCase()] || 'bg-green-100 text-green-700';
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return date.split("T")[0];
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </TableHead>
              <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Job Role
              </TableHead>
              <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </TableHead>
              <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Job Type
              </TableHead>
              <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                Applicants
              </TableHead>
              <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                Status
              </TableHead>
              <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider text-right">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {allAdminJobs?.length > 0 ? (
              allAdminJobs.map((job) => (
                <TableRow 
                  key={job._id} 
                  className="hover:bg-blue-50/30 transition-colors"
                >
                  <TableCell className="py-3 text-sm text-gray-600">
                    {formatDate(job?.createdAt)}
                  </TableCell>
                  <TableCell className="py-3">
                    <span className="font-medium text-gray-800">
                      {job?.title || 'N/A'}
                    </span>
                  </TableCell>
                  <TableCell className="py-3 text-sm text-gray-600">
                    {job?.location || 'Remote'}
                  </TableCell>
                  <TableCell className="py-3">
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                      {job?.jobType || 'Full-time'}
                    </span>
                  </TableCell>
                  <TableCell className="py-3 text-center">
                    <button
                      onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-700 transition-colors font-medium text-xs cursor-pointer"
                      title="View Applicants"
                    >
                      <Users className="w-3.5 h-3.5" />
                      <span>{job?.applications?.length || 0}</span>
                    </button>
                  </TableCell>
                  <TableCell className="py-3 text-center">
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusColor(job?.status)}`}>
                      {job?.status || 'Active'}
                    </span>
                  </TableCell>
                  <TableCell className="py-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                        className="h-8 px-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        title="View Applicants"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        <span className="text-xs">Applicants</span>
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => navigate(`/admin/job/update/${job._id}`)}
                        className="h-8 w-8 p-0 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                        title="Edit Job"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="py-10 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <Briefcase className="h-10 w-10 text-gray-300" />
                    <p className="text-sm text-gray-400">No jobs posted yet</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>

          <TableCaption className="text-xs text-gray-400">
            {allAdminJobs?.length > 0 ? `${allAdminJobs.length} jobs posted` : 'Start posting jobs'}
          </TableCaption>
        </Table>
      </div>
    </div>
  );
};

export default RecruiterPostedJobs;
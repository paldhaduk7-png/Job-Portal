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
import { Briefcase, Calendar, MapPin, Users, Clock, Eye } from "lucide-react";
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
                  <TableCell className="py-3 text-center text-sm text-gray-600">
                    {job?.applicants?.length || 0}
                  </TableCell>
                  <TableCell className="py-3 text-center">
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusColor(job?.status)}`}>
                      {job?.status || 'Active'}
                    </span>
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
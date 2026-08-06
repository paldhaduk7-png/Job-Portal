import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Edit2,
  Eye,
  MoreHorizontal,
  Calendar,
  Briefcase,
  MapPin,
  Plus
} from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import JobDelete from './crud/JobDelete'
import { Button } from '@/components/ui/button'

const AdminJobsTabel = () => {
  const navigate = useNavigate();
  const { allAdminJobs, searchJobsByText } = useSelector(store => store.job)
  const [filterJobs, setFilterJobs] = useState(allAdminJobs || []);

  useEffect(() => {
    const filterJob = allAdminJobs?.length >= 0 && allAdminJobs.filter((jobs) => {
      if (!searchJobsByText) {
        return true;
      }
      return jobs?.title?.toLowerCase().includes(searchJobsByText.toLowerCase()) ||
        jobs?.company?.name?.toLowerCase().includes(searchJobsByText.toLowerCase());
    });
    setFilterJobs(filterJob || []);
  }, [allAdminJobs, searchJobsByText])

  const getInitials = (name) => {
    if (!name) return '?'
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2)
  }

  const getDate = (date) => {
    if (!date) return 'N/A'
    return date.split("T")[0]
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableCaption className="text-gray-400">
          {filterJobs?.length > 0 
            ? `Showing ${filterJobs.length} job${filterJobs.length > 1 ? 's' : ''}` 
            : 'List of your resent posted jobs'}
        </TableCaption>

        <TableHeader className="bg-gray-50">
          <TableRow className="hover:bg-gray-50">
            <TableHead className="font-semibold text-gray-600 text-xs uppercase tracking-wider">
              Logo
            </TableHead>
            <TableHead className="font-semibold text-gray-600 text-xs uppercase tracking-wider">
              Company name
            </TableHead>
            <TableHead className="font-semibold text-gray-600 text-xs uppercase tracking-wider">
              Role
            </TableHead>
            <TableHead className="font-semibold text-gray-600 text-xs uppercase tracking-wider">
              Date
            </TableHead>
            <TableHead className="font-semibold text-gray-600 text-xs uppercase tracking-wider text-right">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filterJobs?.length > 0 ? (
            filterJobs?.map((job) => (
              <TableRow 
                key={job._id} 
                className="hover:bg-orange-50/50 transition-colors group"
              >
                <TableCell className="py-3">
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 border-2 border-gray-100 group-hover:border-orange-200 transition-colors">
                      {job?.company?.logo ? (
                        <AvatarImage src={job?.company?.logo} alt="logo" />
                      ) : (
                        <AvatarFallback className="bg-gradient-to-br from-orange-100 to-orange-200 text-orange-700 font-semibold">
                          {getInitials(job?.company?.name)}
                        </AvatarFallback>
                      )}
                    </Avatar>
                  </div>
                </TableCell>

                <TableCell>
                  <div>
                    <div className="font-medium text-gray-900 group-hover:text-orange-700 transition-colors">
                      {job?.company?.name || 'Unnamed Company'}
                    </div>
                    <div className="text-xs text-gray-400 flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {job?.location || 'Remote'}
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <div>
                    <div className="font-medium text-gray-900">
                      {job?.title}
                    </div>
                    <div className="text-xs text-gray-400">
                      {job?.jobType || 'Full-time'}
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3.5 w-3.5 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {getDate(job?.createdAt)}
                    </span>
                  </div>
                </TableCell>

                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-orange-100 hover:text-orange-700 transition-colors"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent className="w-48 p-2 border-gray-200 shadow-lg">
                      <div className="flex flex-col gap-1">
                        {/* Edit */}
                        <button
                          onClick={() => navigate(`/admin/job/update/${job._id}`)}
                          className="flex items-center gap-3 w-full px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors"
                        >
                          <Edit2 className="h-4 w-4" />
                          <span>Edit</span>
                        </button>

                        {/* View Applicants */}
                        <button
                          onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                          className="flex items-center gap-3 w-full px-3 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-lg transition-colors"
                        >
                          <Eye className="h-4 w-4" />
                          <span>Applicants</span>
                        </button>

                        <div className="border-t border-gray-100 my-1"></div>

                        {/* Delete */}
                        <JobDelete jobId={job._id} />
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="py-12 text-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="bg-gray-100 p-4 rounded-full">
                    <Briefcase className="h-8 w-8 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-gray-600 font-medium">You haven't posted any jobs yet.</p>
                    <p className="text-sm text-gray-400 mt-1">
                      {searchJobsByText 
                        ? `No results for "${searchJobsByText}"` 
                        : 'Get started by creating your first job posting'}
                    </p>
                  </div>
                  {!searchJobsByText && (
                    <Button 
                      onClick={() => navigate("/admin/jobs/create")}
                      className="mt-2 bg-orange-500 hover:bg-orange-600"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Post New Job
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default AdminJobsTabel
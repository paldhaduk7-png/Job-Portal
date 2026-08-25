import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Table, TableCaption, TableBody, TableCell, TableHead, TableRow, TableHeader } from '@/components/ui/table'
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { MoreHorizontal, Eye, Mail, Phone, FileText, Calendar, CheckCircle, XCircle, Clock, User, Download } from 'lucide-react';
import React from 'react'
import { toast } from 'sonner';
import { useSelector } from 'react-redux'
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const sortListing = ["Accepted", "Rejected"];

const ApplicantsTabel = () => {

  const { allApplicants } = useSelector(store => store.application);

  const statusHandler = async (status, id) => {
    try {
      const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status }, { withCredentials: true });
      if (res.data.success) {
        toast.success(res?.data?.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }

  const getStatusColor = (status) => {
    const colors = {
      'Accepted': 'bg-green-100 text-green-700 border-green-200',
      'Rejected': 'bg-red-100 text-red-700 border-red-200',
      'Pending': 'bg-yellow-100 text-yellow-700 border-yellow-200',
      'Shortlisted': 'bg-blue-100 text-blue-700 border-blue-200'
    }
    return colors[status] || 'bg-gray-100 text-gray-700 border-gray-200'
  }

  const getInitials = (name) => {
    if (!name) return '?'
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2)
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableCaption className="text-gray-400">
          {allApplicants?.applications?.length > 0 
            ? `Showing ${allApplicants.applications.length} applicant${allApplicants.applications.length > 1 ? 's' : ''}` 
            : 'A list of recent applied users'}
        </TableCaption>

        <TableHeader className="bg-gray-50">
          <TableRow className="hover:bg-gray-50">
            <TableHead className="font-semibold text-gray-600 text-xs uppercase tracking-wider">
              FullName
            </TableHead>
            <TableHead className="font-semibold text-gray-600 text-xs uppercase tracking-wider">
              Email
            </TableHead>
            <TableHead className="font-semibold text-gray-600 text-xs uppercase tracking-wider">
              Contact
            </TableHead>
            <TableHead className="font-semibold text-gray-600 text-xs uppercase tracking-wider">
              Resume
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
          {allApplicants && allApplicants.applications?.length > 0 ? (
            allApplicants.applications?.map((item) => (
              <TableRow 
                key={item._id} 
                className="hover:bg-indigo-50/50 transition-colors group"
              >
                <TableCell className="py-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 border-2 border-gray-100 group-hover:border-indigo-200 transition-colors">
                      {item?.applicant?.profile?.profilePhoto ? (
                        <AvatarImage src={item?.applicant?.profile?.profilePhoto} alt={item?.applicant?.fullname} />
                      ) : (
                        <AvatarFallback className="bg-gradient-to-br from-indigo-100 to-indigo-200 text-indigo-700 font-semibold">
                          {getInitials(item?.applicant?.fullname)}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div>
                      <div className="font-medium text-gray-900 group-hover:text-indigo-700 transition-colors">
                        {item?.applicant?.fullname || 'Unknown'}
                      </div>
                      <div className="text-xs text-gray-400">
                        {item?.status && (
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                            {item.status}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {item?.applicant?.email || 'N/A'}
                    </span>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {item?.applicant?.phoneNumber || 'N/A'}
                    </span>
                  </div>
                </TableCell>

                <TableCell>
                  {item?.applicant?.profile?.resume ? (
                    <a
                      className="flex items-center gap-1.5 text-indigo-600 hover:text-indigo-800 hover:underline transition-colors cursor-pointer text-sm"
                      href={`https://docs.google.com/viewer?url=${encodeURIComponent(item?.applicant?.profile?.resume)}&embedded=true`}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <FileText className="h-3.5 w-3.5" />
                      {item?.applicant?.profile?.resumeOriginalName || 'View Resume'}
                    </a>
                  ) : (
                    <span className="text-gray-400 text-sm flex items-center gap-1.5">
                      <FileText className="h-3.5 w-3.5" />
                      NA
                    </span>
                  )}
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3.5 w-3.5 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {item?.applicant?.createdAt ? item?.applicant?.createdAt.split("T")[0] : 'N/A'}
                    </span>
                  </div>
                </TableCell>

                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-indigo-100 hover:text-indigo-700 transition-colors"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent className="w-48 p-2 bg-white/95 backdrop-blur-xl border border-slate-200/80 shadow-xl rounded-2xl">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2.5 py-1 mb-1">
                        Application Status
                      </div>
                      <div className="flex flex-col gap-1">
                        {sortListing.map((status, index) => {
                          const isActive = item.status === status
                          const Icon = status === 'Accepted' ? CheckCircle : XCircle
                          const color = status === 'Accepted' 
                            ? 'text-emerald-700 hover:bg-emerald-50' 
                            : 'text-rose-700 hover:bg-rose-50'
                          
                          return (
                            <button
                              key={index}
                              onClick={() => statusHandler(status, item._id)}
                              className={`flex items-center justify-between w-full px-2.5 py-2 text-xs font-semibold rounded-xl transition-all duration-150 cursor-pointer ${
                                isActive 
                                  ? status === 'Accepted'
                                    ? 'bg-emerald-50 text-emerald-700 cursor-default font-bold'
                                    : 'bg-rose-50 text-rose-700 cursor-default font-bold'
                                  : color
                              }`}
                              disabled={isActive}
                            >
                              <div className="flex items-center gap-2">
                                <Icon className={`h-4 w-4 ${status === 'Accepted' ? 'text-emerald-600' : 'text-rose-600'}`} />
                                <span>{status}</span>
                              </div>
                              {isActive && (
                                <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${status === 'Accepted' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                              )}
                            </button>
                          )
                        })}
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="py-12 text-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="bg-gray-100 p-4 rounded-full">
                    <User className="h-8 w-8 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-gray-600 font-medium">No applicants yet</p>
                    <p className="text-sm text-gray-400 mt-1">
                      No one has applied for this position yet
                    </p>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default ApplicantsTabel
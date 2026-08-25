import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchJobsByText } from '@/redux/jobSlice'
import AdminJobsTabel from './AdminJobsTabel'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { Briefcase, Plus, Search, X, Users, Building2, CheckCircle2 } from 'lucide-react'

const AdminJobs = () => {
  useGetAllAdminJobs();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [serach, setSearch] = useState("");

  const { allAdminJobs } = useSelector(store => store.job);

  const totalJobs = allAdminJobs?.length || 0;
  const activeJobs = allAdminJobs?.filter(job => !job.status || job.status.toLowerCase() === 'active').length || 0;
  const totalApplications = allAdminJobs?.reduce((total, job) => total + (job?.applications?.length || 0), 0) || 0;

  useEffect(() => {
    dispatch(setSearchJobsByText(serach));
  }, [serach])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-orange-100 p-2.5 rounded-xl">
              <Briefcase className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Jobs</h1>
              <p className="text-sm text-gray-500">Manage your job postings</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          {/* Total Jobs */}
          <div className="group relative bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">Total Jobs</p>
                <p className="text-3xl font-extrabold text-gray-900 mt-2">{totalJobs}</p>
                <div className="flex items-center gap-2 mt-3">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded-full">
                    <span className="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full" />
                    {totalJobs === 1 ? '1 job posted' : `${totalJobs} jobs posted`}
                  </span>
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3.5 rounded-2xl shadow-md shadow-blue-500/20 text-white">
                <Briefcase className="h-6 w-6" />
              </div>
            </div>
          </div>

          {/* Active Jobs */}
          <div className="group relative bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-green-600 uppercase tracking-wider">Active Jobs</p>
                <p className="text-3xl font-extrabold text-gray-900 mt-2">{activeJobs}</p>
                <div className="flex items-center gap-2 mt-3">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 rounded-full">
                    <span className="inline-block w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                    {activeJobs === 1 ? '1 active opening' : `${activeJobs} active openings`}
                  </span>
                </div>
              </div>
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-3.5 rounded-2xl shadow-md shadow-emerald-500/20 text-white">
                <CheckCircle2 className="h-6 w-6" />
              </div>
            </div>
          </div>

          {/* Total Applications */}
          <div className="group relative bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-purple-600 uppercase tracking-wider">Total Applications</p>
                <p className="text-3xl font-extrabold text-gray-900 mt-2">{totalApplications}</p>
                <div className="flex items-center gap-2 mt-3">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-purple-700 bg-purple-50 border border-purple-100 px-2.5 py-0.5 rounded-full">
                    <span className="inline-block w-1.5 h-1.5 bg-purple-500 rounded-full" />
                    {totalApplications === 1 ? '1 applicant' : `${totalApplications} total applicants`}
                  </span>
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-3.5 rounded-2xl shadow-md shadow-purple-500/20 text-white">
                <Users className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                className="pl-9 h-10 border-gray-200 focus:border-orange-500 focus:ring-orange-500 w-full"
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Filter by name, role"
                value={serach}
              />
              {serach && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <Button 
              onClick={() => navigate("/admin/jobs/create")} 
              className="cursor-pointer bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white w-full sm:w-auto h-10 px-6"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Jobs
            </Button>
          </div>
        </div>

        {/* Jobs Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <AdminJobsTabel />
        </div>

        {/* Footer */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-400">
            List of your resent posted jobs • {new Date().getFullYear()} JobPortal
          </p>
        </div>
      </div>
    </div>
  )
}

export default AdminJobs
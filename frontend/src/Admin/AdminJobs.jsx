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
    <div className="relative min-h-screen bg-[#fafbff] py-8 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Dynamic Ambient Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top-Left Indigo Glow Orb */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-br from-indigo-400/25 to-purple-400/20 rounded-full blur-3xl" />
        
        {/* Top-Right Violet Glow Orb */}
        <div className="absolute top-1/4 -right-20 w-[30rem] h-[30rem] bg-gradient-to-bl from-purple-400/20 via-pink-300/15 to-transparent rounded-full blur-3xl" />
        
        {/* Center-Bottom Soft Cyan/Blue Orb */}
        <div className="absolute -bottom-28 left-1/3 w-[36rem] h-[36rem] bg-gradient-to-tr from-blue-300/20 to-indigo-200/20 rounded-full blur-3xl" />

        {/* Subtle Modern Dot-Matrix Grid Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.35]" 
          style={{
            backgroundImage: `radial-gradient(circle, #6366f1 1px, transparent 1px)`,
            backgroundSize: '32px 32px'
          }}
        />
        
        {/* Radial vignette mask to fade grid smoothly */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#fafbff]/80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-amber-500 to-indigo-500 rounded-2xl blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-white/90 backdrop-blur-xl p-3.5 rounded-2xl shadow-lg border border-white/60">
                <Briefcase className="h-7 w-7 text-orange-600" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-800 bg-clip-text text-transparent">
                  Jobs
                </h1>
                <span className="text-xs font-semibold text-orange-700 bg-orange-50 border border-orange-100/80 px-2.5 py-0.5 rounded-full shadow-sm">
                  Admin
                </span>
              </div>
              <p className="text-sm text-slate-500 flex items-center gap-2 mt-1">
                <span className="inline-block w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                Manage your job postings and applicants
              </p>
            </div>
          </div>

          <Button 
            onClick={() => navigate("/admin/jobs/create")} 
            className="cursor-pointer bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300 w-full sm:w-auto h-11 px-6 rounded-xl font-medium"
          >
            <Plus className="h-5 w-5 mr-2" />
            Post New Job
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          {/* Total Jobs */}
          <div className="group relative bg-white/75 backdrop-blur-xl rounded-2xl border border-white/80 p-6 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-indigo-500/15 transition-all duration-300 hover:-translate-y-1">
            <div className="absolute top-0 right-0 w-28 h-28 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all duration-500" />
            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Total Jobs</p>
                <p className="text-3xl font-extrabold text-slate-900 mt-2">{totalJobs}</p>
                <div className="flex items-center gap-2 mt-3">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-700 bg-indigo-50/90 border border-indigo-100 px-2.5 py-0.5 rounded-full">
                    <span className="inline-block w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                    {totalJobs === 1 ? '1 job posted' : `${totalJobs} jobs posted`}
                  </span>
                </div>
              </div>
              <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 p-4 rounded-2xl shadow-lg shadow-indigo-500/30 group-hover:scale-110 transition-transform duration-300 text-white">
                <Briefcase className="h-6 w-6" />
              </div>
            </div>
          </div>

          {/* Active Jobs */}
          <div className="group relative bg-white/75 backdrop-blur-xl rounded-2xl border border-white/80 p-6 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-emerald-500/15 transition-all duration-300 hover:-translate-y-1">
            <div className="absolute top-0 right-0 w-28 h-28 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all duration-500" />
            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Active Jobs</p>
                <p className="text-3xl font-extrabold text-slate-900 mt-2">{activeJobs}</p>
                <div className="flex items-center gap-2 mt-3">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50/90 border border-emerald-100 px-2.5 py-0.5 rounded-full">
                    <span className="inline-block w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                    {activeJobs === 1 ? '1 active opening' : `${activeJobs} active openings`}
                  </span>
                </div>
              </div>
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-4 rounded-2xl shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform duration-300 text-white">
                <CheckCircle2 className="h-6 w-6" />
              </div>
            </div>
          </div>

          {/* Total Applications */}
          <div className="group relative bg-white/75 backdrop-blur-xl rounded-2xl border border-white/80 p-6 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-purple-500/15 transition-all duration-300 hover:-translate-y-1">
            <div className="absolute top-0 right-0 w-28 h-28 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all duration-500" />
            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-purple-600 uppercase tracking-wider">Total Applications</p>
                <p className="text-3xl font-extrabold text-slate-900 mt-2">{totalApplications}</p>
                <div className="flex items-center gap-2 mt-3">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-purple-700 bg-purple-50/90 border border-purple-100 px-2.5 py-0.5 rounded-full">
                    <span className="inline-block w-1.5 h-1.5 bg-purple-500 rounded-full" />
                    {totalApplications === 1 ? '1 applicant' : `${totalApplications} total applicants`}
                  </span>
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-4 rounded-2xl shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform duration-300 text-white">
                <Users className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-white/80 p-4 mb-6 shadow-xl shadow-slate-200/40">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                className="pl-10 pr-10 h-11 bg-slate-50/70 border-slate-200/80 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-xl transition-all duration-200 w-full"
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Filter by name, role..."
                value={serach}
              />
              {serach && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="text-xs text-slate-500 font-medium hidden sm:flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Live search active
            </div>
          </div>
        </div>

        {/* Jobs Table */}
        <div className="bg-white/85 backdrop-blur-xl rounded-2xl border border-white/80 overflow-hidden shadow-xl shadow-slate-200/40">
          <div className="relative">
            <div className="h-1 bg-gradient-to-r from-orange-500 via-amber-500 to-indigo-500" />
            <AdminJobsTabel />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 px-1">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
              All jobs loaded
            </span>
            <span className="h-3.5 w-px bg-slate-300" />
            <span className="text-xs text-slate-500">
              Showing <span className="font-semibold text-slate-700">{totalJobs}</span> {totalJobs === 1 ? 'job' : 'jobs'}
            </span>
          </div>
          <p className="text-xs text-slate-400 flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 bg-indigo-400 rounded-full" />
            List of your recent posted jobs • {new Date().getFullYear()} JobPortal
          </p>
        </div>
      </div>
    </div>
  )
}

export default AdminJobs
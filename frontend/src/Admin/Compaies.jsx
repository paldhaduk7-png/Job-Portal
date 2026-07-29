import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import ComapnyTabel from './ComapnyTabel'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from "@/hooks/useGetAllCompanies"
import { useDispatch } from 'react-redux'
import { setsearchComapnyByText } from '@/redux/companySlice'
import {
  Building2,
  Plus,
  Search,
  X,
  Briefcase,
  Users
} from 'lucide-react'

const Compaies = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useGetAllCompanies();
  const [serach, setSearch] = useState("");

  useEffect(() => {
    dispatch(setsearchComapnyByText(serach));
  }, [serach])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-indigo-100 p-2.5 rounded-xl">
              <Building2 className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Companies</h1>
              <p className="text-sm text-gray-500">Manage your registered companies</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Companies</p>
                <p className="text-2xl font-bold text-gray-900">24</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-xl">
                <Building2 className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active Jobs</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
              <div className="bg-green-50 p-3 rounded-xl">
                <Briefcase className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Applications</p>
                <p className="text-2xl font-bold text-gray-900">156</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-xl">
                <Users className="h-5 w-5 text-purple-600" />
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
                className="pl-9 h-10 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 w-full"
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Filter by name"
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
              onClick={() => navigate("/admin/comapanies/create")} 
              className="cursor-pointer bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white w-full sm:w-auto h-10 px-6"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Company
            </Button>
          </div>
        </div>

        {/* Company Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <ComapnyTabel />
        </div>

        {/* Footer */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-400">
            List of your registered companies • {new Date().getFullYear()} JobPortal
          </p>
        </div>
      </div>
    </div>
  )
}

export default Compaies
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { setAllCompany, setSingleCompany } from '@/redux/companySlice'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { ArrowLeft, Building2, CheckCircle, Loader2 } from 'lucide-react'

const CompanyCreate = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [companyName, setCompanyName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}
    if (!companyName.trim()) {
      newErrors.companyName = "Company name is required"
    } else if (companyName.trim().length < 2) {
      newErrors.companyName = "Company name must be at least 2 characters"
    } else if (companyName.trim().length > 50) {
      newErrors.companyName = "Company name must be less than 50 characters"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const registerCompany = async () => {
    if (!validateForm()) return

    setIsLoading(true)
    try {
      const res = await axios.post(`${COMPANY_API_END_POINT}/register`, 
        { companyName: companyName.trim() }, 
        {
          headers: {
            'Content-Type': "application/json"
          },
          withCredentials: true
        }
      )

      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company))
        dispatch(setAllCompany(res.data.company))
        const companyId = res?.data?.company?._id
        toast.success(res.data.message || "Company created successfully!")
        
        // Navigate to company details page with smooth transition
        setTimeout(() => {
          navigate(`/admin/companies/${companyId}`)
        }, 300)
      }
    } catch (error) {
      console.error("Company creation error:", error)
      const errorMessage = error?.response?.data?.message || "Something went wrong. Please try again."
      toast.error(errorMessage)
      
      // Set specific error from API
      if (error?.response?.data?.message?.includes("already exists")) {
        setErrors({ companyName: "A company with this name already exists" })
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      registerCompany()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Back Button */}
        <button
          onClick={() => navigate("/admin/companies")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-8 group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Companies</span>
        </button>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Header with Icon */}
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 px-8 py-6">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 rounded-xl p-3 backdrop-blur-sm">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Create Company</h1>
                <p className="text-indigo-100 text-sm mt-1">Add a new company to your portfolio</p>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-8">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-1">
                <Label className="text-lg font-semibold text-gray-900">Company Name</Label>
                <span className="text-red-500">*</span>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                What would you like to name your company? You can change this later.
              </p>
            </div>

            {/* Input Field */}
            <div className="space-y-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building2 className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  type="text"
                  value={companyName}
                  onChange={(e) => {
                    setCompanyName(e.target.value)
                    if (errors.companyName) {
                      setErrors({})
                    }
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="e.g., JobHunt, TechCorp, InnovateLabs"
                  className={`pl-10 h-12 text-base border-2 ${
                    errors.companyName 
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                      : 'border-gray-200 focus:border-indigo-500 focus:ring-indigo-500'
                  } transition-colors`}
                  autoFocus
                />
                {companyName && !errors.companyName && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                )}
              </div>

              {/* Error Message */}
              {errors.companyName && (
                <p className="text-sm text-red-500 flex items-center gap-1.5 mt-1">
                  <span className="inline-block w-1 h-1 rounded-full bg-red-500"></span>
                  {errors.companyName}
                </p>
              )}

              {/* Character Counter */}
              <div className="flex justify-end">
                <span className={`text-xs ${
                  companyName.length > 40 
                    ? 'text-yellow-500' 
                    : companyName.length > 0 
                    ? 'text-green-500' 
                    : 'text-gray-400'
                }`}>
                  {companyName.length}/50 characters
                </span>
              </div>
            </div>

            {/* Suggestions */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-xs text-gray-500 mb-2">💡 Suggestions:</p>
              <div className="flex flex-wrap gap-2">
                {['JobHunt', 'TechCorp', 'InnovateLabs', 'SkillBridge', 'CareerHub'].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => {
                      setCompanyName(suggestion)
                      setErrors({})
                    }}
                    className="text-xs px-3 py-1 bg-white border border-gray-200 rounded-full hover:border-indigo-400 hover:text-indigo-600 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 mt-8 pt-6 border-t border-gray-200">
              <Button
                onClick={() => navigate("/admin/companies")}
                variant="outline"
                className="w-full sm:w-auto px-8 h-11 border-2 hover:bg-gray-50 transition-colors"
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                onClick={registerCompany}
                disabled={isLoading || !companyName.trim()}
                className={`w-full sm:w-auto px-8 h-11 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 transition-all ${
                  (!companyName.trim() || isLoading) ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  'Continue →'
                )}
              </Button>
            </div>

            {/* Footer Info */}
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-400">
                By continuing, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="text-indigo-600 text-lg mb-1">📝</div>
            <h4 className="text-sm font-medium text-gray-900">Unique Name</h4>
            <p className="text-xs text-gray-500">Choose a unique name for your company</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="text-indigo-600 text-lg mb-1">🔄</div>
            <h4 className="text-sm font-medium text-gray-900">Editable</h4>
            <p className="text-xs text-gray-500">You can change the name later</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="text-indigo-600 text-lg mb-1">📌</div>
            <h4 className="text-sm font-medium text-gray-900">Quick Setup</h4>
            <p className="text-xs text-gray-500">Complete company details after creation</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompanyCreate
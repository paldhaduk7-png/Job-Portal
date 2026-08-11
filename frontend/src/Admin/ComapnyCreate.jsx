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
import { 
  ArrowLeft, 
  Building2, 
  CheckCircle2, 
  Loader2, 
  Sparkles, 
  Lightbulb, 
  ShieldCheck, 
  RefreshCw, 
  ArrowRight,
  HelpCircle
} from 'lucide-react'

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
    <div className="relative min-h-screen bg-[#fafbff] py-10 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Dynamic Ambient Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top-Left Indigo Glow Orb */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-br from-indigo-400/25 to-purple-400/20 rounded-full blur-3xl" />
        
        {/* Top-Right Violet Glow Orb */}
        <div className="absolute top-1/3 -right-20 w-[30rem] h-[30rem] bg-gradient-to-bl from-purple-400/20 via-pink-300/15 to-transparent rounded-full blur-3xl" />
        
        {/* Bottom Soft Blue Orb */}
        <div className="absolute -bottom-28 left-1/4 w-[36rem] h-[36rem] bg-gradient-to-tr from-blue-300/20 to-indigo-200/20 rounded-full blur-3xl" />

        {/* Subtle Modern Dot-Matrix Grid */}
        <div 
          className="absolute inset-0 opacity-[0.35]" 
          style={{
            backgroundImage: `radial-gradient(circle, #6366f1 1px, transparent 1px)`,
            backgroundSize: '32px 32px'
          }}
        />
        
        {/* Vignette mask */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#fafbff]/80" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={() => navigate("/admin/companies")}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 hover:bg-white backdrop-blur-md border border-slate-200/70 text-slate-600 hover:text-indigo-600 shadow-sm hover:shadow-md transition-all duration-200 group text-sm font-medium"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-200" />
            <span>Back to Companies</span>
          </button>
        </div>

        {/* Main Card */}
        <div className="bg-white/85 backdrop-blur-xl rounded-3xl shadow-2xl shadow-indigo-500/10 border border-white/90 overflow-hidden transition-all duration-300">
          {/* Header Banner */}
          <div className="relative bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 px-8 py-7 overflow-hidden">
            {/* Ambient inner glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-white/30 rounded-2xl blur-sm" />
                  <div className="relative bg-white/15 backdrop-blur-md rounded-2xl p-3.5 border border-white/30 shadow-inner">
                    <Building2 className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold text-white tracking-tight">Create Company</h1>
                    <span className="text-[11px] font-semibold text-indigo-100 bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/20">
                      Step 1 of 2
                    </span>
                  </div>
                  <p className="text-indigo-100/90 text-sm mt-0.5 font-normal">
                    Register a new company profile to begin posting jobs
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Body */}
          <div className="p-8 sm:p-10 space-y-7">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Label className="text-base font-bold text-slate-800">
                    Company Name
                  </Label>
                  <span className="text-rose-500 font-semibold">*</span>
                </div>
                <span className="text-xs text-slate-400 font-medium">Required field</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                What is the official or operating name of your company? You can update this anytime.
              </p>
            </div>

            {/* Input Field Area */}
            <div className="space-y-2.5">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Building2 className="h-5 w-5" />
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
                  placeholder="e.g. JobHunt, TechCorp, InnovateLabs"
                  className={`pl-12 pr-12 h-13 text-base rounded-2xl bg-slate-50/70 border-2 transition-all duration-200 ${
                    errors.companyName 
                      ? 'border-rose-400 bg-rose-50/30 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10' 
                      : 'border-slate-200/80 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/15'
                  }`}
                  autoFocus
                />
                {companyName && !errors.companyName && (
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 animate-in fade-in zoom-in duration-200" />
                  </div>
                )}
              </div>

              {/* Error Message */}
              {errors.companyName && (
                <div className="flex items-center gap-1.5 text-xs text-rose-500 font-medium pt-1 animate-in fade-in slide-in-from-top-1 duration-150">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-rose-500" />
                  {errors.companyName}
                </div>
              )}

              {/* Character Counter with visual indicator */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-1 text-slate-400 text-xs">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Must be between 2 and 50 characters</span>
                </div>
                <span className={`text-xs font-semibold tabular-nums ${
                  companyName.length > 45 
                    ? 'text-amber-500' 
                    : companyName.length >= 2 
                    ? 'text-emerald-600' 
                    : 'text-slate-400'
                }`}>
                  {companyName.length}/50
                </span>
              </div>
            </div>

            {/* Smart Suggestions Deck */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-50/90 via-indigo-50/30 to-purple-50/30 border border-indigo-100/70 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-900 uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>Quick Fill Suggestions</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {['JobHunt', 'TechCorp', 'InnovateLabs', 'SkillBridge', 'CareerHub'].map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => {
                      setCompanyName(suggestion)
                      setErrors({})
                    }}
                    className="text-xs font-medium px-3.5 py-1.5 bg-white hover:bg-indigo-600 text-slate-700 hover:text-white rounded-xl border border-slate-200/80 hover:border-indigo-600 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
                  >
                    + {suggestion}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-6 border-t border-slate-100">
              <Button
                type="button"
                onClick={() => navigate("/admin/companies")}
                variant="outline"
                className="w-full sm:w-auto px-7 h-11 rounded-xl border-slate-200 hover:bg-slate-50 text-slate-600 font-medium transition-colors"
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={registerCompany}
                disabled={isLoading || !companyName.trim()}
                className={`relative group w-full sm:w-auto px-8 h-11 rounded-xl font-semibold text-white shadow-lg transition-all duration-200 overflow-hidden ${
                  (!companyName.trim() || isLoading)
                    ? 'bg-slate-300 shadow-none cursor-not-allowed text-slate-500'
                    : 'bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-700 hover:via-indigo-600 hover:to-purple-700 shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0'
                }`}
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-white" />
                    <span>Registering...</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <span>Continue to Setup</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </span>
                )}
              </Button>
            </div>

            {/* Legal / Policy Note */}
            <p className="text-center text-[11px] text-slate-400">
              By creating a company profile, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>

        {/* Feature / Quick Info Cards */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="group bg-white/70 hover:bg-white backdrop-blur-xl p-4 rounded-2xl border border-white/80 shadow-lg shadow-slate-200/40 hover:shadow-indigo-500/10 hover:-translate-y-1 transition-all duration-300">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-3 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">Unique Identity</h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">Establish your brand with a distinct organization profile.</p>
          </div>

          <div className="group bg-white/70 hover:bg-white backdrop-blur-xl p-4 rounded-2xl border border-white/80 shadow-lg shadow-slate-200/40 hover:shadow-purple-500/10 hover:-translate-y-1 transition-all duration-300">
            <div className="w-9 h-9 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 mb-3 group-hover:scale-110 transition-transform">
              <RefreshCw className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">Fully Editable</h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">Update your name, logo, website and details anytime.</p>
          </div>

          <div className="group bg-white/70 hover:bg-white backdrop-blur-xl p-4 rounded-2xl border border-white/80 shadow-lg shadow-slate-200/40 hover:shadow-emerald-500/10 hover:-translate-y-1 transition-all duration-300">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-3 group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">Instant Setup</h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">Start posting job openings immediately after creation.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompanyCreate
import React, { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { 
  ArrowLeft, 
  Building2, 
  Globe, 
  MapPin, 
  FileText, 
  Upload, 
  X, 
  Image as ImageIcon, 
  Loader2, 
  CheckCircle2, 
  Sparkles,
  ShieldCheck,
  ExternalLink,
  Camera
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import useGetComapnyById from '@/hooks/useGetComapnyById'

const CompanySetup = () => {
  const params = useParams()
  useGetComapnyById(params.id)
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  })
  const { singleCompany } = useSelector(store => store.company)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [errors, setErrors] = useState({})
  const fileInputRef = useRef(null)

  const changeEventHandler = (e) => {
    const { name, value } = e.target
    setInput({ ...input, [name]: value })
    // Clear error for this field
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" })
    }
  }

  const changeFileHandler = (e) => {
    const file = e.target.files && e.target.files[0]
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']
      if (!validTypes.includes(file.type)) {
        toast.error('Please upload a valid image file (JPEG, PNG, GIF, WEBP, SVG)')
        return
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size should be less than 5MB')
        return
      }
      
      setInput({ ...input, file: file })
      // Create preview URL
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result)
      }
      reader.readAsDataURL(file)
      
      if (errors.file) {
        setErrors({ ...errors, file: "" })
      }
    }
  }

  const removeLogo = () => {
    setInput({ ...input, file: null })
    setPreviewUrl(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!input.name.trim()) {
      newErrors.name = "Company name is required"
    } else if (input.name.trim().length < 2) {
      newErrors.name = "Company name must be at least 2 characters"
    }
    if (input.website && !isValidUrl(input.website)) {
      newErrors.website = "Please enter a valid URL (e.g., https://example.com)"
    }
    if (input.description && input.description.length > 500) {
      newErrors.description = "Description must be less than 500 characters"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const isValidUrl = (string) => {
    try {
      new URL(string)
      return true
    } catch (_) {
      return false
    }
  }

  const changeSubmitHandler = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      toast.error("Please fix the errors before submitting")
      return
    }

    const formData = new FormData()
    formData.append("name", input.name.trim())
    formData.append("description", input.description.trim() || "")
    formData.append("website", input.website.trim() || "")
    formData.append("location", input.location.trim() || "")
    
    if (input.file) {
      formData.append("file", input.file)
    }
    
    try {
      setLoading(true)
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${params.id}`, 
        formData, 
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true
        }
      )
      
      if (res.data.success) {
        toast.success(res.data.message || "Company updated successfully!")
        setTimeout(() => {
          navigate("/admin/companies")
        }, 500)
      }
    } catch (error) {
      console.error("Update error:", error)
      toast.error(error?.response?.data?.message || "Failed to update company")
    } finally {
      setLoading(false)
    }
  }

  // Load company data when available
  useEffect(() => {
    if (singleCompany) {
      setInput({
        name: singleCompany?.name || "",
        description: singleCompany?.description || "",
        website: singleCompany?.website || "",
        location: singleCompany?.location || "",
        file: singleCompany?.file || null,
      })
      // Set preview if logo exists
      if (singleCompany?.logo) {
        setPreviewUrl(singleCompany.logo)
      }
    }
  }, [singleCompany])

  // Form field configurations
  const fields = [
    {
      name: 'name',
      label: 'Company Name',
      placeholder: 'Enter company name',
      icon: Building2,
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: 'Company Description',
      placeholder: 'Tell us about your company mission, culture, and achievements',
      icon: FileText,
      type: 'text',
      required: false,
    },
    {
      name: 'website',
      label: 'Website',
      placeholder: 'https://yourcompany.com',
      icon: Globe,
      type: 'url',
      required: false,
    },
    {
      name: 'location',
      label: 'Location',
      placeholder: 'e.g. San Francisco, USA or Remote',
      icon: MapPin,
      type: 'text',
      required: false,
    },
  ]

  return (
    <div className="relative min-h-screen bg-[#fafbff] py-10 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Dynamic Ambient Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top-Left Indigo Glow Orb */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-br from-indigo-400/25 to-purple-400/20 rounded-full blur-3xl" />
        
        {/* Top-Right Violet Glow Orb */}
        <div className="absolute top-1/4 -right-20 w-[30rem] h-[30rem] bg-gradient-to-bl from-purple-400/20 via-pink-300/15 to-transparent rounded-full blur-3xl" />
        
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
      <div className="relative z-10 max-w-3xl mx-auto">
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

        {/* Main Glass Card */}
        <div className="bg-white/85 backdrop-blur-xl rounded-3xl shadow-2xl shadow-indigo-500/10 border border-white/90 overflow-hidden transition-all duration-300">
          {/* Header Banner */}
          <div className="relative bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 px-8 py-7 overflow-hidden">
            {/* Ambient inner glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-white/30 rounded-2xl blur-sm" />
                  <div className="relative bg-white/15 backdrop-blur-md rounded-2xl p-3.5 border border-white/30 shadow-inner">
                    <Building2 className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold text-white tracking-tight">Company Setup</h1>
                    <span className="text-[11px] font-semibold text-indigo-100 bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/20">
                      Profile Editor
                    </span>
                  </div>
                  <p className="text-indigo-100/90 text-sm mt-0.5 font-normal">
                    Configure your organization details, branding, and location
                  </p>
                </div>
              </div>

              {/* ID Tag */}
              <div className="inline-flex items-center self-start sm:self-auto bg-white/15 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/25 shadow-inner">
                <span className="text-white/80 text-xs font-mono font-medium">
                  ID: #{params.id?.slice(0, 8)}
                </span>
              </div>
            </div>
          </div>

          <form onSubmit={changeSubmitHandler} className="p-8 sm:p-10 space-y-8">
            {/* Logo Upload Section */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-50/90 via-indigo-50/20 to-purple-50/20 border-2 border-dashed border-indigo-100 hover:border-indigo-300 transition-all duration-300 group">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                {/* Logo Preview Container */}
                <div className="relative flex-shrink-0">
                  {previewUrl ? (
                    <div className="relative group/logo">
                      <img 
                        src={previewUrl} 
                        alt="Company logo"
                        className="h-24 w-24 rounded-2xl object-cover border-2 border-white shadow-xl shadow-slate-300/50 bg-white"
                      />
                      <button
                        type="button"
                        onClick={removeLogo}
                        className="absolute -top-2 -right-2 bg-rose-500 hover:bg-rose-600 text-white rounded-full p-1.5 shadow-lg transition-all duration-200 hover:scale-110 active:scale-95"
                        title="Remove Logo"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ) : (
                    <div className="h-24 w-24 rounded-2xl bg-indigo-50 border-2 border-indigo-100 flex flex-col items-center justify-center text-indigo-400 group-hover:scale-105 group-hover:bg-indigo-100/70 transition-all duration-300">
                      <ImageIcon className="h-8 w-8 mb-1" />
                      <span className="text-[10px] font-semibold tracking-wider text-indigo-400 uppercase">No Logo</span>
                    </div>
                  )}
                </div>
                
                {/* Upload Action & Guidelines */}
                <div className="flex-1 text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                    <Label className="text-sm font-bold text-slate-800">
                      Company Logo
                    </Label>
                    <span className="text-[11px] font-medium text-slate-400">Optional</span>
                  </div>
                  <p className="text-xs text-slate-500 mb-3">
                    Upload a high-resolution logo to display on your jobs and company page.
                  </p>
                  
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                    <input
                      ref={fileInputRef}
                      type="file"
                      onChange={changeFileHandler}
                      name="file"
                      accept="image/*"
                      className="hidden"
                      id="logo-upload"
                    />
                    <label
                      htmlFor="logo-upload"
                      className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-indigo-50 border border-slate-200/90 hover:border-indigo-300 rounded-xl shadow-sm hover:shadow transition-all duration-200 text-xs font-semibold text-slate-700 hover:text-indigo-600 active:scale-95"
                    >
                      <Upload className="h-3.5 w-3.5 text-indigo-600" />
                      <span>{previewUrl ? 'Change Logo' : 'Upload Image'}</span>
                    </label>
                    
                    {previewUrl && (
                      <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100 flex items-center gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                        Logo Loaded
                      </span>
                    )}
                    
                    <span className="text-[11px] text-slate-400">
                      PNG, JPG, SVG up to 5MB
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-6">
              {fields.map((field) => {
                const Icon = field.icon
                const hasError = errors[field.name]
                
                return (
                  <div key={field.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-bold text-slate-800 flex items-center gap-1">
                        {field.label}
                        {field.required && <span className="text-rose-500 font-bold">*</span>}
                      </Label>
                      {!field.required && (
                        <span className="text-[11px] text-slate-400 font-medium">Optional</span>
                      )}
                    </div>

                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Icon className={`h-4 w-4 transition-colors ${hasError ? 'text-rose-400' : 'text-slate-400'}`} />
                      </div>
                      
                      <Input
                        type={field.type}
                        name={field.name}
                        placeholder={field.placeholder}
                        value={input[field.name] || ''}
                        onChange={changeEventHandler}
                        className={`pl-11 pr-11 h-12 text-sm rounded-2xl bg-slate-50/70 border-2 transition-all duration-200 ${
                          hasError 
                            ? 'border-rose-400 bg-rose-50/30 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10' 
                            : 'border-slate-200/80 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/15'
                        }`}
                      />
                      
                      {input[field.name] && !hasError && (
                        <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
                          <CheckCircle2 className="h-4 w-4 text-emerald-500 animate-in fade-in zoom-in duration-200" />
                        </div>
                      )}
                    </div>

                    {hasError && (
                      <p className="text-xs text-rose-500 font-medium flex items-center gap-1.5 mt-1 animate-in fade-in slide-in-from-top-1 duration-150">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-rose-500" />
                        {errors[field.name]}
                      </p>
                    )}

                    {field.name === 'description' && (
                      <div className="flex justify-end pt-0.5">
                        <span className={`text-[11px] font-medium tabular-nums ${
                          input.description?.length > 450 
                            ? 'text-amber-500 font-semibold' 
                            : 'text-slate-400'
                        }`}>
                          {input.description?.length || 0}/500 characters
                        </span>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-6 border-t border-slate-100">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/admin/companies")}
                className="w-full sm:w-auto px-7 h-11 rounded-xl border-slate-200 hover:bg-slate-50 text-slate-600 font-medium transition-colors"
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="relative group w-full sm:w-auto px-9 h-11 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-700 hover:via-indigo-600 hover:to-purple-700 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 overflow-hidden flex-1 sm:flex-initial"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-white" />
                    <span>Updating Company...</span>
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    <span>Update Company</span>
                  </span>
                )}
              </Button>
            </div>

            {/* Form Footer Note */}
            <div className="text-center">
              <p className="text-[11px] text-slate-400">
                Changes made here will immediately reflect across all active job postings for this company.
              </p>
            </div>
          </form>
        </div>

        {/* Quick Setup / Feature Tips */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="group bg-white/70 hover:bg-white backdrop-blur-xl p-4 rounded-2xl border border-white/80 shadow-lg shadow-slate-200/40 hover:shadow-indigo-500/10 hover:-translate-y-1 transition-all duration-300">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-3 group-hover:scale-110 transition-transform">
              <Building2 className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">Complete Profile</h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">A complete company profile attracts up to 3x more candidates.</p>
          </div>

          <div className="group bg-white/70 hover:bg-white backdrop-blur-xl p-4 rounded-2xl border border-white/80 shadow-lg shadow-slate-200/40 hover:shadow-purple-500/10 hover:-translate-y-1 transition-all duration-300">
            <div className="w-9 h-9 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 mb-3 group-hover:scale-110 transition-transform">
              <Camera className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">Professional Logo</h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">Upload a crisp square logo to build trust and brand recognition.</p>
          </div>

          <div className="group bg-white/70 hover:bg-white backdrop-blur-xl p-4 rounded-2xl border border-white/80 shadow-lg shadow-slate-200/40 hover:shadow-emerald-500/10 hover:-translate-y-1 transition-all duration-300">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-3 group-hover:scale-110 transition-transform">
              <ExternalLink className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">Website Link</h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">Direct applicants to your official career site and culture pages.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompanySetup
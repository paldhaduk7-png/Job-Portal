import React, { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { ArrowLeft, Building2, Globe, MapPin, FileText, Upload, X, Image as ImageIcon, Loader2, CheckCircle } from 'lucide-react'
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
        // Assuming logo is URL from server
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
      placeholder: 'Tell us about your company',
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
      placeholder: 'City, Country',
      icon: MapPin,
      type: 'text',
      required: false,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate("/admin/companies")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-6 group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Companies</span>
        </button>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 rounded-xl p-3 backdrop-blur-sm">
                  <Building2 className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Company Setup</h1>
                  <p className="text-indigo-100 text-sm mt-1">
                    Configure your company details
                  </p>
                </div>
              </div>
              <div className="bg-white/10 px-4 py-2 rounded-lg">
                <span className="text-white text-sm font-medium">
                  ID: #{params.id?.slice(0, 8)}
                </span>
              </div>
            </div>
          </div>

          <form onSubmit={changeSubmitHandler} className="p-8">
            {/* Logo Upload Section */}
            <div className="mb-8 p-6 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 hover:border-indigo-300 transition-colors">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  {previewUrl ? (
                    <div className="relative group">
                      <img 
                        src={previewUrl} 
                        alt="Company logo"
                        className="h-24 w-24 rounded-xl object-cover border-2 border-white shadow-lg"
                      />
                      <button
                        type="button"
                        onClick={removeLogo}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ) : (
                    <div className="h-24 w-24 rounded-xl bg-indigo-100 flex items-center justify-center border-2 border-indigo-200">
                      <ImageIcon className="h-10 w-10 text-indigo-400" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <Label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Logo
                  </Label>
                  <div className="flex items-center gap-4">
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
                      className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-300 rounded-lg hover:border-indigo-400 hover:bg-indigo-50 transition-colors text-sm font-medium text-gray-700"
                    >
                      <Upload className="h-4 w-4" />
                      Choose File
                    </label>
                    {previewUrl && (
                      <span className="text-sm text-green-600 flex items-center gap-1">
                        <CheckCircle className="h-4 w-4" />
                        Logo uploaded
                      </span>
                    )}
                    <span className="text-xs text-gray-400">
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
                  <div key={field.name}>
                    <Label className="block text-sm font-medium text-gray-700 mb-1.5">
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </Label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2">
                        <Icon className={`h-4 w-4 ${hasError ? 'text-red-400' : 'text-gray-400'}`} />
                      </div>
                      <Input
                        type={field.type}
                        name={field.name}
                        placeholder={field.placeholder}
                        value={input[field.name] || ''}
                        onChange={changeEventHandler}
                        className={`pl-10 h-11 ${hasError ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-indigo-500 focus:ring-indigo-500'}`}
                      />
                      {input[field.name] && !hasError && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        </div>
                      )}
                    </div>
                    {hasError && (
                      <p className="text-sm text-red-500 mt-1.5 flex items-center gap-1">
                        <span className="inline-block w-1 h-1 rounded-full bg-red-500"></span>
                        {errors[field.name]}
                      </p>
                    )}
                    {field.name === 'description' && (
                      <div className="flex justify-end mt-1">
                        <span className={`text-xs ${input.description?.length > 400 ? 'text-yellow-500' : 'text-gray-400'}`}>
                          {input.description?.length || 0}/500 characters
                        </span>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 mt-8 pt-6 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/admin/companies")}
                className="w-full sm:w-auto px-8 h-11 border-2 hover:bg-gray-50 transition-colors"
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-8 h-11 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 transition-all flex-1"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  'Update Company'
                )}
              </Button>
            </div>

            {/* Footer Info */}
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-400">
                All fields except description and logo are required for company setup
              </p>
            </div>
          </form>
        </div>

        {/* Quick Tips */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="text-indigo-600 text-lg mb-1">🏢</div>
            <h4 className="text-sm font-medium text-gray-900">Complete Profile</h4>
            <p className="text-xs text-gray-500">A complete company profile attracts more candidates</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="text-indigo-600 text-lg mb-1">📸</div>
            <h4 className="text-sm font-medium text-gray-900">Professional Logo</h4>
            <p className="text-xs text-gray-500">Upload a professional logo to build trust</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="text-indigo-600 text-lg mb-1">🔗</div>
            <h4 className="text-sm font-medium text-gray-900">Website Link</h4>
            <p className="text-xs text-gray-500">Add your website to showcase your company</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompanySetup
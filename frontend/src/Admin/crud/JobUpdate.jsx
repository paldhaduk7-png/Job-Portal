import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { Loader2, ArrowLeft, Briefcase, MapPin, FileText, List, DollarSign, Users, Clock, Building2 } from 'lucide-react'

const JobUpdate = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    experinence: "",
    location: "",
    jobType: "",
    position: 0,
    companyId: ""
  });

  const [loading, setLoading] = useState(false);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.put(`${JOB_API_END_POINT}/update/${id}`, input, { withCredentials: true })
      if (res.data.success) {
        toast.success(res?.data?.message);
        navigate("/admin/jobs")
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const getJobData = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${id}`, { withCredentials: true });
        if (res.data.success) {
          setInput({
            title: res.data.job.title,
            description: res.data.job.description,
            requirements: res.data.job.requirements?.join(", ") || "",
            salary: res.data.job.salary,
            experinence: res.data.job.experienceLevel,
            location: res.data.job.location,
            jobType: res.data.job.jobType,
            position: res.data.job.position,
          });
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to load data");
      }
    };
    if (id) {
      getJobData();
    }
  }, [id]);

  const fields = [
    { name: 'title', label: 'Job Title', placeholder: 'e.g. Frontend Developer', icon: Briefcase, type: 'text' },
    { name: 'location', label: 'Location', placeholder: 'e.g. Remote, New York', icon: MapPin, type: 'text' },
    { name: 'description', label: 'Description', placeholder: 'Brief overview of the role', icon: FileText, type: 'text', fullWidth: true },
    { name: 'requirements', label: 'Requirements', placeholder: 'e.g. React, Node.js', icon: List, type: 'text', fullWidth: true },
    { name: 'salary', label: 'Salary', placeholder: 'e.g. 8(LPA)', icon: DollarSign, type: 'text' },
    { name: 'experinence', label: 'Experience Level', placeholder: 'e.g. Mid-level, Senior', icon: Users, type: 'text' },
    { name: 'jobType', label: 'Job Type', placeholder: 'e.g. Full-time, Contract', icon: Clock, type: 'text' },
    { name: 'position', label: 'No. of Positions', placeholder: '1', icon: Users, type: 'number' },
  ]

  return (
    <div className="relative min-h-screen bg-[#fafbff] py-8 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Dynamic Ambient Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top-Left Indigo Glow Orb */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-br from-orange-400/20 via-indigo-400/20 to-purple-400/15 rounded-full blur-3xl" />
        
        {/* Top-Right Amber Glow Orb */}
        <div className="absolute top-1/4 -right-20 w-[30rem] h-[30rem] bg-gradient-to-bl from-amber-400/15 via-orange-300/15 to-transparent rounded-full blur-3xl" />
        
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

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={() => navigate("/admin/jobs")}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 hover:bg-white backdrop-blur-md border border-slate-200/70 text-slate-600 hover:text-orange-600 shadow-sm hover:shadow-md transition-all duration-200 group text-sm font-medium"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-200" />
            <span>Back to Jobs</span>
          </button>
        </div>

        {/* Main Card */}
        <div className="bg-white/85 backdrop-blur-xl rounded-3xl shadow-2xl shadow-orange-500/10 border border-white/90 overflow-hidden transition-all duration-300">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 px-8 py-7 overflow-hidden">
            {/* Ambient inner glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative flex items-center gap-4">
              <div className="bg-white/20 rounded-2xl p-3.5 backdrop-blur-sm border border-white/20 shadow-inner">
                <Briefcase className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-extrabold text-white">Update Job</h1>
                <p className="text-orange-100 text-sm mt-0.5">
                  Fill in the details below to update a job listing.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={submitHandler} className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {fields.map((field) => {
                const Icon = field.icon
                const isFullWidth = field.fullWidth
                
                return (
                  <div key={field.name} className={isFullWidth ? 'md:col-span-2' : ''}>
                    <Label className="block text-sm font-medium text-slate-700 mb-1.5">
                      {field.label}
                    </Label>
                    <div className="relative">
                      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                        <Icon className="h-4 w-4 text-slate-400" />
                      </div>
                      <Input
                        type={field.type}
                        name={field.name}
                        placeholder={field.placeholder}
                        value={input[field.name] || ''}
                        onChange={changeEventHandler}
                        className="pl-10 h-11 bg-slate-50/70 border-slate-200/80 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 rounded-xl transition-all duration-200"
                      />
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Form Actions */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/admin/jobs")}
                className="h-11 px-6 rounded-xl border-slate-200 hover:bg-slate-50"
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg shadow-orange-500/25 h-11 px-8 rounded-xl font-medium"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  'Update Job'
                )}
              </Button>
            </div>
          </form>
        </div>

        {/* Quick Tips */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white/80 backdrop-blur-xl p-4 rounded-2xl shadow-sm border border-white/80">
            <div className="text-orange-500 text-lg mb-1">📝</div>
            <h4 className="text-sm font-semibold text-slate-800">Clear Title</h4>
            <p className="text-xs text-slate-500 mt-0.5">Use a clear and descriptive job title</p>
          </div>
          <div className="bg-white/80 backdrop-blur-xl p-4 rounded-2xl shadow-sm border border-white/80">
            <div className="text-orange-500 text-lg mb-1">💰</div>
            <h4 className="text-sm font-semibold text-slate-800">Competitive Salary</h4>
            <p className="text-xs text-slate-500 mt-0.5">Mention salary range to attract more applicants</p>
          </div>
          <div className="bg-white/80 backdrop-blur-xl p-4 rounded-2xl shadow-sm border border-white/80">
            <div className="text-orange-500 text-lg mb-1">🎯</div>
            <h4 className="text-sm font-semibold text-slate-800">Clear Requirements</h4>
            <p className="text-xs text-slate-500 mt-0.5">List specific skills and experience needed</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobUpdate
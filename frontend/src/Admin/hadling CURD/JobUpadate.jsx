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

const JobUpadate = () => {
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate("/admin/jobs")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-6 group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Jobs</span>
        </button>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-6">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 rounded-xl p-3 backdrop-blur-sm">
                <Briefcase className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Update Job</h1>
                <p className="text-orange-100 text-sm mt-1">
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
                    <Label className="block text-sm font-medium text-gray-700 mb-1.5">
                      {field.label}
                    </Label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2">
                        <Icon className="h-4 w-4 text-gray-400" />
                      </div>
                      <Input
                        type={field.type}
                        name={field.name}
                        placeholder={field.placeholder}
                        value={input[field.name] || ''}
                        onChange={changeEventHandler}
                        className={`pl-10 h-11 border-gray-200 focus:border-orange-500 focus:ring-orange-500`}
                      />
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 mt-8 pt-6 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/admin/jobs")}
                className="w-full sm:w-auto px-8 h-11 border-2 hover:bg-gray-50 transition-colors"
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-8 h-11 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition-all flex-1"
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
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="text-orange-500 text-lg mb-1">📝</div>
            <h4 className="text-sm font-medium text-gray-900">Clear Title</h4>
            <p className="text-xs text-gray-500">Use a clear and descriptive job title</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="text-orange-500 text-lg mb-1">💰</div>
            <h4 className="text-sm font-medium text-gray-900">Competitive Salary</h4>
            <p className="text-xs text-gray-500">Mention salary range to attract more applicants</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="text-orange-500 text-lg mb-1">🎯</div>
            <h4 className="text-sm font-medium text-gray-900">Clear Requirements</h4>
            <p className="text-xs text-gray-500">List specific skills and experience needed</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobUpadate
import React, { useEffect, useState } from 'react'
import { Badge } from "@/components/ui/badge"
import { Button } from '@/components/ui/button'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant'
import { setSingleJob } from '@/redux/jobSlice'
import { toast } from 'sonner'
import { Building2, MapPin, Briefcase, DollarSign, Users, Calendar, Clock, CheckCircle, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const JobDescription = () => {
  const params = useParams();
  const jobId = params.id;
  const { singleJob } = useSelector(store => store.job);
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isIntiallyApplyed = singleJob?.applications?.some(
    (application) => application.applicant === user?._id
  ) || false;
  const [isApplied, setIsApplied] = useState(isIntiallyApplyed);

  const applyjobHandeler = async () => {
    try {
      const res = await axios.post(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {}, { withCredentials: true });
      if (res.data.success) {
        setIsApplied(true);
        const updateSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] }
        dispatch(setSingleJob(updateSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    }
  }

  useEffect(() => {
    const fetchSingleJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(res?.data?.job?.applications.some(application => application.applicant === user?._id))
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchSingleJobs();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-slate-500 hover:text-purple-600 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Jobs
      </button>

      {/* Main Card */}
      <div className="bg-white rounded-3xl border border-slate-200/60 shadow-xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 text-purple-200 text-sm">
                <Building2 className="w-4 h-4" />
                <span>{singleJob?.company?.name || 'Company'}</span>
              </div>
              <h1 className="text-3xl font-bold text-white mt-2">{singleJob?.title || 'Job Title'}</h1>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <Clock className="w-4 h-4 text-white" />
              <span className="text-white text-sm">
                {singleJob?.createdAt?.split("T")[0] || 'Recent'}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <Badge className="bg-purple-50 text-purple-700 border-0 px-4 py-2 rounded-full text-sm font-medium">
              <Users className="w-4 h-4 mr-1.5" />
              {singleJob?.position} Positions
            </Badge>
            <Badge className="bg-orange-50 text-orange-600 border-0 px-4 py-2 rounded-full text-sm font-medium">
              <Briefcase className="w-4 h-4 mr-1.5" />
              {singleJob?.jobType}
            </Badge>
            <Badge className="bg-green-50 text-green-600 border-0 px-4 py-2 rounded-full text-sm font-medium">
              <DollarSign className="w-4 h-4 mr-1.5" />
              {singleJob?.salary} LPA
            </Badge>
            <Badge className="bg-blue-50 text-blue-600 border-0 px-4 py-2 rounded-full text-sm font-medium">
              <MapPin className="w-4 h-4 mr-1.5" />
              {singleJob?.location || 'Remote'}
            </Badge>
          </div>

          {/* Apply Button */}
          <div className="flex items-center justify-between mb-6 p-4 bg-slate-50 rounded-xl">
            <div className="flex items-center gap-2 text-slate-600">
              <Users className="w-5 h-5" />
              <span>{singleJob?.applications?.length || 0} applicants so far</span>
            </div>
            {isApplied ? (
              <Button className="bg-green-500 hover:bg-green-600 text-white px-8 py-2.5 rounded-xl cursor-not-allowed" disabled>
                <CheckCircle className="w-4 h-4 mr-2" />
                Applied
              </Button>
            ) : (
              <Button 
                onClick={applyjobHandeler} 
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-2.5 rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300"
              >
                Apply Now
              </Button>
            )}
          </div>

          {/* Job Details */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-800 border-b border-slate-200 pb-3">Job Description</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-sm text-slate-500">Role</p>
                <p className="font-semibold text-slate-800">{singleJob?.title || 'N/A'}</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-sm text-slate-500">Location</p>
                <p className="font-semibold text-slate-800">{singleJob?.location || 'Remote'}</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-sm text-slate-500">Experience</p>
                <p className="font-semibold text-slate-800">{singleJob?.experienceLevel || 'Fresher'}</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-sm text-slate-500">Salary</p>
                <p className="font-semibold text-slate-800">{singleJob?.salary || 'Negotiable'} LPA</p>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-sm text-slate-500">Description</p>
              <p className="text-slate-700 mt-1">{singleJob?.description || 'No description available'}</p>
            </div>

            <div className="flex items-center gap-6 pt-2">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Calendar className="w-4 h-4" />
                <span>Posted: {singleJob?.createdAt?.split("T")[0] || 'N/A'}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Users className="w-4 h-4" />
                <span>{singleJob?.applications?.length || 0} applicants</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobDescription;
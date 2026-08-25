import React, { useEffect, useState } from 'react'
import { Badge } from "@/components/ui/badge"
import { Button } from '@/components/ui/button'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { APPLICATION_API_END_POINT, JOB_API_END_POINT, SAVE_API_END_POINT } from '@/utils/constant'
import { setSingleJob } from '@/redux/jobSlice'
import { addSavedJob, removeSavedJob } from '@/redux/savedJobSlice'
import { toast } from 'sonner'
import { 
  Building2, 
  MapPin, 
  Briefcase, 
  DollarSign, 
  Users, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  ArrowLeft, 
  Sparkles, 
  ShieldCheck, 
  Award,
  Share2,
  Check,
  Zap,
  Bookmark,
  FileCheck2,
  Send,
  HeartHandshake,
  CheckCircle,
  FileText,
  BadgePercent,
  Layers,
  ArrowRight
} from 'lucide-react'
import LoginPopup from '@/Autheticated/LoginPopup'
import useAuthenticate from '@/Autheticated/useAuthticate'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

const JobDescription = () => {
  const params = useParams();
  const jobId = params.id;
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const { savedJobs } = useSelector((store) => store.savedJob);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isIntiallyApplyed = singleJob?.applications?.some(
    (application) => application.applicant === user?._id
  ) || false;
  const [isApplied, setIsApplied] = useState(isIntiallyApplyed);
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const requireAuth = useAuthenticate(setOpen);

  const isSaved = savedJobs?.some(
    (savedJob) => savedJob._id === (singleJob?._id || jobId)
  );

  const applyjobHandeler = async () => {
    if (!requireAuth()) return;
    try {
      const res = await axios.post(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {}, { withCredentials: true });
      if (res.data.success) {
        setIsApplied(true);
        const updateSingleJob = { 
          ...singleJob, 
          applications: [...(singleJob?.applications || []), { applicant: user?._id }] 
        };
        dispatch(setSingleJob(updateSingleJob));
        toast.success(res.data.message || "Application submitted successfully!");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to submit application");
    }
  };

  const handleSaveToggle = async () => {
    if (!requireAuth()) return;
    try {
      if (isSaved) {
        const res = await axios.delete(
          `${SAVE_API_END_POINT}/delete/${singleJob?._id || jobId}`,
          { withCredentials: true }
        );
        if (res.data.success) {
          dispatch(removeSavedJob(singleJob?._id || jobId));
          toast.success(res.data.message || "Job removed from saved list");
        }
      } else {
        const res = await axios.post(
          `${SAVE_API_END_POINT}/post/${singleJob?._id || jobId}`,
          {},
          { withCredentials: true }
        );
        if (res.data.success) {
          dispatch(addSavedJob(singleJob));
          toast.success(res.data.message || "Job saved successfully");
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleShareLink = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        toast.success("Job link copied to clipboard!");
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      toast.info("Share this page: " + window.location.href);
    }
  };

  useEffect(() => {
    const fetchSingleJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(res?.data?.job?.applications?.some(application => application.applicant === user?._id));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJobs();
  }, [jobId, dispatch, user?._id]);

  const getInitials = (name) => {
    if (!name) return 'CO';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Recently';
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return dateStr.split('T')[0] || 'Recently';
    }
  };

  return (
    <>
      <LoginPopup open={open} setOpen={setOpen} />
      
      {/* Background Ambient Lighting & Glow Effects */}
      <div className="relative min-h-screen bg-[#fafbff] py-8 px-4 sm:px-6 lg:px-8 overflow-hidden pb-20">
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

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          
          {/* Top Actions & Navigation Bar */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <button 
              onClick={() => navigate(-1)} 
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-indigo-600 bg-white/90 hover:bg-indigo-50/80 px-4 py-2.5 rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-xs backdrop-blur-md transition-all duration-200 group active:scale-95"
            >
              <ArrowLeft className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:-translate-x-1 transition-all" />
              <span>Back to Job Listings</span>
            </button>

            {/* Quick Share & Save Buttons */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={handleShareLink}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-indigo-600 bg-white px-3.5 py-2.5 rounded-xl border border-slate-200/80 shadow-2xs hover:shadow-xs transition-all active:scale-95"
                title="Share this job opportunity"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5 text-indigo-500" />}
                <span>{copied ? "Link Copied" : "Share"}</span>
              </button>

              <button
                onClick={handleSaveToggle}
                className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2.5 rounded-xl border transition-all active:scale-95 shadow-2xs ${
                  isSaved
                    ? "bg-indigo-50 text-indigo-700 border-indigo-200"
                    : "bg-white text-slate-600 hover:text-indigo-600 border-slate-200/80 hover:bg-slate-50"
                }`}
                title={isSaved ? "Saved in your bookmarks" : "Bookmark this job"}
              >
                <Bookmark className={`w-3.5 h-3.5 ${isSaved ? "fill-indigo-600 text-indigo-600" : "text-slate-400"}`} />
                <span>{isSaved ? "Saved" : "Save Job"}</span>
              </button>
            </div>
          </div>

          {/* Main Hero Header Card */}
          <div className="relative rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden mb-8">
            
            {/* Top Gradient Bar */}
            <div className="h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

            <div className="p-6 sm:p-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                
                {/* Company Logo & Role Header */}
                <div className="flex items-start sm:items-center gap-5">
                  <Avatar className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl ring-4 ring-indigo-500/10 shadow-md shrink-0">
                    <AvatarImage src={singleJob?.company?.logo} alt={singleJob?.company?.name} className="object-cover" />
                    <AvatarFallback className="rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-600 text-white font-extrabold text-xl sm:text-2xl shadow-inner">
                      {getInitials(singleJob?.company?.name)}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50/90 px-3 py-1 rounded-full border border-indigo-100 mb-2.5">
                      <Building2 className="w-3.5 h-3.5 text-indigo-600" />
                      <span>{singleJob?.company?.name || 'Company Name'}</span>
                    </div>
                    
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                      {singleJob?.title || 'Job Title'}
                    </h1>

                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-3 text-xs sm:text-sm text-slate-500 font-medium">
                      <span className="flex items-center gap-1.5 text-slate-600">
                        <MapPin className="w-3.5 h-3.5 text-indigo-500" />
                        {singleJob?.location || 'Remote'}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="flex items-center gap-1.5 text-slate-500">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        Posted {formatDate(singleJob?.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Status Indicator Pill */}
                <div className="flex md:flex-col items-center md:items-end justify-between gap-2.5 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100">
                  <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200/80 px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-2xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                    <span>Actively Hiring</span>
                  </div>
                  <p className="text-xs text-slate-400 font-medium">
                    {singleJob?.applications?.length || 0} candidate{singleJob?.applications?.length === 1 ? '' : 's'} applied
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Metrics 4-Card Bento Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            
            {/* 1. Open Positions */}
            <div className="group bg-white rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-md p-5 transition-all duration-300 hover:-translate-y-0.5">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Users className="w-5 h-5" />
              </div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Openings</p>
              <p className="text-lg font-bold text-slate-800 mt-0.5">
                {singleJob?.position ? `${singleJob.position} Positions` : 'Multiple'}
              </p>
            </div>

            {/* 2. Employment Type */}
            <div className="group bg-white rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-md p-5 transition-all duration-300 hover:-translate-y-0.5">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Briefcase className="w-5 h-5" />
              </div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Job Type</p>
              <p className="text-lg font-bold text-slate-800 mt-0.5 capitalize">
                {singleJob?.jobType || 'Full-time'}
              </p>
            </div>

            {/* 3. Salary Package */}
            <div className="group bg-white rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-md p-5 transition-all duration-300 hover:-translate-y-0.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <DollarSign className="w-5 h-5" />
              </div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Offered Salary</p>
              <p className="text-lg font-bold text-emerald-700 mt-0.5">
                {singleJob?.salary || 'Negotiable'} LPA
              </p>
            </div>

            {/* 4. Experience Level */}
            <div className="group bg-white rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-md p-5 transition-all duration-300 hover:-translate-y-0.5">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Award className="w-5 h-5" />
              </div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Experience</p>
              <p className="text-lg font-bold text-slate-800 mt-0.5">
                {singleJob?.experienceLevel ? `${singleJob.experienceLevel} Yrs` : 'Fresher / Any'}
              </p>
            </div>
          </div>

          {/* High-Impact Radiant Application Callout Card */}
          <div className="relative rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white p-6 sm:p-8 shadow-xl shadow-indigo-500/20 mb-8 overflow-hidden">
            {/* Ambient Inner Lights */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-10 w-48 h-48 bg-pink-500/20 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4 text-center sm:text-left">
                <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center font-bold shadow-inner shrink-0">
                  <Zap className="w-7 h-7 text-yellow-300" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    Ready to take the next step?
                  </h3>
                  <p className="text-xs sm:text-sm text-indigo-100 mt-0.5">
                    {isApplied 
                      ? "Your application is submitted and currently under review by the hiring manager."
                      : "Apply directly to the recruiting team with 1-click using your registered profile."}
                  </p>
                </div>
              </div>

              {/* Apply Action Button */}
              <div className="w-full sm:w-auto">
                {isApplied ? (
                  <Button 
                    disabled 
                    className="w-full sm:w-auto bg-white/20 text-white border border-white/30 font-bold px-8 py-3.5 h-auto rounded-2xl cursor-not-allowed opacity-100 flex items-center justify-center gap-2 text-sm shadow-inner backdrop-blur-md"
                  >
                    <CheckCircle2 className="w-4.5 h-4.5 text-emerald-300" />
                    <span>Application Submitted</span>
                  </Button>
                ) : (
                  <Button 
                    onClick={applyjobHandeler} 
                    className="w-full sm:w-auto bg-white hover:bg-slate-50 text-indigo-700 hover:text-indigo-800 font-extrabold px-10 py-4 h-auto rounded-2xl shadow-xl shadow-slate-950/20 hover:shadow-2xl transition-all duration-300 text-sm sm:text-base flex items-center justify-center gap-2 hover:scale-[1.03] active:scale-[0.98]"
                  >
                    <Sparkles className="w-4.5 h-4.5 text-indigo-600" />
                    <span>Apply For Position</span>
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Job Overview & Description Details Card */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-10 space-y-8 mb-8">
            
            {/* Section 1: Overview */}
            <div>
              <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 mb-6">
                <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                  <FileText className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                  Job Description & Overview
                </h2>
              </div>

              <div className="bg-slate-50/70 rounded-2xl border border-slate-200/70 p-6 sm:p-8">
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed whitespace-pre-line font-normal">
                  {singleJob?.description || 'No detailed description provided for this job opening.'}
                </p>
              </div>
            </div>

            {/* Section 2: Key Highlights / Details Matrix */}
            <div>
              <h3 className="text-base font-bold text-slate-800 mb-4 tracking-tight">
                Role Details & Specifications
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50/80 border border-slate-200/60 text-sm">
                  <span className="text-slate-500 font-medium">Designation</span>
                  <span className="font-bold text-slate-800">{singleJob?.title || 'N/A'}</span>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50/80 border border-slate-200/60 text-sm">
                  <span className="text-slate-500 font-medium">Work Location</span>
                  <span className="font-bold text-slate-800">{singleJob?.location || 'Remote'}</span>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50/80 border border-slate-200/60 text-sm">
                  <span className="text-slate-500 font-medium">Employment Status</span>
                  <span className="font-bold text-slate-800 capitalize">{singleJob?.jobType || 'Full-time'}</span>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50/80 border border-slate-200/60 text-sm">
                  <span className="text-slate-500 font-medium">Annual Compensation</span>
                  <span className="font-bold text-emerald-700">{singleJob?.salary || 'Negotiable'} LPA</span>
                </div>
              </div>
            </div>

            {/* Section 3: 3-Step Hiring Process Roadmap */}
            <div className="pt-4 border-t border-slate-100">
              <h3 className="text-base font-bold text-slate-900 mb-4 tracking-tight flex items-center gap-2">
                <FileCheck2 className="w-4.5 h-4.5 text-indigo-600" />
                <span>Application & Hiring Process</span>
              </h3>

              {/* 3-Step Candidate Roadmap */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-4.5 rounded-2xl bg-indigo-50/60 border border-indigo-100/80 transition-all hover:shadow-xs">
                  <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-bold text-xs flex items-center justify-center mb-2.5">
                    1
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm">Direct Application</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Your profile and application are delivered instantly to the company's hiring portal.
                  </p>
                </div>

                <div className="p-4.5 rounded-2xl bg-purple-50/60 border border-purple-100/80 transition-all hover:shadow-xs">
                  <div className="w-8 h-8 rounded-xl bg-purple-600 text-white font-bold text-xs flex items-center justify-center mb-2.5">
                    2
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm">Resume Screening</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Hiring managers review your credentials, experience, and match with the team.
                  </p>
                </div>

                <div className="p-4.5 rounded-2xl bg-emerald-50/60 border border-emerald-100/80 transition-all hover:shadow-xs">
                  <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center justify-center mb-2.5">
                    3
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm">Interview & Offer</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Shortlisted candidates are contacted directly for technical and team discussions.
                  </p>
                </div>
              </div>

              {/* Candidate Trust & Safety Banner */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/70 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                  <span className="font-medium">100% Free & Verified Recruitment • Direct Company Access</span>
                </div>
                <div className="flex items-center gap-2 text-indigo-600 font-semibold">
                  <HeartHandshake className="w-4 h-4" />
                  <span>Equal Opportunity Employer</span>
                </div>
              </div>
            </div>

          </div>

         

        </div>
      </div>
    </>
  );
};

export default JobDescription;
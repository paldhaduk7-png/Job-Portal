import React, { useState } from "react";
import { Button } from '@/components/ui/button'
import { Bookmark, MapPin, Clock, Briefcase, DollarSign, Users, ArrowUpRight, Check, Sparkles } from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from "@/components/ui/badge"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { SAVE_API_END_POINT } from '@/utils/constant'
import { addSavedJob, removeSavedJob } from "@/redux/savedJobSlice";
import { useDispatch, useSelector } from 'react-redux'
import LoginPopup from '@/Autheticated/LoginPopup'
import useAuthenticate from '@/Autheticated/useAuthticate'

const job = ({ job }) => {
  const navigate = useNavigate();
  const { savedJobs } = useSelector((store) => store.savedJob);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const requireAuth = useAuthenticate(setOpen);

  // Checks whether the job is currently saved in Redux store
  const isSaved = savedJobs.some(
    (savedJob) => savedJob._id === job?._id
  );

  const saveJob = async (e) => {
    if (e) e.stopPropagation();
    if (!requireAuth()) return;
    try {
      if (isSaved) {
        const res = await axios.delete(
          `${SAVE_API_END_POINT}/delete/${job?._id}`,
          { withCredentials: true }
        );

        if (res.data.success) {
          dispatch(removeSavedJob(job?._id));
          toast.success(res.data.message);
        }
      } else {
        const res = await axios.post(
          `${SAVE_API_END_POINT}/post/${job?._id}`,
          {},
          { withCredentials: true }
        );

        if (res.data.success) {
          dispatch(addSavedJob(job));
          toast.success(res.data.message);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const daysAgoFunction = (mongoTime) => {
    if (!mongoTime) return 'Recent';
    const createdAt = new Date(mongoTime);
    const currentDate = new Date();
    const timeDiff = currentDate - createdAt;
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    return `${days} days ago`;
  };

  const getInitials = (name) => {
    if (!name) return 'C';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <>
      <LoginPopup open={open} setOpen={setOpen} />
      <div 
        onClick={() => {
          if (!requireAuth()) return;
          navigate(`/description/${job?._id}`);
        }}
        className="group relative bg-white rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-xl hover:shadow-indigo-500/10 hover:border-indigo-300/80 transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden hover:-translate-y-1 p-6"
      >
        {/* Subtle Top Gradient Accent on Hover */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div>
          {/* Header - Date & Bookmark */}
          <div className="flex items-center justify-between mb-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 bg-slate-100/80 px-3 py-1.5 rounded-full">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{daysAgoFunction(job?.createdAt)}</span>
            </div>
            
            <Button   
              onClick={saveJob} 
              variant="ghost" 
              size="icon" 
              className="w-9 h-9 rounded-full hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
              title={isSaved ? "Remove from saved" : "Save job"}
            >
              <Bookmark
                className={`w-4.5 h-4.5 transition-all duration-200 ${
                  isSaved
                    ? "fill-indigo-600 text-indigo-600 scale-110"
                    : "text-slate-400 hover:text-indigo-600"
                }`}
              />
            </Button>
          </div>

          {/* Company Info */}
          <div className="flex items-center gap-3.5 mb-4">
            <Avatar className="w-13 h-13 rounded-2xl ring-2 ring-indigo-500/10 group-hover:ring-indigo-500/30 transition-all duration-300 shadow-xs">
              <AvatarImage src={job?.company?.logo} alt={job?.company?.name} className="object-cover" />
              <AvatarFallback className="rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold text-base">
                {getInitials(job?.company?.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-slate-800 text-sm sm:text-base group-hover:text-indigo-600 transition-colors truncate">
                {job?.company?.name || 'Company'}
              </h3>
              <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{job?.location || 'Remote'}</span>
              </div>
            </div>
          </div>

          {/* Job Title & Description */}
          <div className="mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-slate-800 group-hover:text-indigo-600 transition-colors line-clamp-1 tracking-tight">
              {job?.title || 'Job Title'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 line-clamp-2 leading-relaxed mt-1.5 font-normal">
              {job?.description || 'No description available'}
            </p>
          </div>

          {/* Badges / Pill Tags */}
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <Badge className="bg-indigo-50 text-indigo-700 border border-indigo-100/80 px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1 shadow-2xs">
              <Users className="w-3 h-3 text-indigo-500" />
              <span>{job?.position ? `${job.position} Openings` : 'Multiple Openings'}</span>
            </Badge>

            <Badge className="bg-amber-50 text-amber-700 border border-amber-100/80 px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1 shadow-2xs">
              <Briefcase className="w-3 h-3 text-amber-500" />
              <span className="capitalize">{job?.jobType || 'Full-time'}</span>
            </Badge>

            <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-100/80 px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-2xs">
              <DollarSign className="w-3 h-3 text-emerald-500" />
              <span>{job?.salary || 'Negotiable'} LPA</span>
            </Badge>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 pt-4 mt-3 border-t border-slate-100">
          <Button 
            onClick={(e) => {
              e.stopPropagation();
              if (!requireAuth()) return;
              navigate(`/description/${job?._id}`);
            }}
            variant="outline" 
            className="flex-1 rounded-xl border-slate-200 text-slate-700 font-semibold hover:border-indigo-300 hover:bg-indigo-50/60 hover:text-indigo-700 transition-all duration-200 text-xs sm:text-sm h-10 shadow-2xs group/btn"
          >
            <span>View Details</span>
            <ArrowUpRight className="w-3.5 h-3.5 ml-1 text-slate-400 group-hover/btn:text-indigo-600 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-all" />
          </Button>

          <Button
            onClick={saveJob}
            className={`flex-1 rounded-xl font-semibold transition-all duration-200 text-xs sm:text-sm h-10 shadow-2xs ${
              isSaved
                ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200/80"
                : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/35"
            }`}
          >
            {isSaved ? (
              <span className="inline-flex items-center gap-1">
                <Check className="w-3.5 h-3.5 stroke-[2.5]" /> Saved
              </span>
            ) : (
              "Save for later"
            )}
          </Button>
        </div>
      </div>
    </>
  )
}

export default job;
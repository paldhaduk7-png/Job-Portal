import React from "react";
import { Button } from '@/components/ui/button'
import { Bookmark, MapPin, Clock, Briefcase, DollarSign, Users, ArrowUpRight } from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from "@/components/ui/badge"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { SAVE_API_END_POINT } from '@/utils/constant'
import { addSavedJob, removeSavedJob } from "@/redux/savedJobSlice";
import { useDispatch, useSelector } from 'react-redux'
import { useState } from "react";
import LoginPopup from '@/Autheticated/LoginPopup'
import useAuthenticate from '@/Autheticated/useAuthticate'

const job = ({job}) => {
  const navigate = useNavigate();
  const { savedJobs } = useSelector((store) => store.savedJob);
  const dispatch=useDispatch();

  const [open, setOpen] = useState(false);

const requireAuth = useAuthenticate(setOpen);


  // It checks whether at least one element in an array satisfies a condition.
  //it returnan in true and flase
     const isSaved = savedJobs.some(
    (savedJob) => savedJob._id === job._id
);
  const saveJob = async () => {
      if (!requireAuth()) return;
  try {

    if (isSaved) {
      const res = await axios.delete(
        `${SAVE_API_END_POINT}/delete/${job._id}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        dispatch(removeSavedJob(job._id));
        toast.success(res.data.message);
      }

    } else {

      const res = await axios.post(
        `${SAVE_API_END_POINT}/post/${job._id}`,
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
    <div className="group bg-white rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer hover:border-purple-200/60 hover:-translate-y-1">
      <div className="p-6">
        
        {/* Header - Date & Bookmark */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5 text-sm text-slate-400 bg-slate-50 px-3 py-1.5 rounded-full">
            <Clock className="w-3.5 h-3.5" />
            <span>{daysAgoFunction(job?.createdAt)}</span>
          </div>
          <Button   onClick={saveJob} variant="ghost" size="icon" className="rounded-full hover:bg-purple-50 hover:text-purple-600 transition-colors">
               <Bookmark
        className={`w-5 h-5 transition-colors ${
            isSaved
                ? "fill-purple-600 text-purple-600"
                : "text-slate-400 hover:text-purple-600"
        }`}
    />

          </Button>
        </div>

        {/* Company Info */}
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="w-14 h-14 ring-2 ring-purple-500/10 group-hover:ring-purple-500/30 transition-all">
            <AvatarImage src={job?.company?.logo} alt={job?.company?.name} />
            <AvatarFallback className="bg-gradient-to-br from-purple-100 to-indigo-100 text-purple-600 font-bold text-lg">
              {getInitials(job?.company?.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-slate-800 group-hover:text-purple-600 transition-colors">
              {job?.company?.name || 'Company'}
            </h3>
            <div className="flex items-center gap-1 text-sm text-slate-500">
              <MapPin className="w-3.5 h-3.5" />
              <span>{job?.location || 'Remote'}</span>
            </div>
          </div>
        </div>

        {/* Job Title & Description */}
        <div className="mb-4">
          <h2 className="text-xl font-bold text-slate-800 group-hover:text-purple-600 transition-colors line-clamp-1">
            {job?.title || 'Job Title'}
          </h2>
          <p className="text-sm text-slate-500 line-clamp-2 mt-1">
            {job?.description || 'No description available'}
          </p>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <Badge className="bg-purple-50 text-purple-700 border-0 px-3 py-1.5 rounded-full text-xs font-medium">
            <Users className="w-3 h-3 mr-1" />
            {job?.position ? `${job.position} Positions` : 'Multiple Openings'}
          </Badge>
          <Badge className="bg-orange-50 text-orange-600 border-0 px-3 py-1.5 rounded-full text-xs font-medium">
            <Briefcase className="w-3 h-3 mr-1" />
            {job?.jobType || 'Full-time'}
          </Badge>
          <Badge className="bg-green-50 text-green-600 border-0 px-3 py-1.5 rounded-full text-xs font-medium">
            <DollarSign className="w-3 h-3 mr-1" />
            {job?.salary || 'Negotiable'} LPA
          </Badge>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
          <Button 
           
           onClick={() => {
  if (!requireAuth()) return;
  navigate(`/description/${job._id}`);
}}
            variant="outline" 
            className="flex-1 rounded-xl border-slate-200 hover:border-purple-300 hover:bg-purple-50/50 transition-all duration-200 group"
          >
            <span>View Details</span>
            <ArrowUpRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Button>
         <Button
  onClick={saveJob}
  className={`flex-1 rounded-xl transition-all duration-300 ${
    isSaved
      ? "bg-green-100 text-green-700 hover:bg-green-200"
      : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
  }`}
>
  {isSaved ? "✓ Saved" : "Save for later"}
</Button>
        </div>
      </div>
    </div>
    </>
  )
}

export default job;
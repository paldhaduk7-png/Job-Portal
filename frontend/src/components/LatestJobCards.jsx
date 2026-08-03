import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Building2, ArrowUpRight } from 'lucide-react';
import { useState } from "react";
import LoginPopup from '@/Autheticated/LoginPopup'
import useAuthenticate from '@/Autheticated/useAuthticate'

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

const [open, setOpen] = useState(false);
const requireAuth = useAuthenticate(setOpen);

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Recent';
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  return (
    <><LoginPopup open={open} setOpen={setOpen} />
    <div 
      onClick={() => {
  if (!requireAuth()) return;
  navigate(`/description/${job._id}`);
}}
      className="group bg-white rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer hover:border-purple-200/60 hover:-translate-y-1"
    >
      <div className="p-6">
        {/* Company Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-xl flex items-center justify-center text-2xl font-bold text-purple-600 group-hover:scale-110 transition-transform duration-300">
              {job?.company?.name?.charAt(0).toUpperCase() || 'C'}
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 group-hover:text-purple-600 transition-colors">
                {job?.company?.name || 'Company'}
              </h3>
              <div className="flex items-center gap-1 text-sm text-slate-500">
                <MapPin className="w-3.5 h-3.5" />
                <span>{job?.company?.location || 'Remote'}</span>
              </div>
            </div>
          </div>
          <div className="text-xs text-slate-400 flex items-center gap-1 bg-slate-50 px-3 py-1 rounded-full">
            <Calendar className="w-3 h-3" />
            <span>{formatDate(job?.createdAt)}</span>
          </div>
        </div>

        {/* Job Title */}
        <div className="mb-3">
          <h2 className="text-xl font-bold text-slate-800 group-hover:text-purple-600 transition-colors line-clamp-1">
            {job?.title || 'Job Title'}
          </h2>
        </div>

        {/* Job Description */}
        <p className="text-sm text-slate-500 line-clamp-2 mb-4">
          {job?.description || 'No description available'}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <Badge className="bg-purple-50 text-purple-700 hover:bg-purple-100 border-0 px-3 py-1 font-medium rounded-full text-xs">
            <Building2 className="w-3 h-3 mr-1" />
            {job?.position || 'Position'} ({job?.positionCount || 1})
          </Badge>
          <Badge className="bg-orange-50 text-orange-600 hover:bg-orange-100 border-0 px-3 py-1 font-medium rounded-full text-xs">
            {job?.jobType || 'Full-time'}
          </Badge>
          <Badge className="bg-green-50 text-green-600 hover:bg-green-100 border-0 px-3 py-1 font-medium rounded-full text-xs">
            {job?.salary || 'Negotiable'} LPA
          </Badge>
        </div>

        {/* View Details Button */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span>{job?.applicants?.length || 0} applicants</span>
          </div>
         
          <button className="text-purple-600 font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
            View Details
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
         
        </div>
      </div>
    </div>
    </>
  );
};

export default LatestJobCards;
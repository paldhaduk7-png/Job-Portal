import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Building2, ArrowUpRight, Users, Award, Briefcase ,Clock} from 'lucide-react';
import { useState } from "react";
import LoginPopup from '@/Autheticated/LoginPopup';
import useAuthenticate from '@/Autheticated/useAuthticate';

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const requireAuth = useAuthenticate(setOpen);

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

  const getJobTypeColor = (type) => {
    const colors = {
      'Full-time': 'bg-emerald-50 text-emerald-600 border-emerald-200',
      'Part-time': 'bg-blue-50 text-blue-600 border-blue-200',
      'Contract': 'bg-orange-50 text-orange-600 border-orange-200',
      'Internship': 'bg-pink-50 text-pink-600 border-pink-200',
      'Remote': 'bg-purple-50 text-purple-600 border-purple-200'
    };
    return colors[type] || 'bg-slate-50 text-slate-600 border-slate-200';
  };

  const getRandomGradient = () => {
    const gradients = [
      'from-purple-100 to-indigo-100',
      'from-pink-100 to-rose-100',
      'from-blue-100 to-cyan-100',
      'from-emerald-100 to-teal-100',
      'from-orange-100 to-amber-100',
      'from-violet-100 to-purple-100'
    ];
    return gradients[Math.floor(Math.random() * gradients.length)];
  };

  return (
    <>
      <LoginPopup open={open} setOpen={setOpen} />
      <div 
        onClick={() => {
          if (!requireAuth()) return;
          navigate(`/description/${job._id}`);
        }}
        className="group relative bg-white rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer hover:-translate-y-2 overflow-hidden"
      >
        {/* Gradient Top Bar */}
        <div className={`h-1 w-full bg-gradient-to-r ${getRandomGradient()} group-hover:h-1.5 transition-all duration-300`}></div>

        <div className="p-6">
          {/* Company Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className={`w-14 h-14 bg-gradient-to-br ${getRandomGradient()} rounded-2xl flex items-center justify-center text-2xl font-bold text-purple-600 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                  {job?.company?.name?.charAt(0).toUpperCase() || 'C'}
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-400 rounded-full border-2 border-white flex items-center justify-center">
                  <Award className="w-3 h-3 text-white" />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-slate-800 group-hover:text-purple-600 transition-colors text-lg">
                  {job?.company?.name || 'Company'}
                </h3>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{job?.location || job?.company?.location || 'Remote'}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200/60">
                <Clock className="w-3 h-3 text-slate-400" />
                <span className="text-xs font-medium text-slate-600">{formatDate(job?.createdAt)}</span>
              </div>
            </div>
          </div>

          {/* Job Title */}
          <div className="mb-3">
            <h2 className="text-xl font-bold text-slate-800 group-hover:text-purple-600 transition-colors line-clamp-1">
              {job?.title || 'Job Title'}
            </h2>
          </div>

          {/* Job Description */}
          <p className="text-sm text-slate-500 line-clamp-2 mb-4 leading-relaxed">
            {job?.description || 'No description available'}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Badge className="bg-purple-50 text-purple-700 hover:bg-purple-100 border-0 px-3 py-1.5 font-medium rounded-full text-xs flex items-center gap-1">
              <Building2 className="w-3 h-3" />
              {job?.position ? `${job.position} Positions` : 'Multiple Openings'}
            </Badge>
            <Badge className={`border ${getJobTypeColor(job?.jobType)} px-3 py-1.5 font-medium rounded-full text-xs flex items-center gap-1`}>
              <Briefcase className="w-3 h-3" />
              {job?.jobType || 'Full-time'}
            </Badge>
            <Badge className="bg-gradient-to-r from-amber-50 to-orange-50 text-amber-600 border-0 px-3 py-1.5 font-medium rounded-full text-xs">
              💰 {job?.salary || 'Negotiable'} LPA
            </Badge>
          </div>

          {/* View Details Button */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2 text-sm">
              <Users className="w-4 h-4 text-slate-400" />
              <span className="text-slate-500 font-medium">
                {job?.applications?.length ?? 0} {job?.applications?.length === 1 ? 'applicant' : 'applicants'}
              </span>
            </div>
            
            <button className="group/btn relative px-5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-sm rounded-xl shadow-md shadow-purple-500/20 hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 overflow-hidden">
              <span className="relative z-10 flex items-center gap-1.5">
                View Details
                <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-indigo-700 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LatestJobCards;
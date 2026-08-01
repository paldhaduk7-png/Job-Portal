import React from 'react'
import { Button } from '@/components/ui/button'
import { Bookmark, MapPin, Clock, Briefcase, DollarSign, Users, ArrowUpRight } from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from "@/components/ui/badge"
import { useNavigate } from 'react-router-dom'

const job = ({job}) => {
  const navigate = useNavigate();
 
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
    <div className="group bg-white rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer hover:border-purple-200/60 hover:-translate-y-1">
      <div className="p-6">
        
        {/* Header - Date & Bookmark */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5 text-sm text-slate-400 bg-slate-50 px-3 py-1.5 rounded-full">
            <Clock className="w-3.5 h-3.5" />
            <span>{daysAgoFunction(job?.createdAt)}</span>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-purple-50 hover:text-purple-600 transition-colors">
            <Bookmark className="w-5 h-5 text-slate-400 group-hover:text-purple-600 transition-colors" />
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
            {job?.position || 'Position'} ({job?.positionCount || 1})
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
            onClick={() => navigate(`/description/${job._id}`)} 
            variant="outline" 
            className="flex-1 rounded-xl border-slate-200 hover:border-purple-300 hover:bg-purple-50/50 transition-all duration-200 group"
          >
            <span>View Details</span>
            <ArrowUpRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Button>
          <Button className="flex-1 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300">
            Save for later
          </Button>
        </div>
      </div>
    </div>
  )
}

export default job;
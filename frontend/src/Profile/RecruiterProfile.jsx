import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import {
  Building2,
  Mail,
  MapPin,
  Pen,
  BriefcaseBusiness,
  Phone,
  User,
  Globe,
  Award,
  Users,
  Calendar,
  ExternalLink,
  Plus,
  BookOpen,
  Clock,
  CheckCircle2
} from "lucide-react";
import { useSelector } from "react-redux";
import UpdateRecruiterProfile from "./UpdateRecruiterProfile";
import RecruiterPostedJobs from "./RecruiterPostedJobs";
import ImagePreviewModal from "./ImagePreviewModal";


const RecruiterProfile = () => {
  const [open, setOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 md:px-6 lg:px-8">
      {/* Page Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-50 p-2.5 rounded-xl">
          <User className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Recruiter Profile</h1>
          <p className="text-sm text-gray-500">Manage your profile and company information</p>
        </div>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Cover Image */}
        <div className="h-28 md:h-32 bg-gradient-to-r from-blue-500 to-blue-600"></div>

        {/* Profile Content */}
        <div className="px-4 md:px-6 pb-6">
          {/* Profile Header - Avatar and Name */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-12 gap-4">
            <div className="flex items-end gap-4">
              <Avatar
  onClick={() => setPreviewOpen(true)}
  className="h-20 w-20 md:h-24 md:w-24 border-4 border-white shadow-md cursor-pointer hover:scale-105 transition"
>
                {user?.Profile?.profilePhoto ? (
                  <AvatarImage src={user?.Profile?.profilePhoto} alt="profile" />
                ) : (
                  <AvatarFallback className="bg-blue-100 text-blue-700 text-xl md:text-2xl font-bold">
                    {getInitials(user?.fullname)}
                  </AvatarFallback>
                )}
              </Avatar>

              <div className="pb-1">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                  {user?.fullname || 'Recruiter'}
                </h2>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Award className="h-4 w-4 text-blue-500" />
                  <span>{user?.Profile?.designation || 'Recruiter'}</span>
                </div>
                {user?.Profile?.bio && (
                  <p className="text-sm text-gray-400 mt-0.5">{user?.Profile?.bio}</p>
                )}
              </div>
            </div>

            <Button
              onClick={() => setOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow transition-all w-full sm:w-auto"
            >
              <Pen className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </div>

          {/* Contact Info - Clean row */}
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-600 border-t border-gray-100 pt-4">
            {user?.email && (
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-blue-500" />
                <span>{user?.email}</span>
              </div>
            )}
            {user?.phoneNumber && (
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-blue-500" />
                <span>{user?.phoneNumber}</span>
              </div>
            )}
          </div>

          {/* Company Information */}
          <div className="mt-6">
            <div className="flex items-center gap-2 mb-3">
              <Building2 className="h-4 w-4 text-blue-600" />
              <h3 className="font-medium text-gray-900">Company Information</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Company Name */}
              <div className="flex items-center gap-3 px-3 py-2.5 bg-gray-50 rounded-lg">
                <Building2 className="h-4 w-4 text-blue-500 flex-shrink-0" />
                <span className="text-sm text-gray-700">
                  {user?.Profile?.companyName || 'Not added'}
                </span>
              </div>

              {/* Location */}
              <div className="flex items-center gap-3 px-3 py-2.5 bg-gray-50 rounded-lg">
                <MapPin className="h-4 w-4 text-blue-500 flex-shrink-0" />
                <span className="text-sm text-gray-700">
                  {user?.Profile?.companyLocation || 'Not added'}
                </span>
              </div>

              {/* Designation */}
              <div className="flex items-center gap-3 px-3 py-2.5 bg-gray-50 rounded-lg">
                <BriefcaseBusiness className="h-4 w-4 text-blue-500 flex-shrink-0" />
                <span className="text-sm text-gray-700">
                  {user?.Profile?.designation || 'Not specified'}
                </span>
              </div>

              {/* Website - Full width if exists */}
              {user?.Profile?.companyWebsite && (
                <div className="flex items-center gap-3 px-3 py-2.5 bg-gray-50 rounded-lg md:col-span-2">
                  <Globe className="h-4 w-4 text-blue-500 flex-shrink-0" />
                  <a
                    href={user.Profile.companyWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1"
                  >
                    {user.Profile.companyWebsite}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-blue-50 p-2.5 rounded-lg">
              <BriefcaseBusiness className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{user?.jobs?.length || 0}</p>
              <p className="text-xs text-gray-500">Total Jobs Posted</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-green-50 p-2.5 rounded-lg">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {user?.jobs?.filter(job => job.status === 'active').length || 0}
              </p>
              <p className="text-xs text-gray-500">Active Jobs</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-purple-50 p-2.5 rounded-lg">
              <Users className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {user?.jobs?.reduce((total, job) => total + (job.applicants || 0), 0) || 0}
              </p>
              <p className="text-xs text-gray-500">Total Applicants</p>
            </div>
          </div>
        </div>
      </div>

      {/* Posted Jobs Section */}
      <div className="mt-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
          <div className="flex items-center gap-2">
            <BriefcaseBusiness className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold text-lg text-gray-900">Posted Jobs</h3>
            <span className="text-xs bg-blue-100 text-blue-700 px-2.5 py-0.5 rounded-full">
              {user?.jobs?.length || 0} Jobs
            </span>
          </div>
          <Button variant="outline" className="text-sm border-blue-200 text-blue-600 hover:bg-blue-50">
            <Plus className="w-4 h-4 mr-1" />
            Post New Job
          </Button>
        </div>
        <RecruiterPostedJobs />
      </div>

      <UpdateRecruiterProfile open={open} setOpen={setOpen} />
      <ImagePreviewModal
  open={previewOpen}
  setOpen={setPreviewOpen}
  image={user?.Profile?.profilePhoto}
/>
    </div>
  );
};

export default RecruiterProfile;
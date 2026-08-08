import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  Pen,
  Phone,
  Briefcase,
  MapPin,
  Eye,
  CheckCircle,
  XCircle,
  FileText,
  Code,
  BookOpen,
  Share2,
  Globe,
  GraduationCap,
  User,
  ExternalLink,
  Building,
  Clock,
  Sparkles,
  Award,
  Layers,
  FileCheck,
  Zap,
  CheckCircle2
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import ApplicationJobTable from "./ApplicationJobTable";
import UpdateProfile from "./UpdateProfile";
import useGetAppliedJob from "@/hooks/useGetAppliedJob";
import ImagePreviewModal from "./ImagePreviewModal";

const Profile = () => {
  useGetAppliedJob();

  const [open, setOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const { user } = useSelector((store) => store.auth);
  const savedJobState = useSelector((store) => store.savedJob);
  const applyjobstate = useSelector((store) => store.job);

  const acceptedCount =
    applyjobstate?.allAppliedJob?.filter(
      (app) => app.status === "accepted"
    ).length || 0;

  const rejectedCount =
    applyjobstate?.allAppliedJob?.filter(
      (app) => app.status === "rejected"
    ).length || 0;

  const stats = [
    {
      label: "Applied Jobs",
      value: applyjobstate?.allAppliedJob?.length || 0,
      icon: <Briefcase className="w-5 h-5" />,
      color: "from-indigo-500 to-purple-600",
      bgLight: "bg-indigo-50 text-indigo-600 border-indigo-100/80",
    },
    {
      label: "Accepted",
      value: acceptedCount,
      icon: <CheckCircle className="w-5 h-5" />,
      color: "from-emerald-500 to-teal-600",
      bgLight: "bg-emerald-50 text-emerald-600 border-emerald-100/80",
    },
    {
      label: "Rejected",
      value: rejectedCount,
      icon: <XCircle className="w-5 h-5" />,
      color: "from-rose-500 to-red-600",
      bgLight: "bg-rose-50 text-rose-600 border-rose-100/80",
    },
    {
      label: "Saved Jobs",
      value: savedJobState?.savedJobs?.length || 0,
      icon: <BookOpen className="w-5 h-5" />,
      color: "from-amber-500 to-orange-600",
      bgLight: "bg-amber-50 text-amber-600 border-amber-100/80",
    },
  ];

  const socialIcons = {
    github: {
      icon: <FaGithub className="w-4 h-4" />,
      color: "text-slate-800",
      bg: "bg-slate-100 hover:bg-slate-200 border-slate-200/80",
      label: "GitHub Profile",
    },
    linkedin: {
      icon: <FaLinkedin className="w-4 h-4 text-blue-600" />,
      color: "text-blue-700",
      bg: "bg-blue-50/80 hover:bg-blue-100 border-blue-200/80",
      label: "LinkedIn Network",
    },
    portfolio: {
      icon: <Globe className="w-4 h-4 text-purple-600" />,
      color: "text-purple-700",
      bg: "bg-purple-50/80 hover:bg-purple-100 border-purple-200/80",
      label: "Personal Portfolio",
    },
    leetcode: {
      icon: <GraduationCap className="w-4 h-4 text-amber-600" />,
      color: "text-amber-700",
      bg: "bg-amber-50/80 hover:bg-amber-100 border-amber-200/80",
      label: "LeetCode Activity",
    },
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50/90 via-indigo-50/20 to-slate-50/80 relative overflow-hidden py-10 px-4 sm:px-6 lg:px-8">
      
      {/* Background Ambient Glows & Mesh Lighting */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[650px] h-[400px] bg-gradient-to-tr from-indigo-500/15 via-purple-500/12 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-40 right-10 w-[500px] h-[380px] bg-gradient-to-bl from-pink-500/10 via-indigo-400/8 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-[600px] left-1/3 w-[700px] h-[450px] bg-gradient-to-r from-blue-400/8 via-purple-400/8 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Main Profile Header Card */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
          
          {/* Cover Header Banner */}
          <div className="h-44 sm:h-52 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 relative overflow-hidden p-6 sm:p-8 flex items-start justify-end text-white">
            
            {/* Ambient Background Lights */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent pointer-events-none" />
            <div className="absolute -top-16 -left-16 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-pink-300/20 rounded-full blur-3xl pointer-events-none" />

            {/* Edit Profile Action Button */}
            <div className="relative z-10">
              <Button
                onClick={() => setOpen(true)}
                className="bg-white/20 hover:bg-white/30 text-white border border-white/30 rounded-2xl shadow-lg backdrop-blur-md transition-all duration-200 text-xs sm:text-sm font-semibold h-10 px-4 flex items-center gap-2 active:scale-95"
              >
                <Pen className="w-3.5 h-3.5" />
                <span>Edit Profile</span>
              </Button>
            </div>
          </div>

          {/* Profile Details Container */}
          <div className="px-6 sm:px-10 pb-8 sm:pb-10 relative">
            
            {/* Overlapping Profile Photo */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-16 sm:-mt-20 mb-6">
              <div className="relative group w-fit">
                <Avatar
                  onClick={() => setPreviewOpen(true)}
                  className="h-28 w-28 sm:h-34 sm:w-34 rounded-3xl ring-4 ring-white shadow-2xl cursor-pointer hover:scale-105 transition-all duration-300 bg-gradient-to-br from-indigo-100 to-purple-100"
                >
                  <AvatarImage
                    src={user?.Profile?.profilePhoto}
                    alt={user?.fullname || "Profile"}
                    className="object-cover object-top"
                  />
                  <AvatarFallback className="rounded-3xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-600 text-white font-extrabold text-2xl sm:text-3xl">
                    {getInitials(user?.fullname)}
                  </AvatarFallback>
                </Avatar>
                <div 
                  onClick={() => setPreviewOpen(true)}
                  className="absolute bottom-1 right-1 bg-white p-1.5 rounded-full shadow-md text-indigo-600 cursor-pointer hover:scale-110 transition-transform"
                  title="Click to preview image"
                >
                  <Eye className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Member Status Badge */}
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 bg-slate-50 border border-slate-200/80 px-3.5 py-1.5 rounded-full shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                <span>Candidate Account • Member since 2024</span>
              </div>
            </div>

            {/* Name & Role */}
            <div className="mb-6">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  {user?.fullname || "User"}
                </h1>
                <Badge className="bg-indigo-50 text-indigo-700 border border-indigo-200/80 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mr-1.5 animate-pulse"></span>
                  {user?.role || "STUDENT"}
                </Badge>
              </div>

              {/* Bio Callout */}
              <div className="mt-3.5 p-4 rounded-2xl bg-gradient-to-r from-slate-50 to-indigo-50/30 border border-slate-200/70 text-sm text-slate-600 leading-relaxed font-normal">
                <p className="flex items-start gap-2">
                  <span className="text-indigo-500 font-bold">•</span>
                  <span>{user?.Profile?.bio || "No professional bio added yet. Click 'Edit Profile' to add a summary about your skills and career interests."}</span>
                </p>
              </div>
            </div>

            {/* Contact Information Chips */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-8">
              
              {/* Email */}
              <div className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3.5 border border-slate-200/80 shadow-2xs hover:border-indigo-200 hover:shadow-xs transition-all">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold shadow-2xs shrink-0">
                  <Mail className="w-4.5 h-4.5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Email Address</p>
                  <p className="text-xs sm:text-sm font-bold text-slate-800 truncate">{user?.email || "Not specified"}</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3.5 border border-slate-200/80 shadow-2xs hover:border-emerald-200 hover:shadow-xs transition-all">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold shadow-2xs shrink-0">
                  <Phone className="w-4.5 h-4.5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Phone Number</p>
                  <p className="text-xs sm:text-sm font-bold text-slate-800 truncate">{user?.phoneNumber || "Not provided"}</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3.5 border border-slate-200/80 shadow-2xs hover:border-amber-200 hover:shadow-xs transition-all">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold shadow-2xs shrink-0">
                  <MapPin className="w-4.5 h-4.5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Current Location</p>
                  <p className="text-xs sm:text-sm font-bold text-slate-800 truncate">{user?.Profile?.location || "Location not set"}</p>
                </div>
              </div>
            </div>

            {/* 4-Card Key Performance Metrics Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-5 text-center border border-slate-200/80 shadow-2xs hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 group"
                >
                  <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${stat.color} text-white shadow-md shadow-indigo-500/10 mb-2.5 group-hover:scale-110 transition-transform`}>
                    {stat.icon}
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    {stat.value}
                  </div>
                  <p className="text-xs text-slate-500 font-semibold mt-1 uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Skills & Expertise */}
            <div className="bg-slate-50/70 rounded-3xl p-6 sm:p-7 border border-slate-200/70 mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center shadow-2xs">
                    <Code className="w-4 h-4" />
                  </div>
                  <h2 className="text-base font-bold text-slate-900 tracking-tight">
                    Skills & Technical Expertise
                  </h2>
                </div>
                <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200/80 px-3 py-1 rounded-full">
                  {user?.Profile?.skills?.length || 0} skills added
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {user?.Profile?.skills?.length > 0 ? (
                  user.Profile.skills.map((item, index) => (
                    <Badge
                      key={index}
                      className="bg-white hover:bg-indigo-50 text-indigo-700 border border-indigo-200/80 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 shadow-2xs hover:scale-105 cursor-default flex items-center gap-1.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                      {item}
                    </Badge>
                  ))
                ) : (
                  <p className="text-xs text-slate-400 font-medium">No skills added yet. Update profile to showcase your tech stack.</p>
                )}
              </div>
            </div>

            {/* Resume Document Card */}
            <div className="bg-slate-50/70 rounded-3xl p-6 sm:p-7 border border-slate-200/70 mb-8">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shadow-2xs">
                  <FileText className="w-4 h-4" />
                </div>
                <h2 className="text-base font-bold text-slate-900 tracking-tight">
                  Attached Resume & Portfolio PDF
                </h2>
              </div>

              <div className="bg-white rounded-2xl p-4.5 border border-slate-200/80 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {user?.Profile?.resume ? (
                  <>
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                        <FileText className="w-6 h-6" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-slate-800 truncate">
                          {user?.Profile?.resumeOriginalName || "Resume Document.pdf"}
                        </p>
                        <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                          <Clock className="w-3.5 h-3.5" />
                          <span>Uploaded & verified resume file</span>
                        </p>
                      </div>
                    </div>

                    <a
                      href={user.Profile.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-md shadow-indigo-500/20 transition-all duration-200 hover:scale-[1.02] active:scale-95"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View Resume</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </>
                ) : (
                  <div className="flex items-center justify-between w-full">
                    <p className="text-xs text-slate-400 font-medium">No resume document uploaded yet.</p>
                    <Button 
                      onClick={() => setOpen(true)}
                      variant="outline" 
                      size="sm" 
                      className="rounded-xl text-xs font-semibold text-indigo-700 border-indigo-200"
                    >
                      Upload Resume
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Social & Portfolio Links */}
            <div className="bg-slate-50/70 rounded-3xl p-6 sm:p-7 border border-slate-200/70">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shadow-2xs">
                  <Share2 className="w-4 h-4" />
                </div>
                <h2 className="text-base font-bold text-slate-900 tracking-tight">
                  Developer Profiles & Social Presence
                </h2>
              </div>

              <div className="flex flex-wrap gap-3">
                {user?.Profile?.github && (
                  <a
                    href={user.Profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 ${socialIcons.github.bg} ${socialIcons.github.color} px-4 py-2 rounded-xl text-xs font-semibold border transition-all hover:scale-105 shadow-2xs`}
                  >
                    {socialIcons.github.icon}
                    <span>{socialIcons.github.label}</span>
                    <ExternalLink className="w-3 h-3 opacity-60 ml-0.5" />
                  </a>
                )}

                {user?.Profile?.linkedin && (
                  <a
                    href={user.Profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 ${socialIcons.linkedin.bg} ${socialIcons.linkedin.color} px-4 py-2 rounded-xl text-xs font-semibold border transition-all hover:scale-105 shadow-2xs`}
                  >
                    {socialIcons.linkedin.icon}
                    <span>{socialIcons.linkedin.label}</span>
                    <ExternalLink className="w-3 h-3 opacity-60 ml-0.5" />
                  </a>
                )}

                {user?.Profile?.portfolio && (
                  <a
                    href={user.Profile.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 ${socialIcons.portfolio.bg} ${socialIcons.portfolio.color} px-4 py-2 rounded-xl text-xs font-semibold border transition-all hover:scale-105 shadow-2xs`}
                  >
                    {socialIcons.portfolio.icon}
                    <span>{socialIcons.portfolio.label}</span>
                    <ExternalLink className="w-3 h-3 opacity-60 ml-0.5" />
                  </a>
                )}

                {user?.Profile?.leetcode && (
                  <a
                    href={user.Profile.leetcode}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 ${socialIcons.leetcode.bg} ${socialIcons.leetcode.color} px-4 py-2 rounded-xl text-xs font-semibold border transition-all hover:scale-105 shadow-2xs`}
                  >
                    {socialIcons.leetcode.icon}
                    <span>{socialIcons.leetcode.label}</span>
                    <ExternalLink className="w-3 h-3 opacity-60 ml-0.5" />
                  </a>
                )}

                {!user?.Profile?.github &&
                  !user?.Profile?.linkedin &&
                  !user?.Profile?.portfolio &&
                  !user?.Profile?.leetcode && (
                    <p className="text-xs text-slate-400 font-medium">No external profiles linked yet.</p>
                  )}
              </div>
            </div>

          </div>
        </div>

        {/* Applied Jobs Section */}
        <div className="pt-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
                <Building className="w-6 h-6 text-indigo-600" />
                <span>My Job Applications</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Real-time tracking of all your submitted job applications and candidate status
              </p>
            </div>
            
            <Badge className="bg-indigo-50 text-indigo-700 border border-indigo-200/80 px-4 py-2 text-xs font-semibold rounded-full shadow-2xs w-fit">
              <Briefcase className="w-3.5 h-3.5 mr-1.5 text-indigo-600" />
              {applyjobstate?.allAppliedJob?.length || 0} Applications
            </Badge>
          </div>

          <ApplicationJobTable />
        </div>

      </div>

      {/* Modals */}
      <UpdateProfile open={open} setOpen={setOpen} />
      <ImagePreviewModal
        open={previewOpen}
        setOpen={setPreviewOpen}
        image={user?.Profile?.profilePhoto}
      />
    </div>
  );
};

export default Profile;
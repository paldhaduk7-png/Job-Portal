import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
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
} from "lucide-react";
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
  // console.log(savedJobState);
  const applyjobstate= useSelector((store)=>store.job);
  console.log(applyjobstate);

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
    },
    {
  label: "Accepted",
  value: acceptedCount,
  icon: <CheckCircle className="w-5 h-5" />,
},
{
  label: "Rejected",
  value: rejectedCount,
  icon: <XCircle className="w-5 h-5" />,
},
    {
      label: "Saved Jobs",
      value: savedJobState?.savedJobs?.length || 0,
      icon: <BookOpen className="w-5 h-5" />,
    },
  ];

  
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* ================= PROFILE CARD ================= */}

      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">

        {/* Cover */}
        <div className="h-32 bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-500 relative">

          {/* Profile Photo */}
         {/* Profile Photo */}
<div className="absolute -bottom-12 left-8">
  <Avatar
    onClick={() => setPreviewOpen(true)}
    className="h-28 w-28 ring-4 ring-white shadow-xl cursor-pointer hover:scale-105 transition"
  >
    <AvatarImage
      src={user?.Profile?.profilePhoto}
      alt={user?.fullname || "Profile"}
    />
  </Avatar>
</div>

          {/* Edit Profile */}
          <div className="absolute right-6 top-6">
            <Button
              onClick={() => setOpen(true)}
              className="bg-white/20 hover:bg-white/30 text-white border-0 shadow-lg"
              size="sm"
            >
              <Pen className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </div>

        {/* Profile Content */}
        <div className="pt-16 px-8 pb-8">

          {/* Name */}
          <div className="mb-6">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-slate-800">
                {user?.fullname || "User"}
              </h1>

              <Badge className="bg-purple-100 text-purple-700 border-0">
                {user?.role?.toUpperCase() || "STUDENT"}
              </Badge>
            </div>

            <p className="text-slate-500 text-sm mt-1">
              {user?.Profile?.bio || "No bio added"}
            </p>
          </div>

          {/* ================= CONTACT ================= */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

            {/* Email */}
            <div className="flex items-center gap-3 bg-slate-50 rounded-xl px-4 py-3 border border-slate-200">
              <Mail className="w-5 h-5 text-purple-600 shrink-0" />

              <span className="text-sm text-slate-600 break-all">
                {user?.email || "Not added"}
              </span>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-3 bg-slate-50 rounded-xl px-4 py-3 border border-slate-200">
              <Phone className="w-5 h-5 text-purple-600 shrink-0" />

              <span className="text-sm text-slate-600">
                {user?.phoneNumber || "Not added"}
              </span>
            </div>

            {/* Location */}
            <div className="flex items-center gap-3 bg-slate-50 rounded-xl px-4 py-3 border border-slate-200">
              <MapPin className="w-5 h-5 text-purple-600 shrink-0" />

              <span className="text-sm text-slate-600">
                {user?.Profile?.location || "Location not set"}
              </span>
            </div>

          </div>

          {/* ================= STATS ================= */}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-4 text-center border border-purple-100"
              >
                <div className="flex justify-center items-center gap-2 text-purple-600 mb-1">
                  {stat.icon}

                  <span className="text-2xl font-bold text-slate-800">
                    {stat.value}
                  </span>
                </div>

                <p className="text-xs text-slate-500 font-medium">
                  {stat.label}
                </p>
              </div>
            ))}

          </div>

          {/* ================= SKILLS ================= */}

          <div className="mb-8">

            <div className="flex items-center justify-between mb-3">

              <h2 className="font-semibold text-slate-700 flex items-center gap-2">
                <Code className="w-5 h-5 text-purple-600" />
                Skills
              </h2>

              <span className="text-xs text-slate-400">
                {user?.Profile?.skills?.length || 0} skills
              </span>

            </div>

            <div className="flex flex-wrap gap-2">

              {user?.Profile?.skills?.length > 0 ? (
                user.Profile.skills.map((item, index) => (
                  <Badge
                    key={index}
                    className="bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 border-0 px-4 py-1.5 rounded-full"
                  >
                    {item}
                  </Badge>
                ))
              ) : (
                <span className="text-sm text-slate-400">
                  No skills added yet
                </span>
              )}

            </div>
          </div>

          {/* ================= RESUME ================= */}

          <div className="mb-8">

            <h2 className="font-semibold text-slate-700 flex items-center gap-2 mb-3">
              <FileText className="w-5 h-5 text-purple-600" />
              Resume
            </h2>

            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">

              {user?.Profile?.resume ? (

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                  <div className="flex items-center gap-3">

                    <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-red-500" />
                    </div>

                    <p className="text-sm font-medium text-slate-700">
                      {user?.Profile?.resumeOriginalName || "Resume.pdf"}
                    </p>

                  </div>

                  <div className="flex items-center gap-4">

                    <a
                      href={user.Profile.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-600 hover:text-purple-700 text-sm font-medium flex items-center gap-1"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </a>
                  </div>

                </div>

              ) : (

                <span className="text-sm text-slate-400">
                  No resume uploaded
                </span>

              )}

            </div>
          </div>

          {/* ================= SOCIAL LINKS ================= */}

          <div>

            <h2 className="font-semibold text-slate-700 flex items-center gap-2 mb-3">
              <Share2 className="w-5 h-5 text-purple-600" />
              Social Links
            </h2>

            <div className="flex flex-wrap gap-3">

            {user?.Profile?.github && (
  <a
    href={user.Profile.github}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-full"
  >
    <span className="text-sm font-medium">GitHub</span>
  </a>
)}

              {user?.Profile?.linkedin && (
                <a
                  href={user.Profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-50 hover:bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm"
                >
                  LinkedIn
                </a>
              )}

              {user?.Profile?.portfolio && (
                <a
                  href={user.Profile.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-sky-50 hover:bg-sky-100 text-sky-600 px-4 py-2 rounded-full text-sm"
                >
                  Portfolio
                </a>
              )}
              {user?.Profile?.leetcode && (
                <a
                  href={user.Profile.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-sky-50 hover:bg-sky-100 text-sky-600 px-4 py-2 rounded-full text-sm"
                >
                 LeetCode
                </a>
              )}

              {!user?.Profile?.github &&
                !user?.Profile?.linkedin &&
                !user?.Profile?.portfolio && 
                !user?.Profile?.leetcode &&(
                  <span className="text-sm text-slate-400">
                    No social links added
                  </span>
                )}

            </div>
          </div>

        </div>
      </div>

      {/* ================= APPLIED JOBS ================= */}

      <div className="mt-8">

        <div className="flex items-center justify-between mb-4">

          <div>
            <h2 className="text-xl font-bold text-slate-800">
              Applied Jobs
            </h2>

            <p className="text-sm text-slate-500">
              Track your job applications
            </p>
          </div>

          <Badge className="bg-purple-100 text-purple-700 border-0 px-4 py-2">
            {applyjobstate?.allAppliedJob?.length || 0} Applications
          </Badge>

        </div>

        {/* IMPORTANT: original working component */}
        <ApplicationJobTable />

      </div>

      {/* IMPORTANT: original working update component */}
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
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Contact, Mail, Pen, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import ApplicationJobTabel from "./ApplicationJobTabel";
import UpadateProfile from "./upadateProfile.jsx";
import {  useSelector } from "react-redux";
import useGetAppliedJob from "@/hooks/useGetAppliedJob";

const Profile = () => {
 
useGetAppliedJob();
const [open , setOpen]=useState(false);

const {user}=useSelector(store=>store.auth);


  return (

    <div>
    <div className="max-w-5xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">

      {/* TOP SECTION */}
      <div className="flex justify-between items-start">

        <div className="flex items-center gap-4">
          <Avatar className="h-24 w-24">
            <AvatarImage src={user?.Profile?.profilePhoto} alt="logo" />
          </Avatar>

          <div>
          {  console.log(user)}
            <h1 className="font-semibold text-xl"> {user?.fullname}</h1>
            <p className="text-gray-500 text-sm">
              {user?.Profile?.bio || "No bio added"}

            </p>
          </div>
        </div>

        <Button  onClick={()=>setOpen(true)} variant="outline" size="icon" className="rounded-full">
          <Pen className="w-5 h-5" />
        </Button>
      </div>

      {/* CONTACT */}
      <div className="mt-6 space-y-3">
        <div className="flex items-center gap-3 text-gray-700">
          <Mail className="w-5 h-5" />
<span>{user?.email}</span>
        </div>

        <div className="flex items-center gap-3 text-gray-700">
          <Contact className="w-5 h-5" />
          <span>{user?.phoneNumber}</span>
        </div>
      </div>

      {/* SKILLS */}
      <div className="mt-6">
        <h1 className="font-semibold mb-2">Skills</h1>

        <div className="flex flex-wrap gap-2">
        {user?.Profile?.skills?.length > 0 ? (
  user.Profile.skills.map((item, index) => (
    <Badge key={index}>{item}</Badge>
  ))
) : (
  <span>NA</span>
)}
        </div>
      </div>

{/* RESUME */}
<div className="mt-6">
  <Label className="font-semibold">Resume</Label>
  <div>
    {user?.Profile?.resume ? (
      <a
        href={user.Profile.resume}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline block cursor-pointer"
      >
        {user?.Profile?.resumeOriginalName || "View Resume"}
      </a>
    ) : (
      <span>NA</span>
    )}
  </div>
</div>

    </div>

      {/* APPLIED JOBS */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl">
        <h1 className="font-semibold text-lg mb-3">Applied Jobs</h1>
        <ApplicationJobTabel />
      </div>

      <UpadateProfile open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;

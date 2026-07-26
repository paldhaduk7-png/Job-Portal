import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import {
  Building2,
  Contact,
  Globe,
  Mail,
  MapPin,
  Pen,
  BriefcaseBusiness,
} from "lucide-react";
import { useSelector } from "react-redux";
import UpdateRecruiterProfile from "./updateRecuterProfile";
import RecruiterPostedJobs from "./RecruiterPostedJobs";

const RecruiterProfile = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div>
      <div className="max-w-5xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">

        {/* TOP SECTION */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">

            <Avatar className="h-24 w-24">
              <AvatarImage
                src={user?.Profile?.profilePhoto}
                alt="profile"
              />
            </Avatar>

            <div>
              <h1 className="font-semibold text-xl">
                {user?.fullname}
              </h1>

              <p className="text-gray-500 text-sm">
                {user?.Profile?.bio || "No bio added"}
              </p>
            </div>
          </div>

          <Button
            onClick={() => setOpen(true)}
            variant="outline"
            size="icon"
            className="rounded-full"
          >
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
            <span>{user?.phoneNumber || "NA"}</span>
          </div>

        </div>

        {/* COMPANY INFORMATION */}
        <div className="mt-8">
          <h1 className="font-semibold text-lg mb-4">
            Company Information
          </h1>

          <div className="space-y-3">

            <div className="flex items-center gap-3">
              <Building2 className="w-5 h-5" />
              <span>
                {user?.Profile?.companyName || "Company not added"}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <BriefcaseBusiness className="w-5 h-5" />
              <span>
                {user?.Profile?.designation || "Designation not added"}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5" />
              <span>
                {user?.Profile?.companyLocation || "Location not added"}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5" />

              {user?.Profile?.companyWebsite ? (
                <a
                  href={user.Profile.companyWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {user.Profile.companyWebsite}
                </a>
              ) : (
                <span>Website not added</span>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* POSTED JOBS */}
      <div className="max-w-5xl mx-auto bg-white rounded-2xl">
        <h1 className="font-semibold text-lg mb-3">
          Posted Jobs
        </h1>

        {/* Add your recruiter jobs table here */}
        <RecruiterPostedJobs />
      </div>

       <UpdateRecruiterProfile open={open} setOpen={setOpen} />
    </div>
  );
};

export default RecruiterProfile;
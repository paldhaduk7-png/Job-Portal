import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import React from "react";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import ApplicationJobTabel from "./ApplicationJobTabel";

const Skills=["html", "css","java Script", "React.js"];
const Profile = () => {
  const isResume = true;

  return (

    <div>
    <div className="max-w-5xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">

      {/* TOP SECTION */}
      <div className="flex justify-between items-start">

        <div className="flex items-center gap-4">
          <Avatar className="h-24 w-24">
            <AvatarImage src="YOUR_IMAGE_URL" alt="logo" />
          </Avatar>

          <div>
            <h1 className="font-semibold text-xl">Full Name</h1>
            <p className="text-gray-500 text-sm">
              Add your bio here...
            </p>
          </div>
        </div>

        <Button variant="outline" size="icon" className="rounded-full">
          <Pen className="w-5 h-5" />
        </Button>
      </div>

      {/* CONTACT */}
      <div className="mt-6 space-y-3">
        <div className="flex items-center gap-3 text-gray-700">
          <Mail className="w-5 h-5" />
          <span>patel@gmail.com</span>
        </div>

        <div className="flex items-center gap-3 text-gray-700">
          <Contact className="w-5 h-5" />
          <span>923822893</span>
        </div>
      </div>

      {/* SKILLS */}
      <div className="mt-6">
        <h1 className="font-semibold mb-2">Skills</h1>

        <div className="flex flex-wrap gap-2">
          {Skills.length !== 0 ? (
            Skills.map((item, index) => (
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

        {isResume ? (
          <a
            href="http://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline block"
          >
            PAL
          </a>
        ) : (
          <span>NA</span>
        )}
      </div>
    </div>

      {/* APPLIED JOBS */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl">
        <h1 className="font-semibold text-lg mb-3">Applied Jobs</h1>
        <ApplicationJobTabel />
      </div>
    </div>
  );
};

export default Profile;

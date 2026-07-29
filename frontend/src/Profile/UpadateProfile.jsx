import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import {
  Loader2,
  X,
  User,
  Mail,
  Phone,
  Briefcase,
  Code,
  FileText,
  Save,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser, setLoading } from "@/redux/authSlice";
import { toast } from "sonner";

const UpdateProfile = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector(store => store.auth);

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.Profile?.bio || "",
    skills: user?.Profile?.skills || [],
    profilePhoto: null,
    resume: null
  });

  const [previewPhoto, setPreviewPhoto] = useState(user?.Profile?.profilePhoto || null);

  const textHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, [e.target.name]: file });
      if (e.target.name === 'profilePhoto') {
        const reader = new FileReader();
        reader.onload = (event) => {
          setPreviewPhoto(event.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const removePhoto = () => {
    setPreviewPhoto(null);
    setInput({ ...input, profilePhoto: null });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills.length ? input.skills.join(",") : "");

    if (input.profilePhoto) {
      formData.append("profilePhoto", input.profilePhoto);
    }
    if (input.resume) {
      formData.append("resume", input.resume);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        { withCredentials: true }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        setOpen(false);
      }
    } catch (error) {
      console.log(error.response?.data);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[550px] w-full max-h-[90vh] overflow-y-auto rounded-2xl p-0">
        
        <div className="p-6">
          <DialogHeader className="mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold">Update Profile</DialogTitle>
                <DialogDescription className="text-slate-500">
                  Update your personal details here.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <form onSubmit={submitHandler}>
            <div className="space-y-5">
              
              {/* Profile Photo */}
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center overflow-hidden border-4 border-purple-200">
                    {previewPhoto ? (
                      <img src={previewPhoto} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-10 h-10 text-purple-600" />
                    )}
                  </div>
                  {previewPhoto && (
                    <button
                      type="button"
                      onClick={removePhoto}
                      className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors shadow-lg"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
                <div className="flex-1">
                  <Label className="text-sm font-medium text-slate-700">Profile Photo</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    name="profilePhoto"
                    onChange={fileHandler}
                    className="mt-1 h-10 border-slate-200 rounded-lg cursor-pointer file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 transition-colors"
                  />
                </div>
              </div>

              {/* Full Name */}
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <User className="w-4 h-4 text-purple-600" />
                  Full Name
                </Label>
                <Input
                  type="text"
                  name="fullname"
                  value={input.fullname}
                  onChange={textHandler}
                  className="h-11 border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-purple-600" />
                  Email Address
                </Label>
                <Input
                  type="email"
                  name="email"
                  value={input.email}
                  onChange={textHandler}
                  className="h-11 border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>

              {/* Phone Number */}
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-purple-600" />
                  Phone Number
                </Label>
                <Input
                  type="text"
                  name="phoneNumber"
                  value={input.phoneNumber}
                  onChange={textHandler}
                  className="h-11 border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your phone number"
                />
              </div>

              
              {/* Bio */}
<div className="space-y-1.5">
  <Label className="text-sm font-medium text-slate-700 flex items-center gap-2">
    <Briefcase className="w-4 h-4 text-purple-600" />
    Bio / Title
  </Label>

  <textarea
  name="bio"
  value={input.bio}
  onChange={textHandler}
  placeholder="Write a short bio about yourself"
  rows={3}
  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
/>
</div>

              {/* Skills */}
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <Code className="w-4 h-4 text-purple-600" />
                  Skills (comma separated)
                </Label>
                <Input
                  name="skills"
                  value={input.skills.join(", ")}
                  onChange={(e) =>
                    setInput({
                      ...input,
                      skills: e.target.value.split(",").map(s => s.trim()).filter(s => s)
                    })
                  }
                  className="h-11 border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g. React, Node.js, Python, AWS"
                />
                <p className="text-xs text-slate-400">Separate skills with commas</p>
              </div>

              {/* Resume */}
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-purple-600" />
                  Resume (PDF)
                </Label>
                <Input
                  type="file"
                  name="resume"
                  onChange={fileHandler}
                  accept="application/pdf"
                  className="h-11 border-slate-200 rounded-lg cursor-pointer file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 transition-colors"
                />
                {user?.Profile?.resume && (
                  <p className="text-xs text-slate-400">Current: {user?.Profile?.resumeOriginalName || "Resume.pdf"}</p>
                )}
              </div>
            </div>

            <DialogFooter className="mt-6 gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="flex-1 rounded-lg h-11"
              >
                Cancel
              </Button>
              {loading ? (
                <Button className="flex-1 rounded-lg h-11 bg-purple-600" disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="flex-1 rounded-lg h-11 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Update Profile
                </Button>
              )}
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfile;
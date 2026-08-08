import React, { useState, useEffect } from "react";
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
  MapPin,
  Globe,
  GraduationCap,
  Sparkles,
  Upload,
  CheckCircle2,
  Paperclip
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser, setLoading } from "@/redux/authSlice";
import { toast } from "sonner";

const UpdateProfile = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((store) => store.auth);
  const userProfile = user?.Profile || user?.profile || {};

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: userProfile?.bio || "",
    skills: userProfile?.skills || [],
    profilePhoto: null,
    resume: null,
    location: userProfile?.location || "",
    github: userProfile?.github || "",
    linkedin: userProfile?.linkedin || "",
    portfolio: userProfile?.portfolio || "",
    leetcode: userProfile?.leetcode || "",
  });

  const [previewPhoto, setPreviewPhoto] = useState(userProfile?.profilePhoto || null);

  useEffect(() => {
    if (open && user) {
      const prof = user?.Profile || user?.profile || {};
      setInput({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: prof?.bio || "",
        skills: prof?.skills || [],
        profilePhoto: null,
        resume: null,
        location: prof?.location || "",
        github: prof?.github || "",
        linkedin: prof?.linkedin || "",
        portfolio: prof?.portfolio || "",
        leetcode: prof?.leetcode || "",
      });
      setPreviewPhoto(prof?.profilePhoto || null);
    }
  }, [open, user]);

  const textHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, [e.target.name]: file });
      if (e.target.name === "profilePhoto") {
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

    const prof = user?.Profile || user?.profile || {};
    const origSkills = (prof?.skills || []).join(",");
    const currentSkills = (input.skills || []).join(",");

    const isUnchanged =
      (input.fullname || "") === (user?.fullname || "") &&
      (input.email || "") === (user?.email || "") &&
      (input.phoneNumber?.toString() || "") === (user?.phoneNumber?.toString() || "") &&
      (input.bio || "") === (prof?.bio || "") &&
      (input.location || "") === (prof?.location || "") &&
      (input.github || "") === (prof?.github || "") &&
      (input.linkedin || "") === (prof?.linkedin || "") &&
      (input.portfolio || "") === (prof?.portfolio || "") &&
      (input.leetcode || "") === (prof?.leetcode || "") &&
      currentSkills === origSkills &&
      !input.profilePhoto &&
      !input.resume;

    if (isUnchanged) {
      toast.info("No changes detected");
      setOpen(false);
      return;
    }

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills.length ? input.skills.join(",") : "");
    formData.append("location", input.location);
    formData.append("github", input.github);
    formData.append("linkedin", input.linkedin);
    formData.append("portfolio", input.portfolio);
    formData.append("leetcode", input.leetcode);

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

      if (res.status === 204) {
        toast.info("No changes detected");
        setOpen(false);
        return;
      }

      if (res.data?.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message || "Profile updated successfully");
      } else {
        toast.info(res.data?.message || "No changes detected");
      }
      setOpen(false);
    } catch (error) {
      console.log(error.response?.data);
      const msg = error.response?.data?.message || "Something went wrong";
      if (msg === "No changes detected" || error.response?.status === 400) {
        toast.info(msg);
      } else {
        toast.error(msg);
      }
      setOpen(false);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-2xl lg:max-w-3xl w-full max-h-[88vh] flex flex-col p-0 rounded-3xl border border-slate-200/80 shadow-2xl bg-white overflow-hidden">
        
        {/* Top Header */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 px-6 sm:px-8 py-5 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white shadow-inner">
              <User className="w-5 h-5" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold text-white tracking-tight">
                Update Candidate Profile
              </DialogTitle>
              <DialogDescription className="text-xs text-indigo-100 mt-0.5">
                Manage your credentials, bio, resume file, and professional links
              </DialogDescription>
            </div>
          </div>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={submitHandler} className="flex-1 overflow-y-auto px-6 sm:px-8 py-6 space-y-6">
          
          {/* Top Row: Avatar & Resume Cards (Side-by-Side) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Avatar Uploader Card */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-4">
              <div className="relative group shrink-0">
                <div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center overflow-hidden border-2 border-white shadow-sm">
                  {previewPhoto ? (
                    <img src={previewPhoto} alt="Profile" className="w-full h-full object-cover object-top" />
                  ) : (
                    <User className="w-7 h-7 text-indigo-600" />
                  )}
                </div>
                {previewPhoto && (
                  <button
                    type="button"
                    onClick={removePhoto}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 rounded-full flex items-center justify-center text-white hover:bg-rose-600 transition-colors shadow-sm"
                    title="Remove photo"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <Label className="text-xs font-bold text-slate-800">Profile Photo</Label>
                <p className="text-[11px] text-slate-400 mb-1.5 truncate">JPG or PNG headshot</p>
                <Input
                  type="file"
                  accept="image/*"
                  name="profilePhoto"
                  onChange={fileHandler}
                  className="h-8 border-slate-200 rounded-lg cursor-pointer text-[11px] file:mr-2 file:py-0.5 file:px-2 file:rounded-md file:border-0 file:text-[11px] file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                />
              </div>
            </div>

            {/* Resume Uploader Card */}
            <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-100 flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 border-2 border-white shadow-sm">
                <FileText className="w-7 h-7" />
              </div>

              <div className="flex-1 min-w-0">
                <Label className="text-xs font-bold text-slate-800">Resume (PDF)</Label>
                <p className="text-[11px] text-slate-500 truncate mb-1.5">
                  {input.resume ? input.resume.name : (user?.Profile?.resumeOriginalName || "Max size 5MB")}
                </p>
                <Input
                  type="file"
                  name="resume"
                  onChange={fileHandler}
                  accept="application/pdf"
                  className="h-8 border-rose-200 rounded-lg cursor-pointer text-[11px] file:mr-2 file:py-0.5 file:px-2 file:rounded-md file:border-0 file:text-[11px] file:font-semibold file:bg-rose-100 file:text-rose-700 hover:file:bg-rose-200"
                />
              </div>
            </div>

          </div>

          {/* Section: Personal & Contact Information */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-indigo-600" />
              <span>Personal Information</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="space-y-1">
                <Label className="text-xs font-semibold text-slate-700">Full Name</Label>
                <Input
                  type="text"
                  name="fullname"
                  value={input.fullname}
                  onChange={textHandler}
                  className="h-10 border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g. John Doe"
                />
              </div>

              {/* Email */}
              <div className="space-y-1">
                <Label className="text-xs font-semibold text-slate-700">Email Address</Label>
                <Input
                  type="email"
                  name="email"
                  value={input.email}
                  onChange={textHandler}
                  className="h-10 border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500"
                  placeholder="name@example.com"
                />
              </div>

              {/* Phone */}
              <div className="space-y-1">
                <Label className="text-xs font-semibold text-slate-700">Phone Number</Label>
                <Input
                  type="text"
                  name="phoneNumber"
                  value={input.phoneNumber}
                  onChange={textHandler}
                  className="h-10 border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500"
                  placeholder="+91 9876543210"
                />
              </div>

              {/* Location */}
              <div className="space-y-1">
                <Label className="text-xs font-semibold text-slate-700">City / Location</Label>
                <Input
                  type="text"
                  name="location"
                  value={input.location}
                  onChange={textHandler}
                  className="h-10 border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g. Ahmedabad, Gujarat"
                />
              </div>
            </div>
          </div>

          {/* Section: Bio & Technical Skills */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-indigo-600" />
              <span>Bio & Skills</span>
            </h3>

            <div className="space-y-3">
              {/* Bio */}
              <div className="space-y-1">
                <Label className="text-xs font-semibold text-slate-700">Professional Bio</Label>
                <textarea
                  name="bio"
                  value={input.bio}
                  onChange={textHandler}
                  placeholder="Short summary about your experience, interests, and career goals..."
                  rows={2}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs sm:text-sm outline-none resize-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
              </div>

              {/* Skills */}
              <div className="space-y-1">
                <Label className="text-xs font-semibold text-slate-700">Skills (Comma-separated)</Label>
                <Input
                  name="skills"
                  value={input.skills.join(", ")}
                  onChange={(e) =>
                    setInput({
                      ...input,
                      skills: e.target.value.split(",").map((s) => s.trim()).filter((s) => s),
                    })
                  }
                  className="h-10 border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500"
                  placeholder="React, Node.js, Express, MongoDB, Python"
                />
              </div>
            </div>
          </div>

          {/* Section: Social & Developer Links */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-indigo-600" />
              <span>Developer Profiles & Links</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* GitHub */}
              <div className="space-y-1">
                <Label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <FaGithub className="w-3.5 h-3.5 text-slate-800" />
                  <span>GitHub Profile URL</span>
                </Label>
                <Input
                  type="url"
                  name="github"
                  value={input.github}
                  onChange={textHandler}
                  className="h-10 border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500"
                  placeholder="https://github.com/username"
                />
              </div>

              {/* LinkedIn */}
              <div className="space-y-1">
                <Label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <FaLinkedin className="w-3.5 h-3.5 text-blue-600" />
                  <span>LinkedIn Profile URL</span>
                </Label>
                <Input
                  type="url"
                  name="linkedin"
                  value={input.linkedin}
                  onChange={textHandler}
                  className="h-10 border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500"
                  placeholder="https://linkedin.com/in/username"
                />
              </div>

              {/* Portfolio */}
              <div className="space-y-1">
                <Label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-purple-600" />
                  <span>Portfolio Website URL</span>
                </Label>
                <Input
                  type="url"
                  name="portfolio"
                  value={input.portfolio}
                  onChange={textHandler}
                  className="h-10 border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500"
                  placeholder="https://yourportfolio.com"
                />
              </div>

              {/* LeetCode */}
              <div className="space-y-1">
                <Label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-amber-600" />
                  <span>LeetCode / Coding Profile URL</span>
                </Label>
                <Input
                  type="url"
                  name="leetcode"
                  value={input.leetcode}
                  onChange={textHandler}
                  className="h-10 border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500"
                  placeholder="https://leetcode.com/u/username"
                />
              </div>
            </div>
          </div>

          {/* Sticky-Style Dialog Footer */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3 sticky bottom-0 bg-white">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="rounded-xl px-5 h-10 text-xs sm:text-sm font-semibold border-slate-200 hover:bg-slate-50"
            >
              Cancel
            </Button>

            {loading ? (
              <Button className="rounded-xl px-6 h-10 bg-indigo-600 text-white font-semibold text-xs sm:text-sm" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving Changes...
              </Button>
            ) : (
              <Button
                type="submit"
                className="rounded-xl px-7 h-10 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-500/20 transition-all hover:scale-[1.01] active:scale-95"
              >
                <Save className="w-4 h-4 mr-2" />
                Update Profile
              </Button>
            )}
          </div>

        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfile;
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
import { Loader2, User, Mail, Phone, FileText, Building, Briefcase, MapPin, Globe, Camera } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser, setLoading } from "@/redux/authSlice";
import { toast } from "sonner";

const UpdateRecruiterProfile = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((store) => store.auth);

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.Profile?.bio || "",

    companyName: user?.Profile?.companyName || "",
    designation: user?.Profile?.designation || "",
    companyLocation: user?.Profile?.companyLocation || "",
    companyWebsite: user?.Profile?.companyWebsite || "",

    profilePhoto: null,
  });

  const [previewPhoto, setPreviewPhoto] = useState(null);

  const textHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const fileHandler = (e) => {
    const file = e.target.files?.[0] || null;
    setInput({
      ...input,
      [e.target.name]: file,
    });
    
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewPhoto(null);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);

    formData.append("companyName", input.companyName);
    formData.append("designation", input.designation);
    formData.append("companyLocation", input.companyLocation);
    formData.append("companyWebsite", input.companyWebsite);

    if (input.profilePhoto) {
      formData.append("profilePhoto", input.profilePhoto);
    }

    try {
      dispatch(setLoading(true));

      const res = await axios.post(
        `${USER_API_END_POINT}/profile/recruiter/update`,
        formData,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        setOpen(false);
      }
    } catch (error) {
      console.log(error.response?.data);

      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[600px] md:max-w-[700px] lg:max-w-[800px] w-[95vw] max-h-[90vh] overflow-y-auto p-0 rounded-xl">
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 px-8 py-6 rounded-t-xl">
          <DialogHeader>
            <DialogTitle className="text-2xl md:text-3xl font-bold text-white">
              Update Recruiter Profile
            </DialogTitle>
            <DialogDescription className="text-purple-100 mt-1 text-sm md:text-base">
              Update your personal and company information.
            </DialogDescription>
          </DialogHeader>
        </div>

        <form onSubmit={submitHandler} className="px-6 md:px-8 pb-6">
          <div className="grid gap-6 py-6">
            {/* Profile Photo - Enhanced */}
            <div className="flex flex-col items-center gap-3">
              <div className="relative">
                <div className="w-28 h-28 rounded-full bg-purple-100 flex items-center justify-center border-4 border-purple-200 overflow-hidden">
                  {previewPhoto ? (
                    <img 
                      src={previewPhoto} 
                      alt="Profile preview" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-14 h-14 text-purple-600" />
                  )}
                </div>
                <label 
                  htmlFor="profilePhoto" 
                  className="absolute bottom-0 right-0 bg-purple-600 hover:bg-purple-700 text-white rounded-full p-2 cursor-pointer transition shadow-md"
                >
                  <Camera className="w-5 h-5" />
                </label>
              </div>
              <span className="text-xs text-gray-500">Click camera icon to upload photo</span>
              <Input
                type="file"
                accept="image/*"
                name="profilePhoto"
                onChange={fileHandler}
                className="hidden"
                id="profilePhoto"
              />
            </div>

            {/* Personal Information Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-gray-200 pb-2">
                Personal Information
              </h3>
              
              {/* Name */}
              <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-4">
                <div className="flex items-center gap-2 md:col-span-1">
                  <User className="w-4 h-4 text-purple-600 flex-shrink-0" />
                  <Label className="text-sm font-medium text-gray-700">Name</Label>
                </div>
                <div className="md:col-span-3">
                  <Input
                    type="text"
                    name="fullname"
                    value={input.fullname}
                    onChange={textHandler}
                    className="border-gray-200 focus:border-purple-500 focus:ring-purple-500 rounded-lg w-full"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-4">
                <div className="flex items-center gap-2 md:col-span-1">
                  <Mail className="w-4 h-4 text-purple-600 flex-shrink-0" />
                  <Label className="text-sm font-medium text-gray-700">Email</Label>
                </div>
                <div className="md:col-span-3">
                  <Input
                    type="email"
                    name="email"
                    value={input.email}
                    onChange={textHandler}
                    className="border-gray-200 focus:border-purple-500 focus:ring-purple-500 rounded-lg w-full"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-4">
                <div className="flex items-center gap-2 md:col-span-1">
                  <Phone className="w-4 h-4 text-purple-600 flex-shrink-0" />
                  <Label className="text-sm font-medium text-gray-700">Number</Label>
                </div>
                <div className="md:col-span-3">
                  <Input
                    type="text"
                    name="phoneNumber"
                    value={input.phoneNumber}
                    onChange={textHandler}
                    className="border-gray-200 focus:border-purple-500 focus:ring-purple-500 rounded-lg w-full"
                    placeholder="Enter phone number"
                  />
                </div>
              </div>

              {/* Bio */}
              <div className="grid grid-cols-1 md:grid-cols-4 items-start gap-2 md:gap-4">
                <div className="flex items-center gap-2 md:col-span-1 md:pt-2">
                  <FileText className="w-4 h-4 text-purple-600 flex-shrink-0" />
                  <Label className="text-sm font-medium text-gray-700">Bio</Label>
                </div>
                <div className="md:col-span-3">
                  <Input
                    type="text"
                    name="bio"
                    value={input.bio}
                    onChange={textHandler}
                    className="border-gray-200 focus:border-purple-500 focus:ring-purple-500 rounded-lg w-full"
                    placeholder="Write a short bio"
                  />
                </div>
              </div>
            </div>

            {/* Company Information Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-gray-200 pb-2">
                Company Information
              </h3>

              {/* Company */}
              <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-4">
                <div className="flex items-center gap-2 md:col-span-1">
                  <Building className="w-4 h-4 text-purple-600 flex-shrink-0" />
                  <Label className="text-sm font-medium text-gray-700">Company</Label>
                </div>
                <div className="md:col-span-3">
                  <Input
                    type="text"
                    name="companyName"
                    value={input.companyName}
                    onChange={textHandler}
                    placeholder="Company name"
                    className="border-gray-200 focus:border-purple-500 focus:ring-purple-500 rounded-lg w-full"
                  />
                </div>
              </div>

              {/* Designation */}
              <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-4">
                <div className="flex items-center gap-2 md:col-span-1">
                  <Briefcase className="w-4 h-4 text-purple-600 flex-shrink-0" />
                  <Label className="text-sm font-medium text-gray-700">Designation</Label>
                </div>
                <div className="md:col-span-3">
                  <Input
                    type="text"
                    name="designation"
                    value={input.designation}
                    onChange={textHandler}
                    placeholder="HR Manager"
                    className="border-gray-200 focus:border-purple-500 focus:ring-purple-500 rounded-lg w-full"
                  />
                </div>
              </div>

              {/* Company Location */}
              <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-4">
                <div className="flex items-center gap-2 md:col-span-1">
                  <MapPin className="w-4 h-4 text-purple-600 flex-shrink-0" />
                  <Label className="text-sm font-medium text-gray-700">Location</Label>
                </div>
                <div className="md:col-span-3">
                  <Input
                    type="text"
                    name="companyLocation"
                    value={input.companyLocation}
                    onChange={textHandler}
                    placeholder="Ahmedabad, Gujarat"
                    className="border-gray-200 focus:border-purple-500 focus:ring-purple-500 rounded-lg w-full"
                  />
                </div>
              </div>

              {/* Website */}
              <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-4">
                <div className="flex items-center gap-2 md:col-span-1">
                  <Globe className="w-4 h-4 text-purple-600 flex-shrink-0" />
                  <Label className="text-sm font-medium text-gray-700">Website</Label>
                </div>
                <div className="md:col-span-3">
                  <Input
                    type="text"
                    name="companyWebsite"
                    value={input.companyWebsite}
                    onChange={textHandler}
                    placeholder="https://company.com"
                    className="border-gray-200 focus:border-purple-500 focus:ring-purple-500 rounded-lg w-full"
                  />
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="border-t-2 border-gray-100 pt-4">
            {loading ? (
              <Button className="w-full bg-purple-600 hover:bg-purple-700 transition rounded-lg py-3" disabled>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Please Wait
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 transition rounded-lg py-3 text-base font-medium shadow-lg hover:shadow-xl"
              >
                Update Profile
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateRecruiterProfile;
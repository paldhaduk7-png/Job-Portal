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
import { Loader2 } from "lucide-react";
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

  const textHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const fileHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.files?.[0] || null,
    });
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
      <DialogContent className="sm:max-w-[500px] w-full max-h-[90vh] overflow-y-auto">

        <DialogHeader>
          <DialogTitle>Update Recruiter Profile</DialogTitle>

          <DialogDescription>
            Update your personal and company information.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={submitHandler}>
          <div className="grid gap-4 py-4">

            {/* Profile Photo */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Photo</Label>

              <Input
                type="file"
                accept="image/*"
                name="profilePhoto"
                onChange={fileHandler}
                className="col-span-3"
              />
            </div>

            {/* Name */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Name</Label>

              <Input
                type="text"
                name="fullname"
                value={input.fullname}
                onChange={textHandler}
                className="col-span-3"
              />
            </div>

            {/* Email */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Email</Label>

              <Input
                type="email"
                name="email"
                value={input.email}
                onChange={textHandler}
                className="col-span-3"
              />
            </div>

            {/* Phone */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Number</Label>

              <Input
                type="text"
                name="phoneNumber"
                value={input.phoneNumber}
                onChange={textHandler}
                className="col-span-3"
              />
            </div>

            {/* Bio */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Bio</Label>

              <Input
                type="text"
                name="bio"
                value={input.bio}
                onChange={textHandler}
                className="col-span-3"
              />
            </div>

            {/* Company Name */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Company</Label>

              <Input
                type="text"
                name="companyName"
                value={input.companyName}
                onChange={textHandler}
                placeholder="Company name"
                className="col-span-3"
              />
            </div>

            {/* Designation */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Designation</Label>

              <Input
                type="text"
                name="designation"
                value={input.designation}
                onChange={textHandler}
                placeholder="HR Manager"
                className="col-span-3"
              />
            </div>

            {/* Company Location */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Location</Label>

              <Input
                type="text"
                name="companyLocation"
                value={input.companyLocation}
                onChange={textHandler}
                placeholder="Ahmedabad, Gujarat"
                className="col-span-3"
              />
            </div>

            {/* Company Website */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Website</Label>

              <Input
                type="text"
                name="companyWebsite"
                value={input.companyWebsite}
                onChange={textHandler}
                placeholder="https://company.com"
                className="col-span-3"
              />
            </div>

          </div>

          <DialogFooter>
            {loading ? (
              <Button className="w-full mt-4" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please Wait
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full my-4 bg-purple-600 hover:bg-purple-700 transition"
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
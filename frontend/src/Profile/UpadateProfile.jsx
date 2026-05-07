import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser , setLoading } from '@/redux/authSlice'
import { toast } from 'sonner'

const UpdateProfile = ({ open, setOpen }) => {

  const dispatch = useDispatch();
  const { user , loading } = useSelector(store => store.auth);

  //  LOCAL loading (only one system)
  // const [loading, setISLoading] = useState(false);

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.Profile?.bio || "",        // fixed lowercase
    skills: user?.Profile?.skills || [],
    file: null
  });

  // text input
  const textHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // file input
  const fileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  // submit
  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append(
      "skills",
      input.skills.length ? input.skills.join(",") : ""
    );

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
     dispatch(setLoading(true)); //  start loading

      const res = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          withCredentials: true //  axios auto sets headers
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
     dispatch(setLoading(false));//  stop loading
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px] w-full min-h-[450px] overflow-y-auto">

        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>

        <DialogDescription>
          Update your personal details here.
        </DialogDescription>

        <form onSubmit={submitHandler}>
          <div className='grid gap-4 py-4'>

            {/* Name */}
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label className="text-right">Name</Label>
              <Input
                type="text"
                name="fullname"
                value={input.fullname}
                onChange={textHandler}
                className='col-span-3'
              />
            </div>

            {/* Email */}
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label className="text-right">Email</Label>
              <Input
                type="email"
                name="email"
                value={input.email}
                onChange={textHandler}
                className='col-span-3'
              />
            </div>

            {/* Phone */}
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label className="text-right">Number</Label>
              <Input
                type="text"
                name="phoneNumber"
                value={input.phoneNumber}
                onChange={textHandler}
                className='col-span-3'
              />
            </div>

            {/* Bio */}
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label className="text-right">Bio</Label>
              <Input
                type="text"
                name="bio"
                value={input.bio}
                onChange={textHandler}
                className='col-span-3'
              />
            </div>

            {/* Skills */}
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label className="text-right">Skills</Label>
              <Input
                name="skills"
                value={input.skills.join(", ")}
                onChange={(e) =>
                  setInput({
                    ...input,
                    skills: e.target.value.split(",").map(s => s.trim())
                  })
                }
                className='col-span-3'
              />
            </div>

            {/* Resume */}
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label className="text-right">Resume</Label>
              <Input
                type="file"
                name="file"
                onChange={fileHandler}
                accept="application/pdf"
                className='col-span-3'
              />
            </div>

          </div>

          <DialogFooter>
            {
              loading ? (
                <Button className="w-full mt-4" disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please Wait
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full my-4 bg-purple-600 hover:bg-purple-700 transition"
                >
                  Update
                </Button>
              )
            }
          </DialogFooter>
        </form>

      </DialogContent>
    </Dialog>
  )
}

export default UpdateProfile
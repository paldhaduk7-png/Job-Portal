import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "@/components/ui/radio-group";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant.js";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";
import { Eye,EyeOff } from "lucide-react";

const Signup = () => {

  const navigate=useNavigate();
  const dispatch=useDispatch();
  const {user,loading}=useSelector(store=>store.auth);

const [password ,setPassword]=useState(false);
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!input.role) {
  alert("Please select a role");
  return;
}

const formData=new FormData();
formData.append("fullname", input.fullname);
formData.append("email", input.email);
formData.append("phoneNumber", input.phoneNumber);
formData.append("password", input.password);
formData.append("role", input.role);

if(input.file){
  formData.append("profilePhoto", input.file);
}  

try {
  dispatch(setLoading(true));
  const  res=await axios.post(`${USER_API_END_POINT}/register`,formData,{
            
    headers:{
      // “I am sending files + data together”
      "Content-Type" :"multipart/form-data"
    },
    // “Send cookies / auth data with request”
    withCredentials:true,
  });

  if(res.data.success){
    toast.success(res.data.message);
    navigate("/login");
  }
  

} catch (error) {
    console.log(error.response?.data);

  toast.error(
    error.response?.data?.message || "Something went wrong"
  );

}finally{
  dispatch(setLoading(false));
}
   

 setInput({
  fullname: "",
  email: "",
  phoneNumber: "",
  password: "",
  role: "", 
  file: "",
});


  };

useEffect(()=>{
 if(user){
  navigate("/")
 }
}, [])

 return (
  <div className="min-h-[calc(100vh-80px)] bg-slate-50 flex items-center justify-center px-4 py-10">
    <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden grid lg:grid-cols-2">

      {/* Left side */}
      <div className="hidden lg:flex bg-gradient-to-br from-violet-700 to-indigo-600 text-white p-10 flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-12">JobPortal</h2>

          <h1 className="text-4xl font-bold leading-tight">
            Start your journey.
            <br />
            Find your opportunity.
          </h1>

          <p className="text-violet-100 mt-5 leading-relaxed">
            Create your account and connect with opportunities that match
            your skills and goals.
          </p>
        </div>

        <p className="text-sm text-violet-200">
          Students and recruiters. One platform.
        </p>
      </div>

      {/* Right side */}
      <div className="p-8 sm:p-10 lg:p-12">
        <form onSubmit={submitHandler} className="w-full">

          <h1 className="font-bold text-3xl text-slate-900">
            Create account
          </h1>

          <p className="text-slate-500 mt-2 mb-7">
            Sign up to get started with JobPortal.
          </p>

          {/* Full Name */}
          <div className="mb-4">
            <Label className="text-slate-700">Full Name</Label>

            <Input
              type="text"
              placeholder="Enter your full name"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              required
              className="mt-2 h-11 border-slate-300"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <Label className="text-slate-700">Email</Label>

            <Input
              type="email"
              placeholder="Enter your email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              required
              className="mt-2 h-11 border-slate-300"
            />
          </div>

          {/* Phone */}
          <div className="mb-4">
            <Label className="text-slate-700">Phone Number</Label>

            <Input
              type="text"
              placeholder="Enter phone number"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              required
              className="mt-2 h-11 border-slate-300"
            />
          </div>

          {/* Password */}
            <Label className="text-slate-700">Password</Label>
          <div className="mb-5 flex">
            <Input
              type={password ? "text" : "password"}
              placeholder="Create a password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              required
              className="mt-2 h-11 border-slate-300"
            />
                {password ? (
    <Eye
      onClick={() => setPassword(false)}
      className="mt-5 size-7.5 ml-1 cursor-pointer"
    />
  ) : (
    <EyeOff
      onClick={() => setPassword(true)}
      className="mt-5 size-7.5 ml-1 cursor-pointer"
    />
  )}
          </div>

          {/* Role */}
          <div className="mb-5">
            <Label className="text-slate-700">Choose your role</Label>

            <RadioGroup className="flex gap-6 mt-3">
              <div className="flex items-center gap-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="w-4 h-4 cursor-pointer"
                />
                <Label>Student</Label>
              </div>

              <div className="flex items-center gap-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="w-4 h-4 cursor-pointer"
                />
                <Label>Recruiter</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Profile Photo */}
          <div className="mb-6">
            <Label className="text-slate-700">Profile Photo</Label>

            <Input
              accept="image/*"
              type="file"
              onChange={changeFileHandler}
              className="mt-2 cursor-pointer border-slate-300"
            />
          </div>

          {/* Submit */}
          {loading ? (
            <Button className="w-full h-11" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please Wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full h-11 cursor-pointer bg-violet-600 hover:bg-violet-700"
            >
              Sign Up
            </Button>
          )}

          <p className="text-sm text-center text-slate-500 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-violet-600 font-semibold"
            >
              Login
            </Link>
          </p>

        </form>
      </div>
    </div>
  </div>
);
};

export default Signup;

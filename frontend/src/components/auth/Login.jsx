import React, { useEffect, useState } from "react";
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
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";
import { Eye,EyeOff } from "lucide-react";


const Login = () => {

  const navigate=useNavigate();
  const dispatch=useDispatch();
  const {user,loading}=useSelector(store=>store.auth);

  const [password ,setPassword]=useState(false);
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
      e.preventDefault();

    if (!input.role) {
  alert("Please select a role");
  return;
}

try {
  dispatch(setLoading(true));
  const  res=await axios.post(`${USER_API_END_POINT}/login`,input,{
    headers:{
      // “I am sending files + data together”
      "Content-Type" :"application/json"
    },
    // “Send cookies / auth data with request”
    withCredentials:true,
  });

  if(res.data.success){
    dispatch(setUser(res.data.user));
    navigate("/");//goes to home page
    toast.success(res.data.message);
  }

} catch (error) {
   console.log(error.response?.data);
  
    toast.error(
      error.response?.data?.message || "Something went wrong"
    );
} finally{
  dispatch(setLoading(false));
}
   
      setInput({
  email: "",
  password: "",
  role: "",
});
  };

useEffect(()=>{
 if(user){
  navigate("/");
  toast("you are Already Login");
 }
}, [])



  return (
  <div className="min-h-[calc(100vh-80px)] bg-slate-50 flex items-center justify-center px-4 py-10">
    <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden grid md:grid-cols-2">

      {/* Left side */}
      <div className="hidden md:flex bg-gradient-to-br from-violet-700 to-indigo-600 text-white p-10 flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-12">JobPortal</h2>

          <h1 className="text-4xl font-bold leading-tight">
            Find the job that
            <br />
            fits your future.
          </h1>

          <p className="text-violet-100 mt-5">
            Discover opportunities and take the next step in your career.
          </p>
        </div>

        <p className="text-sm text-violet-200">
          Your next opportunity starts here.
        </p>
      </div>

      {/* Right side */}
      <div className="p-8 sm:p-10 md:p-12 flex items-center">
        <form onSubmit={submitHandler} className="w-full">

          <h1 className="font-bold text-3xl text-slate-900">
            Welcome back
          </h1>

          <p className="text-slate-500 mt-2 mb-8">
            Login to continue to your account.
          </p>

          <div className="mb-5">
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

            <Label className="text-slate-700">Password</Label>
          <div className="mb-5 flex">
            <Input
              type={password ? "text" : "password"}
              placeholder="Enter your password"
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

          <div className="mb-6">
            <Label className="text-slate-700">Login as</Label>

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
              Login
            </Button>
          )}

          <p className="text-sm text-center text-slate-500 mt-6">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-violet-600 font-semibold"
            >
              Sign up
            </Link>
          </p>

        </form>
      </div>
    </div>
  </div>
);
};

export default Login;

import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "@/components/ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant.js";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2, Eye, EyeOff, Briefcase, Mail, Lock, ArrowRight, Sparkles } from "lucide-react";
import GoogleLoginButton from "@/GoogluAuth/GoogleLoginButton";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, loading } = useSelector(store => store.auth);
  const [showPassword, setShowPassword] = useState(false);
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
      toast.error("Please select a role");
      return;
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error.response?.data);
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      dispatch(setLoading(false));
    }

    setInput({
      email: "",
      password: "",
      role: "",
    });
  };

 
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      <div className="w-full max-w-6xl relative z-10">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2 border border-white/50">
          
          {/* Left Side - Brand Section */}
          <div className="hidden md:flex bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white p-12 flex-col justify-between relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-16">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-lg rounded-2xl flex items-center justify-center shadow-lg">
                  <Briefcase className="w-7 h-7" />
                </div>
                <span className="text-2xl font-bold tracking-tight">JobPortal</span>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-6 h-6 text-yellow-300 animate-pulse" />
                  <span className="text-sm font-medium text-purple-200">Premium Job Platform</span>
                </div>
                
                <h1 className="text-5xl font-extrabold leading-tight tracking-tight">
                  Find the job that
                  <br />
                  <span className="bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent">
                    fits your future.
                  </span>
                </h1>

                <p className="text-purple-100 text-lg leading-relaxed max-w-sm">
                  Discover opportunities and take the next step in your career journey with thousands of openings.
                </p>

                {/* Stats */}
                <div className="flex gap-8 pt-4">
                  <div>
                    <div className="text-2xl font-bold">10K+</div>
                    <div className="text-sm text-purple-200">Active Jobs</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">500+</div>
                    <div className="text-sm text-purple-200">Companies</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">95%</div>
                    <div className="text-sm text-purple-200">Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10">
              <p className="text-sm text-purple-200 flex items-center gap-2">
                <span className="w-8 h-px bg-purple-300/50"></span>
                Your next opportunity starts here.
              </p>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="p-8 sm:p-10 md:p-12 flex items-center">
            <form onSubmit={submitHandler} className="w-full space-y-6">
              <div className="text-center md:text-left">
                <h1 className="font-bold text-3xl text-slate-900">
                  Welcome back
                </h1>
                <p className="text-slate-500 mt-2">
                  Login to continue to your account.
                </p>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label className="text-slate-700 text-sm font-medium flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </Label>
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={input.email}
                    name="email"
                    onChange={changeEventHandler}
                    required
                    className="pl-11 h-12 border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-slate-50/50"
                  />
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label className="text-slate-700 text-sm font-medium flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Password
                </Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={input.password}
                    name="password"
                    onChange={changeEventHandler}
                    required
                    className="pl-11 pr-12 h-12 border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-slate-50/50"
                  />
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Role Selection */}
              <div className="space-y-3">
                <Label className="text-slate-700 text-sm font-medium">Login as</Label>
                <RadioGroup className="grid grid-cols-2 gap-3">
                  <div
                    className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                      input.role === "student"
                        ? "border-purple-500 bg-purple-50"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                    onClick={() => setInput({ ...input, role: "student" })}
                  >
                    <Input
                      type="radio"
                      name="role"
                      value="student"
                      checked={input.role === "student"}
                      onChange={changeEventHandler}
                      className="w-4 h-4 cursor-pointer accent-purple-600"
                    />
                    <Label className="cursor-pointer text-sm font-medium">🎓 Student</Label>
                  </div>

                  <div
                    className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                      input.role === "recruiter"
                        ? "border-purple-500 bg-purple-50"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                    onClick={() => setInput({ ...input, role: "recruiter" })}
                  >
                    <Input
                      type="radio"
                      name="role"
                      value="recruiter"
                      checked={input.role === "recruiter"}
                      onChange={changeEventHandler}
                      className="w-4 h-4 cursor-pointer accent-purple-600"
                    />
                    <Label className="cursor-pointer text-sm font-medium">🏢 Recruiter</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Forgot Password Link */}
              <div className="text-right">
                <Link
                  to="/forgot-password"
                  className="text-sm text-purple-600 hover:text-purple-700 font-medium hover:underline transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              {loading ? (
                <Button className="w-full h-12 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700" disabled>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Please Wait
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg hover:shadow-purple-500/25 transition-all duration-300 group"
                >
                  <span>Login</span>
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              )}

              {/* Sign Up Link */}
              <p className="text-sm text-center text-slate-500">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-purple-600 font-semibold hover:text-purple-700 hover:underline transition-colors"
                >
                  Sign up
                </Link>
              </p>

               <GoogleLoginButton role={input.role} />

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-4 bg-white text-slate-400">Secure login with encryption</span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
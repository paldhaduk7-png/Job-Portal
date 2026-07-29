import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "@/components/ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant.js";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { 
  Loader2, 
  Eye, 
  EyeOff, 
  User, 
  Mail, 
  Phone, 
  Lock, 
  Briefcase, 
  Upload, 
  Sparkles,
  ArrowRight,
  CheckCircle
} from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, loading } = useSelector(store => store.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [fileName, setFileName] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");

  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: null,
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    
    // Password strength checker
    if (e.target.name === "password") {
      checkPasswordStrength(e.target.value);
    }
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, file });
      setFileName(file.name);
    }
  };

  const checkPasswordStrength = (password) => {
    if (password.length === 0) {
      setPasswordStrength("");
    } else if (password.length < 6) {
      setPasswordStrength("Weak");
    } else if (password.length < 10) {
      setPasswordStrength("Medium");
    } else {
      setPasswordStrength("Strong");
    }
  };

  const getPasswordColor = () => {
    if (passwordStrength === "Weak") return "text-red-500";
    if (passwordStrength === "Medium") return "text-yellow-500";
    if (passwordStrength === "Strong") return "text-green-500";
    return "";
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!input.role) {
      toast.error("Please select a role");
      return;
    }

    if (input.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);

    if (input.file) {
      formData.append("profilePhoto", input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
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
      fullname: "",
      email: "",
      phoneNumber: "",
      password: "",
      role: "",
      file: null,
    });
    setFileName("");
    setPasswordStrength("");
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gradient-to-br from-slate-50 via-white to-purple-50 relative overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      <div className="w-full max-w-6xl relative z-10">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-2 border border-white/50">
          
          {/* Left Side - Brand Section */}
          <div className="hidden lg:flex bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white p-12 flex-col justify-between relative overflow-hidden">
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
                  <span className="text-sm font-medium text-purple-200">Join the Community</span>
                </div>
                
                <h1 className="text-4xl font-extrabold leading-tight tracking-tight">
                  Start your journey.
                  <br />
                  <span className="bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent">
                    Find your opportunity.
                  </span>
                </h1>

                <p className="text-purple-100 text-lg leading-relaxed">
                  Create your account and connect with opportunities that match
                  your skills and goals.
                </p>

                {/* Feature List */}
                <div className="space-y-3 pt-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-300" />
                    <span className="text-sm text-purple-100">Access to 10,000+ jobs</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-300" />
                    <span className="text-sm text-purple-100">Connect with top companies</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-300" />
                    <span className="text-sm text-purple-100">Track your applications</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10">
              <p className="text-sm text-purple-200 flex items-center gap-2">
                <span className="w-8 h-px bg-purple-300/50"></span>
                Students and recruiters. One platform.
              </p>
            </div>
          </div>

          {/* Right Side - Signup Form */}
          <div className="p-8 sm:p-10 lg:p-12 max-h-[90vh] overflow-y-auto">
            <form onSubmit={submitHandler} className="w-full space-y-5">
              <div className="text-center lg:text-left">
                <h1 className="font-bold text-3xl text-slate-900">
                  Create account
                </h1>
                <p className="text-slate-500 mt-2">
                  Sign up to get started with JobPortal.
                </p>
              </div>

              {/* Full Name */}
              <div className="space-y-2">
                <Label className="text-slate-700 text-sm font-medium flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full Name
                </Label>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Enter your full name"
                    value={input.fullname}
                    name="fullname"
                    onChange={changeEventHandler}
                    required
                    className="pl-11 h-12 border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-slate-50/50"
                  />
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                </div>
              </div>

              {/* Email */}
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

              {/* Phone Number */}
              <div className="space-y-2">
                <Label className="text-slate-700 text-sm font-medium flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Phone Number
                </Label>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Enter phone number"
                    value={input.phoneNumber}
                    name="phoneNumber"
                    onChange={changeEventHandler}
                    required
                    className="pl-11 h-12 border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-slate-50/50"
                  />
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label className="text-slate-700 text-sm font-medium flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Password
                </Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
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
                {/* Password Strength Indicator */}
                {passwordStrength && (
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-300 ${
                          passwordStrength === "Weak" ? "w-1/3 bg-red-500" :
                          passwordStrength === "Medium" ? "w-2/3 bg-yellow-500" :
                          "w-full bg-green-500"
                        }`}
                      />
                    </div>
                    <span className={`text-xs font-medium ${getPasswordColor()}`}>
                      {passwordStrength}
                    </span>
                  </div>
                )}
              </div>

              {/* Role Selection */}
              <div className="space-y-3">
                <Label className="text-slate-700 text-sm font-medium">Choose your role</Label>
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

              {/* Profile Photo Upload */}
              <div className="space-y-2">
                <Label className="text-slate-700 text-sm font-medium flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Profile Photo
                </Label>
                <div className="relative">
                  <Input
                    accept="image/*"
                    type="file"
                    onChange={changeFileHandler}
                    className="h-12 border-slate-200 rounded-xl cursor-pointer bg-slate-50/50 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 transition-all duration-200"
                  />
                  {fileName && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 bg-white px-2 py-1 rounded-lg shadow-sm">
                      {fileName.length > 20 ? fileName.substring(0, 20) + "..." : fileName}
                    </div>
                  )}
                </div>
                {!fileName && (
                  <p className="text-xs text-slate-400">Upload a profile photo (optional)</p>
                )}
              </div>

              {/* Submit Button */}
              {loading ? (
                <Button className="w-full h-12 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700" disabled>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Creating Account...
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg hover:shadow-purple-500/25 transition-all duration-300 group"
                >
                  <span>Sign Up</span>
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              )}

              {/* Login Link */}
              <p className="text-sm text-center text-slate-500">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-purple-600 font-semibold hover:text-purple-700 hover:underline transition-colors"
                >
                  Login
                </Link>
              </p>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-4 bg-white text-slate-400">Secure & encrypted signup</span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
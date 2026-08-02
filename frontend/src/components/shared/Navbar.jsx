import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import {
  LogOut,
  User2,
  Briefcase,
  Home,
  Search,
  Users,
  Menu,
  X,
  Sparkles,
  ChevronDown,
  UserCircle,
  FileText,
  Bookmark
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { clearAllJobs } from "@/redux/jobSlice";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.post(`${USER_API_END_POINT}/logout`, {}, { withCredentials: true });
      
      if (res.data.success) {
        dispatch(setUser(null));
        dispatch(clearAllJobs());
        navigate("/");
        toast.success(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    } finally {
      setOpen(false);
    }
  };

  // Get initials for avatar fallback
  const getInitials = (name) => {
    if (!name) return "U";
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  return (
    <nav className="bg-white/80 backdrop-blur-lg border-b border-slate-200/50 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25 group-hover:scale-105 transition-transform duration-300">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight">
                Job<span className="text-purple-600">Portal</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {user && user.role === 'recruiter' ? (
              <ul className="flex items-center gap-6 font-medium">
                <li>
                  <Link to="/admin/companies" className="text-slate-600 hover:text-purple-600 transition-colors flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Companies
                  </Link>
                </li>
                <li>
                  <Link to="/admin/jobs" className="text-slate-600 hover:text-purple-600 transition-colors flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    Jobs
                  </Link>
                </li>
              </ul>
            ) : (
              <ul className="flex items-center gap-6 font-medium">
                <li>
                  <Link to="/" className="text-slate-600 hover:text-purple-600 transition-colors flex items-center gap-2">
                    <Home className="w-4 h-4" />
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/jobs" className="text-slate-600 hover:text-purple-600 transition-colors flex items-center gap-2">
                    <Search className="w-4 h-4" />
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link to="/browse" className="text-slate-600 hover:text-purple-600 transition-colors flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Browse
                  </Link>
                </li>
              </ul>
            )}
          </div>

          {/* Right Side - Auth buttons / Profile */}
          <div className="flex items-center gap-3">
            {!user ? (
              <div className="flex items-center gap-3">
                <Link to="/login">
                  <Button 
                    variant="ghost" 
                    className="text-slate-600 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-300"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button 
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl px-6 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300"
                  >
                    Sign Up
                  </Button>
                </Link>
              </div>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <div className="flex items-center gap-3 cursor-pointer group">
                    <Avatar className="w-10 h-10 ring-2 ring-purple-500/20 group-hover:ring-purple-500/50 transition-all duration-300">
                      <AvatarImage 
                        src={user?.Profile?.profilePhoto} 
                        alt={user?.fullname} 
                      />
                      <AvatarFallback className="bg-gradient-to-br from-purple-500 to-indigo-500 text-white font-medium">
                        {getInitials(user?.fullname)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden sm:block text-left">
                      <p className="text-sm font-semibold text-slate-800 leading-tight">
                        {user?.fullname?.split(" ")[0] || "User"}
                      </p>
                      <p className="text-xs text-slate-500 capitalize">
                        {user?.role || "Member"}
                      </p>
                    </div>
                    <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-purple-600 transition-colors" />
                  </div>
                </PopoverTrigger>

                <PopoverContent className="w-72 p-4 rounded-2xl shadow-2xl border-slate-100">
                  <div className="space-y-4">
                    {/* User Info */}
                    <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                      <Avatar className="w-14 h-14 ring-2 ring-purple-500/20">
                        <AvatarImage 
                          src={user?.Profile?.profilePhoto} 
                          alt={user?.fullname} 
                        />
                        <AvatarFallback className="bg-gradient-to-br from-purple-500 to-indigo-500 text-white text-lg font-medium">
                          {getInitials(user?.fullname)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-bold text-slate-800">{user?.fullname}</h4>
                        <p className="text-sm text-slate-500 truncate max-w-[180px]">
                          {user?.Profile?.bio || "No bio added yet"}
                        </p>
                        <p className="text-xs text-purple-600 capitalize font-medium">
                          {user?.role}
                        </p>
                      </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="space-y-1">
                      {user && (
                        <>
                        <Link 
                          to={user.role === "student" ? "/profile" : "/recruiter-profile"}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-purple-50 transition-all duration-200 group"
                        >
                          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                            <UserCircle className="w-4 h-4 text-purple-600" />
                          </div>
                          <span className="text-sm font-medium text-slate-700 group-hover:text-purple-600">View Profile</span>
                        </Link>
                            {user.role === "student" && (
      <>
        <Link
          to="/applied-jobs"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-blue-50 transition-all duration-200 group"
        >
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
            <FileText className="w-4 h-4 text-blue-600" />
          </div>
          <span className="text-sm font-medium text-slate-700 group-hover:text-blue-600">
            Applied Jobs
          </span>
        </Link>

        <Link
          to="/saved-jobs"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-yellow-50 transition-all duration-200 group"
        >
          <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center group-hover:bg-yellow-200 transition-colors">
            <Bookmark className="w-4 h-4 text-yellow-600" />
          </div>
          <span className="text-sm font-medium text-slate-700 group-hover:text-yellow-600">
            Saved Jobs
          </span>
        </Link>
      </>
    )}

                        </>
                      )}
                       
                      <button 
                        onClick={() => setOpen(true)}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-50 transition-all duration-200 group"
                      >
                        <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition-colors">
                          <LogOut className="w-4 h-4 text-red-600" />
                        </div>
                        <span className="text-sm font-medium text-slate-700 group-hover:text-red-600">Logout</span>
                      </button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            )}

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl hover:bg-slate-100 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-slate-600" />
              ) : (
                <Menu className="w-6 h-6 text-slate-600" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 py-4 px-4 shadow-lg">
          <div className="space-y-2">
            {user && user.role === 'recruiter' ? (
              <>
                <Link 
                  to="/admin/companies" 
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-purple-50 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Users className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-slate-700">Companies</span>
                </Link>
                <Link 
                  to="/admin/jobs" 
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-purple-50 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Briefcase className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-slate-700">Jobs</span>
                </Link>
              </>
            ) : (
              <>
                <Link 
                  to="/" 
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-purple-50 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Home className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-slate-700">Home</span>
                </Link>
                <Link 
                  to="/jobs" 
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-purple-50 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Search className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-slate-700">Jobs</span>
                </Link>
                <Link 
                  to="/browse" 
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-purple-50 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-slate-700">Browse</span>
                </Link>
              </>
            )}
          </div>
        </div>
      )}

      {/* Logout Confirmation Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px] rounded-2xl p-6">
          <DialogHeader className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <LogOut className="w-8 h-8 text-red-600" />
            </div>
            <DialogTitle className="text-2xl font-bold text-slate-800">
              Confirm Logout
            </DialogTitle>
            <DialogDescription className="text-slate-500 pt-2">
              Are you sure you want to log out? You will need to sign in again to access your account.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-3 mt-6">
            <Button 
              variant="outline" 
              onClick={() => setOpen(false)}
              className="flex-1 rounded-xl h-11"
            >
              Cancel
            </Button>
           <Button 
  onClick={logoutHandler}
  className="flex-1 h-11 rounded-xl bg-red-600 text-white hover:bg-red-700"
>
  Logout
</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </nav>
  );
};

export default Navbar;
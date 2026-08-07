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
  Bookmark,
  BadgeInfo,
  Globe,
  Zap,
  Compass,
  Rocket,
  LayoutDashboard,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { clearSavedJobs } from "@/redux/savedJobSlice";
import { setSearchQuery, clearFilters, clearAllJobs } from "@/redux/jobSlice";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import useGetSavedJobs from "@/hooks/useGetSavedJobs";

const Navbar = () => {
  useGetSavedJobs();
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
        dispatch(clearSavedJobs());
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

  const getInitials = (name) => {
    if (!name) return "U";
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-indigo-100/60 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo - Indigo/Purple Theme */}
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all duration-300">
                <Briefcase className="w-5 h-5 text-white" strokeWidth={2} />
              </div>
              <span className="text-2xl font-bold tracking-tight">
                Job<span className="text-indigo-600">Portal</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation - With Icons */}
          <div className="hidden md:flex items-center gap-1">
            {user && user.role === 'recruiter' ? (
              <div className="flex items-center gap-1">
                <Link 
                  to="/admin/companies" 
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/70 rounded-lg transition-all"
                >
                  <Users className="w-4 h-4" />
                  Companies
                </Link>
                <Link 
                  to="/admin/jobs" 
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/70 rounded-lg transition-all"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Jobs
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <Link 
                  to="/" 
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/70 rounded-lg transition-all"
                >
                  <Home className="w-4 h-4" />
                  Home
                </Link>
                <Link 
                  to="/jobs" 
                  onClick={() => {
                    dispatch(setSearchQuery(""));
                    dispatch(clearFilters());
                  }} 
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/70 rounded-lg transition-all"
                >
                  <Search className="w-4 h-4" />
                  Jobs
                </Link>
                <Link 
                  to="/browse" 
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/70 rounded-lg transition-all"
                >
                  <Compass className="w-4 h-4" />
                  Browse
                </Link>
                <Link
                  to="/about"
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/70 rounded-lg transition-all"
                >
                  <BadgeInfo className="w-4 h-4" />
                  About
                </Link>
              </div>
            )}
          </div>

          {/* Right Side - Auth Buttons */}
          <div className="flex items-center gap-3">
            {!user ? (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button 
                    variant="ghost" 
                    className="text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/70 rounded-lg px-5 transition-all"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button 
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg px-6 shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all duration-300"
                  >
                    Sign Up
                  </Button>
                </Link>
              </div>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <div className="flex items-center gap-3 cursor-pointer group px-2 py-1 rounded-lg hover:bg-indigo-50/70 transition-all">
                    <Avatar className="w-9 h-9 ring-2 ring-indigo-500/20 group-hover:ring-indigo-500/40 transition-all">
                      <AvatarImage 
                        src={user?.Profile?.profilePhoto} 
                        alt={user?.fullname} 
                      />
                      <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-500 text-white text-sm font-medium">
                        {getInitials(user?.fullname)}
                      </AvatarFallback>
                    </Avatar>
                    <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                  </div>
                </PopoverTrigger>

                <PopoverContent className="w-64 p-3 rounded-xl shadow-xl border-indigo-100">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-indigo-50/70 transition-all">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={user?.Profile?.profilePhoto} />
                        <AvatarFallback className="bg-indigo-100 text-indigo-600">
                          {getInitials(user?.fullname)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{user?.fullname}</p>
                        <p className="text-xs text-slate-500 capitalize">{user?.role}</p>
                      </div>
                    </div>

                    <div className="h-px bg-indigo-100 my-1" />

                    <Link 
                      to={user.role === "student" ? "/profile" : "/recruiter-profile"}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-indigo-50/70 transition-all text-sm text-slate-600 hover:text-indigo-600"
                    >
                      <UserCircle className="w-4 h-4" />
                      Profile
                    </Link>

                    {user.role === "student" && (
                      <>
                        <Link
                          to="/applied-jobs"
                          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-indigo-50/70 transition-all text-sm text-slate-600 hover:text-indigo-600"
                        >
                          <FileText className="w-4 h-4" />
                          Applied Jobs
                        </Link>
                        <Link
                          to="/saved-jobs"
                          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-indigo-50/70 transition-all text-sm text-slate-600 hover:text-indigo-600"
                        >
                          <Bookmark className="w-4 h-4" />
                          Saved Jobs
                        </Link>
                      </>
                    )}

                    <div className="h-px bg-indigo-100 my-1" />

                    <button 
                      onClick={() => setOpen(true)}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-50 transition-all text-sm text-slate-600 hover:text-red-600"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </PopoverContent>
              </Popover>
            )}

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-indigo-50/70 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-slate-600" />
              ) : (
                <Menu className="w-5 h-5 text-slate-600" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - With Icons */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-indigo-100 py-3 px-4 shadow-lg">
          <div className="space-y-1">
            {user && user.role === 'recruiter' ? (
              <>
                <Link 
                  to="/admin/companies" 
                  className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-indigo-50/70 transition-colors text-slate-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Users className="w-4 h-4 text-indigo-600" />
                  <span className="font-medium">Companies</span>
                </Link>
                <Link 
                  to="/admin/jobs" 
                  className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-indigo-50/70 transition-colors text-slate-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <LayoutDashboard className="w-4 h-4 text-indigo-600" />
                  <span className="font-medium">Jobs</span>
                </Link>
              </>
            ) : (
              <>
                <Link 
                  to="/" 
                  className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-indigo-50/70 transition-colors text-slate-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Home className="w-4 h-4 text-indigo-600" />
                  <span className="font-medium">Home</span>
                </Link>
                <Link 
                  to="/jobs" 
                  className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-indigo-50/70 transition-colors text-slate-600"
                  onClick={() => {
                    dispatch(setSearchQuery(""));
                    dispatch(clearFilters());
                    setMobileMenuOpen(false);
                  }}
                >
                  <Search className="w-4 h-4 text-indigo-600" />
                  <span className="font-medium">Jobs</span>
                </Link>
                <Link 
                  to="/browse" 
                  className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-indigo-50/70 transition-colors text-slate-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Compass className="w-4 h-4 text-indigo-600" />
                  <span className="font-medium">Browse</span>
                </Link>
                <Link
                  to="/about"
                  className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-indigo-50/70 transition-colors text-slate-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <BadgeInfo className="w-4 h-4 text-indigo-600" />
                  <span className="font-medium">About</span>
                </Link>
              </>
            )}
          </div>
        </div>
      )}

      {/* Logout Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[400px] rounded-xl p-6">
          <DialogHeader className="text-center">
            <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <LogOut className="w-6 h-6 text-red-600" />
            </div>
            <DialogTitle className="text-xl font-bold text-slate-800">
              Logout
            </DialogTitle>
            <DialogDescription className="text-slate-500 text-sm">
              Are you sure you want to sign out?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2 mt-4">
            <Button 
              variant="outline" 
              onClick={() => setOpen(false)}
              className="flex-1 rounded-lg"
            >
              Cancel
            </Button>
            <Button 
              onClick={logoutHandler}
              className="flex-1 rounded-lg bg-red-600 text-white hover:bg-red-700"
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
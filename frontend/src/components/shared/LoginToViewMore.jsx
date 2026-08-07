import React, { useState } from "react";
import { Lock, LogIn, Home, Sparkles, ShieldCheck, ArrowRight, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";
import LoginPopup from "@/Autheticated/LoginPopup";

const LoginToViewMore = ({ totalCount = 0, remainingCount = 0 }) => {
  const [loginOpen, setLoginOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className="relative overflow-hidden mt-10 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 border border-purple-500/30 text-white shadow-2xl">
        {/* Ambient Gradient Glows */}
        <div className="absolute -top-24 -left-24 w-60 h-60 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center max-w-xl mx-auto">
          {/* Badge Indicator */}
          {remainingCount > 0 ? (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/15 border border-purple-400/30 text-purple-300 text-xs font-semibold tracking-wide uppercase mb-4 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
              <span>{remainingCount}+ more jobs waiting for you</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/15 border border-purple-400/30 text-purple-300 text-xs font-semibold tracking-wide uppercase mb-4 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
              <span>Unlock Unlimited Job Access</span>
            </div>
          )}

          {/* Icon Badge */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-500 to-pink-500 p-0.5 shadow-xl shadow-purple-900/40 mb-4 transform hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-slate-950/80 rounded-[14px] flex items-center justify-center backdrop-blur-sm">
              <Lock className="w-7 h-7 text-purple-300" />
            </div>
          </div>

          {/* Title */}
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2 flex items-center justify-center gap-2">
            <span>🔒 Want to see more jobs?</span>
          </h3>

          {/* Subtitle */}
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
            Create a free account to access all jobs.
          </p>

          {/* Actions: [ Login ] [ Go Home ] */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto mb-4">
            <Button
              onClick={() => navigate("/login")}
              className="w-full sm:w-auto bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:from-purple-500 hover:via-indigo-500 hover:to-pink-500 text-white font-bold px-8 py-3.5 h-auto rounded-2xl shadow-xl shadow-purple-600/30 hover:shadow-purple-600/50 transition-all duration-300 group text-base border-0 flex items-center justify-center gap-2"
            >
              <LogIn className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Login</span>
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              variant="outline"
              onClick={() => navigate("/")}
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border-white/20 hover:border-white/40 font-semibold px-7 py-3.5 h-auto rounded-2xl backdrop-blur-sm transition-all duration-300 flex items-center justify-center gap-2 text-base"
            >
              <Home className="w-4 h-4" />
              <span>Go Home</span>
            </Button>
          </div>

          {/* Sign Up Link */}
          <p className="text-xs text-slate-400 mt-2">
            New here?{" "}
            <Link
              to="/signup"
              className="text-purple-300 font-semibold hover:text-purple-200 hover:underline inline-flex items-center gap-1"
            >
              <UserPlus className="w-3.5 h-3.5 inline" /> Create free account
            </Link>
          </p>

          {/* Trust Points */}
          <div className="flex items-center justify-center gap-6 mt-6 text-xs text-slate-400 border-t border-slate-800/80 pt-5 w-full">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Free Forever
            </span>

            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-purple-400" />
              Instant Access to All Jobs
            </span>
          </div>
        </div>
      </div>

      <LoginPopup open={loginOpen} setOpen={setLoginOpen} />
    </>
  );
};

export default LoginToViewMore;

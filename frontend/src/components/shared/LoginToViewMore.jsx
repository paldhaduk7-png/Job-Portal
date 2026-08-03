import React, { useState } from "react";
import { Lock, LogIn, Sparkles, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import LoginPopup from "@/Autheticated/LoginPopup";

const LoginToViewMore = ({ totalCount = 0, remainingCount = 0 }) => {
  const [loginOpen, setLoginOpen] = useState(false);

  return (
   <>
  <div className="relative overflow-hidden mt-10 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 border border-purple-500/30 text-white shadow-2xl">
    {/* Ambient Gradient Glows */}
    <div className="absolute -top-24 -left-24 w-60 h-60 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
    <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

    <div className="relative z-10 flex flex-col items-center text-center max-w-xl mx-auto">
      {/* Badge Indicator */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/15 border border-purple-400/30 text-purple-300 text-xs font-semibold tracking-wide uppercase mb-4 backdrop-blur-md">
        <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
        <span>
          Unlock {remainingCount > 0 ? `${remainingCount}+ More Opportunities` : "Unlimited Job Access"}
        </span>
      </div>

      {/* Icon Badge */}
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-500 to-pink-500 p-0.5 shadow-xl shadow-purple-900/40 mb-4 transform hover:scale-105 transition-transform duration-300">
        <div className="w-full h-full bg-slate-950/80 rounded-[14px] flex items-center justify-center backdrop-blur-sm">
          <Lock className="w-7 h-7 text-purple-300" />
        </div>
      </div>

      {/* Title */}
      <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
        Unlock Your Next Career Opportunity
      </h3>

      {/* Description */}
      <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
        You're currently browsing the first{" "}
        <span className="font-semibold text-purple-300">
          5 of {totalCount} available jobs
        </span>
        . Sign in to unlock{" "}
        <span className="font-semibold text-pink-300">
          {remainingCount} more opportunities
        </span>
        , apply instantly, save jobs for later, and track every application from your personal dashboard.
      </p>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
        <Button
          onClick={() => setLoginOpen(true)}
          className="w-full sm:w-auto bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:from-purple-500 hover:via-indigo-500 hover:to-pink-500 text-white font-bold px-8 py-3.5 h-auto rounded-2xl shadow-xl shadow-purple-600/30 hover:shadow-purple-600/50 transition-all duration-300 group text-base border-0"
        >
          <LogIn className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
          <span>Login to Unlock All Jobs</span>
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>

      {/* Trust Points */}
      <div className="flex items-center justify-center gap-6 mt-8 text-xs text-slate-400 border-t border-slate-800/80 pt-6 w-full">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          Free Forever
        </span>

        <span className="flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-purple-400" />
          One-Click Applications
        </span>
      </div>
    </div>
  </div>

  <LoginPopup open={loginOpen} setOpen={setLoginOpen} />
</>
  );
};

export default LoginToViewMore;

import React from "react";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Sparkles, 
  Briefcase, 
  Users, 
  Building2, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  Clock, 
  TrendingUp,
  Search,
  Star
} from "lucide-react";

const GuestHeroShowcase = () => {
  return (
    <div className="relative overflow-hidden bg-[#fafbff] pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-indigo-100/60">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-100/40 via-white/60 to-purple-100/40 -z-10" />
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-indigo-400/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-purple-400/15 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Modern dot grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.3] pointer-events-none" 
        style={{
          backgroundImage: `radial-gradient(circle, #6366f1 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#fafbff]/90 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Value Proposition & CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 border border-indigo-200/80 shadow-2xs backdrop-blur-md mb-6">
              <div className="relative flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full animate-ping"></span>
              </div>
              <span className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                The Next-Generation Recruitment Platform
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
              Connecting Top Talent With{" "}
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                World-Class Companies
              </span>
            </h1>

            {/* Description */}
            <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              JobPortal simplifies your entire career journey. Search verified tech opportunities, 
              apply with a single click, track real-time hiring decisions, or hire qualified talent in minutes.
            </p>

            {/* Dual Action CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                to="/signup"
                className="w-full sm:w-auto px-7 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-2xl shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2.5 text-sm sm:text-base group"
              >
                <span>Find Your Dream Job</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/signup"
                className="w-full sm:w-auto px-7 py-4 bg-white hover:bg-slate-50 text-slate-800 font-bold rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <Building2 className="w-4 h-4 text-indigo-600" />
                <span>Post Jobs & Hire</span>
              </Link>
            </div>

            {/* Secondary login prompt */}
            <div className="mt-5 flex items-center justify-center lg:justify-start gap-2 text-xs sm:text-sm text-slate-500">
              <span>Already registered on JobPortal?</span>
              <Link to="/login" className="font-bold text-indigo-600 hover:text-indigo-800 transition-colors underline underline-offset-4">
                Sign in to your portal &rarr;
              </Link>
            </div>

            {/* Key Trust Highlights */}
            <div className="mt-10 pt-8 border-t border-slate-200/70 grid grid-cols-3 gap-4 text-left">
              <div>
                <p className="text-2xl sm:text-3xl font-black text-slate-900">10,000+</p>
                <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">Active Job Seekers</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-indigo-600">500+</p>
                <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">Verified Companies</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-purple-600">95%</p>
                <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">Placement Success</p>
              </div>
            </div>

          </div>

          {/* Right Column: Platform UI Visual Mockup Card */}
          <div className="lg:col-span-5 relative">
            
            {/* Ambient Back Glow */}
            <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl blur-2xl opacity-20" />

            {/* Main Interactive Mockup Box */}
            <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl border border-indigo-100 shadow-2xl p-6 sm:p-7 space-y-4">
              
              {/* Card Header (Simulated App Header) */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-500/20">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">JobPortal Live Preview</h3>
                    <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                      5,420+ Open Positions
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                  Verified Platform
                </span>
              </div>

              {/* Sample Job Card 1 */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-indigo-50/40 border border-slate-200/70 hover:border-indigo-300 transition-all shadow-2xs">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                      Featured Tech
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 mt-1">Senior Full Stack Engineer</h4>
                    <p className="text-xs text-slate-500">Google • Remote / Bangalore</p>
                  </div>
                  <span className="text-xs font-bold text-indigo-700 bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-2xs">
                    28-35 LPA
                  </span>
                </div>
                <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-slate-200/60 text-xs">
                  <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Applied 2 hours ago</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3" />
                    Shortlisted
                  </span>
                </div>
              </div>

              {/* Sample Job Card 2 */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-purple-50/40 border border-slate-200/70 hover:border-purple-300 transition-all shadow-2xs">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-2 py-0.5 rounded-md">
                      High Growth
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 mt-1">AI / ML System Architect</h4>
                    <p className="text-xs text-slate-500">Microsoft • Hybrid / Hyderabad</p>
                  </div>
                  <span className="text-xs font-bold text-purple-700 bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-2xs">
                    32-45 LPA
                  </span>
                </div>
                <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-slate-200/60 text-xs">
                  <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                    <span>Fast Response Recruiter</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                    1-Click Apply
                  </span>
                </div>
              </div>

              {/* Bottom Feature Pill Badge */}
              <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl text-white flex items-center justify-between text-xs font-semibold shadow-md shadow-indigo-500/20">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-300" />
                  <span>100% Free Resume Upload & Job Alerts</span>
                </div>
                <Link to="/signup" className="text-[11px] font-bold bg-white text-indigo-950 px-2.5 py-1 rounded-lg hover:bg-slate-100 transition-colors">
                  Join Now
                </Link>
              </div>

            </div>

            {/* Floating Trust Badge */}
            <div className="hidden sm:flex absolute -bottom-5 -left-6 bg-white rounded-2xl p-3 shadow-xl border border-slate-200/80 items-center gap-3 animate-bounce" style={{ animationDuration: '4s' }}>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <Star className="w-5 h-5 fill-emerald-500 text-emerald-500" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">4.9 / 5.0 Rating</p>
                <p className="text-[10px] text-slate-500">Over 3,000+ Reviews</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default GuestHeroShowcase;

import React from "react";
import { Link } from "react-router-dom";
import { 
  Briefcase, 
  Building2, 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  Send, 
  Clock, 
  Users, 
  Bookmark, 
  ShieldCheck,
  Sparkles
} from "lucide-react";

const PlatformDualAudience = () => {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs sm:text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            Built For Both Sides Of The Hiring Process
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            How JobPortal Empowers{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Everyone
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Whether you are actively seeking your next big career breakthrough or scouting premier engineering talent, our platform is designed for you.
          </p>
        </div>

        {/* Dual Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          
          {/* Card 1: For Job Seekers */}
          <div className="relative group bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/30 rounded-3xl p-8 sm:p-10 border border-indigo-100/90 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between">
            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
                  <Briefcase className="w-7 h-7" />
                </div>
                <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-indigo-100 text-indigo-700">
                  For Job Seekers
                </span>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                Land Your Dream Job Faster
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Stop filling out endless repetitive forms. Upload your resume once, discover verified roles matched to your tech stack, and submit applications with a single click.
              </p>

              {/* Feature Checklist */}
              <div className="space-y-3.5 mb-8">
                <div className="flex items-start gap-3 text-sm text-slate-700 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <span>1-Click Applications with attached resume and profile</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-slate-700 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <span>Real-Time Status Tracker (Pending, Shortlisted, Rejected)</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-slate-700 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <span>Bookmark and save interesting positions to apply later</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-slate-700 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <span>Transparent salary ranges and verified employer profiles</span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <Link
              to="/signup"
              className="inline-flex items-center justify-center gap-2 w-full py-4 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-2xl shadow-md shadow-indigo-500/20 hover:shadow-lg transition-all group/btn"
            >
              <span>Create Free Candidate Profile</span>
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Card 2: For Employers & Recruiters */}
          <div className="relative group bg-gradient-to-br from-purple-50/50 via-white to-pink-50/30 rounded-3xl p-8 sm:p-10 border border-purple-100/90 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between">
            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 text-white flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform">
                  <Building2 className="w-7 h-7" />
                </div>
                <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-purple-100 text-purple-700">
                  For Employers & HR
                </span>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                Hire Exceptional Talent Seamlessly
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Build your verified company profile, post high-visibility job listings, inspect candidate resumes, and manage your entire talent pipeline from one streamlined console.
              </p>

              {/* Feature Checklist */}
              <div className="space-y-3.5 mb-8">
                <div className="flex items-start gap-3 text-sm text-slate-700 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>Instant company profile setup with logo and website verification</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-slate-700 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>Post and manage multi-position openings with salary & skills tags</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-slate-700 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>Review applicants, download resumes, and accept/reject applicants</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-slate-700 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>Direct candidate pipeline with live notifications</span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <Link
              to="/signup"
              className="inline-flex items-center justify-center gap-2 w-full py-4 px-6 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl shadow-md hover:shadow-lg transition-all group/btn"
            >
              <span>Register as Recruiter & Post Jobs</span>
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PlatformDualAudience;

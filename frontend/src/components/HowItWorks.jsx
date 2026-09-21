import React from "react";
import { UserPlus, FileUp, Send, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const steps = [
  {
    step: "01",
    title: "Create Free Account",
    description: "Register in under 60 seconds as a job seeker or recruiter. Set your career targets and skills.",
    icon: UserPlus,
    gradient: "from-blue-500 to-cyan-500",
    bgLight: "bg-blue-50/70",
    borderLight: "border-blue-200/60",
    textColor: "text-blue-600",
  },
  {
    step: "02",
    title: "Upload Resume & Profile",
    description: "Highlight your key skills, past projects, and attach your latest resume for instant matching.",
    icon: FileUp,
    gradient: "from-indigo-500 to-purple-500",
    bgLight: "bg-indigo-50/70",
    borderLight: "border-indigo-200/60",
    textColor: "text-indigo-600",
  },
  {
    step: "03",
    title: "Explore & 1-Click Apply",
    description: "Browse verified opportunities by role, location, and salary. Submit applications seamlessly.",
    icon: Send,
    gradient: "from-purple-500 to-pink-500",
    bgLight: "bg-purple-50/70",
    borderLight: "border-purple-200/60",
    textColor: "text-purple-600",
  },
  {
    step: "04",
    title: "Get Hired & Grow",
    description: "Monitor your application status live, connect with hiring teams, and start your dream career.",
    icon: CheckCircle2,
    gradient: "from-emerald-500 to-teal-500",
    bgLight: "bg-emerald-50/70",
    borderLight: "border-emerald-200/60",
    textColor: "text-emerald-600",
  },
];

const HowItWorks = () => {
  return (
    <section className="relative py-20 overflow-hidden bg-white">
      {/* Background soft ambient orbs */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-indigo-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-purple-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs sm:text-sm font-semibold mb-4 shadow-xs">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            Simple & Transparent Process
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            How It Works For{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Job Seekers
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Your bridge from browsing to landing your next offer. Follow four simple steps to kickstart your professional journey.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative">
          {/* Connector line for desktop */}
          <div className="hidden lg:block absolute top-1/3 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-blue-200 via-indigo-200 to-emerald-200 -z-0" />

          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group relative bg-white/90 backdrop-blur-sm rounded-3xl p-7 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between"
              >
                {/* Step badge top bar */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-3xl font-black text-slate-200 group-hover:text-indigo-400/40 transition-colors">
                      {item.step}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2.5 group-hover:text-indigo-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Subtle bottom indicator */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-slate-400 group-hover:text-indigo-600 transition-colors">
                  <span>Step {item.step}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to action trigger */}
        <div className="mt-14 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-2 sm:pr-6 bg-slate-50 border border-slate-200/80 rounded-2xl sm:rounded-full">
            <span className="px-4 py-1.5 bg-indigo-600 text-white text-xs font-semibold rounded-full">
              Get Started Now
            </span>
            <span className="text-xs sm:text-sm text-slate-600 font-medium text-center sm:text-left">
              Join thousands of job seekers who found their dream careers with us.
            </span>
            <Link
              to="/signup"
              className="text-xs sm:text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 group"
            >
              Sign Up Free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

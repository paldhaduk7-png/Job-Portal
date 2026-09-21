import React from "react";
import { ShieldCheck, Zap, BellRing, Building, FileCheck, Award, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: ShieldCheck,
    title: "100% Verified Companies",
    description: "Every employer and job listing undergoes review to ensure authentic, high-quality opportunities.",
    iconColor: "text-emerald-600",
    bgColor: "bg-emerald-50",
    badge: "Verified Trust",
  },
  {
    icon: BellRing,
    title: "Instant Status Updates",
    description: "Get immediate feedback on application views, shortlisted statuses, and interview schedules.",
    iconColor: "text-indigo-600",
    bgColor: "bg-indigo-50",
    badge: "Real-Time",
  },
  {
    icon: Zap,
    title: "Fast 1-Click Applications",
    description: "Save your resume and portfolio once to apply instantly to multiple leading tech and business roles.",
    iconColor: "text-amber-600",
    bgColor: "bg-amber-50",
    badge: "Speed & Ease",
  },
  {
    icon: Building,
    title: "Top Hiring Companies",
    description: "Direct partnerships with growing startups and enterprise companies actively scouting new talent.",
    iconColor: "text-purple-600",
    bgColor: "bg-purple-50",
    badge: "Top Tier",
  },
  {
    icon: FileCheck,
    title: "Bookmark & Track",
    description: "Save dream jobs to your wishlist and monitor all your applied positions from one intuitive dashboard.",
    iconColor: "text-blue-600",
    bgColor: "bg-blue-50",
    badge: "Organized",
  },
  {
    icon: Award,
    title: "Transparent Compensation",
    description: "Clear salary ranges, role expectations, and company backgrounds upfront without hidden details.",
    iconColor: "text-rose-600",
    bgColor: "bg-rose-50",
    badge: "Fair Pay",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="relative py-20 bg-slate-50/60 border-y border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="max-w-2xl">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-indigo-600 mb-3 block">
              Why Candidates Choose Us
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              Built To Accelerate Your{" "}
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Career Growth
              </span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600">
              We empower professionals and students with the most efficient, transparent, and direct job-finding experience.
            </p>
          </div>

          <div className="mt-6 md:mt-0">
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-all shadow-md hover:shadow-lg hover:scale-105"
            >
              Explore Openings
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-7 border border-slate-200/70 shadow-2xs hover:shadow-xl hover:border-indigo-200 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-xl ${item.bgColor} flex items-center justify-center ${item.iconColor} group-hover:scale-110 transition-transform duration-300 shadow-xs`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-1 text-xs font-semibold text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Learn more</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

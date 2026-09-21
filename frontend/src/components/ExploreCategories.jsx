import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "@/redux/jobSlice";
import { 
  Code, 
  Server, 
  Layout, 
  Cpu, 
  Database, 
  Cloud, 
  Palette, 
  ShieldCheck, 
  ArrowRight,
  Sparkles
} from "lucide-react";

const categories = [
  {
    name: "Frontend Development",
    query: "Frontend",
    icon: Layout,
    count: "1,200+ Jobs",
    gradient: "from-blue-500 to-cyan-500",
    bgLight: "bg-blue-50/60",
    border: "border-blue-100",
    textColor: "text-blue-600"
  },
  {
    name: "Backend Development",
    query: "Backend",
    icon: Server,
    count: "1,450+ Jobs",
    gradient: "from-purple-500 to-indigo-500",
    bgLight: "bg-purple-50/60",
    border: "border-purple-100",
    textColor: "text-purple-600"
  },
  {
    name: "Full Stack Engineering",
    query: "Full Stack",
    icon: Code,
    count: "1,800+ Jobs",
    gradient: "from-emerald-500 to-teal-500",
    bgLight: "bg-emerald-50/60",
    border: "border-emerald-100",
    textColor: "text-emerald-600"
  },
  {
    name: "AI & Machine Learning",
    query: "AI",
    icon: Cpu,
    count: "850+ Jobs",
    gradient: "from-rose-500 to-pink-500",
    bgLight: "bg-rose-50/60",
    border: "border-rose-100",
    textColor: "text-rose-600"
  },
  {
    name: "Cloud & DevOps",
    query: "DevOps",
    icon: Cloud,
    count: "920+ Jobs",
    gradient: "from-amber-500 to-orange-500",
    bgLight: "bg-amber-50/60",
    border: "border-amber-100",
    textColor: "text-amber-600"
  },
  {
    name: "Data Science & Analytics",
    query: "Data Science",
    icon: Database,
    count: "780+ Jobs",
    gradient: "from-cyan-500 to-blue-600",
    bgLight: "bg-cyan-50/60",
    border: "border-cyan-100",
    textColor: "text-cyan-600"
  },
  {
    name: "UI / UX Design",
    query: "UI/UX",
    icon: Palette,
    count: "640+ Jobs",
    gradient: "from-violet-500 to-purple-600",
    bgLight: "bg-violet-50/60",
    border: "border-violet-100",
    textColor: "text-violet-600"
  },
  {
    name: "Cybersecurity & InfoSec",
    query: "Cyber Security",
    icon: ShieldCheck,
    count: "410+ Jobs",
    gradient: "from-slate-700 to-slate-950",
    bgLight: "bg-slate-50/80",
    border: "border-slate-200",
    textColor: "text-slate-800"
  },
];

const ExploreCategories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCategoryClick = (query) => {
    dispatch(setSearchQuery(query));
    navigate("/browse");
  };

  return (
    <section className="py-20 bg-slate-50/60 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200/80 text-slate-700 text-xs sm:text-sm font-semibold mb-3 shadow-2xs">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              In-Demand Tech Specializations
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              Explore By{" "}
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Role Category
              </span>
            </h2>
            <p className="mt-3 text-base text-slate-600">
              Browse hot job sectors actively scouted by verified tech employers.
            </p>
          </div>

          <div className="mt-5 md:mt-0">
            <Link
              to="/browse"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors group"
            >
              <span>View All Career Disciplines</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat, index) => {
            const Icon = cat.icon;
            return (
              <div
                key={index}
                onClick={() => handleCategoryClick(cat.query)}
                className="group relative bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs hover:shadow-xl hover:border-indigo-300/80 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center text-white shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                      {cat.count}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {cat.name}
                  </h3>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500 group-hover:text-indigo-600 transition-colors">
                  <span>Explore Openings</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ExploreCategories;

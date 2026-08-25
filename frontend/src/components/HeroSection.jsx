import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search, Briefcase, TrendingUp, Award, Sparkles, Zap, ArrowRight, Flame, Code, Database, Layout, Server, Palette } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (e) => {
    e.preventDefault();
    if (query.trim()) {
      dispatch(setSearchQuery(query));
      navigate("/jobs");
    }
  };

  const popularTags = [
    { name: "Frontend", icon: Layout, color: "from-blue-500 to-cyan-400" },
    { name: "Backend", icon: Server, color: "from-purple-500 to-pink-400" },
    { name: "Full Stack", icon: Code, color: "from-green-500 to-emerald-400" },
    { name: "Data Science", icon: Database, color: "from-orange-500 to-amber-400" },
    { name: "DevOps", icon: Server, color: "from-red-500 to-rose-400" },
    { name: "UI/UX", icon: Palette, color: "from-indigo-500 to-violet-400" },
  ];

  return (
    <div className="relative overflow-hidden min-h-[600px] flex items-center bg-[#fafbff]">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-100/30 via-white/50 to-purple-100/30 -z-10" />
      
      {/* Glow Orbs */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-indigo-400/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-purple-400/20 rounded-full blur-3xl" style={{ animationDelay: '1s' }} />
      <div className="absolute top-20 right-20 w-40 h-40 bg-blue-300/20 rounded-full blur-2xl" />
      <div className="absolute bottom-20 left-20 w-32 h-32 bg-pink-300/20 rounded-full blur-2xl" />

      {/* Subtle Modern Dot-Matrix Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.35] pointer-events-none" 
        style={{
          backgroundImage: `radial-gradient(circle, #6366f1 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#fafbff]/80 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 relative z-10 w-full">
        <div className="text-center max-w-4xl mx-auto">
          
          {/* Badge */}
          <div 
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-indigo-50/90 to-purple-50/90 border border-indigo-200/60 backdrop-blur-sm mb-8 shadow-lg shadow-indigo-500/5"
            style={{ animation: 'float 3s ease-in-out infinite' }}
          >
            <div className="relative">
              <Zap className="w-4 h-4 text-indigo-600" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full" style={{ animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite' }}></span>
            </div>
            <span className="text-sm font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              No. 1 Job Hunt Platform
            </span>
            <ArrowRight className="w-3 h-3 text-indigo-400" />
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight">
            Search, Apply & 
            <br />
            Get Your{" "}
            <span 
              className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
              style={{
                backgroundSize: '200% 200%',
                animation: 'gradient 4s ease infinite'
              }}
            >
              Dream Jobs
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mt-5 leading-relaxed">
            Browse verified job listings, apply instantly, and get hired by top companies. 
            Your journey to a successful career starts here.
          </p>

          {/* Search Box */}
          <form onSubmit={searchJobHandler} className="mt-10 max-w-2xl mx-auto">
            <div 
              className={`
                relative group flex items-center bg-white/90 backdrop-blur-sm 
                border rounded-2xl shadow-lg transition-all duration-500
                ${isFocused 
                  ? 'border-indigo-400 shadow-2xl shadow-indigo-500/20 ring-4 ring-indigo-500/10' 
                  : 'border-slate-200/80 shadow-lg hover:shadow-xl'
                }
              `}
              style={{
                transform: isFocused ? 'scale(1.02)' : 'scale(1)',
              }}
            >
              <div className="pl-5 pr-2 relative z-10">
                <Search className={`w-5 h-5 transition-colors duration-300 ${isFocused ? 'text-indigo-600' : 'text-slate-400'}`} />
              </div>
              <input
                type="text"
                placeholder="Search for your dream job..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="flex-1 outline-none border-none px-3 py-4 text-slate-700 bg-transparent placeholder:text-slate-400 text-sm relative z-10"
              />
              <div className="pr-2 relative z-10">
                <Button 
                  type="submit"
                  className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-700 hover:via-indigo-600 hover:to-purple-700 text-white rounded-xl px-7 py-3.5 shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300 text-sm font-medium group overflow-hidden relative"
                >
                  <span className="relative z-10 flex items-center">
                    Search Jobs
                    <Search className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </Button>
              </div>
            </div>
          </form>

          {/* 🔥 BEST POPULAR TAGS UI - Clean & Modern */}
          <div className="mt-10">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Flame className="w-5 h-5 text-orange-500" />
              <span className="text-sm font-semibold text-slate-700">Trending Categories</span>
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-slate-300"></div>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-slate-300"></div>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-3">
              {popularTags.map((tag, index) => {
                const Icon = tag.icon;
                return (
                  <button
                    key={index}
                    onClick={() => {
                      setQuery(tag.name);
                      dispatch(setSearchQuery(tag.name));
                      navigate("/browse");
                    }}
                    className="group relative px-5 py-2.5 bg-white border border-slate-200/80 rounded-full 
                      hover:border-transparent transition-all duration-300
                      shadow-sm hover:shadow-lg hover:scale-105"
                    style={{
                      background: 'white',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
                    }}
                  >
                    {/* Gradient background on hover */}
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${tag.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                    
                    {/* Content */}
                    <div className="relative flex items-center gap-2.5">
                      <div className={`p-1 rounded-lg bg-gradient-to-r ${tag.color} bg-opacity-10 group-hover:bg-opacity-20 transition-all duration-300`}>
                        <Icon className={`w-4 h-4 text-slate-600 group-hover:text-white transition-colors duration-300`} />
                      </div>
                      <span className="text-sm font-medium text-slate-700 group-hover:text-white transition-colors duration-300 relative z-10">
                        {tag.name}
                      </span>
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center justify-center gap-2">
                <Briefcase className="w-4 h-4 text-indigo-600" strokeWidth={2} />
                <span className="text-xl font-bold text-slate-800">10K+</span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">Live Jobs</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center justify-center gap-2">
                <TrendingUp className="w-4 h-4 text-indigo-600" strokeWidth={2} />
                <span className="text-xl font-bold text-slate-800">500+</span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">Companies</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center justify-center gap-2">
                <Award className="w-4 h-4 text-indigo-600" strokeWidth={2} />
                <span className="text-xl font-bold text-slate-800">95%</span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">Success Rate</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-600" strokeWidth={2} />
                <span className="text-xl font-bold text-slate-800">4.8★</span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">User Rating</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default HeroSection;
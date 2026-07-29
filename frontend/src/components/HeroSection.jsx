import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search, Briefcase, TrendingUp, Award, ArrowRight, Sparkles } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (e) => {
    e.preventDefault();
    if (query.trim()) {
      dispatch(setSearchQuery(query));
      navigate("/browse");
    }
  };

  // Popular search tags
  const popularTags = ["Frontend", "Backend", "Full Stack", "Data Science", "DevOps", "UI/UX"];

  return (
    <div className="relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-white to-blue-50/50 -z-10"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100/80 backdrop-blur-sm border border-purple-200/50 mb-6 animate-float">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-700">No. 1 Job Hunt Platform</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
            Search, Apply & 
            <br />
            Get Your{" "}
            <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-500 bg-clip-text text-transparent">
              Dream Jobs
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mt-6 leading-relaxed">
            Browse verified job listings, apply instantly, and get hired by top companies. 
            Your journey to a successful career starts here.
          </p>

          {/* Search Box */}
          <form onSubmit={searchJobHandler} className="mt-10 max-w-2xl mx-auto">
            <div className="flex items-center bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-1.5">
              <Search className="w-5 h-5 text-slate-400 ml-4" />
              <input
                type="text"
                placeholder="Search for your dream job..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 outline-none border-none px-4 py-3.5 text-slate-700 bg-transparent placeholder:text-slate-400"
              />
              <Button 
                type="submit"
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl px-6 py-3.5 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 flex items-center gap-2"
              >
                <span>Search Jobs</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </form>

          {/* Popular Tags */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <span className="text-sm text-slate-500 font-medium">Popular:</span>
            {popularTags.map((tag, index) => (
              <button
                key={index}
                onClick={() => {
                  setQuery(tag);
                  dispatch(setSearchQuery(tag));
                  navigate("/browse");
                }}
                className="px-4 py-1.5 text-sm bg-white/70 backdrop-blur-sm border border-slate-200/60 rounded-full text-slate-600 hover:text-purple-600 hover:border-purple-300 hover:bg-purple-50/50 transition-all duration-200 shadow-sm"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-slate-200/50">
              <div className="flex items-center justify-center gap-2">
                <Briefcase className="w-5 h-5 text-purple-600" />
                <span className="text-2xl font-bold text-slate-800">10K+</span>
              </div>
              <p className="text-sm text-slate-500">Live Jobs</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-slate-200/50">
              <div className="flex items-center justify-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                <span className="text-2xl font-bold text-slate-800">500+</span>
              </div>
              <p className="text-sm text-slate-500">Companies</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-slate-200/50">
              <div className="flex items-center justify-center gap-2">
                <Award className="w-5 h-5 text-purple-600" />
                <span className="text-2xl font-bold text-slate-800">95%</span>
              </div>
              <p className="text-sm text-slate-500">Success Rate</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-slate-200/50">
              <div className="flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                <span className="text-2xl font-bold text-slate-800">4.8★</span>
              </div>
              <p className="text-sm text-slate-500">User Rating</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
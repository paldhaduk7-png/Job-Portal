import React from "react";
import {
  Briefcase,
  GraduationCap,
  Code2,
  Mail,
  Sparkles,
  ArrowRight,
  User,
  Database,
  Server,
  Layout,
  Shield,
  Cloud,
  FileUp,
  Network,
  Smartphone,
} from "lucide-react";

import { FaGithub, FaLinkedin } from "react-icons/fa";

const About = () => {
  const technologies = [
    { name: "React", icon: <Layout className="w-4 h-4" />, color: "bg-cyan-100 text-cyan-700" },
    { name: "Redux Toolkit", icon: <Database className="w-4 h-4" />, color: "bg-purple-100 text-purple-700" },
    { name: "Tailwind CSS", icon: <Sparkles className="w-4 h-4" />, color: "bg-teal-100 text-teal-700" },
    { name: "Node.js", icon: <Server className="w-4 h-4" />, color: "bg-green-100 text-green-700" },
    { name: "Express.js", icon: <Network className="w-4 h-4" />, color: "bg-gray-100 text-gray-700" },
    { name: "MongoDB", icon: <Database className="w-4 h-4" />, color: "bg-emerald-100 text-emerald-700" },
    { name: "JWT Auth", icon: <Shield className="w-4 h-4" />, color: "bg-rose-100 text-rose-700" },
    { name: "Cloudinary", icon: <Cloud className="w-4 h-4" />, color: "bg-blue-100 text-blue-700" },
    { name: "Multer", icon: <FileUp className="w-4 h-4" />, color: "bg-orange-100 text-orange-700" },
    { name: "Axios", icon: <Network className="w-4 h-4" />, color: "bg-indigo-100 text-indigo-700" },
    { name: "Shadcn UI", icon: <Layout className="w-4 h-4" />, color: "bg-violet-100 text-violet-700" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section with Gradient */}
        <div className="relative mb-16">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-3xl blur-3xl"></div>
          <div className="relative text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-700">Version 2.0</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-6">
              About <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Job Portal</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Job Portal is a modern full-stack web application designed to connect
              students with recruiters. Users can search jobs, save opportunities,
              apply for positions, and track their applications through a clean,
              responsive interface.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <span className="px-4 py-2 bg-white/70 backdrop-blur-sm rounded-full text-sm font-medium text-slate-700 border border-slate-200 shadow-sm">
                🚀 500+ Active Jobs
              </span>
              <span className="px-4 py-2 bg-white/70 backdrop-blur-sm rounded-full text-sm font-medium text-slate-700 border border-slate-200 shadow-sm">
                👥 1000+ Students
              </span>
              <span className="px-4 py-2 bg-white/70 backdrop-blur-sm rounded-full text-sm font-medium text-slate-700 border border-slate-200 shadow-sm">
                🏢 50+ Companies
              </span>
            </div>
          </div>
        </div>

        {/* Project Overview - Card with Icon Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 hover:shadow-2xl transition-shadow duration-300">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4">
              <Briefcase className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">For Students</h3>
            <p className="text-slate-600 leading-relaxed">
              Browse jobs, save opportunities, apply with one click, and track all applications in one place.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 hover:shadow-2xl transition-shadow duration-300">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-4">
              <User className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">For Recruiters</h3>
            <p className="text-slate-600 leading-relaxed">
              Create companies, post jobs, manage applicants, and update application status effortlessly.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 hover:shadow-2xl transition-shadow duration-300">
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-4">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Seamless Experience</h3>
            <p className="text-slate-600 leading-relaxed">
              Clean, responsive interface with real-time updates and intuitive navigation.
            </p>
          </div>
        </div>

        {/* Developer Section - Modern Profile Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden mb-12">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-6">
            <div className="flex items-center gap-3">
              <GraduationCap className="w-8 h-8 text-white" />
              <h2 className="text-2xl font-bold text-white">About the Developer</h2>
            </div>
          </div>
          <div className="p-8">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-shrink-0">
                <div className="w-32 h-32 bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl flex items-center justify-center border-4 border-purple-100">
                  <User className="w-16 h-16 text-purple-600" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-slate-800">Dhaduk Pal Girishbhai</h3>
                <div className="flex flex-wrap items-center gap-3 mt-2">
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                    B.E. Information Technology
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    L.D. College of Engineering
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    Ahmedabad
                  </span>
                </div>
                <p className="text-slate-600 leading-relaxed mt-4">
                  I am passionate about Full Stack Web Development and Machine Learning.
                  I enjoy building practical applications that solve real-world
                  problems. This Job Portal project helped me strengthen my knowledge of
                  React, Redux Toolkit, Node.js, Express.js, MongoDB, JWT
                  Authentication, REST APIs, and responsive UI development.
                </p>
                <div className="flex flex-wrap gap-3 mt-4">
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-sm">
                    <span className="text-lg">⚡</span> React Expert
                  </span>
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-rose-50 text-rose-700 rounded-full text-sm">
                    <span className="text-lg">❤️</span> ML Enthusiast
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technologies - Modern Grid */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden mb-12">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
            <div className="flex items-center gap-3">
              <Code2 className="w-8 h-8 text-white" />
              <h2 className="text-2xl font-bold text-white">Technologies Used</h2>
            </div>
          </div>
          <div className="p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {technologies.map((tech) => (
                <div
                  key={tech.name}
                  className={`${tech.color} rounded-xl p-4 flex flex-col items-center gap-2 transition-transform hover:scale-105 cursor-default`}
                >
                  <div className="w-10 h-10 bg-white/50 rounded-full flex items-center justify-center">
                    {tech.icon}
                  </div>
                  <span className="text-sm font-medium text-center">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact - Modern with Icons */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="bg-gradient-to-r from-violet-600 to-purple-600 px-8 py-6">
            <h2 className="text-2xl font-bold text-white">Connect With Me</h2>
          </div>
          <div className="p-8">
            <div className="grid md:grid-cols-3 gap-6">
              <a
                href="mailto:paldhaduk7@gmail.com"
                className="group flex flex-col items-center p-6 rounded-2xl bg-gradient-to-br from-red-50 to-red-100/50 hover:from-red-100 hover:to-red-200/50 transition-all duration-300 border-2 border-transparent hover:border-red-200"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-rose-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-slate-800">Email</h3>
                <p className="text-sm text-slate-600 mt-1">paldhaduk7@gmail.com</p>
                <ArrowRight className="w-4 h-4 text-slate-400 mt-3 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="https://github.com/paldhaduk7-png"
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col items-center p-6 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200/50 hover:from-slate-200 hover:to-slate-300/50 transition-all duration-300 border-2 border-transparent hover:border-slate-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-slate-700 to-slate-900 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FaGithub className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-slate-800">GitHub</h3>
                <p className="text-sm text-slate-600 mt-1">Dhaduk PAL</p>
                <ArrowRight className="w-4 h-4 text-slate-400 mt-3 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="https://www.linkedin.com/in/dhaduk-pal/"
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col items-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100/50 hover:from-blue-100 hover:to-blue-200/50 transition-all duration-300 border-2 border-transparent hover:border-blue-200"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                 <FaLinkedin className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-slate-800">LinkedIn</h3>
                <p className="text-sm text-slate-600 mt-1">Dhaduk PAL</p>
                <ArrowRight className="w-4 h-4 text-slate-400 mt-3 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <p className="text-sm text-slate-500">
            Made with ❤️ by Dhaduk Pal | © 2026 Job Portal
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
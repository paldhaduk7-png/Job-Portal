import React, { useState } from "react";
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
  Cpu,
  Layers,
  Heart,
  ExternalLink,
  CheckCircle2,
  Zap,
  Globe2,
  Terminal,
  Compass
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import developerPhoto from "@/assets/developer.jpg";

const About = () => {
  const [imgError, setImgError] = useState(false);

  const technologies = [
    { name: "React 19", category: "Frontend", icon: <Layout className="w-4 h-4 text-cyan-600" />, bg: "bg-cyan-50 text-cyan-700 border-cyan-200/80" },
    { name: "Redux Toolkit", category: "State", icon: <Database className="w-4 h-4 text-purple-600" />, bg: "bg-purple-50 text-purple-700 border-purple-200/80" },
    { name: "Tailwind CSS v4", category: "Styling", icon: <Sparkles className="w-4 h-4 text-teal-600" />, bg: "bg-teal-50 text-teal-700 border-teal-200/80" },
    { name: "Node.js", category: "Runtime", icon: <Server className="w-4 h-4 text-emerald-600" />, bg: "bg-emerald-50 text-emerald-700 border-emerald-200/80" },
    { name: "Express.js", category: "Backend", icon: <Network className="w-4 h-4 text-slate-700" />, bg: "bg-slate-100 text-slate-800 border-slate-200/80" },
    { name: "MongoDB", category: "Database", icon: <Database className="w-4 h-4 text-green-600" />, bg: "bg-green-50 text-green-700 border-green-200/80" },
    { name: "JWT Auth", category: "Security", icon: <Shield className="w-4 h-4 text-rose-600" />, bg: "bg-rose-50 text-rose-700 border-rose-200/80" },
    { name: "Cloudinary", category: "Storage", icon: <Cloud className="w-4 h-4 text-blue-600" />, bg: "bg-blue-50 text-blue-700 border-blue-200/80" },
    { name: "Multer", category: "Uploads", icon: <FileUp className="w-4 h-4 text-amber-600" />, bg: "bg-amber-50 text-amber-700 border-amber-200/80" },
    { name: "Axios", category: "Network", icon: <Network className="w-4 h-4 text-indigo-600" />, bg: "bg-indigo-50 text-indigo-700 border-indigo-200/80" },
    { name: "Shadcn UI", category: "Components", icon: <Layout className="w-4 h-4 text-violet-600" />, bg: "bg-violet-50 text-violet-700 border-violet-200/80" },
    { name: "REST APIs", category: "Architecture", icon: <Terminal className="w-4 h-4 text-pink-600" />, bg: "bg-pink-50 text-pink-700 border-pink-200/80" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50/90 via-indigo-50/20 to-slate-50/80 relative overflow-hidden py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      
      {/* Background Ambient Glows & Mesh Lighting */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[650px] h-[400px] bg-gradient-to-tr from-indigo-500/12 via-purple-500/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-40 right-10 w-[500px] h-[380px] bg-gradient-to-bl from-pink-500/10 via-indigo-400/8 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-[600px] left-1/3 w-[700px] h-[450px] bg-gradient-to-r from-blue-400/8 via-purple-400/8 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto">
        
        {/* Hero Section */}
        <div className="text-center mb-16 relative">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-indigo-200/80 shadow-2xs text-xs font-semibold text-indigo-700 backdrop-blur-md mb-5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
            <span>JobPortal Version 2.0 • Next-Gen Career Ecosystem</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-5">
            Empowering Careers with <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Modern Full-Stack Technology
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed font-normal">
            JobPortal is an enterprise-ready recruitment platform engineered to seamlessly connect 
            ambitious job seekers with innovative companies. From instant 1-click applications 
            to robust recruiter dashboards, everything is built for speed and security.
          </p>

          {/* Quick Metrics Bar */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/90 rounded-2xl text-xs sm:text-sm font-semibold text-slate-800 border border-slate-200/80 shadow-2xs backdrop-blur-sm">
              <span className="text-base">🚀</span> 500+ Active Jobs
            </span>
            <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/90 rounded-2xl text-xs sm:text-sm font-semibold text-slate-800 border border-slate-200/80 shadow-2xs backdrop-blur-sm">
              <span className="text-base">👥</span> 1,000+ Students & Candidates
            </span>
            <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/90 rounded-2xl text-xs sm:text-sm font-semibold text-slate-800 border border-slate-200/80 shadow-2xs backdrop-blur-sm">
              <span className="text-base">🏢</span> 50+ Verified Employers
            </span>
            <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/90 rounded-2xl text-xs sm:text-sm font-semibold text-emerald-700 border border-emerald-200/80 shadow-2xs backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              99.9% Application Success
            </span>
          </div>
        </div>

        {/* Project Pillars - 3 Bento Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          
          {/* Card 1: Students */}
          <div className="group bg-white rounded-3xl border border-slate-200/80 p-8 shadow-xs hover:shadow-xl hover:shadow-indigo-500/10 hover:border-indigo-300/80 transition-all duration-300 hover:-translate-y-1">
            <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-5 text-white shadow-md shadow-indigo-500/20 group-hover:scale-110 transition-transform">
              <Briefcase className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2.5">For Students & Seekers</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Explore filtered opportunities by role, location, and salary. Save bookmarks, submit applications in one click, and track real-time hiring status.
            </p>
          </div>

          {/* Card 2: Recruiters */}
          <div className="group bg-white rounded-3xl border border-slate-200/80 p-8 shadow-xs hover:shadow-xl hover:shadow-purple-500/10 hover:border-purple-300/80 transition-all duration-300 hover:-translate-y-1">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-5 text-white shadow-md shadow-purple-500/20 group-hover:scale-110 transition-transform">
              <User className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2.5">For Recruiters & HR</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Create and manage company profiles, post multi-position job openings, inspect applicant resumes, and update recruitment pipelines smoothly.
            </p>
          </div>

          {/* Card 3: Experience */}
          <div className="group bg-white rounded-3xl border border-slate-200/80 p-8 shadow-xs hover:shadow-xl hover:shadow-emerald-500/10 hover:border-emerald-300/80 transition-all duration-300 hover:-translate-y-1">
            <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mb-5 text-white shadow-md shadow-emerald-500/20 group-hover:scale-110 transition-transform">
              <Zap className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2.5">High Performance Core</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Powered by React, Redux Toolkit, MongoDB, and JWT Auth to guarantee lightning-fast page transitions and bank-grade data security.
            </p>
          </div>
        </div>

        {/* Developer Showcase Section - Modern Profile Card */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden mb-16">
          
          {/* Top Accent Gradient */}
          <div className="h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

          <div className="p-6 sm:p-10">
            <div className="flex flex-col md:flex-row gap-8 sm:gap-10 items-center md:items-start">
              
              {/* Profile Image with Frame */}
              <div className="flex-shrink-0">
                <div className="relative group">
                  <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-3xl overflow-hidden ring-4 ring-indigo-500/20 shadow-xl shadow-indigo-950/10 transition-all duration-300 group-hover:scale-[1.02] bg-gradient-to-br from-indigo-100 to-purple-100">
                    {!imgError ? (
                      <img
                        src={developerPhoto}
                        alt="Dhaduk Pal Girishbhai"
                        onError={() => setImgError(true)}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <User className="w-20 h-20 text-indigo-600" />
                      </div>
                    )}
                  </div>
                  <div className="absolute -bottom-2.5 -right-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg border-2 border-white flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Lead Developer</span>
                  </div>
                </div>
              </div>

              {/* Developer Details */}
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold mb-2">
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Full-Stack Software Engineer</span>
                </div>
                
                <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  Dhaduk Pal Girishbhai
                </h2>

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mt-3">
                  <span className="px-3.5 py-1 bg-purple-50 text-purple-700 border border-purple-200/60 rounded-full text-xs font-semibold">
                    🎓 B.E. Information Technology
                  </span>
                  <span className="px-3.5 py-1 bg-blue-50 text-blue-700 border border-blue-200/60 rounded-full text-xs font-semibold">
                    🏛️ L.D. College of Engineering
                  </span>
                  <span className="px-3.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200/60 rounded-full text-xs font-semibold">
                    📍 Ahmedabad, India
                  </span>
                </div>

                <p className="text-slate-600 leading-relaxed mt-4 text-sm sm:text-base font-normal">
                  I am deeply passionate about Full Stack Web Development and Machine Learning systems.
                  I focus on architecting scalable applications that solve real-world problems with elegant UI/UX.
                  This Job Portal embodies best practices in modern React, Redux Toolkit, Node.js, Express, MongoDB, 
                  JWT Authentication, RESTful APIs, and responsive design systems.
                </p>

                {/* Skill Badges */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 mt-5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50/80 text-indigo-700 border border-indigo-200/80 rounded-xl text-xs font-semibold">
                    ⚡ Full-Stack Architect
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-50/80 text-purple-700 border border-purple-200/80 rounded-xl text-xs font-semibold">
                    🧠 Machine Learning
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50/80 text-emerald-700 border border-emerald-200/80 rounded-xl text-xs font-semibold">
                    🛡️ Secure JWT Auth
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-pink-50/80 text-pink-700 border border-pink-200/80 rounded-xl text-xs font-semibold">
                    💎 Modern UI/UX
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technologies Used Grid */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-10 mb-16">
          <div className="flex items-center gap-3 pb-6 border-b border-slate-100 mb-8">
            <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-2xl">
              <Code2 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">Technologies & Architecture</h2>
              <p className="text-xs sm:text-sm text-slate-500">Core software stack powering the application</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
            {technologies.map((tech) => (
              <div
                key={tech.name}
                className={`group rounded-2xl p-4 flex flex-col items-center gap-2.5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-default border ${tech.bg}`}
              >
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-2xs group-hover:scale-110 transition-transform">
                  {tech.icon}
                </div>
                <div className="text-center">
                  <p className="text-xs font-bold">{tech.name}</p>
                  <p className="text-[10px] opacity-70 mt-0.5">{tech.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact & Connect Section */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-10 mb-12">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Connect With Me
            </h2>
            <p className="text-slate-500 text-sm mt-1.5">
              Feel free to reach out for collaborations, project inquiries, or networking opportunities.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            
            {/* Email */}
            <a
              href="mailto:paldhaduk7@gmail.com"
              className="group flex flex-col items-center p-6 rounded-2xl bg-gradient-to-br from-rose-50 to-red-50/50 hover:from-rose-100 hover:to-red-100 transition-all duration-300 border border-rose-200/60 hover:shadow-md"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-rose-500 to-red-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-md shadow-rose-500/20 text-white">
                <Mail className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-slate-900">Email Address</h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">paldhaduk7@gmail.com</p>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 mt-3 group-hover:translate-x-0.5 transition-transform">
                Send an Email <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/paldhaduk7-png"
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col items-center p-6 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200/60 hover:from-slate-200 hover:to-slate-300/60 transition-all duration-300 border border-slate-300/60 hover:shadow-md"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-slate-800 to-slate-950 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-md shadow-slate-950/20 text-white">
                <FaGithub className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-slate-900">GitHub Profile</h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">github.com/paldhaduk7-png</p>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-800 mt-3 group-hover:translate-x-0.5 transition-transform">
                View Repositories <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </a>

            {/* LinkedIn */}
            <a
              href="mailto:paldhaduk7@gmail.com"
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col items-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50/50 hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 border border-blue-200/60 hover:shadow-md"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-md shadow-blue-600/20 text-white">
                <FaLinkedin className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-slate-900">LinkedIn Network</h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">Dhaduk PAL</p>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 mt-3 group-hover:translate-x-0.5 transition-transform">
                Connect Professionally <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </a>
          </div>
        </div>

        {/* Footer Signature */}
        <div className="text-center text-xs text-slate-500 font-medium">
          <p className="flex items-center justify-center gap-1.5">
            Designed & Engineered with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> by 
            <strong className="text-slate-700">Dhaduk Pal Girishbhai</strong>
          </p>
          <p className="mt-1 text-slate-400">© 2026 JobPortal • All Rights Reserved</p>
        </div>

      </div>
    </div>
  );
};

export default About;
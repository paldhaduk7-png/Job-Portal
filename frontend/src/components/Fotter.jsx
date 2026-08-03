import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">

              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25">

                {/* Briefcase */}
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <rect x="3" y="7" width="18" height="13" rx="2" />
                  <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  <path d="M3 12h18" />
                </svg>

              </div>

              <span className="text-2xl font-extrabold tracking-tight">
                Job<span className="text-purple-400">Portal</span>
              </span>

            </Link>

            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Find your dream job and build your career with the best
              opportunities available.
            </p>

            <div className="flex items-center gap-2 text-sm text-slate-400">

              {/* Heart */}
              <svg
                className="w-4 h-4 text-red-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 21s-7-4.35-9.33-8.2C.7 9.55 2.16 5.5 5.9 4.8 8 4.4 10.1 5.4 12 7.4c1.9-2 4-3 6.1-2.6 3.74.7 5.2 4.75 3.23 8C19 16.65 12 21 12 21z" />
              </svg>

              <span>Empowering careers since 2026</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h3>

            <ul className="space-y-2.5">
              <li>
                <Link
                  to="/"
                  className="text-slate-400 hover:text-purple-400 transition-colors text-sm"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/jobs"
                  className="text-slate-400 hover:text-purple-400 transition-colors text-sm"
                >
                  Jobs
                </Link>
              </li>

              <li>
                <Link
                  to="/browse"
                  className="text-slate-400 hover:text-purple-400 transition-colors text-sm"
                >
                  Browse
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  className="text-slate-400 hover:text-purple-400 transition-colors text-sm"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Job Seekers */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              For Job Seekers
            </h3>

            <ul className="space-y-2.5">
              <li>
                <Link
                  to="/jobs"
                  className="text-slate-400 hover:text-purple-400 transition-colors text-sm"
                >
                  Browse Jobs
                </Link>
              </li>

              <li>
                <Link
                  to="/profile"
                  className="text-slate-400 hover:text-purple-400 transition-colors text-sm"
                >
                  My Profile
                </Link>
              </li>

              <li>
                <Link
                  to="/applied-jobs"
                  className="text-slate-400 hover:text-purple-400 transition-colors text-sm"
                >
                  My Applications
                </Link>
              </li>

              <li>
                <Link
                  to="/saved-jobs"
                  className="text-slate-400 hover:text-purple-400 transition-colors text-sm"
                >
                  Saved Jobs
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Contact Us
            </h3>

            <ul className="space-y-3">

              {/* Email */}
              <li className="flex items-start gap-3 text-slate-400 text-sm">

                <svg
                  className="w-4 h-4 text-purple-400 mt-0.5 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>

                <span>paldhaduk7@gmail.com</span>
              </li>

              {/* Phone */}
              <li className="flex items-start gap-3 text-slate-400 text-sm">

                <svg
                  className="w-4 h-4 text-purple-400 mt-0.5 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92z" />
                </svg>

                <span>+91 9327510551</span>
              </li>

              {/* Location */}
              <li className="flex items-start gap-3 text-slate-400 text-sm">

                <svg
                  className="w-4 h-4 text-purple-400 mt-0.5 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0z" />
                  <circle cx="12" cy="10" r="2" />
                </svg>

                <span>Ahmedabad</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-700/50 mt-10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">

          <p className="text-sm text-slate-400">
            © {currentYear} JobPortal. All rights reserved.
          </p>

          <div className="flex items-center gap-4">

        

    
            {/* GitHub */}
       <a
  href="https://github.com/paldhaduk7-png"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="GitHub"
  className="w-9 h-9 bg-slate-700/50 rounded-lg flex items-center justify-center text-slate-400 hover:bg-black hover:text-white transition-all duration-300 hover:scale-110"
>
  <svg
    className="w-4 h-4"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2.02c-3.2.7-3.88-1.38-3.88-1.38-.52-1.32-1.27-1.67-1.27-1.67-1.04-.7.08-.69.08-.69 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.25 3.33.95.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.27-5.24-5.68 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18a10.9 10.9 0 0 1 5.8 0c2.21-1.49 3.18-1.18 3.18-1.18.62 1.58.23 2.75.11 3.04.73.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.39-5.25 5.68.41.35.78 1.04.78 2.1v3.12c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"/>
  </svg>
</a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-9 h-9 bg-slate-700/50 rounded-lg flex items-center justify-center text-slate-400 hover:bg-[#0a66c2] hover:text-white transition-all duration-300 hover:scale-110"
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3V9zm6.5 0h3.8v1.64h.05c.53-1 1.82-2.05 3.75-2.05 4 0 4.75 2.64 4.75 6.07V21h-4v-5.62c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97V21h-4V9z" />
              </svg>
            </a>

          

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
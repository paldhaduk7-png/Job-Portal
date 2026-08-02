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
                  About Us
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

            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-9 h-9 bg-slate-700/50 rounded-lg flex items-center justify-center text-slate-400 hover:bg-[#1877f2] hover:text-white transition-all duration-300 hover:scale-110"
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M22 12a10 10 0 1 0-11.5 9.9v-7H8.2V12h2.3V9.8c0-2.3 1.4-3.6 3.4-3.6 1 0 2 .2 2 .2v2.2h-1.1c-1.1 0-1.4.7-1.4 1.4v2h2.5l-.4 2.9h-2.1v7A10 10 0 0 0 22 12z" />
              </svg>
            </a>

            {/* X */}
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              className="w-9 h-9 bg-slate-700/50 rounded-lg flex items-center justify-center text-slate-400 hover:bg-black hover:text-white transition-all duration-300 hover:scale-110"
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
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

            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 bg-slate-700/50 rounded-lg flex items-center justify-center text-slate-400 hover:bg-[#e4405f] hover:text-white transition-all duration-300 hover:scale-110"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle
                  cx="17.5"
                  cy="6.5"
                  r="1"
                  fill="currentColor"
                  stroke="none"
                />
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="w-9 h-9 bg-slate-700/50 rounded-lg flex items-center justify-center text-slate-400 hover:bg-[#ff0000] hover:text-white transition-all duration-300 hover:scale-110"
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
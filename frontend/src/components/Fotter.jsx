import React from "react";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 py-8 mt-10 bg-white">
      
      {/* Center Text */}
      <div className="text-center space-y-2">
        <h2 className="text-xl font-bold text-[#6A38C2]">
          Job Hunt
        </h2>
        <p className="text-sm text-gray-500">
          © 2024 Your Company. All rights reserved.
        </p>
      </div>

      {/* Social Icons */}
      <div className="flex justify-center gap-6 mt-6">

        {/* Facebook */}
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-[#6A38C2] transform hover:scale-110 transition duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2.3v-2.9h2.3V9.8c0-2.3 1.4-3.6 3.4-3.6 1 0 2 .2 2 .2v2.2h-1.1c-1.1 0-1.4.7-1.4 1.4v1.7h2.5l-.4 2.9h-2.1v7A10 10 0 0 0 22 12z" />
          </svg>
        </a>

        {/* Twitter */}
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-[#6A38C2] transform hover:scale-110 transition duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M22 5.8c-.8.4-1.6.6-2.5.8a4.3 4.3 0 0 0 1.9-2.4 8.6 8.6 0 0 1-2.7 1 4.3 4.3 0 0 0-7.3 3v1A12.2 12.2 0 0 1 3 4.7a4.3 4.3 0 0 0 1.3 5.7c-.7 0-1.3-.2-1.9-.5v.1a4.3 4.3 0 0 0 3.4 4.2c-.6.2-1.3.2-2 .1a4.3 4.3 0 0 0 4 3 8.7 8.7 0 0 1-5.4 1.9A9.3 9.3 0 0 1 2 19a12.2 12.2 0 0 0 6.6 1.9c7.9 0 12.2-6.6 12.2-12.2v-.6c.8-.6 1.5-1.3 2.1-2.1z" />
          </svg>
        </a>

        {/* LinkedIn */}
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-[#6A38C2] transform hover:scale-110 transition duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M20.4 20.4h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.3V9h3.5v1.6h.1c.5-.9 1.7-1.8 3.4-1.8 3.6 0 4.3 2.4 4.3 5.4v6.2zM5.3 7.4a2.1 2.1 0 1 1 0-4.3 2.1 2.1 0 0 1 0 4.3zM7.1 20.4H3.5V9h3.6v11.4z" />
          </svg>
        </a>

      </div>
    </footer>
  );
};

export default Footer;
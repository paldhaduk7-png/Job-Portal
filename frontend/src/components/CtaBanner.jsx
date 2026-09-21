import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, CheckCircle, Shield, Briefcase, Zap } from "lucide-react";

const CtaBanner = () => {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      <div className="relative rounded-3xl bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-950 p-8 sm:p-12 md:p-16 shadow-2xl overflow-hidden border border-indigo-700/40">
        {/* Background glow effects */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl pointer-events-none" />
        
        {/* Dot pattern overlay */}
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />

        <div className="relative z-10 text-center max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-indigo-200 text-xs sm:text-sm font-semibold mb-6">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Start Your Journey Today
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Ready to Take the Next Step in Your Career?
          </h2>

          <p className="mt-4 text-base sm:text-lg text-indigo-100/85 leading-relaxed max-w-2xl mx-auto">
            Create your free profile today. Discover verified opportunities, connect directly with hiring managers, and land your next breakthrough role.
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/signup"
              className="w-full sm:w-auto px-8 py-4 bg-white text-indigo-950 font-bold rounded-xl shadow-lg hover:shadow-indigo-500/25 hover:bg-slate-50 transition-all duration-300 flex items-center justify-center gap-2 text-base hover:scale-105"
            >
              Get Started for Free
              <ArrowRight className="w-5 h-5 text-indigo-600" />
            </Link>

            <Link
              to="/login"
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 backdrop-blur-md transition-all duration-300 flex items-center justify-center gap-2 text-base"
            >
              Log In to Account
            </Link>
          </div>

          {/* Trust bullet points */}
          <div className="mt-10 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-indigo-200/80">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>100% Free for Job Seekers</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-cyan-400" />
              <span>Verified Employers Only</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Fast 1-Minute Registration</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaBanner;

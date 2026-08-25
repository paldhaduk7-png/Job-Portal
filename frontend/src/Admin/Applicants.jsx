import React, { useEffect } from 'react'
import ApplicantsTabel from './ApplicantsTabel'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAllApplicants } from '@/redux/application'
import { ArrowLeft, Users, Sparkles } from 'lucide-react'

const Applicants = () => {
  const navigate = useNavigate();
  const parmas = useParams();
  const dispatch = useDispatch();
  const { allApplicants } = useSelector(store => store.application);

  useEffect(() => {
    const fetchAllAplicants = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_END_POINT}/${parmas.id}/applicants`, { withCredentials: true });
        if (res.data.success) {
          dispatch(setAllApplicants(res.data.job));
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchAllAplicants();
  }, [])

  const count = allApplicants?.applications?.length || 0;

  return (
    <div className="relative min-h-screen bg-[#fafbff] py-8 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Dynamic Ambient Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top-Left Indigo Glow Orb */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-br from-indigo-400/25 to-purple-400/20 rounded-full blur-3xl" />
        
        {/* Top-Right Violet Glow Orb */}
        <div className="absolute top-1/4 -right-20 w-[30rem] h-[30rem] bg-gradient-to-bl from-purple-400/20 via-pink-300/15 to-transparent rounded-full blur-3xl" />
        
        {/* Center-Bottom Soft Cyan/Blue Orb */}
        <div className="absolute -bottom-28 left-1/3 w-[36rem] h-[36rem] bg-gradient-to-tr from-blue-300/20 to-indigo-200/20 rounded-full blur-3xl" />

        {/* Subtle Modern Dot-Matrix Grid Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.35]" 
          style={{
            backgroundImage: `radial-gradient(circle, #6366f1 1px, transparent 1px)`,
            backgroundSize: '32px 32px'
          }}
        />
        
        {/* Radial vignette mask to fade grid smoothly */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#fafbff]/80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={() => navigate("/admin/jobs")}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 hover:bg-white backdrop-blur-md border border-slate-200/70 text-slate-600 hover:text-indigo-600 shadow-sm hover:shadow-md transition-all duration-200 group text-sm font-medium"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-200" />
            <span>Back to Jobs</span>
          </button>
        </div>

        {/* Page Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-500 rounded-2xl blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-white/90 backdrop-blur-xl p-3.5 rounded-2xl shadow-lg border border-white/60">
                <Users className="h-7 w-7 text-purple-600" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-800 bg-clip-text text-transparent">
                  Applicants
                </h1>
                <span className="text-xs font-semibold text-purple-700 bg-purple-50 border border-purple-100/80 px-2.5 py-0.5 rounded-full shadow-sm">
                  {count} {count === 1 ? 'Candidate' : 'Candidates'}
                </span>
              </div>
              <p className="text-sm text-slate-500 flex items-center gap-2 mt-1">
                <span className="inline-block w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                Review candidate applications and update hiring statuses
              </p>
            </div>
          </div>
        </div>

        {/* Table Glass Container */}
        <div className="bg-white/85 backdrop-blur-xl rounded-2xl border border-white/80 overflow-hidden shadow-xl shadow-slate-200/40">
          <div className="relative">
            <div className="h-1 bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500" />
            <ApplicantsTabel />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Applicants

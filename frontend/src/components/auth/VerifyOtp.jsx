import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FORGOTPASSWORD_API_END_POINT } from "@/utils/constant.js";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setResetOtp } from "@/redux/authSlice";
import { Loader2, ShieldCheck, ArrowLeft, RefreshCw } from "lucide-react";

const VerifyOtp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { resetEmail, loading } = useSelector((store) => store.auth);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [resending, setResending] = useState(false);

  useEffect(() => {
    if (resetEmail) {
      setEmail(resetEmail);
    }
  }, [resetEmail]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const targetEmail = email || resetEmail;

    if (!targetEmail) {
      toast.error("Email address missing. Please request OTP again.");
      navigate("/forgot-password");
      return;
    }
    if (!otp || otp.trim().length < 4) {
      toast.error("Please enter a valid OTP code");
      return;
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(
        `${FORGOTPASSWORD_API_END_POINT}/verify-otp`,
        { email: targetEmail, otp: otp.trim() },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message || "OTP Verified Successfully!");
        dispatch(setResetOtp(otp.trim()));
        navigate("/reset-password");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Invalid or Expired OTP");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleResendOtp = async () => {
    const targetEmail = email || resetEmail;
    if (!targetEmail) {
      toast.error("Please enter email to resend OTP");
      return;
    }
    try {
      setResending(true);
      const res = await axios.post(
        `${FORGOTPASSWORD_API_END_POINT}/forgot-password`,
        { email: targetEmail },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message || "New OTP sent to your email!");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to resend OTP");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background Animated Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Verify OTP Code</h1>
            <p className="text-sm text-gray-500">
              We sent a verification code to{" "}
              <span className="font-semibold text-gray-800">{email || resetEmail || "your email"}</span>.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={submitHandler} className="space-y-5">
            {!resetEmail && (
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Email Address</Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="h-12 rounded-xl border-gray-200"
                  required
                />
              </div>
            )}

            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-700">Enter 6-Digit OTP Code</Label>
              <Input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="123456"
                maxLength={6}
                className="h-14 text-center text-2xl tracking-[0.5em] font-bold rounded-xl border-gray-200 focus:border-purple-500 focus:ring-purple-500 transition-all"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-purple-200 transition-all transform hover:-translate-y-0.5"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Verifying Code...</span>
                </div>
              ) : (
                "Verify & Continue"
              )}
            </Button>
          </form>

          {/* Resend Link */}
          <div className="flex items-center justify-between pt-2 text-sm">
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={resending}
              className="inline-flex items-center gap-1.5 font-medium text-purple-600 hover:text-purple-800 disabled:opacity-50 transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${resending ? "animate-spin" : ""}`} />
              <span>Resend OTP</span>
            </button>

            <Link
              to="/forgot-password"
              className="inline-flex items-center gap-1 font-medium text-gray-500 hover:text-gray-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Change Email</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;

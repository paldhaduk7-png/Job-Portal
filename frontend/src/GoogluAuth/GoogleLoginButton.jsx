import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { setUser, setLoading } from "@/redux/authSlice";
import { USER_API_END_POINT } from "@/utils/constant";

const GoogleLoginButton = ({ role }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      if (!credentialResponse?.credential) {
        toast.error("Google authentication failed. No credential received.");
        return;
      }

      dispatch(setLoading(true));

      const res = await axios.post(
        `${USER_API_END_POINT}/google-login`,
        {
          credential: credentialResponse.credential,
          role: role || "student",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message || "Logged in with Google successfully!");
        navigate("/");
      } else {
        toast.error(res.data.message || "Google login failed");
      }
    } catch (error) {
      console.error("Google Login FrontEnd Error:", error);
      toast.error(
        error.response?.data?.message || "Google authentication failed. Please try again."
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleGoogleError = () => {
    toast.error("Google Sign-In was unsuccessful or canceled.");
  };

  return (
    <div className="w-full my-5">
      <div className="relative flex items-center justify-center mb-5">
        <div className="absolute w-full border-t border-gray-200"></div>
        <span className="relative bg-white px-4 text-sm text-gray-500">
          OR
        </span>
      </div>

      <div className="flex justify-center w-full">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
          useOneTap={false}
          theme="outline"
          shape="rectangular"
          width="100%"
        />
      </div>
    </div>
  );
};

export default GoogleLoginButton;
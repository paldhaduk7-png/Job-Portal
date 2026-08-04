import { useGoogleLogin } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";

const GoogleLoginButton = () => {

  return (
    <div className="w-full my-5">
      <div className="relative flex items-center justify-center mb-5">
        <div className="absolute w-full border-t border-gray-200"></div>
        <span className="relative bg-white px-4 text-sm text-gray-500">
          OR
        </span>
      </div>

     <GoogleLogin
  onSuccess={(credentialResponse) => {
    console.log("Google Login Success");
    console.log(credentialResponse);
  }}
  onError={() => {
    console.log("Google Login Failed");
  }}
/>
    </div>
  );
};

export default GoogleLoginButton;
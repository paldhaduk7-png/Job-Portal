import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "@/components/ui/radio-group";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant.js";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";



const Login = () => {

  const navigate=useNavigate();
  const dispatch=useDispatch();
  const {loading}=useSelector(store=>store.auth);

  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
      e.preventDefault();

    if (!input.role) {
  alert("Please select a role");
  return;
}

try {
  dispatch(setLoading(true));
  const  res=await axios.post(`${USER_API_END_POINT}/login`,input,{
    headers:{
      // “I am sending files + data together”
      "Content-Type" :"application/json"
    },
    // “Send cookies / auth data with request”
    withCredentials:true,
  });

  if(res.data.success){
    dispatch(setUser(res.data.user));
    navigate("/");//goes to home page
    toast.success(res.data.message);
  }

} catch (error) {
   console.log(error.response?.data);
  
    toast.error(
      error.response?.data?.message || "Something went wrong"
    );
} finally{
  dispatch(setLoading(false));
}
   
      setInput({
  email: "",
  password: "",
  role: "",
});
  };

  return (
    <div className="flex items-center  justify-center max-w-7xl mx-auto">
      <form
        onSubmit={submitHandler}
        className="w-1/2 bg-gray-900  text-white border border-gray-200 rounded-md p-4 my-10"
      >
        <h1 className="font-bold text-xl mb-5">Login</h1>

        <div className="my-5">
          <Label>Email</Label>
          <Input
            type="email"
            placeholder="enter your email"
            value={input.email}
            name="email"
            onChange={changeEventHandler}
             required
            className="border border-green-500 bg-purple-500/20 rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />
        </div>

        <div className="my-5">
          <Label>Password</Label>
          <Input
            type="password"
            placeholder="Password"
            value={input.password}
            name="password"
            onChange={changeEventHandler}
             required
            className="border border-green-500 bg-purple-500/20 rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center justify-between">
          <RadioGroup className="flex items-center gap-4 my-5 ">
            <div className="flex items-center gap-3">
              <Input
                type="radio"
                name="role"
                value="student"
                  checked={input.role === 'student'}
                onChange={changeEventHandler}
                className="cursor-pointer"
              />
              <Label htmlFor="r1">Student</Label>
            </div>

            <div className="flex items-center gap-3">
              <Input
                type="radio"
                name="role"
                value="recruiter"
                  checked={input.role === 'recruiter'}
                onChange={changeEventHandler}
                className="cursor-pointer"
              />
              <Label htmlFor="r2">Recruiter</Label>
            </div>
          </RadioGroup>
        </div>

{
  loading? <Button className="w-full mt-4" > <Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please Wait</Button>:
     <Button
          type="submit"
          className="w-full my-4 bg-purple-600 hover:bg-purple-700 transition"
        >
          Login
        </Button>
}

        <span className="text-sm">
          Don't have an account?
          <Link to="/signup" className="text-blue-600">
            signup
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Login;

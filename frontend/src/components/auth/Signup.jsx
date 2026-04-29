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
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Signup = () => {

  const navigate=useNavigate();
  const dispatch=useDispatch();
  const {loading}=useSelector(store=>store.auth);

  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!input.role) {
  alert("Please select a role");
  return;
}

const formData=new FormData();
formData.append("fullname", input.fullname);
formData.append("email", input.email);
formData.append("phoneNumber", input.phoneNumber);
formData.append("password", input.password);
formData.append("role", input.role);

if(input.file){
  formData.append("file", input.file);
}  

try {
  dispatch(setLoading(true));
  const  res=await axios.post(`${USER_API_END_POINT}/register`,formData,{
            
    headers:{
      // “I am sending files + data together”
      "Content-Type" :"multipart/form-data"
    },
    // “Send cookies / auth data with request”
    withCredentials:true,
  });

  if(res.data.success){
    toast.success(res.data.message);
    navigate("/login");
  }
  

} catch (error) {
    console.log(error.response?.data);

  toast.error(
    error.response?.data?.message || "Something went wrong"
  );

}finally{
  dispatch(setLoading(false));
}
   

 setInput({
  fullname: "",
  email: "",
  phoneNumber: "",
  password: "",
  role: "", 
  file: "",
});


  };

  return (
    <div className="flex items-center  justify-center max-w-7xl mx-auto">
      <form
        onSubmit={submitHandler}
        className="w-1/2 bg-gray-900  text-white border border-gray-200 rounded-md p-4 my-10"
      >
        <h1 className="font-bold text-xl mb-5">Sign Up</h1>

        <div className="my-2  ">
          <Label>Full Name</Label>
          <Input
            type="text"
            placeholder="enter your fullnmae"
            value={input.fullname}
            name="fullname"
            onChange={changeEventHandler}
           required
            className="border border-green-500  bg-purple-500/20 rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />
        </div>

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
          <Label>Phone Number</Label>
          <Input
            type="text"
            placeholder="phone no."
            value={input.phoneNumber}
            name="phoneNumber"
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
          <RadioGroup 
          className="flex items-center gap-4 my-5 ">
            <div className="flex items-center gap-3">
              <Input
                type="radio"
                name="role"
                value="student"
                checked={input.role === "student"}
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
                checked={input.role === "recruiter"}
                onChange={changeEventHandler}
                className="cursor-pointer"
              />
              <Label htmlFor="r2">Recurviter</Label>
            </div>
          </RadioGroup>

          <div className="flex items-center gap-2">
            <Label>Profile</Label>
            <Input 
            accept="image/*"
             type="file" 
             onChange={changeFileHandler}
             className="cursor-pointer" />
          </div>
        </div>

       {
         loading? <Button className="w-full mt-4" > <Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please Wit</Button>:
            <Button
                 type="submit"
                 className="w-full my-4 bg-purple-600 hover:bg-purple-700 transition"
               >
                 Signup
               </Button>
       }
        <span className="text-sm">
          Already have an account?
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Signup;

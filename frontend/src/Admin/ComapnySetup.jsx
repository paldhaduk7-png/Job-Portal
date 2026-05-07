import React, { useState , useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { ArrowLeft } from 'lucide-react'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import {  useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { Loader2 } from 'lucide-react';
import useGetComapnyById from '@/hooks/useGetComapnyById'

const ComapnySetup = () => {

  const parmas=useParams();
  useGetComapnyById(parmas.id);
  const [input, setInput]=useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file:null,
  });
  const {singleCompany}=useSelector(store=>store.company);
  const dispatch=useDispatch();
  const navigate=useNavigate();

const [loading , setLoading]=useState(false);

const changeEvaentHandler= (e)=>{
  setInput({...input , [e.target.name]:e.target.value})
}

const changeFiletHandler = (e) => {
  const file = e.target.files && e.target.files[0];
  // console.log(file);
  setInput((prev) => ({
    ...prev,
    file: file,
  }));
};

const changeSubmitHandler =async (e) => {
  e.preventDefault();
    console.log("Button clicked!");

    const from=new FormData();
    
    from.append("name" , input.name);
    from.append("description" , input.description);
    from.append("website" , input.website);
    from.append("location" , input.location);
    
    if (input.file) {
  from.append("file", input.file);
}
    
    try {
      setLoading(true);
      const res= await axios.put(`${COMPANY_API_END_POINT}/update/${parmas.id}`, from, {
 headers: {
   "Content-Type": "multipart/form-data",
},
     withCredentials:true
     })
      
    if(res.data.success){
      navigate("/admin/companies");
 toast.success(res?.data?.message);
    }
  
    } catch (error) {
       toast.error(error?.response?.data?.message);
      console.log(error);
        }finally{
          setLoading(false);
        }
      }

//data leva mate jyare user comapny  upated kare tyre
useEffect(() => {
 setInput({
    name: singleCompany?.name ||"",
    description:  singleCompany?.description||"",
    website: singleCompany?.website || "",
    location: singleCompany?.location || "",
    file:  singleCompany?.file   || null,
 })
}, [singleCompany]);


  return (
    <div className="w-full min-h-screen flex justify-center items-start pt-16 pb-10 bg-gray-50">
      
      <form
        onSubmit={changeSubmitHandler}
        className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-md border"
      >

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold tracking-tight">
            Company Setup
          </h1>

          <Button
            type="button"
            variant="outline"
            onClick={()=> navigate("/admin/companies")}
            className="flex items-center gap-2 text-gray-600 hover:text-black transition"
          >
            <ArrowLeft size={18}/>
            <span>Back</span>
          </Button>
        </div>

        {/* Company Name */}
        <div className="mb-5">
          <Label className="mb-1 block text-sm font-medium text-gray-700">
            Company Name
          </Label>
          <Input
            type="text"
            placeholder="Enter company name"
            value={input.name}
            onChange={changeEvaentHandler}
            name="name"
          />
        </div>

        {/* Description */}
        <div className="mb-5">
          <Label className="mb-1 block text-sm font-medium text-gray-700">
            Company Description
          </Label>
          <Input
            type="text"
            placeholder="Enter company description"
            value={input.description}
            onChange={changeEvaentHandler}
            name="description"
          />
        </div>

        {/* Website */}
        <div className="mb-5">
          <Label className="mb-1 block text-sm font-medium text-gray-700">
            Website
          </Label>
          <Input
            type="text"
            placeholder="Enter website URL"
            value={input.website}
            onChange={changeEvaentHandler}
            name="website"
          />
        </div>

        {/* Location */}
        <div className="mb-5">
          <Label className="mb-1 block text-sm font-medium text-gray-700">
            Location
          </Label>
          <Input
            type="text"
            placeholder="Enter company location"
            value={input.location}
            onChange={changeEvaentHandler}
            name="location"
          />
        </div>

        {/* Logo */}
        <div className="mb-6">
          <Label className="mb-1 block text-sm font-medium text-gray-700">
            Company Logo
          </Label>
          <Input
            type="file"
            onChange={changeFiletHandler}
            name="file"
            className="cursor-pointer"
          />
        </div>

        {/* Submit */}
       {
  loading? <Button className="w-full mt-4" > <Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please Wait</Button>:
     <Button
          type="submit"
          className="w-full my-4 cursor-pointer transition"
        >
          Upadte
        </Button>
}

      </form>
    </div>
  )
}

export default ComapnySetup
import React from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="text-center">

        <div className="flex flex-col gap-4 my-10">
  <span className="px-4 py-4 rounded-full bg-gray-100 font-medium text-[#F83002]">
        No. 1 Job Hunt Website
      </span>
      <h1 className="text-5xl font-bold">
        Search , Aplly & <br /> Get Your
        <span className="text-[#6A38c2]">Dream Jobs</span>
      </h1>
      <p className="font-medium text-sm">Browse verified job listings, apply instantly, and get hired by top companies. Your journey to a successful career starts here.</p>
    
    <div className="flex w-[40%] shadow-lg border border-gray-200  pl-3 rounded-full items-center gap-4 mx-auto">
<input
type="text"
placeholder="find your drem jobs"
className="outline-none border-none w-full"
 />
 <Button className="rounded-r-full bg-[#6A38C2]"><Search className="h-5 w-5 " /></Button>
    </div>


        </div>
     
    </div>
  );
};

export default HeroSection;

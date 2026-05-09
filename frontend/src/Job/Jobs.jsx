import React, { useEffect, useState } from "react";
import FilterCard from "./FilterCard";
import Job from "./job";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import useGetAllJobs from '@/hooks/useGetAllJobs';
// const jobArray = [1, 2, 3, 4, 5, 6, 7, 8];

const Jobs = () => {
const {allJobs, searchQuery}=useSelector(store=>store.job);
const [filterJob, setFiltterJob]=useState(allJobs);

  useGetAllJobs();

//useefefct atle vapriye chieke jyure koy pan tik badlay tyre filter method call thay
useEffect(()=>{
 if(searchQuery){
 const filterJobs= allJobs.filter((job)=>{
   // text filter
      const matchesText =
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase());

      // salary filter
       if(searchQuery === "0-5LPA"){
        return job.salary >= 0 && job.salary <= 5;
      }

      if(searchQuery === "5-10LPA"){
        return job.salary > 5 && job.salary <= 10;
      }

      if(searchQuery === "10-20LPA"){
        return job.salary > 10 && job.salary <= 20;
      }

      return matchesText;
    });
 setFiltterJob(filterJobs);
 }else{
  //means serchQuery is ematy
  setFiltterJob(allJobs);
 }
},[allJobs, searchQuery]);


  return (
    <div className="max-w-7xl mx-auto mt-5">
      {/* Filter page (from right side)*/}
      {/*job card*/}

      <div className="flex gap-5 ">
        <div className="w-20%">
          <FilterCard />
        </div>

        {filterJob.length <= 0 ? (
          <span className="text-lg font-bold">Job not found</span>
        ) : (
          <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
            <div className="grid grid-cols-3 gap-4">
              {
             filterJob.length>0 ?
        filterJob.map((job) => (
                <motion.div key={job?._id} initial={{opacity: 0, x:100 }}
                 animate={{opacity: 1, x:0}}
                 exit={{opacity:0, x: -100}}
                 transition={{duration:0.3}}>
                  <Job  job={job} />
                </motion.div>
              )):
              <span>No Job Availabel</span>
              }
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;

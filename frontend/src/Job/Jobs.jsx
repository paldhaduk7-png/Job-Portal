import React from "react";
import FilterCard from "./FilterCard";
import Job from "./job";
import { useDispatch, useSelector } from "react-redux";
import { setAllJobs } from "@/redux/jobSlice";

const jobArray = [1, 2, 3, 4, 5, 6, 7, 8];

const Jobs = () => {
const dispatch=useDispatch();
const {allJobs}=useSelector(store=>store.job);

  return (
    <div className="max-w-7xl mx-auto mt-5">
      {/* Filter page (from right side)*/}
      {/*job card*/}

      <div className="flex gap-5 ">
        <div className="w-20%">
          <FilterCard />
        </div>

        {jobArray.length <= 0 ? (
          <span className="text-lg font-bold">Job not found</span>
        ) : (
          <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
            <div className="grid grid-cols-3 gap-4">
              {
              allJobs.length>0 ?
              allJobs.map((job) => (
                <div>
                  <Job key={job?._id} job={job} />
                </div>
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

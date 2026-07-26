import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";

const RecruiterPostedJobs = () => {
  const { allAdminJobs } = useSelector((store) => store.job);

  return (
    <div className="w-full mt-2 bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
      <div className="w-full overflow-x-auto">
        <Table className="w-full">

          <TableHeader>
            <TableRow className="bg-gray-100 h-14">
              <TableHead>Date</TableHead>
              <TableHead>Job Role</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Job Type</TableHead>
              <TableHead>Applicants</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {allAdminJobs?.length > 0 ? (
              allAdminJobs.map((job) => (
                <TableRow
                  key={job._id}
                  className="h-16 hover:bg-gray-50"
                >

                  <TableCell className="py-5 text-base">
                    {job?.createdAt?.split("T")[0]}
                  </TableCell>

                  <TableCell className="py-5 text-base font-medium">
                    {job?.title}
                  </TableCell>

                  <TableCell className="py-5 text-base">
                    {job?.location}
                  </TableCell>

                  <TableCell className="py-5 text-base">
                    {job?.jobType}
                  </TableCell>

                  <TableCell className="py-5 text-base">
                    {job?.applications?.length || 0}
                  </TableCell>

                  <TableCell className="text-right py-5">
                    <Badge className="bg-green-500 text-white px-4 py-1 rounded-full">
                      Active
                    </Badge>
                  </TableCell>

                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-24 text-center text-gray-500"
                >
                  No jobs posted yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>

          <TableCaption className="mt-4 text-gray-500">
            A list of jobs you have posted
          </TableCaption>

        </Table>
      </div>
    </div>
  );
};

export default RecruiterPostedJobs;
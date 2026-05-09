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
import { useSelector } from "react-redux";


const AppliedJobTable = () => {
  // const jobs = [
  //   {
  //     date: "2024-07-10",
  //     role: "Frontend Developer",
  //     company: "Google",
  //     status: "Selected",
  //   },
  //   {
  //     date: "2024-07-12",
  //     role: "Backend Developer",
  //     company: "Amazon",
  //     status: "Pending",
  //   },
  //   {
  //     date: "2024-07-15",
  //     role: "Full Stack Dev",
  //     company: "Microsoft",
  //     status: "Rejected",
  //   },
  // ];

  const {allAppliedJob}=useSelector(store=>store.job);

  const getColor = (status) => {
    if (status === "accepted") return "bg-green-500";
    if (status === "rejected") return "bg-red-500";
    return "bg-yellow-500";
  };

  return (
    <div className="w-full mt-2 bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
      <div className="w-full overflow-x-auto">
        <Table className="w-full">

          <TableHeader>
            <TableRow className="bg-gray-100 h-14">
              <TableHead>Date</TableHead>
              <TableHead>Job Role</TableHead>
              <TableHead>Company</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            { allAppliedJob.length>=0 ?
            allAppliedJob.map((appliedJob) => (
              <TableRow key={appliedJob._id} className="h-16 hover:bg-gray-50">

                <TableCell className="py-5 text-base">
                  {appliedJob?.createdAt?.split("T")[0]}
                </TableCell>

                <TableCell className="py-5 text-base font-medium">
                  {appliedJob?.job?.title}
                </TableCell>

                <TableCell className="py-5 text-base">
                  {appliedJob?.job?.company?.name}
                </TableCell>

                <TableCell className="text-right py-5">
                  <Badge
                    className={`text-white px-4 py-1 rounded-full ${getColor(
                      appliedJob?.status
                    )}`}
                  >
                   {appliedJob?.status?.toUpperCase()}
                  </Badge>
                </TableCell>

              </TableRow>
            )): <span className="font-medium text-md">No Job Appplied yet.</span>
            }
          </TableBody>

          <TableCaption className="mt-4 text-gray-500">
            A list of your applied jobs
          </TableCaption>

        </Table>
      </div>
    </div>
  );
};

export default AppliedJobTable;
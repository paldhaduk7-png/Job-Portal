import React, { useEffect, useState } from 'react'
import {
Table,
TableBody,
TableCaption,
TableCell,
TableHead,
TableHeader,
TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminJobsTabel = () => {
const navigate=useNavigate();

  const { allAdminJobs , searchJobsByText} = useSelector(store => store.job)
const [filterJobs, setFilterJobs]=useState(allAdminJobs);
  

//for filtter company by name
useEffect( ()=>{
  const filterJob= allAdminJobs?.length>=0 && allAdminJobs.filter((jobs)=>{

    if(!searchJobsByText) {
      return true;
    }

    return jobs?.title?.toLowerCase().includes(searchJobsByText.toLowerCase()) ||
    jobs?.company?.name?.toLowerCase().includes(searchJobsByText.toLowerCase());
  });
  setFilterJobs(filterJob);
},[ allAdminJobs , searchJobsByText])

  return (
    <div>
      <Table>
        <TableCaption>List of your resent posted jobs</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>company name</TableHead>
            <TableHead>role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filterJobs?.length > 0 ? (
            filterJobs?.map((job) => (
              <TableRow key={job._id}>

                <TableCell>
                  <Avatar>
                    <AvatarImage src={job?.company?.logo} alt="logo" />
                  </Avatar>
                </TableCell>

                <TableCell>{job?.company?.name}</TableCell>

                <TableCell>{job?.title}</TableCell>

                <TableCell>{job?.createdAt.split("T")[0]}</TableCell>

                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      {/* this sybol for ... */}
                      <MoreHorizontal />
                    </PopoverTrigger>

                    <PopoverContent className="w-32">
                      <div
                        onClick={() => navigate(`/admin/job/${job._id}`)}
                        className="flex items-center gap-2 w-fit cursor-pointer"
                      >
                        <Edit2 />
                        <span>Edit</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4}>
                You haven't registered any company yet.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}


export default AdminJobsTabel

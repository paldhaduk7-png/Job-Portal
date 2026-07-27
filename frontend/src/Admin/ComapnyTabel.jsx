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
import { Edit2,MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CompanyDelete from './hadling CURD/CompanyDelete';

const ComapnyTabel = () => {
const navigate=useNavigate();


const { allCompany , searchComapnyByText } = useSelector(store => store.company);
const [filterCompany, setFilterCompany]=useState(allCompany);
  

//for filtter company by name
useEffect( ()=>{
  const filterComapny= allCompany.length>=0 && allCompany.filter((company)=>{

    if(!searchComapnyByText) {
      return true;
    }

    return company?.name?.toLowerCase().includes(searchComapnyByText.toLowerCase());
  });
  setFilterCompany(filterComapny);
},[allCompany,searchComapnyByText])

  return (
    <div>
      <Table>

        <TableCaption>
          List of your registered companies
        </TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className='text-right'>
              Action
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>

          {
           filterCompany.length > 0 ? (

              filterCompany?.map((company) => (

                <TableRow key={company._id}>

                  <TableCell>
                    <Avatar>
                      <AvatarImage
                        src={company?.logo}
                        alt='logo'
                      />
                    </Avatar>
                  </TableCell>

                  <TableCell>
                    {company?.name}
                  </TableCell>

                  <TableCell>
                   {company.createdAt.split("T")[0]}
                  </TableCell>

                  <TableCell className='text-right cursor-pointer'>

                    <Popover>

                      <PopoverTrigger>
                        {/* this sybol for ... */}
                        <MoreHorizontal />
                      </PopoverTrigger>

                      <PopoverContent className='w-32'>

      
                        <div onClick={()=> navigate(`/admin/companies/${company._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                          <Edit2  />
                          <span>Edit</span>
                        </div>

                        <CompanyDelete companyId={company._id} />
                        
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

            )
          }

        </TableBody>

      </Table>
    </div>
  )
}

export default ComapnyTabel
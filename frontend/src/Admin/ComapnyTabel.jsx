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
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Edit2, MoreHorizontal, Eye, Trash2, Calendar, Building2, Plus } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CompanyDelete from './hadling CURD/CompanyDelete'
import { Button } from '@/components/ui/button'

const ComapnyTabel = () => {
  const navigate = useNavigate();
  const { allCompany, searchComapnyByText } = useSelector(store => store.company);
  const [filterCompany, setFilterCompany] = useState(allCompany || []);

  useEffect(() => {
    const filterComapny = allCompany?.length >= 0 && allCompany?.filter((company) => {
      if (!searchComapnyByText) {
        return true;
      }
      return company?.name?.toLowerCase().includes(searchComapnyByText.toLowerCase());
    });
    setFilterCompany(filterComapny || []);
  }, [allCompany, searchComapnyByText]);

  const getInitials = (name) => {
    if (!name) return '?'
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2)
  }

  const getDate = (date) => {
    if (!date) return 'N/A'
    return date.split("T")[0]
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableCaption className="text-gray-400">
          {filterCompany.length > 0 
            ? `Showing ${filterCompany.length} company${filterCompany.length > 1 ? 'ies' : ''}` 
            : 'List of your registered companies'}
        </TableCaption>

        <TableHeader className="bg-gray-50">
          <TableRow className="hover:bg-gray-50">
            <TableHead className="font-semibold text-gray-600 text-xs uppercase tracking-wider">
              Logo
            </TableHead>
            <TableHead className="font-semibold text-gray-600 text-xs uppercase tracking-wider">
              Name
            </TableHead>
            <TableHead className="font-semibold text-gray-600 text-xs uppercase tracking-wider">
              Date
            </TableHead>
            <TableHead className="font-semibold text-gray-600 text-xs uppercase tracking-wider text-right">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filterCompany.length > 0 ? (
            filterCompany?.map((company) => (
              <TableRow 
                key={company._id} 
                className="hover:bg-indigo-50/50 transition-colors group"
              >
                <TableCell className="py-3">
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 border-2 border-gray-100 group-hover:border-indigo-200 transition-colors">
                      {company?.logo ? (
                        <AvatarImage src={company?.logo} alt='logo' />
                      ) : (
                        <AvatarFallback className="bg-gradient-to-br from-indigo-100 to-indigo-200 text-indigo-700 font-semibold">
                          {getInitials(company?.name)}
                        </AvatarFallback>
                      )}
                    </Avatar>
                  </div>
                </TableCell>

                <TableCell>
                  <div>
                    <div className="font-medium text-gray-900 group-hover:text-indigo-700 transition-colors">
                      {company?.name || 'Unnamed Company'}
                    </div>
                    <div className="text-xs text-gray-400">
                      {company?.industry || 'Technology'}
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3.5 w-3.5 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {getDate(company?.createdAt)}
                    </span>
                  </div>
                </TableCell>

                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-indigo-100 hover:text-indigo-700 transition-colors"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent className="w-48 p-2 border-gray-200 shadow-lg">
                      <div className="flex flex-col gap-1">
                        {/* View Details */}
                        <button
                          onClick={() => navigate(`/admin/companies/${company._id}`)}
                          className="flex items-center gap-3 w-full px-3 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-lg transition-colors"
                        >
                          <Eye className="h-4 w-4" />
                          <span>View Details</span>
                        </button>
                        
                        {/* Edit - Navigates to company setup page */}
                        <button
                          onClick={() => navigate(`/admin/companies/${company._id}`)}
                          className="flex items-center gap-3 w-full px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors"
                        >
                          <Edit2 className="h-4 w-4" />
                          <span>Edit</span>
                        </button>
                        
                        <div className="border-t border-gray-100 my-1"></div>
                        
                        {/* Delete */}
                        <CompanyDelete companyId={company._id} />
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="py-12 text-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="bg-gray-100 p-4 rounded-full">
                    <Building2 className="h-8 w-8 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-gray-600 font-medium">You haven't registered any company yet.</p>
                    <p className="text-sm text-gray-400 mt-1">
                      {searchComapnyByText 
                        ? `No results for "${searchComapnyByText}"` 
                        : 'Get started by creating your first company'}
                    </p>
                  </div>
                  {!searchComapnyByText && (
                    <Button 
                      onClick={() => navigate("/admin/comapanies/create")}
                      className="mt-2 bg-indigo-600 hover:bg-indigo-700"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Create Company
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default ComapnyTabel
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
import { Edit2, MoreHorizontal, Eye, Trash2, Calendar, Building2, Plus, Sparkles } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CompanyDelete from './crud/CompanyDelete'
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
    <div className="w-full overflow-x-auto">
      <Table className="w-full">
        <TableCaption className="text-xs text-slate-400 py-4">
          {filterCompany.length > 0 
            ? `Showing ${filterCompany.length} registered ${filterCompany.length === 1 ? 'company' : 'companies'}` 
            : 'No registered organizations found'}
        </TableCaption>

        <TableHeader className="bg-slate-50/80 border-b border-slate-100">
          <TableRow className="hover:bg-transparent border-slate-100">
            <TableHead className="w-24 py-4 pl-6 font-bold text-slate-500 text-[11px] uppercase tracking-wider">
              Logo
            </TableHead>
            <TableHead className="py-4 font-bold text-slate-500 text-[11px] uppercase tracking-wider">
              Organization & Industry
            </TableHead>
            <TableHead className="py-4 font-bold text-slate-500 text-[11px] uppercase tracking-wider">
              Registration Date
            </TableHead>
            <TableHead className="py-4 pr-6 font-bold text-slate-500 text-[11px] uppercase tracking-wider text-right">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="divide-y divide-slate-100/80">
          {filterCompany.length > 0 ? (
            filterCompany?.map((company) => (
              <TableRow 
                key={company._id} 
                className="hover:bg-indigo-50/40 transition-colors duration-200 group border-b border-slate-100/70"
              >
                {/* Company Logo / Avatar */}
                <TableCell className="py-4 pl-6">
                  <div className="flex items-center">
                    <Avatar className="h-11 w-11 rounded-2xl border-2 border-white shadow-md shadow-slate-200/50 group-hover:scale-105 group-hover:border-indigo-200 transition-all duration-300">
                      {company?.logo ? (
                        <AvatarImage src={company?.logo} alt={`${company?.name || 'Company'} logo`} className="object-cover" />
                      ) : (
                        <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold text-sm tracking-wider rounded-2xl">
                          {getInitials(company?.name)}
                        </AvatarFallback>
                      )}
                    </Avatar>
                  </div>
                </TableCell>

                {/* Company Name & Details */}
                <TableCell className="py-4">
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors duration-200 text-sm">
                      {company?.name || 'Unnamed Company'}
                    </span>
                    <span className="text-xs text-slate-400 font-medium mt-0.5">
                      {company?.industry || 'Technology & Software'}
                    </span>
                  </div>
                </TableCell>

                {/* Registration Date */}
                <TableCell className="py-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-slate-50 border border-slate-200/60 text-slate-600 text-xs font-medium">
                    <Calendar className="h-3.5 w-3.5 text-indigo-500" />
                    <span>{getDate(company?.createdAt)}</span>
                  </div>
                </TableCell>

                {/* Actions Popover */}
                <TableCell className="py-4 pr-6 text-right">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="h-9 w-9 p-0 rounded-xl hover:bg-white hover:shadow-md hover:text-indigo-600 border border-transparent hover:border-slate-200/70 transition-all duration-200"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open company actions menu</span>
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent align="end" className="w-52 p-2 bg-white/95 backdrop-blur-xl border border-slate-200/80 shadow-xl shadow-indigo-500/10 rounded-2xl animate-in fade-in zoom-in-95 duration-150">
                      <div className="flex flex-col gap-1">
                        {/* View Details */}
                        <button
                          onClick={() => navigate(`/admin/companies/${company._id}`)}
                          className="flex items-center gap-2.5 w-full px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-indigo-50/80 hover:text-indigo-600 rounded-xl transition-all duration-150 text-left"
                        >
                          <Eye className="h-4 w-4 text-indigo-500" />
                          <span>View Profile</span>
                        </button>
                        
                        {/* Edit Details */}
                        <button
                          onClick={() => navigate(`/admin/companies/${company._id}`)}
                          className="flex items-center gap-2.5 w-full px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-purple-50/80 hover:text-purple-600 rounded-xl transition-all duration-150 text-left"
                        >
                          <Edit2 className="h-4 w-4 text-purple-500" />
                          <span>Edit Details</span>
                        </button>
                        
                        <div className="border-t border-slate-100 my-1" />
                        
                        {/* Delete Action Component */}
                        <div className="w-full">
                          <CompanyDelete companyId={company._id} />
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="py-16 text-center">
                <div className="flex flex-col items-center justify-center max-w-sm mx-auto">
                  <div className="relative mb-4">
                    <div className="absolute -inset-2 bg-indigo-500/20 rounded-full blur-lg" />
                    <div className="relative w-16 h-16 rounded-3xl bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 flex items-center justify-center text-indigo-500 shadow-inner">
                      <Building2 className="h-8 w-8" />
                    </div>
                  </div>
                  
                  <h3 className="text-base font-bold text-slate-800 mb-1">
                    {searchComapnyByText ? 'No matching companies found' : 'No companies registered yet'}
                  </h3>
                  <p className="text-xs text-slate-400 mb-6 leading-relaxed text-center">
                    {searchComapnyByText 
                      ? `We couldn't find any results matching "${searchComapnyByText}". Try searching for another name.` 
                      : 'Create and configure your first company profile to start managing recruitment campaigns.'}
                  </p>

                  {!searchComapnyByText && (
                    <Button 
                      onClick={() => navigate("/admin/comapanies/create")}
                      className="relative group bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-700 hover:via-indigo-600 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/25 px-6 h-10 rounded-xl font-medium overflow-hidden transition-all duration-300"
                    >
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                      <Plus className="h-4 w-4 mr-2 relative z-10" />
                      <span className="relative z-10 text-xs">Create First Company</span>
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
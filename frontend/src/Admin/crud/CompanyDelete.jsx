import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllCompany } from "@/redux/companySlice";

const CompanyDelete = ({ companyId }) => {

  const dispatch = useDispatch();
  const navigate=useNavigate();
  const { allCompany } = useSelector(store => store.company);

  const handleDelete = async (id) => {

    try {
        const res= await axios.delete(`${COMPANY_API_END_POINT}/delete/${id}`,{ withCredentials: true});

    if(res.data.success){

      const updatedCompanies= allCompany.filter(
        (company)=> company._id !== id
      )
      dispatch(setAllCompany(updatedCompanies));
      navigate("/admin/companies");
     toast.success(res?.data?.message);
        }
    } catch(error){
       toast.error(error?.response?.data?.message);
            console.log(error);
    }
  
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="flex items-center gap-2.5 w-full px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50/80 rounded-xl transition-all duration-150 text-left cursor-pointer">
          <Trash2 className="h-4 w-4 text-red-500" />
          <span>Delete Company</span>
        </button>
      </AlertDialogTrigger>

      <AlertDialogContent className="sm:max-w-[420px] rounded-3xl p-6 bg-white/95 backdrop-blur-xl border border-white/90 shadow-2xl">
        <AlertDialogHeader className="text-center sm:text-center">
          <div className="relative w-14 h-14 mx-auto mb-3">
            <div className="absolute -inset-1 bg-red-500/20 rounded-2xl blur-md" />
            <div className="relative w-14 h-14 bg-gradient-to-br from-red-50 to-rose-100 border border-red-200/60 rounded-2xl flex items-center justify-center text-red-600 shadow-sm">
              <Trash2 className="w-7 h-7 text-red-500" />
            </div>
          </div>
          <AlertDialogTitle className="text-xl font-bold text-slate-900 text-center">
            Delete this Company?
          </AlertDialogTitle>

          <AlertDialogDescription className="text-slate-500 text-xs sm:text-sm text-center mt-1">
            This action cannot be undone. This will permanently delete the organization profile and remove its association with any active postings.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex flex-row gap-3 mt-6 sm:justify-center">
          <AlertDialogCancel className="flex-1 rounded-xl h-11 border-slate-200/80 text-slate-700 hover:bg-slate-50 font-medium">
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction 
            className="flex-1 rounded-xl h-11 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-medium shadow-lg shadow-red-500/25 transition-all cursor-pointer" 
            onClick={() => handleDelete(companyId)}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CompanyDelete;
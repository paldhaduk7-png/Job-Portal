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
        <div className="flex items-center gap-2 w-fit cursor-pointer">
          <Trash2 />
          <span>Delete</span>
        </div>
      </AlertDialogTrigger>

      <AlertDialogContent>

        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure?
          </AlertDialogTitle>

          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete
            the company.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>

          <AlertDialogCancel>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction className='cursor-pointer' onClick={() => handleDelete(companyId)}>
            Delete
          </AlertDialogAction>

        </AlertDialogFooter>

      </AlertDialogContent>

    </AlertDialog>
  );
};

export default CompanyDelete;
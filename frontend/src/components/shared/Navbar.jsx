import React,{useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
import {  useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { clearAllJobs } from "@/redux/jobSlice";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const Navbar = () => {

  const [open, setOpen] = useState(false); // State to control the popup

const {user}=useSelector(store=>store.auth);
const dispatch=useDispatch();
const navigate=useNavigate();

const logoutHandler = async ()=>{
try {
  const res= await axios.post(`${USER_API_END_POINT}/logout`,{}, { withCredentials:true});
  
  if(res.data.success){
  dispatch(setUser(null));
  dispatch(clearAllJobs());
  navigate("/");
    toast.success(res?.data?.message);
  }

} catch (error) {
  console.log(error);   
toast.error(error?.response?.data?.message);
}finally {
      setOpen(false); // Close the popup
    }
}



  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-2xl font-bold">
            Job <span className="text-[#F83002]">Portal</span>
          </h1>
        </div>

        <div className="flex items-center gap-12">
          <ul className="flex font-medium  items-center gap-5 ">
            {
              user && user.role === 'recruiter'?(
                <>
                 <li><Link  to="/admin/companies">Companies</Link></li>
            <li> <Link to="/admin/jobs">Jobs</Link></li>
                </>
              ) :(
                <>
                  <li><Link to="/" >Home</Link></li>
                  <li><Link to="/jobs" >jobs</Link></li>
                  <li><Link to="/browse" >Browse</Link></li>
                  </>
              )
            }
          
       
          </ul>

{
  !user ?(
<div className="flex items-center gap-2">
 <Link to="/login"><Button variant="outline">Login</Button></Link> 
 <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#5b30a6] ">signup</Button></Link> 
  </div>
  ):(
       <Popover>
            <PopoverTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage
                  src={user?.Profile?.profilePhoto}
                  alt="@shadcn"
                />
              </Avatar>
            </PopoverTrigger>

            <PopoverContent className="w-80">

              <div className="">

                <div className="flex gap-2 space-y-2">
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user?.Profile?.profilePhoto}
                    alt="@shadcn"
                  />
                </Avatar>


                <div >
                  <h4 className="font-medium">{user?.fullname}</h4>
                <p className="text-sm text-muted-foreground">{user?.Profile?.bio} </p>                  
                </div>
              </div>

<div className="flex  flex-col  text-gray-600">

{
  user && user.role=== 'student' &&(
    <div className="flex w-fit my-2 items-center gap-2 cursor-pointer ">
                <User2 />
                <Button variant="link"> <Link to="/profile">View profile</Link></Button>
     </div>
  )
}
        
              <div className="flex w -fit items-center gap-2  ">
                <LogOut/>
                 <Button className='cursor-pointer' onClick={() => setOpen(true)} variant="link">Logout</Button>
     </div>
       </div>
</div>
            </PopoverContent>
          </Popover>
  )

} 
   
        </div>
      </div>




{/* --- LOGOUT CONFIRMATION DIALOG --- */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Logout</DialogTitle>
            <DialogDescription>
              Are you sure you want to log out? You will need to sign in again to access your account.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={logoutHandler}>Logout</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default Navbar;

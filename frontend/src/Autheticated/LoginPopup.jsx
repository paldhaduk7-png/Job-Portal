import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { LogIn, Home } from "lucide-react"
import { useNavigate } from "react-router-dom";

const LoginPopup = ({ open, setOpen }) => {
      const navigate = useNavigate();

  return (
   <Dialog open={open} onOpenChange={setOpen}>
  <DialogContent className="sm:max-w-md overflow-hidden">
    {/* Gradient accent bar at top */}
    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
    
    <DialogHeader className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900/30 dark:to-amber-800/20">
          <svg 
            className="h-6 w-6 text-amber-600 dark:text-amber-400" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
            />
          </svg>
        </div>
        <div>
          <DialogTitle className="text-xl font-bold tracking-tight">
            Authentication Required
          </DialogTitle>
        </div>
      </div>
      <DialogDescription className="text-base text-muted-foreground">
        Please sign in to continue with your request.
      </DialogDescription>
    </DialogHeader>

    <div className="py-6">
      <div className="rounded-xl border border-dashed bg-card/50 p-6 backdrop-blur-sm">
        <div className="flex items-start gap-4">
          <div className="mt-0.5 shrink-0">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="flex-1 space-y-2">
            <p className="text-sm font-medium">Why sign in?</p>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-primary/60" />
                Access your personalized dashboard
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-primary/60" />
                Save and manage your preferences
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-primary/60" />
                Get full access to all features
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-2 border-t">
      <Button 
        variant="ghost" 
       onClick={() => {
  setOpen(false);
  navigate("/login");
}}
        className="gap-2 hover:bg-muted/50"
      >
        <Home className="h-4 w-4" />
        Go Home
      </Button>

      <Button 
        onClick={() => {
  setOpen(false);
  navigate("/");
}}
        className="gap-2 shadow-lg hover:shadow-primary/25 transition-shadow"
        size="default"
      >
        <LogIn className="h-4 w-4" />
        Sign In
      </Button>
    </div>
  </DialogContent>
</Dialog>
  );
};

export default LoginPopup;
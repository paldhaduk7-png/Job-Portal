import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { LogIn, Home, Shield, Zap, User, Sparkles } from "lucide-react"
import { useNavigate } from "react-router-dom";

const LoginPopup = ({ open, setOpen }) => {
  const navigate = useNavigate();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md overflow-hidden p-0 gap-0 bg-gradient-to-br from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-pink-600/5" />
        
        {/* Decorative floating elements */}
        <div className="absolute top-20 right-10 w-20 h-20 bg-blue-400/10 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-20 left-10 w-16 h-16 bg-purple-400/10 rounded-full blur-2xl animate-pulse delay-1000" />
        
        {/* Header section with gradient */}
        <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-6 pb-8">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
          
          <DialogHeader className="relative space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-white/20 backdrop-blur-sm shadow-lg">
                <Shield className="h-6 w-6 text-white" strokeWidth={1.5} />
              </div>
              <div>
                <DialogTitle className="text-xl font-bold text-white tracking-tight">
                  Welcome Back!
                </DialogTitle>
                <DialogDescription className="text-white/80 text-sm mt-0.5">
                  Sign in to access your account
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
        </div>

        {/* Main content */}
        <div className="relative p-6 pt-4">
          <div className="space-y-4">
            {/* Feature cards */}
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/20 rounded-xl p-3 text-center group hover:scale-105 transition-transform">
                <User className="h-5 w-5 text-blue-600 dark:text-blue-400 mx-auto mb-1.5" />
                <p className="text-[11px] font-medium text-slate-700 dark:text-slate-300 leading-tight">Personalized</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">Dashboard</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-950/30 dark:to-purple-900/20 rounded-xl p-3 text-center group hover:scale-105 transition-transform">
                <Sparkles className="h-5 w-5 text-purple-600 dark:text-purple-400 mx-auto mb-1.5" />
                <p className="text-[11px] font-medium text-slate-700 dark:text-slate-300 leading-tight">Save</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">Preferences</p>
              </div>
              <div className="bg-gradient-to-br from-pink-50 to-pink-100/50 dark:from-pink-950/30 dark:to-pink-900/20 rounded-xl p-3 text-center group hover:scale-105 transition-transform">
                <Zap className="h-5 w-5 text-pink-600 dark:text-pink-400 mx-auto mb-1.5" />
                <p className="text-[11px] font-medium text-slate-700 dark:text-slate-300 leading-tight">Full Access</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">All Features</p>
              </div>
            </div>

            {/* Feature list (detailed) */}
            <div className="bg-slate-50/80 dark:bg-slate-800/30 rounded-xl p-4 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50">
              <ul className="space-y-2">
                <li className="flex items-start gap-3 text-sm">
                  <div className="mt-0.5 h-5 w-5 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                  </div>
                  <span className="text-slate-700 dark:text-slate-300">Access your personalized dashboard</span>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <div className="mt-0.5 h-5 w-5 rounded-full bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                    <div className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                  </div>
                  <span className="text-slate-700 dark:text-slate-300">Save and manage your preferences</span>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <div className="mt-0.5 h-5 w-5 rounded-full bg-pink-500/10 flex items-center justify-center flex-shrink-0">
                    <div className="h-1.5 w-1.5 rounded-full bg-pink-500" />
                  </div>
                  <span className="text-slate-700 dark:text-slate-300">Get full access to all features</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="relative p-6 pt-0 flex flex-col-reverse sm:flex-row justify-end gap-3">
          <Button 
            variant="ghost" 
            onClick={() => {
              setOpen(false);
              navigate("/");
            }}
            className="gap-2 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
          >
            <Home className="h-4 w-4" />
            Go Home
          </Button>

          <Button 
            onClick={() => {
              setOpen(false);
              navigate("/login");
            }}
            className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 transition-all duration-300 flex-1 sm:flex-none"
            size="default"
          >
            <LogIn className="h-4 w-4" />
            Login
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginPopup;
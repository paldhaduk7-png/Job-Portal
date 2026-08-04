import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Navbar from './components/shared/Navbar'
import Home from './components/Home';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Jobs from './Job/Jobs';
import Browse from "./Browse/Browse";
import Profile from './Profile/Profile';
import JobDescription from './Job/JobDescription';
import Compaies from './Admin/Compaies';
import ComapnyCreate from './Admin/ComapnyCreate';
import ComapnySetup from './Admin/ComapnySetup';
import AdminJobs from './Admin/AdminJobs.jsx'
import PostJob from './Admin/PostJob';
import Applicants from './Admin/Applicants';
import ProtectedRoute from './Admin/ProtectedRoute';
import RecuterProfile from './Profile/RecuterProfile';
import JobUpadate from './Admin/hadling CURD/JobUpadate';
import AppliedJob from './AppliedJob/AppliedJob';
import SavedJob from "./SaveJob/SavedJob";
import About from './about/About';
import ForgotPassword from './components/auth/ForgotPassword';
import VerifyOtp from './components/auth/VerifyOtp';
import ResetPassword from './components/auth/ResetPassword';
import ProtectedUserRoute from "./components/ProtectedUserRoute";
import PublicRoute from './components/PublicRoute';


const appRouter= createBrowserRouter([
//client
{
  path:"/",
  element:
  <>
  <Navbar />
  <Home/>
  </>
},
{
  path: "/login",
  element: (
    <>
      <Navbar />
      <PublicRoute>
        <Login />
      </PublicRoute>
    </>
  ),
},
{
  path:"/signup",
  element:
  <>
  <Navbar />
  <PublicRoute>
  <Signup/>
  </PublicRoute>
  </>
},
{
  path:"/forgot-password",
  element:
  <>
  <Navbar />
  <PublicRoute>
  <ForgotPassword />
  </PublicRoute>
  </>
},
{
  path:"/verify-otp",
  element:
  <>
  <Navbar />
  <PublicRoute>
  <VerifyOtp />
  </PublicRoute>
  </>
},
{
  path:"/reset-password",
  element:
  <>
  <Navbar />
  <PublicRoute>
  <ResetPassword />
  </PublicRoute>
  </>
},
{
  path:"/jobs",
  element:
  <>
  <Navbar />
  <Jobs />
  </>
},
{
  path:"/browse",
  element:
  <>
  <Navbar />
  <Browse />
  </>
},
{
  path:"/about",
  element:
  <>
  <Navbar />
  <About />
  </>
},
{
  path: "/profile",
  element: (
    <>
      <Navbar />
      <ProtectedUserRoute>
        <Profile />
      </ProtectedUserRoute>
    </>
  ),
},
{
  path: "/applied-jobs",
  element: (
    <>
      <Navbar />
      <ProtectedUserRoute>
        <AppliedJob />
      </ProtectedUserRoute>
    </>
  ),
},
{
  path: "/saved-jobs",
  element: (
    <>
      <Navbar />
      <ProtectedUserRoute>
        <SavedJob />
      </ProtectedUserRoute>
    </>
  ),
},
{
  path:"/description/:id",
  element:
  <>
  <JobDescription />
  </>
},


//admin
{
  path:"/admin/companies",
  element:
    <>
    <Navbar />
    <ProtectedRoute>
     <Compaies />
     </ProtectedRoute>
    </>
},{
  path:"/recruiter-profile",
  element:
    <>
    <Navbar />
    <ProtectedRoute>
     <RecuterProfile />
     </ProtectedRoute>
    </>
},
{
  path:"/admin/comapanies/create",
  element:
    <>
    <Navbar />
    <ProtectedRoute>
     <ComapnyCreate />
     </ProtectedRoute>
    </>
},
{
  path:"/admin/companies/:id",
  element:
    <>
    <Navbar />
    <ProtectedRoute>
   <ComapnySetup />
   </ProtectedRoute>
    </>
},
{
  path:"/admin/jobs",
  element:
    <>
    <Navbar />
    <ProtectedRoute>
<AdminJobs />
</ProtectedRoute>
    </>
},
{
  path:"/admin/jobs/create",
  element:
    <>
    <Navbar />
    <ProtectedRoute>
<PostJob />
</ProtectedRoute>
    </>
},
{
  path:"/admin/job/update/:id",
  element:
    <>
    <Navbar />
    <ProtectedRoute>
<JobUpadate />
</ProtectedRoute>
    </>
},
{
  path:`/admin/jobs/:id/applicants`,
  element:
    <>
    <Navbar />
    <ProtectedRoute>
<Applicants />
</ProtectedRoute>
    </>
},


  ]);

function App() {

  return (
    <>
    <RouterProvider  router={appRouter} />
    </>
  );
}

export default App

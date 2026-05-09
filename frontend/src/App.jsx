import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Navbar from './components/shared/Navbar'
import Home from './components/Home';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Jobs from './Job/Jobs';
import Browse from './Browse/browse';
import Profile from './Profile/Profile';
import JobDescription from './Job/JobDescription';
import Compaies from './Admin/Compaies';
import ComapnyCreate from './Admin/ComapnyCreate';
import ComapnySetup from './Admin/ComapnySetup';
import AdminJobs from './Admin/AdminJobs.jsx'
import PostJob from './Admin/PostJob';
import Applicants from './Admin/Applicants';

function App() {

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
  path:"/login",
  element:
  <>
  <Navbar />
  <Login/>
  </>
},
{
  path:"/signup",
  element:
  <>
  <Navbar />
  <Signup/>
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
  path:"/profile",
  element:
  <>
  <Navbar />
  <Profile />
  </>
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
     <Compaies />
    </>
},
{
  path:"/admin/comapanies/create",
  element:
    <>
    <Navbar />
     <ComapnyCreate />
    </>
},
{
  path:"/admin/companies/:id",
  element:
    <>
    <Navbar />
   <ComapnySetup />
    </>
},
{
  path:"/admin/jobs",
  element:
    <>
    <Navbar />
<AdminJobs />
    </>
},
{
  path:"/admin/jobs/create",
  element:
    <>
    <Navbar />
<PostJob />
    </>
},
{
  path:`/admin/jobs/:id/applicants`,
  element:
    <>
    <Navbar />
<Applicants />
    </>
},


  ]);

  return (
    <>
    <RouterProvider  router={appRouter} />
    </>
  );
}

export default App

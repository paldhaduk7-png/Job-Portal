import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Navbar from './components/shared/Navbar'
import Home from './components/Home';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Jobs from './Job/Jobs';
import Browse from './Browse/browse';
import Profile from './Profile/Profile';

function App() {

  const appRouter= createBrowserRouter([

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
  <Profile />
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

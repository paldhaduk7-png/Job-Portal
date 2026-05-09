import React, { useEffect } from 'react'
import CategoryCarousel from './CategoryCarousel'
import HeroSection from './HeroSection'
import LatestJobs from './LatestJobs'
import Footer from './Fotter'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSearchQuery } from '@/redux/jobSlice' 

const Home = () => {
useGetAllJobs();

 const dispatch = useDispatch(); 
const {user}=useSelector(store=>store.auth);
// console.log(user);
const navigate=useNavigate();
 
  useEffect(() => {
    // clear search query when home page loads
    dispatch(setSearchQuery(""));  // ← add this
  }, []);



useEffect ( ()=>{
  if(user?.role=== 'recruiter'){
navigate("/admin/companies")
  }

}, []);

  return (
    <div>
    
         <HeroSection />
      <CategoryCarousel />
      <LatestJobs />
      <Footer />  

    </div>
  )
}

export default Home

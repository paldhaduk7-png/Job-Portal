import React, { useEffect } from 'react'
import CategoryCarousel from './CategoryCarousel'
import HeroSection from './HeroSection'
import LatestJobs from './LatestJobs'
import Footer from './Fotter'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
useGetAllJobs();

const {user}=useSelector(store=>store.auth);
// console.log(user);
const navigate=useNavigate();
 
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

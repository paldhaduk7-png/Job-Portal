import React, { useEffect } from 'react'
import CategoryCarousel from './CategoryCarousel'
import HeroSection from './HeroSection'
import LatestJobs from './LatestJobs'
import Footer from './Fotter'
import userGetAllJobs from '@/hooks/userGetAllJobs'
import { useSelector } from 'react-redux'
import Compaies from '@/Admin/Compaies'
import { useNavigate } from 'react-router-dom'

const Home = () => {
userGetAllJobs();

const {user}=useSelector(store=>store.auth);
console.log(user);
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

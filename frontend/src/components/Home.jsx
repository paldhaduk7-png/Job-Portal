import React, { useEffect } from 'react'
import CategoryCarousel from './CategoryCarousel'
import HeroSection from './HeroSection'
import LatestJobs from './LatestJobs'
import Footer from './Fotter'
import GuestHome from './GuestHome'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSearchQuery } from '@/redux/jobSlice' 

const Home = () => {
  const dispatch = useDispatch(); 
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate("/admin/companies");
    }
  }, [user, navigate]);

  // When user is NOT logged in, show the different/guest landing page:
  if (!user) {
    return <GuestHome />;
  }

  // When user IS logged in, show what the website already had originally:
  return (
    <div>
      <HeroSection />
      {/* <CategoryCarousel /> */}
      <LatestJobs />
      <Footer />  
    </div>
  );
};

export default Home;

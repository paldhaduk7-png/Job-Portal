import React from "react";
import GuestHeroShowcase from "./GuestHeroShowcase";
import PlatformDualAudience from "./PlatformDualAudience";
import ExploreCategories from "./ExploreCategories";
import HowItWorks from "./HowItWorks";
import WhyChooseUs from "./WhyChooseUs";
import CtaBanner from "./CtaBanner";
import Footer from "./Fotter";

const GuestHome = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* 1. Hero Showcase with Live UI Mockup Preview & Value Proposition */}
      <GuestHeroShowcase />

      {/* 2. Dual-Path: For Job Seekers & For Employers */}
      <PlatformDualAudience />

      {/* 3. Explore By Tech Role Categories */}
      <ExploreCategories />

      {/* 4. 4-Step Process: How It Works */}
      <HowItWorks />

      {/* 5. Platform Value & Why Choose Us */}
      <WhyChooseUs />

      {/* 6. Conversion CTA Banner */}
      <CtaBanner />

      {/* 7. Footer */}
      <Footer />
    </div>
  );
};

export default GuestHome;

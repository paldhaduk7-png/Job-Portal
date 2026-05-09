import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "@/redux/jobSlice";


const category = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Data Science",
  "AI / ML",
  "Cyber Security",
  "Cloud",
  "DevOps",
  "UI/UX Designer",
  "Mobile Developer"
];


const CategoryCarousel = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const searchJobHandler = (query)=>{
  dispatch(setSearchQuery(query));
  navigate("/browse");
  }

  return (
    <div>
      <Carousel className="w-full max-w-xl  mx-auto my-28">
        <CarouselContent>
          
                  {
                    category.map((cat,index)=>(
          
                      <CarouselItem key={index} className="basis-full sm:basis-1/2 md:basis-1/3">
                               <Button onClick={()=> searchJobHandler(cat)} variant="outline" className="rounded-full cursor-pointer ">{cat}</Button>
                           </CarouselItem>
                      
                    ))
                  }
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
